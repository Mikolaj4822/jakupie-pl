import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/use-auth";
import { LanguageProvider } from "./hooks/use-language";
import { ThemeProvider } from "next-themes";
import AccessibilityPanel from "@/components/layout/accessibility-panel";

// Pages
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import BrowseAds from "@/pages/browse-ads";
import CreateAd from "@/pages/create-ad";
import AdDetails from "@/pages/ad-details";
import UserDashboard from "@/pages/user-dashboard";
import AdminPanel from "@/pages/admin-panel";
import HowItWorks from "@/pages/how-it-works";
import Support from "@/pages/support";
import HelpCenter from "@/pages/help-center";
import SafetyTips from "@/pages/safety-tips";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import RODOPolicy from "@/pages/rodo-policy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

// Layout components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/browse" component={BrowseAds} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/support" component={Support} />
          <Route path="/help-center" component={HelpCenter} />
          <Route path="/safety-tips" component={SafetyTips} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/rodo-policy" component={RODOPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/ads/:id">
            {(params) => <AdDetails id={parseInt(params.id)} />}
          </Route>
          <ProtectedRoute path="/create-ad" component={CreateAd} />
          <ProtectedRoute path="/dashboard" component={UserDashboard} />
          <ProtectedRoute path="/admin" component={AdminPanel} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      
      {/* Panel ułatwień dostępu - zawsze widoczny dla starszych osób */}
      <div className="fixed bottom-8 right-8 z-50 scale-125">
        <AccessibilityPanel />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
