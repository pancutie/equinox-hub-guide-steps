
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileType } from "@/components/projects/FileType";
import { X, Download, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useToast } from "@/hooks/use-toast";

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
  } | null;
}

const FileViewer: React.FC<FileViewerProps> = ({ isOpen, onClose, file }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  if (!file) return null;

  const handleDownload = () => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Download started",
      description: `Downloading ${file.name}...`,
    });
    
    // Simulate a download success after a moment
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${file.name} has been downloaded successfully`,
      });
    }, 1500);
  };

  const renderFileContent = () => {
    const fileType = file.type.toLowerCase();
    
    // For image files
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(fileType)) {
      // In a real app, this would be the actual file URL
      const mockImageUrl = `https://picsum.photos/800/600?random=${file.id}`;
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <img 
              src={mockImageUrl} 
              alt={file.name} 
              className="max-w-full max-h-[70vh] object-contain rounded-md shadow-lg"
            />
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={handleDownload} 
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download Image
            </Button>
          </div>
        </div>
      );
    }
    
    // For PDF files
    if (fileType === 'pdf') {
      return (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FileType type={fileType} size={48} className="mx-auto mb-4" />
          <p className="font-medium text-gray-800 dark:text-gray-200">PDF Preview</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            This is where a PDF viewer would be embedded in a production app.
          </p>
          <Button 
            className="flex items-center gap-2 mt-4" 
            onClick={handleDownload}
          >
            <Download size={16} />
            Download PDF
          </Button>
        </div>
      );
    }
    
    // For document files
    if (['doc', 'docx', 'txt', 'rtf'].includes(fileType)) {
      return (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FileType type={fileType} size={48} className="mx-auto mb-4" />
          <p className="font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Document preview would appear here in a production app.
          </p>
          <Button 
            className="flex items-center gap-2 mt-4" 
            onClick={handleDownload}
          >
            <Download size={16} />
            Download Document
          </Button>
        </div>
      );
    }
    
    // For spreadsheet files
    if (['xlsx', 'xls', 'csv'].includes(fileType)) {
      return (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FileType type={fileType} size={48} className="mx-auto mb-4" />
          <p className="font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Spreadsheet preview would appear here in a production app.
          </p>
          <Button 
            className="flex items-center gap-2 mt-4" 
            onClick={handleDownload}
          >
            <Download size={16} />
            Download Spreadsheet
          </Button>
        </div>
      );
    }

    // For presentation files
    if (['ppt', 'pptx'].includes(fileType)) {
      return (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FileType type={fileType} size={48} className="mx-auto mb-4" />
          <p className="font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Presentation preview would appear here in a production app.
          </p>
          <Button 
            className="flex items-center gap-2 mt-4" 
            onClick={handleDownload}
          >
            <Download size={16} />
            Download Presentation
          </Button>
        </div>
      );
    }
    
    // For other file types
    return (
      <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <FileType type={fileType} size={48} className="mx-auto mb-4" />
        <p className="font-medium text-gray-800 dark:text-gray-200">{file.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          File type: {fileType.toUpperCase()}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Uploaded on: {file.uploadDate}
        </p>
        <Button 
          className="mt-4 flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download size={16} />
          Download File
        </Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-3xl dark:bg-gray-900 dark:border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-medium dark:text-white flex items-center gap-2">
            <FileType type={file.type} size={20} />
            {file.name}
          </DialogTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="mt-4">{renderFileContent()}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FileViewer;
