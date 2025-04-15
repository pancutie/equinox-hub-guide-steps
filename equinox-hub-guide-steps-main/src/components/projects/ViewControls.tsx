
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid2x2, LayoutList } from "lucide-react";

interface ViewControlsProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center border rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 border-purple-200 dark:border-purple-800">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`h-8 px-3 rounded-none ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-300'}`} 
        onClick={() => setViewMode('grid')}
      >
        <Grid2x2 size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`h-8 px-3 rounded-none ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 dark:text-gray-300'}`} 
        onClick={() => setViewMode('list')}
      >
        <LayoutList size={16} />
      </Button>
    </div>
  );
};

export default ViewControls;
