import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/hero-section";
import ImprovedCategorySection from "@/components/home/improved-category-section";
import FeaturedAdsSection from "@/components/home/featured-ads-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import CtaSection from "@/components/home/cta-section";
import { useLanguage } from "@/hooks/use-language";

export default function HomePage() {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t("app.name")} - {t("app.tagline")}</title>
        <meta name="description" content={t("app.metaDescription")} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jakupie.pl/" />
        <meta property="og:title" content={`${t("app.name")} - ${t("app.tagline")}`} />
        <meta property="og:description" content={t("app.metaDescription")} />
        <meta property="og:image" content="/assets/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jakupie.pl/" />
        <meta property="twitter:title" content={`${t("app.name")} - ${t("app.tagline")}`} />
        <meta property="twitter:description" content={t("app.metaDescription")} />
        <meta property="twitter:image" content="/assets/og-image.jpg" />
      </Helmet>
      
      <HeroSection />
      <ImprovedCategorySection />
      <FeaturedAdsSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
