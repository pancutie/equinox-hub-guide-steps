
import React from "react";
import { Button } from "@/components/ui/button";
import { FileType } from "@/components/projects/FileType";
import { X } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

interface DocumentGridProps {
  documents: Document[];
  onViewFile: (doc: Document) => void;
  onDeleteRequest: (id: string) => void;
}

const DocumentGrid: React.FC<DocumentGridProps> = ({ documents, onViewFile, onDeleteRequest }) => {
  if (documents.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
        <div className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-2">
          <FileType type="generic" size={64} />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">No files yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Upload your first file by clicking the button above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:text-purple-700 dark:hover:text-purple-400" 
              onClick={() => onViewFile(doc)}
            >
              <FileType type={doc.type} />
              <span className="font-medium dark:text-white">{doc.name}</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              onClick={() => onDeleteRequest(doc.id)}
            >
              <X size={16} />
            </Button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            <p>Type: {doc.type.toUpperCase()}</p>
            <p>Uploaded: {doc.uploadDate}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 w-full text-xs dark:border-gray-700 dark:text-gray-200"
            onClick={() => onViewFile(doc)}
          >
            View File
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DocumentGrid;
