import { Plane, FileText, Receipt, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

interface EnhancedHeaderProps {
  onInvoiceClick: () => void;
  onReceiptClick: () => void;
  onLogout?: () => void;
}

const EnhancedHeader = ({
  onInvoiceClick,
  onReceiptClick,
  onLogout,
}: EnhancedHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100/50 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* الشعار واسم الشركة */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-cairo font-black text-gray-800 tracking-tight leading-tight">
                شركة المنوال للسفر والسياحة
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-0.5"></div>
            </div>
          </div>

          {/* أزرار سطح المكتب */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onInvoiceClick}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white font-cairo font-medium px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                إنشاء فاتورة
              </span>
            </button>

            <button
              onClick={onReceiptClick}
              className="group bg-gradient-to-r from-green-600 to-green-700 text-white font-cairo font-medium px-3 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                إنشاء وصل استلام
              </span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                className="group bg-gradient-to-r from-red-500 to-red-600 text-white font-cairo font-medium px-3 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  خروج
                </span>
              </button>
            )}
          </div>

          {/* زر القائمة للهاتف */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* القائمة المحمولة */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100">
            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={() => {
                  onInvoiceClick();
                  setIsMobileMenuOpen(false);
                }}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white font-cairo font-medium px-3 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  إنشاء فاتورة
                </span>
              </button>

              <button
                onClick={() => {
                  onReceiptClick();
                  setIsMobileMenuOpen(false);
                }}
                className="group bg-gradient-to-r from-green-600 to-green-700 text-white font-cairo font-medium px-3 py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md text-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <Receipt className="w-4 h-4" />
                  إنشاء وصل استلام
                </span>
              </button>

              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="group bg-gradient-to-r from-red-500 to-red-600 text-white font-cairo font-medium px-3 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md text-sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
