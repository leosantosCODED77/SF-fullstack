import { useState } from 'react';
import { servicesCatalog, simulatorAddons, monthlySupportPlan } from '../data/catalog';
import { getWhatsAppUrl } from '../data/siteConfig';
import { Calculator, Check, MessageSquare, Copy, CheckCheck, Sparkles, Send, ShieldCheck } from 'lucide-react';

interface BudgetSimulatorProps {
  initialServiceId?: string;
  onOpenInstagramWithText: (text: string) => void;
}

export default function BudgetSimulator({ initialServiceId = 'landing-page', onOpenInstagramWithText }: BudgetSimulatorProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [includeSupportPlan, setIncludeSupportPlan] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [businessSegment, setBusinessSegment] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedService = servicesCatalog.find(s => s.id === selectedServiceId) || servicesCatalog[0];
  
  const selectedAddons = simulatorAddons.filter(addon => selectedAddonIds.includes(addon.id));
  const addonsTotal = selectedAddons.reduce((acc, curr) => acc + curr.price, 0);
  const totalAmount = selectedService.price + addonsTotal;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const formattedTotal = totalAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Build structured message for WhatsApp and Instagram
  const generateProposalText = () => {
    let msg = `Olá, SF Full Stack! Gostaria de um orçamento detalhado:\n\n`;
    if (clientName.trim()) {
      msg += `👤 *Nome/Empresa:* ${clientName.trim()}\n`;
    }
    if (businessSegment.trim()) {
      msg += `🏢 *Segmento:* ${businessSegment.trim()}\n`;
    }
    msg += `🚀 *Serviço Escolhido:* ${selectedService.name} (${selectedService.formattedPrice})\n`;
    
    if (selectedAddons.length > 0) {
      msg += `✨ *Adicionais Selecionados:*\n`;
      selectedAddons.forEach(a => {
        msg += `   • ${a.name} (${a.formattedPrice})\n`;
      });
    }

    if (includeSupportPlan) {
      msg += `🛡️ *Plano Opcional de Suporte:* ${monthlySupportPlan.name} (${monthlySupportPlan.formattedPrice})\n`;
    }
    
    msg += `\n💰 *Total do Projeto:* ${formattedTotal}`;
    if (includeSupportPlan) {
      msg += ` + ${monthlySupportPlan.formattedPrice}`;
    }
    msg += `\n⏱️ *Prazo Previsto:* ${selectedService.deliveryTime}\n\n`;
    msg += `Podemos alinhar o início do projeto?`;
    return msg;
  };

  const handleCopyProposal = async () => {
    const text = generateProposalText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      onOpenInstagramWithText(text);
    } catch {
      onOpenInstagramWithText(text);
    }
  };

  return (
    <section id="simulador" className="py-20 lg:py-28 relative bg-[#0B0D13] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <Calculator className="w-3.5 h-3.5 text-slate-400" />
            <span>Simulador Interativo</span>
            <span aria-hidden="true">·</span>
            <span>Sem Compromisso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Monte a proposta do seu projeto em segundos.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Selecione a base do seu site e adicione os recursos estratégicos que desejar. O total é calculado instantaneamente e você pode enviar a proposta diretamente para nosso WhatsApp ou Instagram.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Base Service Selection */}
            <div className="rounded-2xl bg-[#0E121B] border border-slate-800 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Etapa 01
                </span>
                <span className="text-xs text-slate-400">Selecione 1 opção principal</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Qual tipo de projeto você precisa?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesCatalog.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-800/90 border-slate-400 text-white shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-bold leading-tight">
                          {service.name}
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-white bg-white text-slate-900' : 'border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-800/60">
                        <span className="text-sm font-extrabold font-mono tabular-nums text-white">
                          {service.formattedPrice}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {service.deliveryTime}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-ons (Entrega Expressa 48h e Redação & Copywriting Persuasivo) */}
            <div className="rounded-2xl bg-[#0E121B] border border-slate-800 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Etapa 02
                </span>
                <span className="text-xs text-slate-400">Adicionais estratégicos</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Deseja incluir adicionais no seu pacote?
              </h3>

              <div className="space-y-3 mb-6">
                {simulatorAddons.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex items-start justify-between gap-4 ${
                        isChecked
                          ? 'bg-slate-800/70 border-slate-500 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-white border-white text-slate-900' : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">
                            {addon.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            {addon.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono tabular-nums text-cyan-300 whitespace-nowrap shrink-0">
                        +{addon.formattedPrice}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Suporte Mensal Opcional SF CARE */}
              <div className="pt-5 border-t border-slate-800/80">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Manutenção & Suporte Contínuo (Opcional):
                </div>

                <button
                  type="button"
                  onClick={() => setIncludeSupportPlan(!includeSupportPlan)}
                  className={`w-full p-4 rounded-xl text-left border transition-all flex items-start justify-between gap-4 ${
                    includeSupportPlan
                      ? 'bg-slate-800/80 border-cyan-500/70 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      includeSupportPlan ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {includeSupportPlan && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {monthlySupportPlan.name}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {monthlySupportPlan.badge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Alterações de texto/imagem, monitoramento básico e suporte no WhatsApp em horário comercial.
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono tabular-nums text-emerald-400 whitespace-nowrap shrink-0">
                    +{monthlySupportPlan.formattedPrice}
                  </div>
                </button>
              </div>

            </div>

            {/* Step 3: Optional Contact Details */}
            <div className="rounded-2xl bg-[#0E121B] border border-slate-800 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Etapa 03
                </span>
                <span className="text-xs text-slate-400">Personalização (opcional)</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Informações para personalizar o atendimento
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Preencha para já receber um atendimento contextualizado no WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Seu Nome ou Nome do Negócio
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Gabriel / Studio Prime"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="business-segment" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Segmento de Atuação
                  </label>
                  <input
                    id="business-segment"
                    type="text"
                    value={businessSegment}
                    onChange={(e) => setBusinessSegment(e.target.value)}
                    placeholder="Ex: Advocacia, Hamburgueria, Consultoria"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Proposal Summary Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-2xl bg-[#0E121B] border border-slate-700 p-6 sm:p-8 shadow-xl silver-glow">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Resumo da Proposta</h3>
                  <p className="text-xs text-slate-400">Orçamento personalizado em tempo real</p>
                </div>
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>

              {/* Items Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between text-xs sm:text-sm">
                  <div>
                    <div className="font-semibold text-white">{selectedService.name}</div>
                    <div className="text-[11px] text-slate-400">Serviço principal · Entrega em {selectedService.deliveryTime}</div>
                  </div>
                  <div className="font-mono font-bold text-white tabular-nums">
                    {selectedService.formattedPrice}
                  </div>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/60 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Adicionais:
                    </span>
                    {selectedAddons.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between text-xs text-slate-300">
                        <span>• {addon.name}</span>
                        <span className="font-mono tabular-nums text-slate-300">+{addon.formattedPrice}</span>
                      </div>
                    ))}
                  </div>
                )}

                {includeSupportPlan && (
                  <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-300">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{monthlySupportPlan.name}</span>
                    </div>
                    <span className="font-mono font-bold">{monthlySupportPlan.formattedPrice}</span>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Total Estimado:
                  </span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                      {formattedTotal}
                    </span>
                    {includeSupportPlan && (
                      <div className="text-[11px] font-mono text-cyan-300 font-semibold">
                        + {monthlySupportPlan.formattedPrice}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Parcelamento facilitado: 50% entrada + 50% entrega
                </div>
              </div>

              {/* Primary Action: Send to WhatsApp */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppUrl(generateProposalText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="silver-button w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 text-slate-900" />
                  <span>Enviar Proposta via WhatsApp</span>
                  <Send className="w-3.5 h-3.5" />
                </a>

                {/* Secondary Action: Copy for Instagram */}
                <button
                  type="button"
                  onClick={handleCopyProposal}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Proposta Copiada para o Instagram!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copiar Resumo para Instagram Direct</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust statement */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Sem burocracia ou intermediários. Você conversa diretamente com o desenvolvedor responsável pela criação da sua página.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
