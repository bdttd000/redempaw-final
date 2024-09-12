const gulp = require("gulp");
const { translationMerge } = require("./gulp-tasks/translation-merge");

gulp.task("translation-merge", (done) => {
  translationMerge();
  done();
});

gulp.task("default", gulp.series("translation-merge"));
