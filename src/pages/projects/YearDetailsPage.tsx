
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileViewer from "@/components/projects/FileViewer";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import DocumentViewer from "@/components/projects/DocumentViewer";
import ViewControls from "@/components/projects/ViewControls";
import UploadDialog from "@/components/projects/UploadDialog";
import { Document, ProjectFiles } from "@/types/project";

// Enhanced mock data for documents
const mockDocuments: ProjectFiles = {
  "documents": [
    { id: "doc1", name: "Research Proposal", type: "pdf", uploadDate: "2023-11-15" },
    { id: "doc2", name: "Budget Plan", type: "xlsx", uploadDate: "2023-11-20" },
    { id: "doc3", name: "Project Timeline", type: "docx", uploadDate: "2023-11-25" },
    { id: "doc4", name: "Requirements Document", type: "pdf", uploadDate: "2023-12-01" },
  ],
  "photos": [
    { id: "photo1", name: "Team Meeting", type: "jpg", uploadDate: "2023-12-05" },
    { id: "photo2", name: "Field Visit", type: "png", uploadDate: "2023-12-10" },
    { id: "photo3", name: "Workshop Session", type: "jpg", uploadDate: "2023-12-15" },
    { id: "photo4", name: "Project Site", type: "jpg", uploadDate: "2023-12-20" },
  ],
  "other": [
    { id: "other1", name: "Presentation Slides", type: "pptx", uploadDate: "2023-12-15" },
    { id: "other2", name: "Audio Recording", type: "mp3", uploadDate: "2023-12-18" },
    { id: "other3", name: "Video Demo", type: "mp4", uploadDate: "2023-12-22" },
    { id: "other4", name: "Code Repository", type: "zip", uploadDate: "2023-12-25" },
  ]
};

const YearDetailsPage = () => {
  const { projectType, year } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("documents");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments[activeTab]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // For file viewer
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  
  // For delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  const getProjectTypeName = () => {
    switch (projectType) {
      case "research": return "Research Projects";
      case "extension": return "Extension Projects";
      case "research-activities": return "Research Activities";
      case "extension-activities": return "Extension Activities";
      default: return "Projects";
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setDocuments(mockDocuments[value] || []);
  };

  const handleUpload = (name: string, file: File) => {
    // In a real app, you would upload the file to a server
    const newDoc: Document = {
      id: `doc${Math.random().toString(36).substring(2, 9)}`,
      name: name,
      type: file.name.split('.').pop() || "unknown",
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setDocuments([...documents, newDoc]);
    mockDocuments[activeTab] = [...(mockDocuments[activeTab] || []), newDoc];
    
    toast({
      title: "Success",
      description: "File uploaded successfully",
    });
    
    setIsUploadDialogOpen(false);
  };

  const handleDeleteRequest = (id: string) => {
    setDocumentToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (documentToDelete) {
      const updatedDocs = documents.filter(doc => doc.id !== documentToDelete);
      setDocuments(updatedDocs);
      mockDocuments[activeTab] = updatedDocs;
      
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      setDeleteConfirmOpen(false);
      setDocumentToDelete(null);
    }
  };
  
  const handleViewFile = (doc: Document) => {
    setSelectedDocument(doc);
    setIsFileViewerOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/projects/${projectType}`)}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-900 dark:hover:text-purple-300 dark:text-gray-200"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-300">
            {getProjectTypeName()} - {year}
          </h1>
        </div>

        <Card className="border border-purple-100 dark:border-purple-800 dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Project Resources</h2>
              
              <div className="flex items-center gap-2">
                <ViewControls viewMode={viewMode} setViewMode={setViewMode} />
                <UploadDialog 
                  isOpen={isUploadDialogOpen} 
                  onOpenChange={setIsUploadDialogOpen}
                  onUpload={handleUpload}
                />
              </div>
            </div>

            <DocumentViewer 
              activeTab={activeTab}
              viewMode={viewMode}
              documents={documents}
              onViewFile={handleViewFile}
              onDeleteRequest={handleDeleteRequest}
              onTabChange={handleTabChange}
            />
          </CardContent>
        </Card>
      </div>
      
      <FileViewer 
        isOpen={isFileViewerOpen}
        onClose={() => setIsFileViewerOpen(false)}
        file={selectedDocument}
      />
      
      <DeleteConfirmDialog 
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete File"
        description="Are you sure you want to delete this file? This action cannot be undone."
      />
    </MainLayout>
  );
};

export default YearDetailsPage;
