
import { useState } from 'react';
import { Bell, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { overdueBooks, overdueEquipment } from '@/pages/Index';

const DashboardNotifications = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const totalOverdueItems = overdueBooks.length + overdueEquipment.length;
  
  if (!isVisible || totalOverdueItems === 0) return null;
  
  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-amber-700">Important Notifications</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-amber-700 hover:bg-amber-200/50 hover:text-amber-800"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {overdueBooks.length > 0 && (
            <div className="flex items-start gap-3 pb-2 animate-fade-in">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Overdue Books</h4>
                  <Badge variant="destructive" className="text-xs">{overdueBooks.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  You have {overdueBooks.length} overdue books that require attention.
                </p>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 mr-2"
                  >
                    Send Reminders
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    className="text-red-600 h-auto px-0"
                    onClick={() => window.location.href = '/reports/overdue-books'}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {overdueEquipment.length > 0 && (
            <div className="flex items-start gap-3 pb-2 border-t border-amber-200 pt-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Overdue Equipment</h4>
                  <Badge variant="destructive" className="text-xs bg-orange-500">{overdueEquipment.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  You have {overdueEquipment.length} overdue equipment items that require attention.
                </p>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50 mr-2"
                  >
                    Send Reminders
                  </Button>
                  <Button 
                    variant="link" 
                    size="sm"
                    className="text-orange-600 h-auto px-0"
                    onClick={() => window.location.href = '/reports/overdue-equipment'}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardNotifications;
