"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
} from "lucide-react";

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSizeMB?: number;
  onFileSelect?: (file: File | null) => void;
}

export default function FileUpload({
  label,
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 5,
  onFileSelect,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const sizeMB =
      selectedFile.size / 1024 / 1024;

    if (sizeMB > maxSizeMB) {
      setError(
        `Maximum file size allowed is ${maxSizeMB} MB`
      );
      return;
    }

    setError("");
    setFile(selectedFile);

    onFileSelect?.(selectedFile);
  };

  const removeFile = () => {
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onFileSelect?.(null);
  };

  return (
    <div className="w-full">

      <label
        className="
        block
        text-sm
        text-gray-400
        mb-3
        "
      >
        {label}
      </label>

      {!file ? (
        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="
          group
          w-full
          rounded-3xl
          border-2
          border-dashed
          border-white/10
          bg-white/[0.03]
          p-10
          text-center
          transition-all
          duration-300
          hover:border-indigo-500/40
          hover:bg-indigo-500/5
          "
        >
          <UploadCloud
            size={42}
            className="
            mx-auto
            text-indigo-400
            group-hover:scale-110
            transition
            "
          />

          <p className="mt-5 text-white font-semibold">
            Upload Document
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Drag and drop or click to upload
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Accepted:
            {" "}
            {accept}
          </p>

          <p className="text-xs text-gray-500">
            Max Size:
            {" "}
            {maxSizeMB}
            MB
          </p>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
          />
        </button>
      ) : (
        <div
          className="
          rounded-3xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          p-6
          "
        >
          <div className="flex items-center gap-4">

            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-emerald-500/20
              flex
              items-center
              justify-center
              "
            >
              <FileText
                size={28}
                className="text-emerald-400"
              />
            </div>

            <div className="flex-1">

              <p className="text-white font-semibold">
                {file.name}
              </p>

              <p className="text-sm text-gray-400">
                {(
                  file.size /
                  1024 /
                  1024
                ).toFixed(2)}
                MB
              </p>

            </div>

            <CheckCircle2
              className="text-emerald-400"
              size={28}
            />

            <button
              type="button"
              onClick={removeFile}
              className="
              h-10
              w-10
              rounded-xl
              bg-red-500/20
              flex
              items-center
              justify-center
              hover:bg-red-500/30
              transition
              "
            >
              <X
                size={18}
                className="text-red-400"
              />
            </button>

          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}