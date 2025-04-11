
import React from "react";
import { Button } from "@/components/ui/button";
import { FileType } from "@/components/projects/FileType";
import { X, Download } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

interface DocumentListProps {
  documents: Document[];
  onViewFile: (doc: Document) => void;
  onDeleteRequest: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onViewFile, onDeleteRequest }) => {
  if (documents.length === 0) {
    return (
      <table className="min-w-full divide-y divide-purple-200 dark:divide-purple-800">
        <thead className="bg-purple-50 dark:bg-purple-900/30">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-purple-100 dark:divide-purple-800">
          <tr>
            <td colSpan={4} className="px-6 py-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-2">
                  <FileType type="generic" size={48} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300">No files yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Upload your first file by clicking the button above.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="min-w-full divide-y divide-purple-200 dark:divide-purple-800">
      <thead className="bg-purple-50 dark:bg-purple-900/30">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Type</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-purple-100 dark:divide-purple-800">
        {documents.map((doc) => (
          <tr key={doc.id} className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <FileType type={doc.type} size={20} />
                <button 
                  className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={() => onViewFile(doc)}
                >
                  {doc.name}
                </button>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{doc.type.toUpperCase()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{doc.uploadDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  onClick={() => onViewFile(doc)}
                >
                  <Download size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                  onClick={() => onDeleteRequest(doc.id)}
                >
                  <X size={16} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentList;
