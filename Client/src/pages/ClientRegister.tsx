import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import mockData from "@/data/mockData.json";
import api from "@/lib/api";

const ClientRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedKvkk, setAcceptedKvkk] = useState(false);
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    sex: "male", // Default value (required by backend)
    age: "", // Optional but good to have
    role: "patient", // Hardcoded for this specific page
  });

  // Helper to update state
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedKvkk) {
      toast.error("KVKK metnini kabul etmeniz gerekmektedir.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Send Registration Request
      // We send formData which contains: name, email, password, sex, age, role
      const { data } = await api.post("/auth/register", formData);

      // 2. Success!
      toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");

      // 3. Redirect to Login
      setTimeout(() => {
        navigate("/login/client");
      }, 1000);
    } catch (error: any) {
      console.error(error);
      // Show specific error (e.g., "User already exists" or "Password too weak")
      toast.error(error.response?.data?.msg || "Kayıt başarısız.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Danışan Kaydı - VolunTherapy</title>
        <meta
          name="description"
          content="VolunTherapy'ye danışan olarak kayıt olun ve ücretsiz psikolojik destek alın."
        />
      </Helmet>

      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            {/* Back Link */}
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>

            {/* Logo */}
            <div className="mb-6">
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Danışan Kaydı
              </h1>
              <p className="mt-2 text-muted-foreground">
                Hesap oluşturarak ücretsiz psikolojik destek almaya başlayın.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Ad Soyad</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    className="pl-10"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-posta Adresi</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-10"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Telefon (Opsiyonel)</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0555 123 45 67"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* --- NEW SEX FIELD --- */}
              <div>
                <Label htmlFor="sex">Cinsiyet</Label>
                <div className="relative mt-1.5">
                  <Select
                    value={formData.sex}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sex: value })
                    }
                  >
                    <SelectTrigger className="pl-10">
                      <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Cinsiyet Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Erkek</SelectItem>
                      <SelectItem value="female">Kadın</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="password">Şifre</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="En az 8 karakter"
                    className="pl-10 pr-10"
                    minLength={8}
                    required
                    value={formData.password}
                    onChange={handleChange}
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

              {/* KVKK */}
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="kvkk"
                    checked={acceptedKvkk}
                    onCheckedChange={(checked) =>
                      setAcceptedKvkk(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="kvkk"
                    className="text-sm font-normal cursor-pointer leading-relaxed"
                  >
                    <Link
                      to="/kvkk"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      KVKK Aydınlatma Metni
                    </Link>
                    'ni ve{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Gizlilik Politikası
                    </Link>
                    'nı okudum ve kabul ediyorum.
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                variant="therapeutic"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Zaten hesabınız var mı?{" "}
              <Link
                to="/login/client"
                className="text-primary hover:underline font-medium"
              >
                Giriş Yapın
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Decorative */}
        <div className="hidden bg-gradient-to-br from-secondary via-accent/50 to-primary/10 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:p-12">
          <div className="max-w-md text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-float">
                <Heart className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              İlk Adımı Attınız
            </h2>
            <p className="text-muted-foreground">
              Profesyonel destek almak cesaret ister. Kayıt olarak gönüllü
              terapistlerimizle ücretsiz görüşme yapabilirsiniz.
            </p>
            <div className="mt-8 rounded-xl bg-card/50 p-4 text-left">
              <p className="text-sm text-muted-foreground">
                🔒 Tüm bilgileriniz KVKK kapsamında korunmaktadır. Verileriniz
                şifrelenerek saklanır ve üçüncü taraflarla paylaşılmaz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientRegister;
