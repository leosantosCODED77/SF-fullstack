import { useState } from 'react';
import { servicesCatalog, ServiceItem, monthlySupportPlan } from '../data/catalog';
import { getWhatsAppUrl } from '../data/siteConfig';
import { ServiceBriefingType } from '../types/briefing';
import { Check, MessageSquare, Clock, ArrowRight, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onSelectForSimulator: (serviceId: string) => void;
  onOpenBriefing: (serviceId?: ServiceBriefingType) => void;
}

export default function ServicesSection({ onSelectForSimulator, onOpenBriefing }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');

  const filteredServices = activeFilter === 'all' 
    ? servicesCatalog 
    : servicesCatalog.filter(s => s.category === activeFilter);

  return (
    <section id="servicos" className="py-20 lg:py-28 relative bg-[#0B0D13] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Nossos Serviços Disponíveis</span>
            <span aria-hidden="true">·</span>
            <span>Preços & Detalhes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Serviços <span className="silver-gradient-text">Especializados</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
            Desenvolvimento web full-stack de alto padrão. Veja abaixo cada um dos nossos serviços, o que cada um inclui, valores base sugeridos e prazos de entrega.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Aviso de Investimento:</strong> Os valores exibidos são sugeridos como <em>"a partir deste preço"</em> e podem estar sujeitos a alterações conforme a complexidade e necessidades específicas do seu projeto.
            </span>
          </div>
        </div>

        {/* Filter Tabs / Segmented Control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-200 text-slate-900 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todos os Serviços ({servicesCatalog.length})
          </button>
          {servicesCatalog.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveFilter(service.category)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeFilter === service.category
                  ? 'bg-slate-200 text-slate-900 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {filteredServices.map((service, index) => {
            const isHighlight = service.id === 'landing-page' || service.id === 'loja-virtual';
            // Map service id to ServiceBriefingType
            const briefingType: ServiceBriefingType = 
              service.id === 'site-institucional' ? 'site-institucional' :
              service.id === 'loja-virtual' ? 'loja-virtual' :
              service.id === 'cardapio-digital' ? 'cardapio-digital' :
              service.id === 'portfolio-profissional' ? 'portfolio-profissional' :
              'landing-page';
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative flex flex-col justify-between rounded-2xl bg-[#0E121B] p-7 transition-all duration-300 silver-card-border ${
                  isHighlight ? 'ring-1 ring-slate-400/40 shadow-xl' : ''
                }`}
              >
                {/* Top Badge */}
                {service.badge && (
                  <div className="absolute top-5 right-5">
                    <span className="text-[11px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Category & Title */}
                  <div className="text-xs font-mono font-medium text-slate-400 mb-1">
                    {service.categoryLabel}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 pr-16">
                    {service.name}
                  </h3>
                  
                  {/* O que é o serviço (Descrição detalhada) */}
                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="text-xs text-slate-400 italic mb-6">
                    <strong className="text-slate-300 not-italic">Ideal para:</strong> {service.recommendedFor}
                  </div>

                  {/* Price Box with "A partir de" */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 mb-6">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-semibold">
                      Investimento Sugerido
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        {service.formattedPrice}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 leading-tight">
                      *Preço inicial de referência, sujeito a alterações conforme a complexidade.
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2.5 font-medium border-t border-slate-800/80 pt-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Entrega estimada em {service.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      O que está incluso neste serviço:
                    </div>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-slate-200 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* SF CARE Support Reminder right in the card */}
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-300 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Plano de suporte mensal opcional: <strong>SF CARE (R$ 149/mês)</strong></span>
                  </div>
                </div>

                {/* Bottom Actions: "Solicitar Orçamento" obrigatório por card */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => onOpenBriefing(briefingType)}
                    className="silver-button w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 group shadow-sm transition-all"
                    title={`Solicitar orçamento para ${service.name}`}
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950" />
                    <span>Solicitar Orçamento</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={getWhatsAppUrl(service.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>WhatsApp Direto</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectForSimulator(service.id)}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-1 text-center"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Simulador</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* SF CARE · SUPORTE MENSAL (Plano Opcional em destaque) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-[#0E121B] via-slate-900 to-[#0E121B] border border-cyan-500/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden silver-glow mb-14"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PLANO DE SUPORTE MENSAL OPCIONAL</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                {monthlySupportPlan.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
                  {monthlySupportPlan.formattedPrice}
                </span>
                <span className="text-xs text-slate-400">
                  (Opcional para quem deseja tranquilidade pós-entrega)
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {monthlySupportPlan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic border-t border-slate-800/80 pt-4">
                {monthlySupportPlan.note}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Deseja contratar suporte contínuo?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Você pode contratar este plano junto com o desenvolvimento do seu site ou a qualquer momento depois que o site for publicado.
              </p>

              <a
                href={getWhatsAppUrl(monthlySupportPlan.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="silver-button w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contratar SF CARE no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectForSimulator('landing-page')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors text-center"
              >
                Simular Projeto com SF CARE Incluso
              </button>
            </div>

          </div>
        </motion.div>

        {/* Note on Custom Projects */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              Precisa de um projeto com requisitos especiais ou integrações personalizadas?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Podemos avaliar sua demanda pontual e estruturar uma proposta personalizada com escopo e prazo claros.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenBriefing()}
            className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Preencher Briefing Personalizado</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
