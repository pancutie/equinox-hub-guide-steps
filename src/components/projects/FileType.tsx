
import { 
  FileText, 
  Image, 
  File, 
  FileSpreadsheet, 
  FileCode, 
  FileArchive, 
  FileAudio, 
  FileVideo,
  File as FileFallback,
  FileJson,
  FileSearch,
  Presentation
} from "lucide-react";

interface FileTypeProps {
  type: string;
  size?: number;
  className?: string;
}

export const FileType: React.FC<FileTypeProps> = ({ type, size = 24, className = "" }) => {
  const fileType = type.toLowerCase();
  
  switch (fileType) {
    case 'pdf':
      return <FileText size={size} className={`text-red-500 dark:text-red-400 ${className}`} />; // Using FileText for PDF
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
    case 'bmp':
      return <Image size={size} className={`text-blue-500 dark:text-blue-400 ${className}`} />;
    case 'xlsx':
    case 'xls':
    case 'csv':
      return <FileSpreadsheet size={size} className={`text-green-500 dark:text-green-400 ${className}`} />;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
    case 'xml':
      return <FileCode size={size} className={`text-purple-500 dark:text-purple-400 ${className}`} />;
    case 'json':
      return <FileJson size={size} className={`text-amber-500 dark:text-amber-400 ${className}`} />;
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return <FileArchive size={size} className={`text-yellow-500 dark:text-yellow-400 ${className}`} />;
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return <FileAudio size={size} className={`text-indigo-500 dark:text-indigo-400 ${className}`} />;
    case 'mp4':
    case 'webm':
    case 'avi':
    case 'mov':
      return <FileVideo size={size} className={`text-pink-500 dark:text-pink-400 ${className}`} />;
    case 'doc':
    case 'docx':
    case 'txt':
    case 'rtf':
      return <FileText size={size} className={`text-blue-600 dark:text-blue-500 ${className}`} />;
    case 'ppt':
    case 'pptx':
      return <Presentation size={size} className={`text-orange-500 dark:text-orange-400 ${className}`} />; // Using Presentation instead of FilePresentation
    case 'generic':
      return <FileSearch size={size} className={`text-gray-500 dark:text-gray-400 ${className}`} />;
    default:
      return <File size={size} className={`text-gray-500 dark:text-gray-400 ${className}`} />;
  }
};
