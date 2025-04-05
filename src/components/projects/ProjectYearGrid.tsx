
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectYearGridProps {
  projectType: string;
  years: number[];
}

const ProjectYearGrid = ({ projectType, years }: ProjectYearGridProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {years.map((year) => (
        <Card 
          key={year} 
          className="cursor-pointer hover:shadow-md transition-shadow border border-purple-100 hover:border-purple-300"
          onClick={() => navigate(`/projects/${projectType}/${year}`)}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-purple-100 p-3 mb-2">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-800">{year}</h3>
            <p className="text-sm text-gray-500 mt-1">View documents</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectYearGrid;
