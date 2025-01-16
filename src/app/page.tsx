import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800" />
        
        {/* Dot Pattern */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(90deg, gray 1px, transparent 0),
                             linear-gradient(180deg, gray 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ/>
      </div>
    </div>
  );
}
