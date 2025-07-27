import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { SupplierAnalytics } from "@/components/SupplierAnalytics";

const SupplierAnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block">
            <Navigation />
          </aside>
          
          <main className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Detailed insights and performance metrics
              </p>
            </div>

            <SupplierAnalytics />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SupplierAnalyticsPage;