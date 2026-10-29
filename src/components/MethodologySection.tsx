import { siteConfig } from '../data/siteConfig';
import { Code2, Smartphone, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function MethodologySection() {
  const iconMap: Record<string, typeof Code2> = {
    Code2,
    Smartphone,
    MessageSquare,
    Zap,
  };

  return (
    <section id="diferenciais" className="py-20 lg:py-28 relative bg-[#090B10] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <span>Diferenciais Técnicos</span>
            <span aria-hidden="true">·</span>
            <span>Metodologia Ágil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Por que empresas e profissionais escolhem a SF Full Stack.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminamos os problemas clássicos de páginas lentas, templates genéricos de WordPress cheios de plugins pesados e suporte fantasma. Aqui, seu projeto é tratado com rigor de engenharia de software e visão comercial.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {siteConfig.guarantees.map((item, idx) => {
            const Icon = iconMap[item.icon] || Code2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#0E121B] border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-5 text-cyan-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Work Methodology: 4-Step Process Flow */}
        <div className="rounded-3xl bg-[#0E121B] border border-slate-800 p-8 sm:p-12">
          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Como funciona o processo de criação do seu site
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Passo a passo transparente, com alinhamento contínuo em cada fase para garantir entrega pontual e satisfação total.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {siteConfig.methodology.map((m, idx) => (
              <div key={idx} className="relative flex flex-col justify-between p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold font-mono text-slate-400">
                      {m.step}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {m.duration}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
