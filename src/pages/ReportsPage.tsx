
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Check, AlertTriangle, Database, Clipboard, FileText } from "lucide-react";

const ReportsPage = () => {
  const navigate = useNavigate();

  const reportCards = [
    // Auto Generated Report
    {
      title: "Auto-Generated Report",
      description: "View and export an auto-generated report of all inventory and projects",
      icon: <FileText size={20} />,
      path: "/reports/auto-report",
      color: "text-indigo-600 dark:text-indigo-400"
    },
    
    // Books Reports
    {
      title: "Available Books",
      description: "View all books that are currently available for borrowing",
      icon: <Book size={20} />,
      path: "/reports/available-books",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Borrowed Books",
      description: "View all books that are currently borrowed by students",
      icon: <Check size={20} />,
      path: "/reports/borrowed-books",
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Overdue Books",
      description: "View all books that are overdue for return",
      icon: <AlertTriangle size={20} />,
      path: "/reports/overdue-books",
      color: "text-red-600 dark:text-red-400"
    },
    
    // Equipment ICS Reports
    {
      title: "Available Equipment ICS",
      description: "View all ICS equipment that are currently available for borrowing",
      icon: <Database size={20} />,
      path: "/reports/available-equipment-ics",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Borrowed Equipment ICS",
      description: "View all ICS equipment that are currently borrowed by students",
      icon: <Check size={20} />,
      path: "/reports/borrowed-equipment-ics",
      color: "text-teal-600 dark:text-teal-400"
    },
    {
      title: "Overdue Equipment ICS",
      description: "View all ICS equipment that are overdue for return",
      icon: <AlertTriangle size={20} />,
      path: "/reports/overdue-equipment-ics",
      color: "text-orange-600 dark:text-orange-400"
    },
    
    // Equipment PAR Reports
    {
      title: "Available Equipment PAR",
      description: "View all PAR equipment that are currently available for borrowing",
      icon: <Clipboard size={20} />,
      path: "/reports/available-equipment-par",
      color: "text-indigo-600 dark:text-indigo-400"
    },
    {
      title: "Borrowed Equipment PAR",
      description: "View all PAR equipment that are currently borrowed by students",
      icon: <Check size={20} />,
      path: "/reports/borrowed-equipment-par",
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Overdue Equipment PAR",
      description: "View all PAR equipment that are overdue for return",
      icon: <AlertTriangle size={20} />,
      path: "/reports/overdue-equipment-par",
      color: "text-rose-600 dark:text-rose-400"
    }
  ];

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className={`${card.color} mb-2 dark:opacity-90`}>{card.icon}</div>
              <CardTitle className="dark:text-white">{card.title}</CardTitle>
              <CardDescription className="dark:text-gray-300">{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-600"
                onClick={() => navigate(card.path)}
              >
                View Report
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
