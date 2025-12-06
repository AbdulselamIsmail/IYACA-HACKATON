import { Shield, Heart, Clock, Users, Video, Lock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Güvenli & Gizli",
      description: "Tüm görüşmeler şifrelidir. KVKK uyumlu altyapı ile verileriniz güvende.",
    },
    {
      icon: Heart,
      title: "Gönüllü Destek",
      description: "Deneyimli psikoloji mezunları gönüllü olarak destek sunuyor.",
    },
    {
      icon: Clock,
      title: "Esnek Zamanlama",
      description: "Size uygun gün ve saatlerde randevu alın, istediğiniz yerden bağlanın.",
    },
    {
      icon: Users,
      title: "Doğrulanmış Terapistler",
      description: "Tüm terapistlerin diplomaları ve kimlikleri doğrulanmıştır.",
    },
    {
      icon: Video,
      title: "Kaliteli Görüntülü Görüşme",
      description: "Yüksek kaliteli video ve ses ile kesintisiz seans deneyimi.",
    },
    {
      icon: Lock,
      title: "Ücretsiz Erişim",
      description: "Platform tamamen ücretsizdir, herkes psikolojik desteğe ulaşabilir.",
    },
  ];

  return (
    <section 
      className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24"
      aria-labelledby="features-heading"
    >
      <div className="container-therapeutic">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 
            id="features-heading" 
            className="section-title mb-4"
          >
            Neden VolunTherapy?
          </h2>
          <p className="section-subtitle mx-auto">
            Profesyonel, güvenli ve erişilebilir psikolojik destek için tasarlandık.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="card-therapeutic group p-6 transition-all duration-300 hover:shadow-large hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10">
                <feature.icon 
                  className="h-7 w-7 text-primary transition-transform group-hover:scale-110" 
                  aria-hidden="true" 
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
