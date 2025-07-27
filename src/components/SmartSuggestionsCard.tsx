import { Sparkles, TrendingUp, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import aiSuggestionsImage from "@/assets/ai-suggestions.jpg";

const suggestions = [
  {
    id: 1,
    text: "Add onions to your kit? Demand is 40% higher today! 📈",
    reason: "Market Trend",
    action: "Add to Kit",
    icon: TrendingUp,
  },
  {
    id: 2,
    text: "Perfect weather for Pakoda Kit! Rainy evening ahead ☔",
    reason: "Weather Alert",
    action: "Switch Kit",
    icon: Cloud,
  },
];

export const SmartSuggestionsCard = () => {
  const { toast } = useToast();
  const [appliedSuggestions, setAppliedSuggestions] = useState<number[]>([]);

  const handleSuggestionAction = (suggestion: typeof suggestions[0]) => {
    const isApplied = appliedSuggestions.includes(suggestion.id);
    
    if (isApplied) {
      toast({
        title: "Already Applied",
        description: "This suggestion has already been applied to your kit.",
      });
      return;
    }

    setAppliedSuggestions(prev => [...prev, suggestion.id]);
    
    toast({
      title: "Suggestion Applied!",
      description: `${suggestion.action} has been applied to your kit.`,
    });
  };

  const handleViewAllInsights = () => {
    toast({
      title: "AI Insights",
      description: "Loading detailed AI recommendations...",
    });
  };

  return (
    <Card className="shadow-card hover-lift border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={aiSuggestionsImage} 
              alt="AI Suggestions" 
              className="w-full h-full object-cover"
            />
          </div>
          AI Smart Suggestions
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 animate-pulse">
            <Sparkles className="h-3 w-3 mr-1" />
            AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => {
          const isApplied = appliedSuggestions.includes(suggestion.id);
          return (
            <div key={suggestion.id} className={`bg-accent/5 rounded-lg p-4 border border-accent/10 transition-all duration-200 ${isApplied ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <suggestion.icon className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">{suggestion.text}</p>
                  <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                    {suggestion.reason}
                  </Badge>
                </div>
                <Button 
                  variant={isApplied ? "secondary" : "outline"} 
                  size="sm" 
                  className={`border-accent/20 transition-all duration-200 ${
                    isApplied 
                      ? 'bg-success/20 border-success/20 text-success hover:bg-success/30' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => handleSuggestionAction(suggestion)}
                  disabled={isApplied}
                >
                  {isApplied ? '✓ Applied' : suggestion.action}
                </Button>
              </div>
            </div>
          );
        })}
        
        <div className="text-center pt-2">
          <Button 
            variant="vibrant" 
            size="sm" 
            className="w-full"
            onClick={handleViewAllInsights}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            View All AI Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};