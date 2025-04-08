
import { useState, useEffect } from 'react';
import { overdueBooks, overdueEquipment } from '@/pages/Index';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DashboardNotifications = () => {
  const [notified, setNotified] = useState(false);
  const navigate = useNavigate();
  
  const totalOverdueItems = overdueBooks.length + overdueEquipment.length;
  
  // Show notifications only once when component mounts
  useEffect(() => {
    if (!notified && totalOverdueItems > 0) {
      setNotified(true);
      
      // Show subtle Sonner toast notification
      if (overdueBooks.length > 0) {
        toast.warning(`You have ${overdueBooks.length} overdue books`, {
          description: `These books need to be returned immediately.`,
          action: {
            label: "View Details",
            onClick: () => navigate('/reports/overdue-books'),
          },
          position: "top-right",
          duration: 5000,
        });
      }
      
      // Show equipment notification separately for clarity
      if (overdueEquipment.length > 0) {
        // Delay the second notification slightly for better UX
        setTimeout(() => {
          toast.warning(`You have ${overdueEquipment.length} overdue equipment items`, {
            description: `These equipment items need to be returned immediately.`,
            action: {
              label: "View Details",
              onClick: () => navigate('/reports/overdue-equipment'),
            },
            position: "top-right",
            duration: 5000,
          });
        }, 1000);
      }
    }
  }, [notified, totalOverdueItems, overdueBooks.length, overdueEquipment.length, navigate]);
  
  // Don't render anything in the main dashboard
  return null;
};

export default DashboardNotifications;
