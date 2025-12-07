import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Users, Shield, ArrowRight, LayoutDashboard } from "lucide-react";

const Hero = () => {
  // 1. Check Auth Status
  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "doctor" or "patient"

  // 2. Determine Dashboard Link
  const dashboardLink =
    userRole === "doctor" ? "/dashboard/therapist" : "/dashboard/client";

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent/30 py-16 md:py-24 lg:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container-therapeutic relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" aria-hidden="true" />
              Güvenli & Ücretsiz Psikolojik Destek
            </div>

            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              Profesyonel Destek,{" "}
              <span className="text-primary">Gönüllü Ruhla</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl lg:mx-0 mx-auto">
              VolunTherapy, psikoloji mezunu profesyonellerin gönüllü olarak
              online terapi sunduğu, herkes için erişilebilir bir platform.
            </p>

            {/* --- CTA BUTTONS (SMART LOGIC) --- */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              {isLoggedIn ? (
                // LOGGED IN STATE
                <Button
                  variant="hero"
                  size="xl"
                  asChild
                  className="group min-w-[200px]"
                >
                  <Link to={dashboardLink}>
                    <LayoutDashboard
                      className="h-5 w-5 mr-2"
                      aria-hidden="true"
                    />
                    Panele Git
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              ) : (
                // LOGGED OUT STATE
                <>
                  <Button variant="hero" size="xl" asChild className="group">
                    <Link to="/login/client">
                      <User className="h-5 w-5 mr-2" aria-hidden="true" />
                      Danışan Girişi
                      <ArrowRight
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                  <Button
                    variant="hero-secondary"
                    size="xl"
                    asChild
                    className="group"
                  >
                    <Link to="/login/therapist">
                      <Users className="h-5 w-5 mr-2" aria-hidden="true" />
                      Terapist Girişi
                      <ArrowRight
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* E-Devlet Button (Only show if NOT logged in) */}
            {!isLoggedIn && (
              <div className="mt-6">
                <Button variant="edevlet" size="default" asChild>
                  <Link to="/login/edevlet">
                    <img
                      src="https://www.turkiye.gov.tr/images/logo-tr.png"
                      alt=""
                      className="h-5 w-5 rounded bg-white p-0.5 mr-2"
                      aria-hidden="true"
                    />
                    e-Devlet ile Giriş
                  </Link>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  * e-Devlet entegrasyonu backend gerektirir (simülasyon)
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border/50 pt-8">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  500+
                </p>
                <p className="text-sm text-muted-foreground">
                  Gönüllü Terapist
                </p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  10K+
                </p>
                <p className="text-sm text-muted-foreground">Danışan</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-foreground md:text-3xl">
                  25K+
                </p>
                <p className="text-sm text-muted-foreground">Seans</p>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative animate-fade-in delay-200 lg:order-last">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main illustration card */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary to-accent/50 p-8 shadow-large">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 animate-float">
                    <svg
                      className="h-12 w-12 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                      <path d="M9 10h.01M15 10h.01" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Yanınızdayız
                  </h3>
                  <p className="text-muted-foreground">
                    Her zaman, her yerde profesyonel destek
                  </p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-4 top-1/4 animate-float rounded-xl bg-card p-4 shadow-medium delay-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <Shield
                      className="h-5 w-5 text-accent-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      %100 Gizli
                    </p>
                    <p className="text-xs text-muted-foreground">KVKK Uyumlu</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 animate-float rounded-xl bg-card p-4 shadow-medium delay-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Users
                      className="h-5 w-5 text-secondary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Uzman Kadro
                    </p>
                    <p className="text-xs text-muted-foreground">Doğrulanmış</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
