import { useState } from "react";
import Image from "next/image";

export default function UploadPhoto({
  title,
  multiple = false,
  value,
  handler,
  field,
}) {
  const [selectedFiles, setSelectedFiles] = useState(value);
  const [previews, setPreviews] = useState(value);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    handler(field, files);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-primary rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full bg-white p-2 rounded"
        multiple={multiple}
        required={!multiple}
        title="asds"
      />

      {previews.length > 0 && (
        <div
          className={`mb-4 grid gap-4 w-full ${
            multiple ? "grid-cols-2" : "place-items-center"
          }`}
        >
          {previews.map((preview, index) => (
            <div
              key={index}
              className={`relative ${multiple ? "w-full" : "w-1/2"} min-h-40`}
            >
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="h-40 w-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
