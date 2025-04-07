
import { useState, useEffect } from 'react';
import { overdueBooks, overdueEquipment } from '@/pages/Index';
import { useToast } from "@/hooks/use-toast";
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

const DashboardNotifications = () => {
  const [notified, setNotified] = useState(false);
  const { toast: uiToast } = useToast();
  
  const totalOverdueItems = overdueBooks.length + overdueEquipment.length;
  
  // Show notifications only once when component mounts
  useEffect(() => {
    if (!notified && totalOverdueItems > 0) {
      setNotified(true);
      
      // Show subtle Sonner toast notification
      toast.info(`You have ${totalOverdueItems} overdue items`, {
        description: `${overdueBooks.length} books and ${overdueEquipment.length} equipment items are overdue.`,
        action: {
          label: "View Details",
          onClick: () => window.location.href = '/reports/overdue-books',
        },
        position: "top-right",
        duration: 4000,
      });
      
      // Play a soft notification sound
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.2; // Reduce volume
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [notified, totalOverdueItems, overdueBooks.length, overdueEquipment.length]);
  
  // Don't render anything in the main dashboard
  return null;
};

export default DashboardNotifications;
