import { writeFile, mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join, extname } from "path";

export async function POST(request) {
  // Parsowanie danych przesyłanych w formularzu
  const data = await request.formData();
  const file = data.get("file"); // Plik
  const fileName = data.get("imageId"); // Nazwa pliku (UUID)
  const directory = data.get("directory"); // Ścieżka katalogu

  // Sprawdź, czy plik istnieje
  if (!file) {
    return NextResponse.json({ success: false, message: "Brak pliku" });
  }

  // Pobranie oryginalnego rozszerzenia pliku na podstawie MIME type
  const mimeType = file.type;
  let fileExtension = ".jpg"; // Domyślne rozszerzenie, jeśli typ MIME jest nieznany

  // Dopasowanie rozszerzenia do typu MIME
  if (mimeType === "image/png") {
    fileExtension = ".png";
  } else if (mimeType === "image/jpeg") {
    fileExtension = ".jpg";
  } else if (mimeType === "image/gif") {
    fileExtension = ".gif";
  } // Możesz dodać więcej rozszerzeń w zależności od potrzeb

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Tworzenie katalogu, jeśli nie istnieje
  const dir = join(process.cwd(), "public", directory);
  mkdirSync(dir, { recursive: true });

  // Zapis pliku na serwerze z odpowiednim rozszerzeniem
  const path = join(dir, `${fileName}${fileExtension}`);
  writeFile(path, buffer, "utf8", (err) => {
    if (err) {
      console.error("Błąd zapisu pliku:", err);
      return NextResponse.json({ success: false });
    }
  });

  // Zwracamy ścieżkę do zapisanego pliku
  return NextResponse.json({
    success: true,
    filePath: `/${directory}/${fileName}${fileExtension}`,
  });
}
