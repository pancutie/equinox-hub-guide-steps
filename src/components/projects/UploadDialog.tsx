
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Plus } from "lucide-react";
import { FileType } from "./FileType";

interface UploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (name: string, file: File) => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({ isOpen, onOpenChange, onUpload }) => {
  const [documentName, setDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleUpload = () => {
    if (documentName && selectedFile) {
      onUpload(documentName, selectedFile);
      setDocumentName("");
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800">
          <Upload size={16} className="mr-1" />
          Upload New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Upload Document</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Upload a new document, photo or file to the project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="dark:text-white">Document Name</Label>
            <Input
              id="name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Enter document name"
              className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="file" className="dark:text-white">File</Label>
            <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <Input
                id="file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md border-gray-300 hover:border-purple-400 dark:border-gray-700 dark:hover:border-purple-600 cursor-pointer"
                onClick={() => document.getElementById('file')?.click()}
              >
                {selectedFile ? (
                  <div className="text-center">
                    <FileType type={selectedFile.name.split('.').pop() || 'unknown'} size={32} className="mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(selectedFile.size / 1024)} KB</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Plus className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Click to select a file</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-gray-700 dark:text-white">Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
