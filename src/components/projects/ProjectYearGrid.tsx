
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Plus, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ProjectYearGridProps {
  projectType: string;
  years: number[];
}

const ProjectYearGrid = ({ projectType, years: initialYears }: ProjectYearGridProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [years, setYears] = useState<number[]>(initialYears);
  const [isAddingYear, setIsAddingYear] = useState(false);
  const [newYear, setNewYear] = useState<string>("");

  const handleAddYear = () => {
    const yearNumber = parseInt(newYear, 10);
    
    if (isNaN(yearNumber)) {
      toast({
        title: "Invalid Year",
        description: "Please enter a valid year.",
        variant: "destructive"
      });
      return;
    }
    
    if (yearNumber < 1900 || yearNumber > 2100) {
      toast({
        title: "Invalid Year Range",
        description: "Please enter a year between 1900 and 2100.",
        variant: "destructive"
      });
      return;
    }
    
    if (years.includes(yearNumber)) {
      toast({
        title: "Year Already Exists",
        description: "This year already exists in the grid.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedYears = [...years, yearNumber].sort((a, b) => a - b);
    setYears(updatedYears);
    setIsAddingYear(false);
    setNewYear("");
    
    toast({
      title: "Year Added",
      description: `Year ${yearNumber} has been added successfully.`,
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {years.map((year) => (
        <motion.div key={year} variants={item}>
          <Card 
            className="p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-purple-50 to-white border-purple-100 group"
            onClick={() => navigate(`/projects/${projectType}/${year}`)}
          >
            <Calendar className="h-8 w-8 text-purple-500 mb-2 group-hover:text-purple-700 transition-colors" />
            <h3 className="text-xl font-bold text-purple-700 mb-1">{year}</h3>
            <p className="text-xs text-purple-500 group-hover:text-purple-700">
              View projects and upload files
            </p>
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 flex gap-1 items-center"
              >
                <Upload size={12} />
                Manage Files
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
      
      {isAddingYear ? (
        <motion.div variants={item}>
          <Card className="p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-purple-200 bg-white">
            <div className="space-y-3 w-full">
              <Input 
                className="border-purple-200 text-center"
                placeholder="Enter Year"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                type="number"
                min="1900"
                max="2100"
                autoFocus
              />
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={handleAddYear}
                >
                  Add
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1 border-purple-200"
                  onClick={() => setIsAddingYear(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div variants={item}>
          <Card 
            className="p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-all h-full border-2 border-dashed border-purple-200 hover:border-purple-400 bg-white"
            onClick={() => setIsAddingYear(true)}
          >
            <Plus className="h-8 w-8 text-purple-400 mb-2" />
            <h3 className="text-purple-500 font-medium">Add New Year</h3>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectYearGrid;
