
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

const ReportsPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-6">
        {/* Auto Generated Report */}
        <Card className="hover:shadow-md transition-shadow dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="text-indigo-600 dark:text-indigo-400 mb-2 dark:opacity-90">
              <FileText size={20} />
            </div>
            <CardTitle className="dark:text-white">Auto-Generated Report</CardTitle>
            <CardDescription className="dark:text-gray-300">
              View and export an auto-generated comprehensive report of all inventory and projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This report automatically compiles all the important information about your inventory, 
              including books, equipment, and project resources.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
              onClick={() => navigate('/reports/auto-report')}
            >
              Generate Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
