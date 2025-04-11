
import React, { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, AlertCircle } from "lucide-react";

interface UploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (name: string, file: File) => void;
  activeTabLabel?: string;
  allowedFileTypes?: string[];
}

const UploadDialog: React.FC<UploadDialogProps> = ({ 
  isOpen, 
  onOpenChange, 
  onUpload,
  activeTabLabel = "Documents",
  allowedFileTypes = []
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      // Validate file type if allowedFileTypes is provided
      if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(fileExtension)) {
        setError(`Invalid file type. Only ${allowedFileTypes.join(', ')} files are allowed in ${activeTabLabel}.`);
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      // Set a default file name (without extension)
      setFileName(file.name.split('.')[0]);
      setError("");
    }
  };

  const handleUpload = () => {
    if (selectedFile && fileName.trim()) {
      onUpload(fileName.trim(), selectedFile);
      resetForm();
    } else if (!fileName.trim()) {
      setError("Please enter a name for the file");
    } else {
      setError("Please select a file to upload");
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setFileName("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  // Get a more user-friendly description for file types
  const getFileTypeDescription = () => {
    if (activeTabLabel === "PDF") {
      return "PDF documents";
    } else if (activeTabLabel === "Photos") {
      return "image files";
    } else if (activeTabLabel === "Documents") {
      return "document files";
    } else {
      return "files";
    }
  };

  return (
    <>
      <Button 
        onClick={() => onOpenChange(true)}
        className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
      >
        <Upload size={16} className="mr-2" />
        Upload File
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Upload {activeTabLabel}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file" className="dark:text-gray-300">
                Select {getFileTypeDescription()}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  accept={allowedFileTypes.map(type => `.${type}`).join(',')}
                />
              </div>
              {allowedFileTypes.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Allowed file types: {allowedFileTypes.join(', ')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-300">
                File name (without extension)
              </Label>
              <Input
                id="name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              Cancel
            </Button>
            <Button onClick={handleUpload} className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadDialog;
