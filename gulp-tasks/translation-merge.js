const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { watch } = require("gulp");
const { map } = require("lodash");
dotenv.config();

const TRANSLATION_FILES = process.env.TRANSLATION_FILES;
const LANGS_FILENAME = process.env.LANGS_FILENAME;
const TRANSLATION_OUTPUT_DIR = process.env.TRANSLATION_OUTPUT_DIR;
const LANGS_OUTPUT_DIR = process.env.LANGS_OUTPUT_DIR;
const TRANSLATION_ADDITIONAL_FOLDER = process.env.TRANSLATION_ADDITIONAL_FOLDER;
const TRANSLATION_ADDITIONAL_FILES = process.env.TRANSLATION_ADDITIONAL_FILES;
const mainDir = path.join(process.cwd(), "src/app");
let paths = [];
let langs = [];

function checkIfLanguageExists(file) {
  const lang = file.replace(".json", "");
  if (!langs.includes(lang)) {
    langs.push(lang);
  }
}

function findTranslationFiles(dirPath) {
  const entities = fs.readdirSync(dirPath);

  entities.forEach((entity) => {
    const entityPath = path.join(dirPath, entity);
    const stats = fs.statSync(entityPath);

    if (stats.isDirectory() && entity === "translations") {
      const struct = { folderPath: entityPath, files: [] };
      const files = fs.readdirSync(entityPath);
      const entityPathForJson = entityPath.replace(/[()]/g, "");
      files.forEach((file) => {
        struct.files.push(file);
        checkIfLanguageExists(file);
      });
      struct.splittedPath = entityPathForJson
        .replace(/[()]/g, "")
        .substring(
          entityPathForJson.lastIndexOf("\\app\\") + 5,
          entityPathForJson.indexOf("\\translations")
        )
        .toLowerCase()
        .split("\\");
      struct.prefix = struct.splittedPath.join(".");
      paths.push(struct);
    } else if (stats.isDirectory()) {
      findTranslationFiles(entityPath);
    }
  });
}

function searchForMissingFiles() {
  paths.map((obj) => {
    if (obj.files.length === langs.length) {
      return;
    }
    const missingLangs = langs.filter(
      (lang) => !obj.files.includes(`${lang}.json`)
    );
    console.error(
      `Missing languages [${[...missingLangs]}] in ${obj.folderPath}`
    );
  });
}

function mergeDeep(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], mergeDeep(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

function buildJsonTranslation(lang, ...objects) {
  const result = {};
  paths.forEach((translationInfo) => {
    if (!translationInfo.files.includes(`${lang}.json`)) {
      return;
    }
    try {
      const config = { prefix: translationInfo.prefix };
      const configPath = `${translationInfo.folderPath.replace(
        "translations",
        ""
      )}config.json`;
      if (fs.existsSync(configPath)) {
        fs.readFile(configPath, "utf-8", (err, data) => {
          if (err) throw err;
          let fileContent = JSON.parse(data);
          fileContent["prefix"] = translationInfo.prefix;
          fs.writeFileSync(
            configPath,
            JSON.stringify(fileContent, null, 2),
            (err) => {
              if (err) throw err;
            }
          );
        });
      } else {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
      }
    } catch (err) {
      console.error(
        `Couldn't create config.json file for ${translationInfo.folderPath}: ${err.message}`
      );
    }
    let currentLevel = result;
    translationInfo.splittedPath.forEach((key, index) => {
      if (!currentLevel[key]) {
        currentLevel[key] = index === translationInfo.length - 1 ? {} : {};
      }
      if (index === translationInfo.splittedPath.length - 1) {
        try {
          const fileContent =
            JSON.parse(
              fs.readFileSync(
                `${translationInfo.folderPath}\\${lang}.json`,
                "utf-8"
              )
            ) || {};
          currentLevel[key] = mergeDeep(currentLevel[key], fileContent);
        } catch (err) {
          console.error(
            `Error reading or parsing file ${`${translationInfo.folderPath}\\${lang}.json`}: ${
              err.message
            }`
          );
        }
      }
      currentLevel = currentLevel[key];
    });
  });

  map(objects, (object) => {
    map(object, (value, key) => {
      if (key === lang) {
        map(value, (value2, key2) => {
          result[key2] = value2;
        });
      }
    });
  });

  try {
    fs.writeFileSync(
      `${TRANSLATION_OUTPUT_DIR}\\${lang}.json`,
      JSON.stringify(result, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(`Error writing file: ${err.message}`);
  }
}

function removeUnnecessaryFolders() {
  const entities = fs.readdirSync(TRANSLATION_OUTPUT_DIR);
  entities.forEach((entity) => {
    if (!langs.includes(entity)) {
      fs.rmSync(`${TRANSLATION_OUTPUT_DIR}/${entity}`, {
        recursive: true,
        force: true,
      });
    }
  });
}

function searchForAdditionalTranslations() {
  const additionalTranslations = [];
  const uniqueFiles = new Set();

  const entities = fs.readdirSync(TRANSLATION_ADDITIONAL_FOLDER);
  entities.forEach((entity) => {
    const files = fs.readdirSync(`${TRANSLATION_ADDITIONAL_FOLDER}/${entity}`);
    files.forEach((file) => {
      uniqueFiles.add(file.replace(".json", ""));
    });
  });

  uniqueFiles.forEach((file) => {
    additionalTranslations.push(getObject(file));
  });

  return additionalTranslations;
}

function getObject(objectName, filename = objectName) {
  let object = {};

  const entities = fs.readdirSync(TRANSLATION_ADDITIONAL_FOLDER);
  entities.forEach((entity) => {
    let filePath = `${TRANSLATION_ADDITIONAL_FOLDER}/${entity}/${filename}.json`;
    if (!fs.existsSync(filePath)) {
      return;
    }
    object[entity] = JSON.parse(fs.readFileSync(filePath, "utf-8")) || {};
  });

  return object;
}

function translationMerge() {
  paths = [];
  langs = [];

  findTranslationFiles(mainDir);
  searchForMissingFiles();
  removeUnnecessaryFolders();

  langs.map((lang) => {
    buildJsonTranslation(lang, ...searchForAdditionalTranslations());
  });

  try {
    fs.writeFileSync(
      `${LANGS_OUTPUT_DIR}\\${LANGS_FILENAME}`,
      JSON.stringify({ languages: langs }, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error(
      `Couldn't create config file with langs in utils ${err.message}`
    );
  }

  return Promise.resolve();
}

exports.translationMerge = function () {
  watch(TRANSLATION_FILES, translationMerge);
  watch(TRANSLATION_ADDITIONAL_FILES, translationMerge);
};
