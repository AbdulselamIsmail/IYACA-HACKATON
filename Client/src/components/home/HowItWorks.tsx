import { UserPlus, Search, Calendar, Video } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Kayıt Olun",
      description: "Hızlıca kayıt olun ve profilinizi oluşturun. Sadece birkaç dakika sürer.",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      icon: Search,
      title: "Terapist Seçin",
      description: "Şehir, uzmanlık alanı ve müsaitlik durumuna göre size uygun terapisti bulun.",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: Calendar,
      title: "Randevu Alın",
      description: "Uygun gün ve saati seçin, randevunuzu kolayca oluşturun.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Video,
      title: "Görüşmeye Başlayın",
      description: "Güvenli video bağlantısı ile terapistinizle online görüşmenizi gerçekleştirin.",
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  return (
    <section 
      className="py-16 md:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-therapeutic">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 
            id="how-it-works-heading" 
            className="section-title mb-4"
          >
            Nasıl Çalışır?
          </h2>
          <p className="section-subtitle mx-auto">
            Dört basit adımda profesyonel psikolojik desteğe ulaşın.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div 
            className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-secondary via-accent to-primary/20 md:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article 
                key={step.title}
                className="animate-fade-in-up relative text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-card px-3 py-1 text-sm font-bold text-primary shadow-soft">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} shadow-soft transition-transform duration-300 hover:scale-105`}>
                  <step.icon className="h-10 w-10" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
