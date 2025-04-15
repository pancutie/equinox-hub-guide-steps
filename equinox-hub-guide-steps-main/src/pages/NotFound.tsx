
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FileSearch } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto border border-purple-100">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
            <FileSearch size={48} className="text-purple-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-purple-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-md transition-all"
        >
          Return to Dashboard
        </Button>
        <p className="mt-6 text-sm text-gray-500">
          Path: {location.pathname}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
