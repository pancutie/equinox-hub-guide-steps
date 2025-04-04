
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
      className={`${bgColor} relative shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border-none group h-32`}
      onClick={() => navigate(linkTo)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 to-white/20 transition-opacity duration-300"></div>
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl transform group-hover:scale-125 transition-transform duration-500"></div>
      <CardHeader className="pb-0 pt-3">
        <div className="flex justify-between items-center">
          <CardTitle className={`text-sm font-medium ${textColor}`}>{title}</CardTitle>
          <div className={`${textColor} p-2 rounded-full bg-white/20 transform group-hover:rotate-12 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className={`text-2xl font-bold ${textColor} transform transition-all duration-300 group-hover:scale-110`}>{count.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="pt-0 pb-3">
        <p className={`text-xs ${textColor} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>Click to view details</p>
      </CardFooter>
      
      {/* Animated Border Bottom */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-white/30 group-hover:w-full transition-all duration-500"></div>
    </Card>
  );
};

export default DashboardCard;
