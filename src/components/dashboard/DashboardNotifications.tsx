
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
        // Count ICS and PAR equipment separately
        const icsEquipment = overdueEquipment.filter(item => item.propertyNo.startsWith('E'));
        const parEquipment = overdueEquipment.filter(item => item.propertyNo.startsWith('P'));
        
        // Show ICS equipment notification
        if (icsEquipment.length > 0) {
          setTimeout(() => {
            toast.warning(`You have ${icsEquipment.length} overdue ICS equipment items`, {
              description: `These ICS equipment items need to be returned immediately.`,
              action: {
                label: "View Details",
                onClick: () => navigate('/reports/overdue-equipment-ics'),
              },
              position: "top-right",
              duration: 5000,
            });
          }, 1000);
        }
        
        // Show PAR equipment notification
        if (parEquipment.length > 0) {
          setTimeout(() => {
            toast.warning(`You have ${parEquipment.length} overdue PAR equipment items`, {
              description: `These PAR equipment items need to be returned immediately.`,
              action: {
                label: "View Details",
                onClick: () => navigate('/reports/overdue-equipment-par'),
              },
              position: "top-right",
              duration: 5000,
            });
          }, 2000);
        }
      }
    }
  }, [notified, totalOverdueItems, overdueBooks.length, overdueEquipment.length, navigate]);
  
  // Don't render anything in the main dashboard
  return null;
};

export default DashboardNotifications;
