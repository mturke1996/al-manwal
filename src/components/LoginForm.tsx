import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Plane } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (success: boolean) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // المستخدم الوحيد
  const validUser = {
    username: "Ayoub",
    password: "11223344",
  };

  // التحقق من وجود جلسة سابقة
  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (session.expiry > Date.now()) {
        onLogin(true); // دخول مباشر
      } else {
        localStorage.removeItem("session"); // انتهت الصلاحية
      }
    }
  }, [onLogin]);

  const handleLogin = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === validUser.username && password === validUser.password) {
      // حفظ الجلسة ليوم كامل
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(
        "session",
        JSON.stringify({ username: validUser.username, expiry })
      );

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في نظام شركة المنوال",
      });
      onLogin(true);
    } else {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "اسم المستخدم أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-500 rounded-full animate-ping"></div>
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-xl">
                <img
                  src="/company-logo.svg"
                  alt="شعار شركة المنوال"
                  className="w-20 h-20 rounded-lg"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="text-2xl font-cairo font-bold text-gray-800 mb-2">
            تسجيل الدخول
          </CardTitle>
          <p className="text-gray-600 font-cairo">
            نظام إدارة شركة المنوال للسفر والسياحة
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3">
              <User size={18} className="text-blue-600" />
              اسم المستخدم
            </Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              className="font-cairo h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
            />
          </div>

          <div>
            <Label className="text-gray-700 font-cairo font-medium flex items-center gap-2 mb-3">
              <Lock size={18} className="text-blue-600" />
              كلمة المرور
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className="font-cairo h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-cairo font-semibold hover:from-blue-700 hover:to-blue-800 h-14 text-lg rounded-xl shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                جاري التحقق...
              </div>
            ) : (
              <>
                <Plane className="ml-2" size={20} />
                دخول
              </>
            )}
          </Button>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-cairo">
              للاستفسار: 0913031006
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;