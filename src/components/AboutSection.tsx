import { siteConfig, getWhatsAppUrl } from '../data/siteConfig';
import { MessageSquare, ArrowUpRight, CheckCircle2, Shield, Terminal, Laptop } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onOpenInstagram: () => void;
}

export default function AboutSection({ onOpenInstagram }: AboutSectionProps) {
  const techPills = [
    'React 19',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'Motion & UI/UX',
    'Google SEO',
    'WhatsApp & API Integrations',
    'Performance Optimization',
  ];

  return (
    <section id="sobre" className="py-20 lg:py-28 relative bg-[#0B0D13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand & Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl bg-[#0E121B] border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden silver-glow">
              {/* Background accent light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-slate-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Developer Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-500 bg-black flex items-center justify-center p-1 shadow-md shrink-0">
                  <img
                    src={siteConfig.logoPath}
                    alt="SF Full Stack Logo"
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {siteConfig.proprietor} <span className="text-slate-400 text-sm font-normal">· {siteConfig.name}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {siteConfig.role}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-[11px] text-slate-300 font-medium">
                      Atendimento Direto
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Brand Sheet Showcase */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-6 p-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Identidade Visual Oficial
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-800/80 aspect-video relative group">
                  <img
                    src={siteConfig.logoPath}
                    alt="Grade de Logos Oficiais SF Full Stack"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Contact and Social strip */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">WhatsApp Oficial:</span>
                  <a
                    href={getWhatsAppUrl("Olá! Gostaria de conversar com você sobre um novo site.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-mono font-medium hover:text-cyan-300 transition-colors"
                  >
                    {siteConfig.whatsapp.displayNumber}
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-slate-400">Instagram:</span>
                  <button
                    onClick={onOpenInstagram}
                    className="text-cyan-400 font-medium hover:underline flex items-center gap-1"
                  >
                    <span>{siteConfig.instagram.handle}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <a
                  href={getWhatsAppUrl("Olá! Gostaria de iniciar meu projeto diretamente com você.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="silver-button w-full py-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Conversar Agora no WhatsApp</span>
                </a>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Bio & Core Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              <span>Sobre o Desenvolvedor</span>
              <span aria-hidden="true">·</span>
              <span>Propósito & Entrega</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Compromisso real com código limpo, design refinado e retorno para o seu negócio.
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                A <strong className="text-white font-semibold">SF Full Stack</strong> nasceu com um objetivo claro: fornecer páginas e aplicações web que não sejam apenas bonitas na tela de um computador, mas que funcionem como verdadeiras máquinas de atração e conversão de novos clientes.
              </p>
              <p>
                Diferente de agências tradicionais que terceirizam o desenvolvimento ou usam construtores visuais lentos e cheios de bugs, aqui cada projeto é codificado com tecnologia moderna. O resultado? Carregamento em frações de segundo, visual premium prata metálico e navegação sem atrito no smartphone.
              </p>
              <p>
                Seja para uma landing page (a partir de R$ 500), um site institucional que transmita autoridade (a partir de R$ 1.000) ou uma loja virtual ágil (a partir de R$ 1.200), você tem contato direto, prazos garantidos e suporte próximo.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="w-full mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Tecnologias & Ferramentas Dominadas:
              </span>
              <div className="flex flex-wrap gap-2">
                {techPills.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Commitments List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full border-t border-slate-800/80 pt-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Zero mensalidades ou taxas de plataforma</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Código 100% de sua propriedade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Suporte técnico e orientações pós-lançamento</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Estrutura otimizada para anúncios e tráfego pago</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
