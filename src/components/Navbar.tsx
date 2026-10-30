import { useState } from 'react';
import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenInstagram: () => void;
  onOpenSimulator: () => void;
  onOpenBriefing?: () => void;
}

export default function Navbar({ onOpenInstagram, onOpenSimulator, onOpenBriefing }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Nossos Projetos', href: '#projetos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0B0D13]/85 border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Strict Top Bar Contract) */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-700/80 bg-black flex items-center justify-center relative shadow-sm group-hover:border-slate-500 transition-colors">
            <img 
              src={siteConfig.logoPath} 
              alt="SF Full Stack" 
              className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors whitespace-nowrap">
              SF <span className="silver-gradient-text">FULL STACK</span>
            </span>
            <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase -mt-0.5">
              Sites que geram resultados
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-slate-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Direct Channel */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenInstagram}
            className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            title="Ver Instagram @leo_offensive77"
          >
            <span>Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenBriefing) onOpenBriefing();
              else window.open(getWhatsAppUrl("Olá! Conheci a SF Full Stack pelo site e gostaria de solicitar um orçamento para meu projeto."), '_blank');
            }}
            className="silver-button px-4 py-2 text-xs rounded-lg flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm font-bold cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Solicitar Orçamento</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={getWhatsAppUrl("Olá! Vim pelo site da SF Full Stack.")}
            target="_blank"
            rel="noopener noreferrer"
            className="silver-button px-3 py-1.5 text-xs rounded-md flex items-center gap-1 font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F131D] border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulator();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700 text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-300" />
              <span>Abrir Simulador de Preços</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstagram();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-900 rounded-lg border border-slate-800 text-center flex items-center justify-center gap-2"
            >
              <span>Ver Instagram @leo_offensive77</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppUrl("Olá! Conheci a SF Full Stack pelo site e gostaria de solicitar um orçamento para meu projeto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="silver-button w-full py-2.5 px-4 text-xs rounded-lg text-center flex items-center justify-center gap-2 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chamar no WhatsApp (+55 91 99153-2935)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
