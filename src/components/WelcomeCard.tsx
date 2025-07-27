import { Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface WelcomeCardProps {
  vendorName?: string;
  location?: string;
}

export const WelcomeCard = ({ 
  vendorName = "Rajesh Bhai", 
  location = "Connaught Place, Delhi" 
}: WelcomeCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Card className="gradient-warm text-primary-foreground shadow-warm hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {getGreeting()}, {vendorName}! 🙏
            </h1>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-primary-foreground/90 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Live Time</span>
            </div>
            <div className="text-lg font-semibold">
              {currentTime.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};