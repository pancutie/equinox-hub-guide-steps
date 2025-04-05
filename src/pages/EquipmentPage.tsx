
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, Database, Clipboard } from "lucide-react";

const EquipmentPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Handle search - in a real app would filter items
  const handleSearch = () => {
    if (searchTerm) {
      // Example: navigate to search results
      console.log(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-purple-800">Equipment Management</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <Input 
              placeholder="Search equipment..." 
              className="pl-10 border-purple-200 focus-visible:ring-purple-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="border border-purple-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white hover:bg-purple-50/50"
            onClick={() => navigate('/equipment/ics')}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 mt-2">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-purple-800 mb-2">Equipment / ICS</h2>
              <p className="text-gray-600 mb-4">
                Manage inventory custody slips for small equipment items.
              </p>
              <ul className="text-sm text-left w-full space-y-1 mb-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Quantity & Unit</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Description & Total Amount</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>Inventory Item No. & Estimated Useful Life</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  <span>RIS No. & ICS No.</span>
                </li>
              </ul>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 w-full">
                Manage ICS Equipment
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="border border-purple-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white hover:bg-purple-50/50"
            onClick={() => navigate('/equipment/par')}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4 mt-2">
                <Clipboard className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Equipment / PAR</h2>
              <p className="text-gray-600 mb-4">
                Manage property acknowledgment receipts for larger equipment items.
              </p>
              <ul className="text-sm text-left w-full space-y-1 mb-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                  <span>Property No. & Description</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                  <span>Quantity & Unit</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                  <span>Date Acquired & Amount</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>
                  <span>PAR No.</span>
                </li>
              </ul>
              <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 w-full">
                Manage PAR Equipment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EquipmentPage;
