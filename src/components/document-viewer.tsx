import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, File } from "lucide-react";
import { Button } from "./ui";

interface AttachmentInterface {
  original_name: string;
  extension: string;
  file: string;
}

interface DocumentViewerProps {
  files: string[] | AttachmentInterface[] | File[];
  label?: string;
  hideDelete?: boolean;
  onRemoveFile?: (index: number) => void;
  className?: string;
  maxFiles?: number;
  showFileSize?: boolean;
}

interface DocumentItem {
  name: string;
  type: string;
  url: string | null;
  icon: string;
  fileType: string;
  size?: string;
}

export const DocumentViewer = ({
  files,
  label,
  hideDelete = false,
  onRemoveFile,
  className,
  maxFiles,
  showFileSize = false,
}: DocumentViewerProps) => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const typeIcons: Record<string, string> = {
    image: "ph-duotone ph-file-image",
    audio: "ph-duotone ph-file-audio",
    video: "ph-duotone ph-file-video",
    archive: "ph-duotone ph-file-zip",
    code: "ph-duotone ph-file-code",
    word: "ph-duotone ph-file-doc",
    powerpoint: "ph-duotone ph-file-ppt",
    excel: "ph-duotone ph-file-xls",
    pdf: "ph-duotone ph-file-doc",
    text: "ph-duotone ph-file-text",
    other: "ph-duotone ph-file",
    unknown: "ph-duotone ph-file",
  };
  const getFileIcon = (fileType: string): string => {
    return typeIcons[fileType];
  };

  const getFileType = (extension: string): string => {
    const ext = extension.toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "tiff"].includes(ext)
    )
      return "image";
    if (["mp3", "wav", "ogg", "aac", "flac", "wma"].includes(ext))
      return "audio";
    if (["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"].includes(ext))
      return "video";
    if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(ext))
      return "archive";
    if (
      [
        "js",
        "ts",
        "jsx",
        "tsx",
        "html",
        "css",
        "scss",
        "json",
        "xml",
        "py",
        "java",
        "cpp",
        "c",
        "php",
      ].includes(ext)
    )
      return "code";
    if (["doc", "docx", "rtf"].includes(ext)) return "word";
    if (["ppt", "pptx", "odp"].includes(ext)) return "powerpoint";
    if (["xls", "xlsx", "ods", "csv"].includes(ext)) return "excel";
    if (ext === "pdf") return "pdf";
    if (["txt", "md", "log", "ini", "conf"].includes(ext)) return "text";

    return "other";
  };

  const getFileName = (file: string): string => {
    return file.split("/").pop() || "Unknown";
  };

  const getFileExtension = (file: string): string => {
    return file?.split(".").pop()?.toLowerCase() || "";
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const processFiles = (
    fileList: string[] | AttachmentInterface[] | File[]
  ) => {
    const processedDocs: DocumentItem[] = [];

    if (Array.isArray(fileList)) {
      fileList.forEach((item: string | AttachmentInterface | File) => {
        let name = "N/A";
        let type = "N/A";
        let fileType = "N/A";
        let url: string | null = null;
        let size: string | undefined;

        if (item && typeof item === "object" && "original_name" in item) {
          // AttachmentInterface
          const attachment = item as AttachmentInterface;
          name = attachment.original_name;
          type = attachment.extension.replace(".", "");
          fileType = getFileType(type);
          url = `${import.meta.env.VITE_MEDIA_FOLDER_URL || "/media"}/${
            attachment.file
          }`;
        } else if (item instanceof File) {
          // File object
          name = item.name;
          type = getFileExtension(item.name);
          fileType = getFileType(type);
          url = URL.createObjectURL(item);
          if (showFileSize) {
            size = formatFileSize(item.size);
          }
        } else if (typeof item === "string") {
          // String path
          name = getFileName(item);
          type = getFileExtension(item);
          fileType = getFileType(type);
          url = `${import.meta.env.VITE_MEDIA_FOLDER_URL || "/media"}/${item}`;
        } else {
          // Fallback for unknown types
          name = "Unknown File";
          type = "unknown";
          fileType = "unknown";
          url = null;
        }

        processedDocs.push({
          name,
          type,
          url,
          icon: getFileIcon(fileType),
          fileType,
          size,
        });
      });
    }

    // Apply maxFiles limit if specified
    const limitedDocs = maxFiles
      ? processedDocs.slice(0, maxFiles)
      : processedDocs;
    setDocs(limitedDocs);
  };

  useEffect(() => {
    if (files) {
      processFiles(files);
    }
  }, [files, maxFiles, showFileSize]);

  const handleRemoveFile = (index: number) => {
    if (onRemoveFile) {
      onRemoveFile(index);
    }

    const newDocs = [...docs];
    newDocs.splice(index, 1);
    setDocs(newDocs);
  };

  const handleDownload = (doc: DocumentItem) => {
    if (doc.url) {
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      link.target = "_blank";
      link.rel = "noreferrer noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!docs.length) {
    return null;
  }

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className='mb-3'>
          <h3 className='text-sm font-medium text-gray-700'>{label}</h3>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {docs.map((doc, index) => (
          <div
            onClick={() => doc.url && handleDownload(doc)}
            key={index}
            className='border border-gray-200 rounded-lg p-3 bg-white hover:shadow-md transition-all duration-200 hover:border-gray-300 cursor-pointer'
          >
            <div className='flex items-start justify-between'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <div className='flex justify-center items-center gap-2/5 py-3 px-3 bg-primary-light rounded-md'>
                  <i className={`${doc.icon} text-primary text-xl`}></i>
                </div>

                <div className='flex-1 min-w-0'>
                  <p
                    className='text-sm font-medium text-gray-900 truncate'
                    title={doc.name}
                  >
                    {doc.name}
                  </p>
                  <div className='flex items-center gap-2 text-xs text-gray-500'>
                    <span className='uppercase'>{doc.type}</span>
                    {doc.size && (
                      <>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-1 flex-shrink-0'>
                {!hideDelete && onRemoveFile && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRemoveFile(index)}
                    className='h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50'
                    title='Remove'
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {maxFiles && files && Array.isArray(files) && files.length > maxFiles && (
        <div className='mt-3 text-sm text-gray-500 text-center'>
          Showing {maxFiles} of {files.length} files
        </div>
      )}
    </div>
  );
};
