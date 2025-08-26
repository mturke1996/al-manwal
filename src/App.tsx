import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginForm from "./LoginForm"; // استدعاء صفحة تسجيل الدخول

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // التحقق من وجود جلسة صالحة
  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (session.expiry > Date.now()) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("session");
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* صفحة تسجيل الدخول */}
            <Route path="/login" element={<LoginForm onLogin={() => setIsLoggedIn(true)} />} />

            {/* الصفحات المحمية */}
            <Route
              path="/"
              element={isLoggedIn ? <Index /> : <Navigate to="/login" />}
            />

            {/* أي مسار غير معروف */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;