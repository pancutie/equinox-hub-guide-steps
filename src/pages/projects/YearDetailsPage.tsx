
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Upload, FileText, Image, File, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

// Mock data for documents
const mockDocuments: Record<string, Document[]> = {
  "documents": [
    { id: "doc1", name: "Research Proposal", type: "pdf", uploadDate: "2023-11-15" },
    { id: "doc2", name: "Budget Plan", type: "xlsx", uploadDate: "2023-11-20" },
  ],
  "photos": [
    { id: "photo1", name: "Team Meeting", type: "jpg", uploadDate: "2023-12-05" },
    { id: "photo2", name: "Field Visit", type: "png", uploadDate: "2023-12-10" },
  ],
  "other": [
    { id: "other1", name: "Presentation Slides", type: "pptx", uploadDate: "2023-12-15" },
  ]
};

const YearDetailsPage = () => {
  const { projectType, year } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("documents");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments[activeTab]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleUpload = () => {
    if (!newDocumentName || !selectedFile) {
      toast({
        title: "Error",
        description: "Please provide both a name and a file",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would upload the file to a server
    const newDoc: Document = {
      id: `doc${Math.random().toString(36).substring(2, 9)}`,
      name: newDocumentName,
      type: selectedFile.name.split('.').pop() || "unknown",
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setDocuments([...documents, newDoc]);
    mockDocuments[activeTab] = [...(mockDocuments[activeTab] || []), newDoc];
    
    toast({
      title: "Success",
      description: "File uploaded successfully",
    });
    
    setIsUploadDialogOpen(false);
    setNewDocumentName("");
    setSelectedFile(null);
  };

  const handleDelete = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    mockDocuments[activeTab] = updatedDocs;
    
    toast({
      title: "Success",
      description: "File deleted successfully",
    });
  };

  const getFileIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf': return <FileText className="text-red-500" />;
      case 'jpg':
      case 'jpeg': 
      case 'png': 
      case 'gif': return <Image className="text-blue-500" />;
      default: return <File className="text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/projects/${projectType}`)}
            className="border-purple-200 hover:bg-purple-50 hover:text-purple-700"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-purple-800">
            {getProjectTypeName()} - {year}
          </h1>
        </div>

        <Card className="border border-purple-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-700">Project Resources</h2>
              
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700">
                    <Upload size={16} className="mr-1" />
                    Upload New
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                      Upload a new document, photo or file to the project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Document Name</Label>
                      <Input
                        id="name"
                        value={newDocumentName}
                        onChange={(e) => setNewDocumentName(e.target.value)}
                        placeholder="Enter document name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="file">File</Label>
                      <div className="border rounded-md p-2 bg-gray-50">
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
                        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md border-gray-300 hover:border-purple-400 cursor-pointer"
                          onClick={() => document.getElementById('file')?.click()}
                        >
                          {selectedFile ? (
                            <div className="text-center">
                              <p className="text-sm text-gray-600">{selectedFile.name}</p>
                              <p className="text-xs text-gray-500">{Math.round(selectedFile.size / 1024)} KB</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Plus className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="text-sm text-gray-600">Click to select a file</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="documents" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="mb-4 bg-purple-50">
                <TabsTrigger value="documents" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">Documents</TabsTrigger>
                <TabsTrigger value="photos" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">Photos</TabsTrigger>
                <TabsTrigger value="other" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800">Other Files</TabsTrigger>
              </TabsList>
              
              {['documents', 'photos', 'other'].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents && documents.length > 0 ? (
                      documents.map((doc) => (
                        <div key={doc.id} className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {getFileIcon(doc.type)}
                              <span className="font-medium">{doc.name}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                              onClick={() => handleDelete(doc.id)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            <p>Type: {doc.type.toUpperCase()}</p>
                            <p>Uploaded: {doc.uploadDate}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-8 text-center">
                        <File className="h-16 w-16 text-gray-300 mb-2" />
                        <h3 className="text-lg font-medium text-gray-900">No files yet</h3>
                        <p className="text-gray-500">Upload your first file by clicking the button above.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default YearDetailsPage;
