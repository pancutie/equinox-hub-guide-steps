
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Check, AlertTriangle, Database } from "lucide-react";

const ReportsPage = () => {
  const navigate = useNavigate();

  const reportCards = [
    {
      title: "Available Books",
      description: "View all books that are currently available for borrowing",
      icon: <Book size={20} />,
      path: "/reports/available-books",
      color: "text-blue-600"
    },
    {
      title: "Borrowed Books",
      description: "View all books that are currently borrowed by students",
      icon: <Check size={20} />,
      path: "/reports/borrowed-books",
      color: "text-green-600"
    },
    {
      title: "Overdue Books",
      description: "View all books that are overdue for return",
      icon: <AlertTriangle size={20} />,
      path: "/reports/overdue-books",
      color: "text-red-600"
    },
    {
      title: "Available Equipment",
      description: "View all equipment that are currently available for borrowing",
      icon: <Database size={20} />,
      path: "/reports/available-equipment",
      color: "text-purple-600"
    },
    {
      title: "Borrowed Equipment",
      description: "View all equipment that are currently borrowed by students",
      icon: <Check size={20} />,
      path: "/reports/borrowed-equipment",
      color: "text-teal-600"
    },
    {
      title: "Overdue Equipment",
      description: "View all equipment that are overdue for return",
      icon: <AlertTriangle size={20} />,
      path: "/reports/overdue-equipment",
      color: "text-orange-600"
    }
  ];

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className={`${card.color} mb-2`}>{card.icon}</div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
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
