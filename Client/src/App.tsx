import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Pages
import Index from "./pages/Index";
import Therapists from "./pages/Therapists";
import Blog from "./pages/Blog";
import ClientLogin from "./pages/ClientLogin";
import TherapistLogin from "./pages/TherapistLogin";
import ClientRegister from "./pages/ClientRegister";
import TherapistRegister from "./pages/TherapistRegister";
import ClientDashboard from "./pages/ClientDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import BookAppointment from "./pages/BookAppointment";
import VideoCall from "./pages/VideoCall";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/book" element={<BookAppointment />} />
            
            {/* Auth Routes */}
            <Route path="/login/client" element={<ClientLogin />} />
            <Route path="/login/therapist" element={<TherapistLogin />} />
            <Route path="/register/client" element={<ClientRegister />} />
            <Route path="/register/therapist" element={<TherapistRegister />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/therapist" element={<TherapistDashboard />} />
            
            {/* Video Call */}
            <Route path="/video-call" element={<VideoCall />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
