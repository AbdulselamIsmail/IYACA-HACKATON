import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section 
      className="relative overflow-hidden bg-primary py-16 md:py-24"
      aria-labelledby="cta-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="container-therapeutic relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
            <Heart className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
          </div>
          
          <h2 
            id="cta-heading"
            className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl"
          >
            Kendinize Değer Verin
          </h2>
          
          <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
            Profesyonel destek almak cesaret ister. 
            Bugün ilk adımı atın, biz yanınızdayız.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button 
              variant="secondary" 
              size="xl" 
              asChild 
              className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/register/client">
                Hemen Başlayın
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              asChild
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/therapists">
                Terapistleri İncele
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            Tamamen ücretsiz • KVKK uyumlu • 7/24 destek
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
