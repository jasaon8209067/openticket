import Header from "../components/Header";
import Hero from "../components/Hero";
import EventSection from "../components/EventSection";
import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />
      <Hero />
      <EventSection />
      <NewsSection />
      <Footer />
    </div>
  );
}

