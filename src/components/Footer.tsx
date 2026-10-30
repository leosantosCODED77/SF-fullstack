import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { MessageSquare, ArrowUpRight, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenInstagram: () => void;
}

export default function Footer({ onOpenInstagram }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090D] border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 bg-black flex items-center justify-center p-0.5">
                <img
                  src={siteConfig.logoPath}
                  alt="SF Full Stack"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  SF <span className="silver-gradient-text">FULL STACK</span>
                </span>
                <p className="text-xs text-slate-400">
                  {siteConfig.brandTagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Desenvolvimento de landing pages, sites corporativos e e-commerces com tecnologia de ponta, código autoral e foco estrito em conversão de clientes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl("Olá! Vim pelo rodapé do site da SF Full Stack.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {siteConfig.whatsapp.displayNumber}</span>
              </a>

              <button
                onClick={onOpenInstagram}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Instagram: {siteConfig.instagram.handle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">
                  Serviços & Investimentos
                </a>
              </li>
              <li>
                <a href="#projetos" className="hover:text-white transition-colors">
                  Nossos Projetos
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-white transition-colors">
                  Diferenciais & Metodologia
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-white transition-colors">
                  Simulador de Orçamento
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre o Desenvolvedor
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Services Quick List with Prices */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Tabela de Serviços
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>Landing Page Simples</span>
                <span className="font-mono text-slate-200 font-medium">R$ 700,00</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Cardápio Interativo</span>
                <span className="font-mono text-slate-200 font-medium">R$ 800,00</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Landing Page de Alta Conversão</span>
                <span className="font-mono text-slate-200 font-medium">R$ 900,00</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Site Institucional Completo</span>
                <span className="font-mono text-slate-200 font-medium">R$ 1.250,00</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Lojas e Catálogos Virtuais</span>
                <span className="font-mono text-slate-200 font-medium">R$ 1.500,00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SF Full Stack. Todos os direitos reservados.
          </div>
          
          <div className="flex items-center gap-4">
            <span>Desenvolvido por Léo (SF Full Stack)</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center gap-1"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Topo</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
