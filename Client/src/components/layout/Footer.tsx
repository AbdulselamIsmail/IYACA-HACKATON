import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Hakkımızda", href: "/about" },
      { name: "Nasıl Çalışır?", href: "/how-it-works" },
      { name: "Terapistler", href: "/therapists" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Yardım Merkezi", href: "/help" },
      { name: "SSS", href: "/faq" },
      { name: "İletişim", href: "/contact" },
      { name: "Geri Bildirim", href: "/feedback" },
    ],
    legal: [
      { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
      { name: "Gizlilik Politikası", href: "/privacy" },
      { name: "Kullanım Koşulları", href: "/terms" },
      { name: "Çerez Politikası", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="container-therapeutic py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2" aria-label="VolunTherapy Ana Sayfa">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
                <Heart className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Volun<span className="text-primary">Therapy</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Profesyonel psikoloji mezunlarının gönüllü olarak destek sunduğu, 
              güvenli ve erişilebilir online terapi platformu.
            </p>
            <div className="mt-6 space-y-2">
              <a 
                href="mailto:destek@voluntherapy.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                destek@voluntherapy.com
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Türkiye genelinde online hizmet
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <nav aria-label="Platform bağlantıları">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support Links */}
          <nav aria-label="Destek bağlantıları">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Destek</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-label="Yasal bağlantılar">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Yasal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VolunTherapy. Tüm hakları saklıdır.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={social.name}
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* KVKK Notice */}
        <div className="mt-8 rounded-lg bg-secondary/50 p-4">
          <p className="text-center text-xs text-muted-foreground">
            🔒 Verileriniz 6698 sayılı KVKK kapsamında korunmaktadır. 
            Platform üzerinden paylaşılan tüm bilgiler şifrelenerek saklanır ve üçüncü taraflarla paylaşılmaz.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
