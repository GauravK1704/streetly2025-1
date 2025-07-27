import { useState } from 'react';
import { Bell, Check, Clock, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Kit Delivery Tomorrow',
    message: "Tomorrow's kit delivery is scheduled for 8 AM",
    timestamp: '2 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Onion supply is running low. Consider ordering a refill.',
    timestamp: '4 hours ago',
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Order Confirmed',
    message: 'Your Samosa Kit order has been confirmed',
    timestamp: '1 day ago',
    read: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'Festival Special',
    message: 'New Diwali special kits now available!',
    timestamp: '2 days ago',
    read: true,
    type: 'info'
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'success': return <Check className="h-4 w-4 text-success" />;
    case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default: return <Info className="h-4 w-4 text-primary" />;
  }
};

export const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-popover border z-50">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="h-auto p-1 text-xs"
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-64">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-3 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3 w-full">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{notification.title}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {notification.timestamp}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-primary cursor-pointer">
          See All Notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};