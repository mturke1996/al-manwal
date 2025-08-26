import { Plane } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            {/* شعار الشركة */}
            <div className="relative">
              <img
                src="/company-logo.svg"
                alt="شعار شركة المنوال"
                className="w-20 h-20 rounded-xl shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>

            {/* اسم الشركة */}
            <div className="text-center">
              <h1 className="text-2xl font-cairo font-black text-gray-800 tracking-tight">
                شركة المنوال للسفر والسياحة
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
