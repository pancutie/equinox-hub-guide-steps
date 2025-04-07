
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from '@/hooks/use-toast';
import { overdueBooks, overdueEquipment } from '@/pages/Index';

// Combine notifications from different sources
const generateSystemNotifications = () => {
  const notifications = [];
  
  // Add notifications for overdue books
  overdueBooks.forEach(book => {
    notifications.push({
      id: `book-${book.id}`,
      message: `Overdue book: "${book.title}" by ${book.borrower}`,
      time: `${book.daysOverdue} days overdue`,
      read: false,
      type: 'overdue-book'
    });
  });
  
  // Add notifications for overdue equipment
  overdueEquipment.forEach(equipment => {
    notifications.push({
      id: `equipment-${equipment.id}`,
      message: `Overdue equipment: "${equipment.description}" by ${equipment.borrower}`,
      time: `${equipment.daysOverdue} days overdue`,
      read: false,
      type: 'overdue-equipment'
    });
  });
  
  // Add example system notifications
  const sysNotifications = [
    { id: "sys-1", message: "New equipment added to inventory", time: "2 minutes ago", read: false, type: 'system' },
    { id: "sys-2", message: "Equipment 'Projector' is due for maintenance", time: "1 hour ago", read: false, type: 'system' },
    { id: "sys-3", message: "Low stock alert: Laptops (only 2 remaining)", time: "3 hours ago", read: false, type: 'system' },
    { id: "sys-4", message: "System maintenance scheduled for tonight", time: "2 days ago", read: true, type: 'system' },
  ];
  
  return [...notifications, ...sysNotifications];
};

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState(() => generateSystemNotifications());
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Play notification sound when new notifications are added
  useEffect(() => {
    if (unreadCount > 0) {
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  }, []);
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "You have no unread notifications",
    });
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const handleNotificationClick = (notification: any) => {
    handleMarkAsRead(notification.id);
    
    // Navigate to appropriate page based on notification type
    if (notification.type === 'overdue-book') {
      window.location.href = '/reports/overdue-books';
    } else if (notification.type === 'overdue-equipment') {
      window.location.href = '/reports/overdue-equipment';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200"
        >
          <Bell size={18} className={unreadCount > 0 ? "animate-pulse" : ""} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-md">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 border-purple-200 shadow-xl rounded-xl overflow-hidden" 
        align="end"
        sideOffset={5}
      >
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 flex justify-between items-center">
          <h3 className="font-medium flex items-center gap-2">
            <Bell size={16} className="text-purple-200" />
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs text-white hover:bg-white/20 h-7 px-2"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto bg-gradient-to-b from-white to-purple-50">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 border-b border-purple-100 last:border-0 hover:bg-purple-50 transition-colors cursor-pointer ${
                  notification.read ? 'bg-white' : 'bg-purple-50'
                } ${
                  (notification.type === 'overdue-book' || notification.type === 'overdue-equipment') ? 
                  'border-l-2 border-l-red-500' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex justify-between">
                  <p className={`text-sm mb-1 ${notification.read ? 'font-normal text-gray-700' : 'font-medium text-purple-800'}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Bell size={24} className="mx-auto mb-2 text-gray-300" />
              No notifications
            </div>
          )}
        </div>
        <div className="p-2 border-t border-purple-100 bg-purple-50">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-purple-700 hover:bg-purple-100 text-xs"
            onClick={() => setOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
