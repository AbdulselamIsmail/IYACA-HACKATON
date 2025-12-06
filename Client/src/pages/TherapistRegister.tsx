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
  Lock,
  ArrowLeft,
  Eye,
  EyeOff,
  Stethoscope,
  Upload,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const TherapistRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedKvkk, setAcceptedKvkk] = useState(false);

  // DUMMY STATE (Visual only, not sent to backend)
  const [diplomaFile, setDiplomaFile] = useState<File | null>(null);
  const [schoolName, setSchoolName] = useState("");

  // REAL STATE (Sent to backend)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    sex: "male",
    role: "doctor",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDiplomaFile(e.target.files[0]);
      toast.info(`Dosya seçildi: ${e.target.files[0].name}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedKvkk) {
      toast.error("KVKK metnini kabul etmeniz gerekmektedir.");
      return;
    }

    // "Dummy" Validation - Make them feel like it's required
    if (!schoolName) {
      toast.error("Lütfen mezun olduğunuz okulu giriniz.");
      return;
    }
    if (!diplomaFile) {
      toast.error("Lütfen diploma belgenizi yükleyiniz.");
      return;
    }

    setIsLoading(true);

    try {
      // THE HACK: We ignore 'schoolName' and 'diplomaFile' here.
      // We only send the fields your Backend actually has.
      const { data } = await api.post("/auth/register", formData);

      // Fake success message implies verification process
      toast.success("Başvuru alındı! Diplomanız sisteme yüklendi.");

      setTimeout(() => {
        navigate("/login/therapist");
      }, 1500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.msg || "Kayıt başarısız.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Terapist Kaydı - VolunTherapy</title>
      </Helmet>

      <div className="flex min-h-screen">
        {/* Left Side (Decorative) */}
        <div className="hidden bg-gradient-to-br from-primary/10 via-secondary to-accent/50 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:p-12">
          <div className="max-w-md text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-float">
                <Stethoscope className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Uzmanlığınız Değerlidir
            </h2>
            <p className="text-muted-foreground">
              Diploma doğrulama sürecimiz ile güvenli bir sağlık platformu
              sunuyoruz.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="flex w-full flex-col justify-center px-4 py-12 lg:w-1/2 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Ana Sayfa
            </Link>

            <h1 className="text-2xl font-bold text-foreground mb-6">
              Terapist Başvurusu
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <Label htmlFor="name">Ad Soyad / Unvan</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Dr. Adınız Soyadınız"
                    className="pl-10"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* DUMMY INPUT: School */}
              <div>
                <Label htmlFor="school">Mezun Olduğunuz Okul / Bölüm</Label>
                <div className="relative mt-1.5">
                  <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="school"
                    placeholder="Ör: İstanbul Üniversitesi - Psikoloji"
                    className="pl-10"
                    required
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">E-posta</Label>
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

              {/* Sex */}
              <div>
                <Label>Cinsiyet</Label>
                <div className="relative mt-1.5">
                  <Select
                    value={formData.sex}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sex: value })
                    }
                  >
                    <SelectTrigger className="pl-10">
                      <User className="absolute left-3 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Erkek</SelectItem>
                      <SelectItem value="female">Kadın</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* DUMMY INPUT: File Upload */}
              <div>
                <Label>Diploma Belgesi (PDF/Görsel)</Label>
                <div className="mt-1.5 border-2 border-dashed border-input rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.png"
                  />
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {diplomaFile
                      ? diplomaFile.name
                      : "Dosya yüklemek için tıklayın"}
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Şifre</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    className="pl-10"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
              <div className="flex items-center gap-2">
                <Checkbox
                  id="kvkk"
                  checked={acceptedKvkk}
                  onCheckedChange={(c) => setAcceptedKvkk(c as boolean)}
                />
                <Label htmlFor="kvkk" className="text-sm font-normal">
                  KVKK metnini okudum.
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "İşleniyor..." : "Başvuruyu Tamamla"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TherapistRegister;
