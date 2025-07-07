
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Submit from "./pages/Submit";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import Popular from "./pages/Popular";
import Newest from "./pages/Newest";
import Rankings from "./pages/Rankings";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import Recaps from "./pages/Recaps";
import Topics from "./pages/Topics";
import TopicPage from "./pages/TopicPage";
import ApiDocs from "./pages/ApiDocs";
import ApiKeyManagement from "./pages/ApiKeyManagement";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:userId?" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/newest" element={<Newest />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:id" element={<CollectionDetail />} />
              <Route path="/recaps" element={<Recaps />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topics/:topicSlug" element={<TopicPage />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="/api-keys" element={<ApiKeyManagement />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
