
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  linkTo: string;
  bgColor?: string;
  textColor?: string;
}

const DashboardCard = ({
  title,
  count,
  icon,
  linkTo,
  bgColor = "bg-white",
  textColor = "text-gray-800"
}: DashboardCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className={`${bgColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-none`}
      onClick={() => navigate(linkTo)}
    >
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className={`text-lg font-medium ${textColor}`}>{title}</CardTitle>
          <div className="text-primary p-2 rounded-full bg-primary/10">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-4xl font-bold ${textColor}`}>{count}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <p className={`text-sm ${textColor} opacity-80`}>Click to view details</p>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
