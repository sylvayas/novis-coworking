
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <Layout
      title="NOVIS Coworking - Espaces de travail collaboratifs à Paris"
      description="NOVIS offre des espaces de coworking modernes et inspirants où les professionnels et les entrepreneurs peuvent se connecter, collaborer et créer. Découvrez nos espaces flexibles au cœur de Paris."
    >
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
}
