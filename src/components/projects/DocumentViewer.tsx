
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentGrid from "./DocumentGrid";
import DocumentList from "./DocumentList";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

interface DocumentViewerProps {
  activeTab: string;
  viewMode: "grid" | "list";
  documents: Document[];
  onViewFile: (doc: Document) => void;
  onDeleteRequest: (id: string) => void;
  onTabChange: (value: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  activeTab, 
  viewMode, 
  documents, 
  onViewFile, 
  onDeleteRequest, 
  onTabChange 
}) => {
  return (
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
      <TabsList className="mb-4 bg-purple-50 dark:bg-purple-900/30">
        <TabsTrigger 
          value="documents" 
          className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-800 dark:data-[state=active]:text-white dark:text-gray-200"
        >
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="photos" 
          className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-800 dark:data-[state=active]:text-white dark:text-gray-200"
        >
          Photos
        </TabsTrigger>
        <TabsTrigger 
          value="other" 
          className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-800 dark:data-[state=active]:text-white dark:text-gray-200"
        >
          Other Files
        </TabsTrigger>
      </TabsList>
      
      {['documents', 'photos', 'other'].map((tabValue) => (
        <TabsContent key={tabValue} value={tabValue} className="mt-0">
          <div className="overflow-hidden border border-purple-100 dark:border-purple-800 rounded-lg">
            {viewMode === 'grid' ? (
              <DocumentGrid
                documents={documents}
                onViewFile={onViewFile}
                onDeleteRequest={onDeleteRequest}
              />
            ) : (
              <DocumentList
                documents={documents}
                onViewFile={onViewFile}
                onDeleteRequest={onDeleteRequest}
              />
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DocumentViewer;
