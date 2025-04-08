
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileType } from "@/components/projects/FileType";
import { X } from "lucide-react";
import { Button } from "../ui/button";

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
  if (!file) return null;

  const renderFileContent = () => {
    const fileType = file.type.toLowerCase();
    
    // For image files
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
      // In a real app, this would be the actual file URL
      const mockImageUrl = `https://picsum.photos/800/600?random=${file.id}`;
      return (
        <div className="flex justify-center">
          <img 
            src={mockImageUrl} 
            alt={file.name} 
            className="max-w-full max-h-[70vh] object-contain rounded-md"
          />
        </div>
      );
    }
    
    // For PDF files
    if (fileType === 'pdf') {
      return (
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <FileType type={fileType} size={48} className="mx-auto mb-4" />
          <p className="font-medium text-gray-800">PDF Preview</p>
          <p className="text-sm text-gray-600 mt-2">
            This is where a PDF viewer would be embedded in a production app.
          </p>
        </div>
      );
    }
    
    // For other file types
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <FileType type={fileType} size={48} className="mx-auto mb-4" />
        <p className="font-medium text-gray-800">{file.name}</p>
        <p className="text-sm text-gray-600 mt-2">
          File type: {fileType.toUpperCase()}
        </p>
        <p className="text-sm text-gray-600">
          Uploaded on: {file.uploadDate}
        </p>
        <Button className="mt-4">Download File</Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">{file.name}</DialogTitle>
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
