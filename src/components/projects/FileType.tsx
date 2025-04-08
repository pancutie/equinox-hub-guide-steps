
import { FileText, Image, File, FileSpreadsheet, FileCode } from "lucide-react";

interface FileTypeProps {
  type: string;
  size?: number;
  className?: string;
}

export const FileType: React.FC<FileTypeProps> = ({ type, size = 24, className = "" }) => {
  const fileType = type.toLowerCase();
  
  switch (fileType) {
    case 'pdf':
      return <FileText size={size} className={`text-red-500 ${className}`} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Image size={size} className={`text-blue-500 ${className}`} />;
    case 'xlsx':
    case 'xls':
    case 'csv':
      return <FileSpreadsheet size={size} className={`text-green-500 ${className}`} />;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
      return <FileCode size={size} className={`text-purple-500 ${className}`} />;
    default:
      return <File size={size} className={`text-gray-500 ${className}`} />;
  }
};
