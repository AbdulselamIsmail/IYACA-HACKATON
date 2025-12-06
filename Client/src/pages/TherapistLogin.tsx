import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Mail, Lock, ArrowLeft, Eye, EyeOff, Users } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const TherapistLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Send Login Request
      const { data } = await api.post("/auth/login", { email, password });

      // 2. Security Check: Is this user actually a Therapist?
      if (data.role !== "doctor") {
        toast.error("Bu panel sadece terapistler içindir.");
        setIsLoading(false);
        return;
      }

      // 3. Save Token
      localStorage.setItem("token", data.token);

      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");

      // 4. Redirect to Therapist Dashboard
      setTimeout(() => {
        navigate("/dashboard/therapist");
      }, 500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Giriş başarısız.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Terapist Girişi - VolunTherapy</title>
        <meta
          name="description"
          content="VolunTherapy'ye terapist olarak giriş yapın."
        />
      </Helmet>

      <div className="flex min-h-screen">
        {/* Left Side - Decorative */}
        <div className="hidden bg-gradient-to-br from-primary/10 via-secondary to-accent/50 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:p-12">
          <div className="max-w-md text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-float">
                <Users className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Gönüllü Ekibimize Hoş Geldiniz
            </h2>
            <p className="text-muted-foreground">
              Profesyonel bilgi ve deneyiminizle topluma değer katıyorsunuz.
              Giriş yaparak randevularınızı yönetebilir, danışanlarınıza destek
              olabilirsiniz.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            {/* Back Link */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>

            {/* Logo */}
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Volun<span className="text-primary">Therapy</span>
                </span>
              </Link>
            </div>

            {/* Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">
                Terapist Girişi
              </h1>
              <p className="mt-2 text-muted-foreground">
                Hesabınıza giriş yaparak danışanlarınızı yönetin.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">E-posta Adresi</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    // ... other props ...
                    value={email} // <--- ADD THIS
                    onChange={(e) => setEmail(e.target.value)} // <--- ADD THIS
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Şifre</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    // ... other props ...
                    value={password} // <--- ADD THIS
                    onChange={(e) => setPassword(e.target.value)} // <--- ADD THIS
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword ? "Şifreyi gizle" : "Şifreyi göster"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Beni hatırla
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Şifremi Unuttum
                </Link>
              </div>

              <Button
                type="submit"
                variant="therapeutic"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Hesabınız yok mu?{" "}
              <Link
                to="/register/therapist"
                className="text-primary hover:underline font-medium"
              >
                Terapist Olarak Kayıt Olun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TherapistLogin;
