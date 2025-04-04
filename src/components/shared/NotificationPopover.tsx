
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock notifications data
const initialNotifications = [
  { id: 1, message: "New equipment added to inventory", time: "2 minutes ago", read: false },
  { id: 2, message: "Equipment 'Projector' is due for maintenance", time: "1 hour ago", read: false },
  { id: 3, message: "Low stock alert: Laptops (only 2 remaining)", time: "3 hours ago", read: false },
  { id: 4, message: "Overdue return: 3D Printer", time: "1 day ago", read: true },
  { id: 5, message: "System maintenance scheduled for tonight", time: "2 days ago", read: true },
];

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-purple-200 hover:bg-purple-50 hover:text-purple-700">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-t-md flex justify-between items-center">
          <h3 className="font-medium">Notifications</h3>
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
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div 
                key={notification.id}
                className={`p-3 border-b last:border-0 hover:bg-purple-50 transition-colors ${notification.read ? 'bg-white' : 'bg-purple-50'}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex justify-between">
                  <p className={`text-sm mb-1 ${notification.read ? 'font-normal' : 'font-medium'}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No notifications
            </div>
          )}
        </div>
        <div className="p-2 border-t bg-purple-50">
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
