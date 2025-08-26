
import { Plane, MapPin, Clock, Shield, Star, Globe2 } from 'lucide-react';

const Hero = () => {
  const scrollToInvoice = () => {
    document.getElementById('invoice')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-24 overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* الشعار الرئيسي والعنوان */}
        <div className="text-center mb-20">
          {/* شعار كبير */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <Plane className="w-14 h-14 text-white transform -rotate-12 group-hover:rotate-12 transition-transform duration-700" />
              </div>
              {/* نقاط متحركة حول الشعار */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 -right-6 w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* العنوان الرئيسي */}
          <h1 className="text-5xl md:text-7xl font-cairo font-black text-gray-800 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
              شركة المنوال
            </span>
            <br />
            <span className="text-gray-700 text-4xl md:text-5xl font-bold">
              للسفر والسياحة
            </span>
          </h1>
          
          {/* الوصف */}
          <p className="text-xl md:text-2xl text-gray-600 font-cairo font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            رحلات استثنائية • خدمات متميزة • أسعار منافسة
          </p>

          {/* زر الانتقال */}
          <button
            onClick={scrollToInvoice}
            className="group bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white font-cairo font-bold text-lg px-12 py-5 rounded-2xl hover:from-blue-700 hover:to-indigo-900 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              ابدأ العمل الآن
              <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Globe2,
              title: "وجهات متنوعة",
              desc: "أفضل الوجهات السياحية",
              color: "from-blue-500 to-cyan-600"
            },
            {
              icon: Clock,
              title: "خدمة مستمرة",
              desc: "متاحون على مدار الساعة",
              color: "from-emerald-500 to-teal-600"
            },
            {
              icon: Shield,
              title: "ضمان الجودة",
              desc: "خدمات موثوقة ومضمونة",
              color: "from-purple-500 to-indigo-600"
            }
          ].map((feature, index) => (
            <div key={index} className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100/50">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-cairo font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 font-cairo leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* النجوم التقييمية */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-500 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <p className="text-gray-600 font-cairo font-medium text-lg">
            خدمات متميزة وموثوقة منذ سنوات
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
