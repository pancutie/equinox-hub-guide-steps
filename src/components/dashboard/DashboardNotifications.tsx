
import { useState } from 'react';
import { overdueBooks, overdueEquipment } from '@/pages/Index';
import { useToast } from "@/hooks/use-toast";
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

const DashboardNotifications = () => {
  const [notified, setNotified] = useState(false);
  const { toast: uiToast } = useToast();
  
  const totalOverdueItems = overdueBooks.length + overdueEquipment.length;
  
  // Show notifications only once when component mounts
  if (!notified && totalOverdueItems > 0) {
    setNotified(true);
    
    // Show subtle Sonner toast notification rather than a large card
    toast("Outstanding Items Notification", {
      description: `You have ${overdueBooks.length} overdue books and ${overdueEquipment.length} overdue equipment items.`,
      action: {
        label: "View Details",
        onClick: () => window.location.href = '/reports/overdue-books',
      },
      icon: <Bell className="h-5 w-5 text-amber-500" />,
      duration: 5000, // 5 seconds
    });
    
    // Play a soft notification sound
    const audio = new Audio('/notification.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
  
  // Don't render anything in the main dashboard
  return null;
};

export default DashboardNotifications;
