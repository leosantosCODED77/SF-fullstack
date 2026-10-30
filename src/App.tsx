import { useState } from 'react';
import { useScroll, useSpring, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyInvestSection from './components/WhyInvestSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import BudgetSimulator from './components/BudgetSimulator';
import MethodologySection from './components/MethodologySection';
import AboutSection from './components/AboutSection';
import FaqSection from './components/FaqSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import InstagramModal from './components/InstagramModal';
import BriefingModal from './components/BriefingModal';
import Footer from './components/Footer';
import { ServiceBriefingType } from './types/briefing';

export default function App() {
  const [instagramModalOpen, setInstagramModalOpen] = useState(false);
  const [instagramCustomText, setInstagramCustomText] = useState('');
  
  const [briefingModalOpen, setBriefingModalOpen] = useState(false);
  const [selectedBriefingService, setSelectedBriefingService] = useState<ServiceBriefingType | undefined>(undefined);

  const [simulatorInitialService, setSimulatorInitialService] = useState('landing-page');

  // Scroll Progress Bar for smooth visual feedback
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenInstagram = (customText?: string) => {
    setInstagramCustomText(customText || '');
    setInstagramModalOpen(true);
  };

  const handleOpenBriefing = (serviceId?: ServiceBriefingType) => {
    setSelectedBriefingService(serviceId);
    setBriefingModalOpen(true);
  };

  const handleScrollToSimulator = (serviceId?: string) => {
    if (serviceId) {
      setSimulatorInitialService(serviceId);
    }
    const element = document.getElementById('simulador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D13] text-slate-100 flex flex-col selection:bg-slate-300 selection:text-slate-900 relative">
      
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-slate-400 via-slate-100 to-cyan-400 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Main Top Navigation */}
      <Navbar
        onOpenInstagram={() => handleOpenInstagram()}
        onOpenSimulator={() => handleScrollToSimulator()}
        onOpenBriefing={() => handleOpenBriefing()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenSimulator={() => handleScrollToSimulator()}
          onOpenBriefing={() => handleOpenBriefing()}
        />

        {/* 2. Nossos Projetos (Portfólio com Ver Projeto e Código-Fonte) */}
        <PortfolioSection />

        {/* 3. Por que investir na presença digital da sua empresa? (Seção Institucional & Conversão) */}
        <WhyInvestSection
          onOpenBriefing={() => handleOpenBriefing()}
        />

        {/* 4. Serviços Especializados com detalhamento, 'A partir de', e botão Solicitar Orçamento */}
        <ServicesSection
          onSelectForSimulator={(serviceId) => handleScrollToSimulator(serviceId)}
          onOpenBriefing={(serviceId) => handleOpenBriefing(serviceId)}
        />

        {/* 5. Simulador Interativo com Adicionais (Entrega Expressa 48h R$ 120 e Redação/Copy R$ 150) */}
        <BudgetSimulator
          initialServiceId={simulatorInitialService}
          onOpenInstagramWithText={(text) => handleOpenInstagram(text)}
        />

        {/* 6. Diferenciais Técnicos e Metodologia em 4 Etapas */}
        <MethodologySection />

        {/* 7. Sobre o Desenvolvedor & Identidade Visual SF Full Stack */}
        <AboutSection
          onOpenInstagram={() => handleOpenInstagram()}
        />

        {/* 8. Perguntas Frequentes (FAQ) */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenInstagram={() => handleOpenInstagram()}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Compliant Instagram Direct Modal */}
      <InstagramModal
        isOpen={instagramModalOpen}
        onClose={() => setInstagramModalOpen(false)}
        customText={instagramCustomText}
      />

      {/* Sistema Profissional de Briefing Automatizado SF (5 Etapas) */}
      <BriefingModal
        isOpen={briefingModalOpen}
        onClose={() => setBriefingModalOpen(false)}
        initialService={selectedBriefingService}
      />

    </div>
  );
}
