import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { WelcomeCard } from "@/components/WelcomeCard";
import { ActiveKitCard } from "@/components/ActiveKitCard";
import { SmartSuggestionsCard } from "@/components/SmartSuggestionsCard";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { UsageStatsCard } from "@/components/UsageStatsCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <Navigation />
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Welcome Section */}
            <WelcomeCard />
            
            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Active Kit Subscription */}
              <div className="md:col-span-2 xl:col-span-1">
                <ActiveKitCard />
              </div>
              
              {/* Smart Suggestions */}
              <div className="xl:col-span-1">
                <SmartSuggestionsCard />
              </div>
              
              {/* Quick Actions */}
              <div className="xl:col-span-1">
                <QuickActionsCard />
              </div>
              
              {/* Usage Statistics */}
              <div className="md:col-span-2 xl:col-span-3">
                <UsageStatsCard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
