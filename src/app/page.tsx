import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Offers } from "@/components/sections/Offers";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { MadeWithClaude } from "@/components/sections/MadeWithClaude";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Offers />
        <Projects />
        <Process />
        <About />
        <MadeWithClaude />
        <BlogPreview />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
