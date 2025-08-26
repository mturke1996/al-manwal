import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-t from-blue-900 to-blue-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cairo font-bold text-white mb-4">
            اتصل بنا
          </h2>
          <p className="text-xl text-gray-300 font-cairo">
            نحن هنا لخدمتك في أي وقت
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm text-center hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <Phone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-cairo font-semibold mb-2 text-white">
                الهاتف
              </h3>
              <p className="text-gray-300 font-cairo">+218-913031006</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm text-center hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-cairo font-semibold mb-2 text-white">
                البريد الإلكتروني
              </h3>
              <p className="text-gray-300 font-cairo">
                info@almanwal-travel.ly
              </p>
              <p className="text-gray-300 font-cairo">
                booking@almanwal-travel.ly
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm text-center hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-cairo font-semibold mb-2 text-white">
                العنوان
              </h3>
              <p className="text-gray-300 font-cairo">شارع اولاد التركي</p>
              <p className="text-gray-300 font-cairo">تاجوراء-طرابلس ليبيا</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm text-center hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6">
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-cairo font-semibold mb-2 text-white">
                ساعات العمل
              </h3>
              <p className="text-gray-300 font-cairo">السبت - الجمعه</p>
              <p className="text-gray-300 font-cairo">
                {" "}
                من 10:00 صباحا الي 10:00 مساءا
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
