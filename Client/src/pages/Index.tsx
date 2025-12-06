import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VolunTherapy - Gönüllü Psikolojik Destek Platformu</title>
        <meta 
          name="description" 
          content="VolunTherapy, profesyonel psikoloji mezunlarının gönüllü olarak online terapi sunduğu, güvenli ve ücretsiz psikolojik destek platformu." 
        />
        <meta property="og:title" content="VolunTherapy - Gönüllü Psikolojik Destek" />
        <meta property="og:description" content="Profesyonel destek, gönüllü ruhla. Ücretsiz online terapi platformu." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://voluntherapy.com" />
      </Helmet>
      
      <Layout>
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
