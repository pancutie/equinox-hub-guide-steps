
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentGrid from "./DocumentGrid";
import DocumentList from "./DocumentList";
import FileViewer from "./FileViewer";

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
  const [selectedFile, setSelectedFile] = React.useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  // Handle file view
  const handleViewFile = (doc: Document) => {
    setSelectedFile(doc);
    setIsViewerOpen(true);
    onViewFile(doc); // Keep the original onViewFile for any additional logic
  };

  // Close the file viewer
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedFile(null);
  };

  return (
    <>
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
                  onViewFile={handleViewFile}
                  onDeleteRequest={onDeleteRequest}
                />
              ) : (
                <DocumentList
                  documents={documents}
                  onViewFile={handleViewFile}
                  onDeleteRequest={onDeleteRequest}
                />
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* File Viewer Component */}
      <FileViewer 
        isOpen={isViewerOpen} 
        onClose={handleCloseViewer} 
        file={selectedFile} 
      />
    </>
  );
};

export default DocumentViewer;
