import Header from "@/components/Header";
import IntroSequence from "@/components/IntroSequence";
import StudioStatement from "@/components/StudioStatement";
import RecentWork from "@/components/RecentWork";
import LogoCarousel from "@/components/LogoCarousel";
import ClosingQuote from "@/components/ClosingQuote";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-ink">
      <Header />
      <IntroSequence />
      <StudioStatement />
      <RecentWork />
      <LogoCarousel />
      <ClosingQuote />
      <Footer />
    </main>
  );
}
