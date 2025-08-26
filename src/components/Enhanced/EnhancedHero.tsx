import {
  Plane,
  MapPin,
  Clock,
  Shield,
  Star,
  Globe2,
  Users,
  Award,
  FileText,
  Receipt,
} from "lucide-react";

interface EnhancedHeroProps {
  onInvoiceClick: () => void;
  onReceiptClick: () => void;
}

const EnhancedHero = ({
  onInvoiceClick,
  onReceiptClick,
}: EnhancedHeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* خلفية متحركة محسنة */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-40 h-20 sm:h-40 bg-blue-600 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 sm:bottom-32 right-16 sm:right-32 w-16 sm:w-32 h-16 sm:h-32 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-10 sm:w-20 h-10 sm:h-20 bg-emerald-500 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-8 sm:w-16 h-8 sm:h-16 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* الشعار الرئيسي والعنوان */}
        <div className="text-center mb-12 sm:mb-20 lg:mb-24">
          {/* شعار كبير محسن */}
          <div className="flex justify-center mb-6 sm:mb-10">
            <div className="relative group">
                              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl lg:rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-700 group-hover:rotate-3">
                  <Plane className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white transform -rotate-12 group-hover:rotate-12 transition-transform duration-700" />
                </div>
              {/* نقاط متحركة حول الشعار */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg"></div>
            </div>
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-cairo font-black text-gray-800 mb-4 sm:mb-6 lg:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
              شركة المنوال
            </span>
            <br />
            <span className="text-gray-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              للسفر والسياحة
            </span>
          </h1>

          {/* الوصف */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 font-cairo font-medium mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed px-4">
            رحلاتك تبدأ من هنا • خدمات متميزة • تجربة لا تُنسى
          </p>

          {/* أزرار الإجراءات الرئيسية */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16 px-4">
            <button
              onClick={onInvoiceClick}
              className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white font-cairo font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-indigo-900 transition-all duration-500 shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 sm:hover:-translate-y-3 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3 sm:gap-4">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                إنشاء فاتورة
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>

            <button
              onClick={onReceiptClick}
              className="w-full sm:w-auto group bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 text-white font-cairo font-bold text-base sm:text-lg lg:text-xl px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl hover:from-green-700 hover:to-emerald-900 transition-all duration-500 shadow-2xl hover:shadow-green-500/30 transform hover:-translate-y-1 sm:hover:-translate-y-3 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3 sm:gap-4">
                <Receipt className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                إنشاء وصل استلام
                <Award className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* المميزات المحسنة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-4">
          {[
            {
              icon: Globe2,
              title: "وجهات عالمية",
              desc: "أكثر من 200 وجهة حول العالم",
              color: "from-blue-500 to-cyan-600",
            },
            {
              icon: Users,
              title: "فريق محترف",
              desc: "خبراء السفر في خدمتكم",
              color: "from-emerald-500 to-teal-600",
            },
            {
              icon: Shield,
              title: "ضمان شامل",
              desc: "حماية كاملة لرحلاتكم",
              color: "from-purple-500 to-indigo-600",
            },
            {
              icon: Clock,
              title: "خدمة 24/7",
              desc: "دعم مستمر في أي وقت",
              color: "from-orange-500 to-red-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-4 border border-gray-100/50 hover:border-gray-200"
            >
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.color} mx-auto mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-cairo font-bold text-gray-800 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-cairo leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* النجوم التقييمية المحسنة */}
        <div className="text-center px-4">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 fill-current animate-pulse shadow-lg"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <p className="text-gray-600 font-cairo font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-4">
            تقييم ممتاز من عملائنا
          </p>
          <p className="text-gray-500 font-cairo font-medium text-sm sm:text-base lg:text-lg">
            أكثر من 10,000 عميل راضٍ عن خدماتنا
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
