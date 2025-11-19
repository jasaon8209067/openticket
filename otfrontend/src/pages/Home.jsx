import Header from "../components/Header";
import Hero from "../components/Hero";
import EventSection from "../components/EventSection";
import AnnouncementList from "../components/AnnouncementList";
import Footer from "../components/Footer";
import Top from '../components/ui/Top';

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />
      <Hero />
      <EventSection />
      <div className="max-w-4xl mx-auto p-6 w-full"> 
          <AnnouncementList limit={3} isFullPage={false} /> 
      </div>
      <Top />
      <Footer />
    </div>
  );
}

