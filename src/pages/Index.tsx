import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import Contact from "@/components/Contact";
import LoginForm from "@/components/LoginForm";
import EnhancedHeader from "@/components/Enhanced/EnhancedHeader";
import EnhancedHero from "@/components/Enhanced/EnhancedHero";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // تم تغييرها إلى true
  const [activeSection, setActiveSection] = useState<"invoice" | "receipt">(
    "invoice"
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection("invoice");
  };

  const handleInvoiceClick = () => {
    setActiveSection("invoice");
    document.getElementById("invoice")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReceiptClick = () => {
    setActiveSection("receipt");
    document.getElementById("invoice")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedHeader
        onInvoiceClick={handleInvoiceClick}
        onReceiptClick={handleReceiptClick}
        onLogout={handleLogout}
      />
      <EnhancedHero
        onInvoiceClick={handleInvoiceClick}
        onReceiptClick={handleReceiptClick}
      />
      <InvoiceGenerator />
      <Contact />
    </div>
  );
};

export default Index;
