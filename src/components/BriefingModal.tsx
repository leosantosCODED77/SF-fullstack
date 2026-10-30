import { useState, useEffect } from 'react';
import { 
  BriefingState, 
  initialBriefingState, 
  ServiceBriefingType 
} from '../types/briefing';
import { 
  serviceLabels, 
  serviceBasePrices, 
  formatBriefingMessage, 
  getBriefingWhatsAppUrl 
} from '../utils/briefingFormatter';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  MessageSquare, 
  Copy, 
  CheckCheck, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  Edit3, 
  Layers, 
  Send,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceBriefingType;
}

export default function BriefingModal({ isOpen, onClose, initialService }: BriefingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [state, setState] = useState<BriefingState>(initialBriefingState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initial service if passed
  useEffect(() => {
    if (initialService) {
      setState(prev => ({ ...prev, serviceType: initialService }));
      // If service is preselected, we can start directly on step 2 (General info) or keep on step 1 with it selected
      setStep(2);
    } else {
      setStep(1);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  // Validation functions
  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { general } = state;

    if (!general.projectName.trim()) {
      newErrors.projectName = 'Informe o nome da sua empresa, marca ou projeto.';
    }
    if (!general.responsibleName.trim()) {
      newErrors.responsibleName = 'Informe o seu nome.';
    }
    if (!general.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Informe seu número de WhatsApp com DDD.';
    } else {
      const cleanPhone = general.whatsappNumber.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        newErrors.whatsappNumber = 'Informe um número de WhatsApp válido (com DDD, 10 ou 11 dígitos).';
      }
    }
    if (!general.businessDescription.trim()) {
      newErrors.businessDescription = 'Descreva brevemente o que sua empresa faz ou quais serviços oferece.';
    }
    if (!general.mainObjective) {
      newErrors.mainObjective = 'Selecione o objetivo principal do site.';
    } else if (general.mainObjective === 'Outro' && !general.customObjective?.trim()) {
      newErrors.customObjective = 'Especifique o objetivo do site.';
    }
    if (!general.contactChannel) {
      newErrors.contactChannel = 'Selecione o canal de contato preferencial.';
    } else if ((general.contactChannel === 'whatsapp' || general.contactChannel === 'ambos') && !general.channelWhatsapp?.trim() && !general.whatsappNumber.trim()) {
      newErrors.channelWhatsapp = 'Informe o WhatsApp para disponibilizar no site.';
    } else if ((general.contactChannel === 'email' || general.contactChannel === 'ambos') && !general.channelEmail?.trim()) {
      newErrors.channelEmail = 'Informe o e-mail para disponibilizar no site.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { serviceType, landing, institutional, ecommerce, portfolio } = state;

    if (serviceType === 'landing-page') {
      if (!landing.offerName.trim()) {
        newErrors.offerName = 'Informe qual produto, serviço ou oferta será divulgado.';
      }
      if (!landing.mainAction.trim()) {
        newErrors.mainAction = 'Informe qual ação principal o visitante deve realizar.';
      }
      if (!landing.benefitsDiff.trim()) {
        newErrors.benefitsDiff = 'Descreva os principais benefícios ou diferenciais da oferta.';
      }
    } else if (serviceType === 'site-institucional') {
      if (!institutional.mainServices.trim()) {
        newErrors.mainServices = 'Informe os principais serviços ou produtos da empresa.';
      }
      if (!institutional.companyInfoToShow.trim()) {
        newErrors.companyInfoToShow = 'Informe quais informações sobre a empresa devem aparecer.';
      }
      if (!institutional.attendanceType.trim()) {
        newErrors.attendanceType = 'Selecione se atende presencialmente, online ou ambos.';
      }
    } else if (serviceType === 'loja-virtual') {
      if (!ecommerce.ecommerceType) {
        newErrors.ecommerceType = 'Selecione se deseja um catálogo digital ou loja virtual com pagamentos online.';
      }
      if (!ecommerce.productTypes.trim()) {
        newErrors.productTypes = 'Informe quais tipos de produtos serão apresentados.';
      }
      if (!ecommerce.initialProductCount.trim()) {
        newErrors.initialProductCount = 'Informe a quantidade inicial estimada de produtos.';
      }
      if (!ecommerce.orderMethod.trim()) {
        newErrors.orderMethod = 'Informe como os clientes deverão fazer os pedidos.';
      }
    } else if (serviceType === 'portfolio-profissional') {
      if (!portfolio.professionArea.trim()) {
        newErrors.professionArea = 'Informe sua profissão ou área de atuação.';
      }
      if (!portfolio.experiencePresentation.trim()) {
        newErrors.experiencePresentation = 'Informe como gostaria de apresentar sua experiência.';
      }
      if (!portfolio.projectsToShow.trim()) {
        newErrors.projectsToShow = 'Informe quais tipos de trabalhos ou projetos deseja apresentar.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (step === 3) {
      if (validateStep3()) {
        setStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (step === 4) {
      if (!state.dataConsent) {
        setErrors({ consent: 'Você precisa confirmar a ciência sobre o uso dos dados para continuar.' });
        return;
      }
      setErrors({});
      setStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleCopy = async () => {
    const text = formatBriefingMessage(state);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const servicesList: {
    id: ServiceBriefingType;
    name: string;
    price: string;
    badge: string;
    description: string;
  }[] = [
    {
      id: 'landing-page',
      name: 'Landing Page de Alta Conversão',
      price: 'A partir de R$ 900,00',
      badge: 'Mais Procurado',
      description: 'Página única focada em converter visitantes em vendas e contatos diretos no WhatsApp.',
    },
    {
      id: 'site-institucional',
      name: 'Site Institucional Completo',
      price: 'A partir de R$ 1.250,00',
      badge: 'Para Empresas',
      description: 'Estrutura institucional completa com história, catálogo de serviços e autoridade de marca.',
    },
    {
      id: 'loja-virtual',
      name: 'Lojas e Catálogos Virtuais',
      price: 'A partir de R$ 1.500,00',
      badge: 'Vendas Online',
      description: 'Catálogo dinâmico de produtos com pedidos no WhatsApp ou loja com checkout online.',
    },
    {
      id: 'portfolio-profissional',
      name: 'Landing Page Simples',
      price: 'A partir de R$ 700,00',
      badge: 'Essencial',
      description: 'Página direta e objetiva para apresentar seus serviços essenciais e captar clientes.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#0E121B] border border-slate-700/80 shadow-2xl z-10 my-auto overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header & Progress */}
        <div className="p-5 sm:p-7 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Briefing & Solicitação de Orçamento</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    SF Full Stack
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Etapa {step} de 5: {
                    step === 1 ? 'Seleção do Serviço' :
                    step === 2 ? 'Informações Gerais' :
                    step === 3 ? 'Informações Específicas' :
                    step === 4 ? 'Revisão das Respostas' :
                    'Envio pelo WhatsApp'
                  }
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              aria-label="Fechar formulário de briefing"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-slate-300 via-slate-100 to-cyan-400 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* =========================================
              ETAPA 1: SELEÇÃO DO SERVIÇO
          ========================================= */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  Qual serviço você deseja contratar para o seu projeto?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Escolha uma das 4 soluções abaixo. Os valores apresentados são valores base de referência (*a partir deste preço*), podendo variar conforme o número de páginas e complexidade desejada.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {servicesList.map((srv) => {
                  const isSelected = state.serviceType === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, serviceType: srv.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-800/90 border-slate-300 text-white shadow-xl ring-1 ring-slate-300/40'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                            {srv.badge}
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white border-white text-slate-950' : 'border-slate-700'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <h4 className="text-base font-bold text-white mb-1.5">
                          {srv.name}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {srv.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80">
                        <span className="text-sm font-extrabold font-mono text-white tabular-nums">
                          {srv.price}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          *Valor base inicial sob demanda
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Não se preocupe: nas próximas etapas você poderá detalhar tudo o que precisa para receber uma proposta personalizada e transparente da SF Full Stack.
                </span>
              </div>
            </div>
          )}

          {/* =========================================
              ETAPA 2: INFORMAÇÕES GERAIS
          ========================================= */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Etapa 2 · Informações Gerais
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  Conte-nos sobre sua empresa e os objetivos do projeto
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Os campos marcados com asterisco (<span className="text-rose-400 font-bold">*</span>) são obrigatórios para a elaboração do orçamento. As perguntas opcionais podem ser preenchidas ou deixadas para definição com a SF.
                </p>
              </div>

              {/* Bloco 1: Perguntas Obrigatórias */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-5">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>Perguntas Obrigatórias</span>
                </div>

                {/* 1. Nome da empresa */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    1. Qual é o nome da sua empresa, marca ou projeto? <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.general.projectName}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      general: { ...prev.general, projectName: e.target.value }
                    }))}
                    placeholder="Ex: Studio Prime, Clínica Bem Estar, Nexus Tech"
                    className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                  {errors.projectName && <p className="text-xs text-rose-400 mt-1">{errors.projectName}</p>}
                </div>

                {/* 2. Nome do responsável */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    2. Qual é o seu nome? <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={state.general.responsibleName}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      general: { ...prev.general, responsibleName: e.target.value }
                    }))}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                  {errors.responsibleName && <p className="text-xs text-rose-400 mt-1">{errors.responsibleName}</p>}
                </div>

                {/* 3. WhatsApp para contato */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    3. Qual é seu número de WhatsApp para contato? <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={state.general.whatsappNumber}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      general: { ...prev.general, whatsappNumber: e.target.value }
                    }))}
                    placeholder="Ex: (91) 99153-2935"
                    className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                  {errors.whatsappNumber && <p className="text-xs text-rose-400 mt-1">{errors.whatsappNumber}</p>}
                </div>

                {/* 4. O que a empresa faz */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    4. O que sua empresa faz ou quais serviços oferece? <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={state.general.businessDescription}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      general: { ...prev.general, businessDescription: e.target.value }
                    }))}
                    placeholder="Ex: Somos uma consultoria financeira especializada em pequenas empresas..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 transition-colors"
                  />
                  {errors.businessDescription && <p className="text-xs text-rose-400 mt-1">{errors.businessDescription}</p>}
                </div>

                {/* 5. Principal objetivo do site */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    5. Qual é o principal objetivo do site? <span className="text-rose-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Atrair novos clientes',
                      'Apresentar minha empresa',
                      'Vender produtos',
                      'Divulgar meus serviços',
                      'Apresentar meus trabalhos',
                      'Outro',
                    ].map((obj) => (
                      <button
                        key={obj}
                        type="button"
                        onClick={() => setState(prev => ({
                          ...prev,
                          general: { ...prev.general, mainObjective: obj }
                        }))}
                        className={`p-3 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                          state.general.mainObjective === obj
                            ? 'bg-slate-800 border-slate-400 text-white font-semibold'
                            : 'bg-[#0E121B] border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{obj}</span>
                        {state.general.mainObjective === obj && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </div>

                  {state.general.mainObjective === 'Outro' && (
                    <input
                      type="text"
                      value={state.general.customObjective || ''}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, customObjective: e.target.value }
                      }))}
                      placeholder="Especifique o objetivo aqui..."
                      className="w-full mt-2 px-4 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                    />
                  )}
                  {errors.customObjective && <p className="text-xs text-rose-400 mt-1">{errors.customObjective}</p>}
                </div>

                {/* 6. Canal de contato desejado no site */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    6. Qual canal de contato deseja disponibilizar no site? <span className="text-rose-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['whatsapp', 'email', 'ambos'] as const).map((channel) => (
                      <button
                        key={channel}
                        type="button"
                        onClick={() => setState(prev => ({
                          ...prev,
                          general: { ...prev.general, contactChannel: channel }
                        }))}
                        className={`p-3 rounded-xl text-xs text-center border transition-all uppercase font-semibold ${
                          state.general.contactChannel === channel
                            ? 'bg-slate-800 border-slate-400 text-white'
                            : 'bg-[#0E121B] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {channel === 'ambos' ? 'WhatsApp & E-mail' : channel}
                      </button>
                    ))}
                  </div>

                  {/* Campos condicionais para canal de contato */}
                  {(state.general.contactChannel === 'whatsapp' || state.general.contactChannel === 'ambos') && (
                    <div className="mt-3">
                      <label className="block text-[11px] text-slate-400 mb-1">
                        WhatsApp que aparecerá no botão do site:
                      </label>
                      <input
                        type="tel"
                        value={state.general.channelWhatsapp || ''}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          general: { ...prev.general, channelWhatsapp: e.target.value }
                        }))}
                        placeholder={state.general.whatsappNumber || "Ex: (91) 99153-2935"}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  )}

                  {(state.general.contactChannel === 'email' || state.general.contactChannel === 'ambos') && (
                    <div className="mt-3">
                      <label className="block text-[11px] text-slate-400 mb-1">
                        E-mail que receberá as mensagens do site:
                      </label>
                      <input
                        type="email"
                        value={state.general.channelEmail || ''}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          general: { ...prev.general, channelEmail: e.target.value }
                        }))}
                        placeholder="contato@suaempresa.com.br"
                        className="w-full px-3.5 py-2 rounded-lg bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  )}
                  {errors.channelEmail && <p className="text-xs text-rose-400 mt-1">{errors.channelEmail}</p>}
                </div>
              </div>

              {/* Bloco 2: Perguntas Opcionais */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Perguntas Opcionais (Preencha se desejar)</span>
                  <span className="text-[10px] text-slate-400">Pode avançar sem preencher</span>
                </div>

                {/* 7. Logomarca */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    7. Você já possui uma logomarca?
                  </label>
                  <div className="flex items-center gap-3">
                    {[
                      { val: 'sim', label: 'Sim, já possuo' },
                      { val: 'nao', label: 'Não possuo' },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setState(prev => ({
                          ...prev,
                          general: { ...prev.general, hasLogo: opt.val as 'sim' | 'nao' }
                        }))}
                        className={`px-4 py-2 rounded-xl text-xs border ${
                          state.general.hasLogo === opt.val
                            ? 'bg-slate-800 border-slate-400 text-white font-semibold'
                            : 'bg-[#0E121B] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {state.general.hasLogo === 'nao' && (
                    <p className="text-[11px] text-slate-400 mt-1.5 italic">
                      *A SF poderá utilizar uma identidade tipográfica provisória para o seu site.
                    </p>
                  )}
                </div>

                {/* 8. Cores e 9. Estilo Visual */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      8. Quais cores gostaria de utilizar?
                    </label>
                    <input
                      type="text"
                      value={state.general.visualColors}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, visualColors: e.target.value }
                      }))}
                      placeholder="Ex: Azul e prata, preto/dourado, ou 'Deixo com a SF'"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      9. Qual estilo visual prefere?
                    </label>
                    <select
                      value={state.general.visualStyle}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, visualStyle: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white focus:outline-none focus:border-slate-400"
                    >
                      <option value="Moderno">Moderno</option>
                      <option value="Minimalista">Minimalista</option>
                      <option value="Luxuoso">Luxuoso</option>
                      <option value="Corporativo">Corporativo</option>
                      <option value="Tecnológico">Tecnológico</option>
                      <option value="Criativo">Criativo</option>
                      <option value="Deixo a escolha com a SF">Deixo a escolha com a SF</option>
                    </select>
                  </div>
                </div>

                {/* 10. Fotos e 11. Referências */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      10. Possui fotos ou imagens para utilizar?
                    </label>
                    <select
                      value={state.general.hasPhotos}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, hasPhotos: e.target.value as any }
                      }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white focus:outline-none focus:border-slate-400"
                    >
                      <option value="">Selecione...</option>
                      <option value="sim">Sim, já possuo fotos</option>
                      <option value="nao">Não possuo</option>
                      <option value="vou_providenciar">Ainda vou providenciar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      11. Possui algum site como referência?
                    </label>
                    <input
                      type="text"
                      value={state.general.referenceLinks}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, referenceLinks: e.target.value }
                      }))}
                      placeholder="Links de sites que você gosta"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                {/* 12. Domínio e Hospedagem */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    12. Já possui domínio e hospedagem?
                  </label>
                  <select
                    value={state.general.domainHosting}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      general: { ...prev.general, domainHosting: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white focus:outline-none focus:border-slate-400"
                  >
                    <option value="Possuo ambos">Possuo ambos</option>
                    <option value="Tenho apenas domínio">Tenho apenas domínio</option>
                    <option value="Tenho apenas hospedagem">Tenho apenas hospedagem</option>
                    <option value="Não possuo">Não possuo (orientar contratação)</option>
                    <option value="Não sei o que são">Não sei o que são</option>
                  </select>
                </div>

                {/* 13. Redes sociais, 14. Data desejada e 15. Informação adicional */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      13. Redes sociais a incluir no site
                    </label>
                    <input
                      type="text"
                      value={state.general.socialNetworks}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, socialNetworks: e.target.value }
                      }))}
                      placeholder="Ex: @instagram, LinkedIn, Facebook"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      14. Data desejada para entrega (opcional)
                    </label>
                    <input
                      type="date"
                      value={state.general.desiredDeadline}
                      onChange={(e) => setState(prev => ({
                        ...prev,
                        general: { ...prev.general, desiredDeadline: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white focus:outline-none focus:border-slate-400"
                    />
                    <span className="text-[10px] text-slate-400 block mt-1">
                      *O prazo definitivo será combinado com a SF.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    15. Existe alguma informação adicional importante?
                  </label>
                  <textarea
                    rows={2}
                    value={state.general.additionalNotes}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      general: { ...prev.general, additionalNotes: e.target.value }
                    }))}
                    placeholder="Outros detalhes, dúvidas ou preferências..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              ETAPA 3: INFORMAÇÕES ESPECÍFICAS POR SERVIÇO
          ========================================= */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Etapa 3 · Especificidades do Serviço
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  Detalhes específicos: {serviceLabels[state.serviceType]}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Perguntas direcionadas para a estrutura de {serviceLabels[state.serviceType]}.
                </p>
              </div>

              {/* SERVIÇO 1 — LANDING PAGE */}
              {state.serviceType === 'landing-page' && (
                <div className="space-y-5">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Obrigatórias para Landing Page
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        1. Qual produto, serviço ou oferta será divulgado? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.landing.offerName}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          landing: { ...prev.landing, offerName: e.target.value }
                        }))}
                        placeholder="Ex: Consultoria de Gestão Financeira ou Curso Online"
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.offerName && <p className="text-xs text-rose-400 mt-1">{errors.offerName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        2. Qual ação principal deseja que o visitante realize? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.landing.mainAction}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          landing: { ...prev.landing, mainAction: e.target.value }
                        }))}
                        placeholder="Ex: Chamar no WhatsApp, preencher formulário, agendar reunião..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.mainAction && <p className="text-xs text-rose-400 mt-1">{errors.mainAction}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        3. Quais são os principais benefícios ou diferenciais da oferta? <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={state.landing.benefitsDiff}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          landing: { ...prev.landing, benefitsDiff: e.target.value }
                        }))}
                        placeholder="Ex: Atendimento rápido, garantia de 30 dias, suporte 24h, metodologia própria..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.benefitsDiff && <p className="text-xs text-rose-400 mt-1">{errors.benefitsDiff}</p>}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Opcionais para Landing Page
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        4. Possui depoimentos reais de clientes?
                      </label>
                      <input
                        type="text"
                        value={state.landing.hasTestimonials}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          landing: { ...prev.landing, hasTestimonials: e.target.value }
                        }))}
                        placeholder="Ex: Sim, possuo prints de WhatsApp / vídeos curtos"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        5. Existe alguma promoção ou condição especial de lançamento?
                      </label>
                      <input
                        type="text"
                        value={state.landing.hasSpecialPromo}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          landing: { ...prev.landing, hasSpecialPromo: e.target.value }
                        }))}
                        placeholder="Ex: Desconto de 15% para os primeiros 10 clientes"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        6. Deseja incluir vídeos, galeria de imagens ou seção de FAQ?
                      </label>
                      <input
                        type="text"
                        value={state.landing.extraElements}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          landing: { ...prev.landing, extraElements: e.target.value }
                        }))}
                        placeholder="Ex: Sim, desejo FAQ com perguntas frequentes e vídeo do YouTube"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SERVIÇO 2 — SITE INSTITUCIONAL */}
              {state.serviceType === 'site-institucional' && (
                <div className="space-y-5">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Obrigatórias para Site Institucional
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        1. Quais são os principais serviços ou produtos da empresa? <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={state.institutional.mainServices}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          institutional: { ...prev.institutional, mainServices: e.target.value }
                        }))}
                        placeholder="Liste os principais serviços que devem ser destacados..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.mainServices && <p className="text-xs text-rose-400 mt-1">{errors.mainServices}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        2. Quais informações sobre a empresa devem aparecer no site? <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={state.institutional.companyInfoToShow}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          institutional: { ...prev.institutional, companyInfoToShow: e.target.value }
                        }))}
                        placeholder="Ex: Anos de mercado, missão, valores, diferenciais técnicos..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.companyInfoToShow && <p className="text-xs text-rose-400 mt-1">{errors.companyInfoToShow}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        3. Sua empresa atende presencialmente, online ou ambos? Qual região atende? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.institutional.attendanceType}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          institutional: { ...prev.institutional, attendanceType: e.target.value }
                        }))}
                        placeholder="Ex: Ambos. Atendemos Belém presencialmente e todo o Brasil online."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.attendanceType && <p className="text-xs text-rose-400 mt-1">{errors.attendanceType}</p>}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Opcionais para Site Institucional
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        4. Deseja páginas específicas (ex: Sobre Nós, Equipe, Unidades)?
                      </label>
                      <input
                        type="text"
                        value={state.institutional.specificPages}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          institutional: { ...prev.institutional, specificPages: e.target.value }
                        }))}
                        placeholder="Ex: Home, Quem Somos, Serviços, Contato e Trabalhe Conosco"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        5. Possui fotos da equipe ou do estabelecimento comercial?
                      </label>
                      <input
                        type="text"
                        value={state.institutional.hasTeamPhotos}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          institutional: { ...prev.institutional, hasTeamPhotos: e.target.value }
                        }))}
                        placeholder="Ex: Sim, temos fotos profissionais do escritório e equipe"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        6. Deseja incluir mapa de localização ou formulário detalhado?
                      </label>
                      <input
                        type="text"
                        value={state.institutional.includeMapOrForm}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          institutional: { ...prev.institutional, includeMapOrForm: e.target.value }
                        }))}
                        placeholder="Ex: Sim, Google Maps e formulário de cotação"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SERVIÇO 3 — LOJAS E CATÁLOGOS VIRTUAIS */}
              {state.serviceType === 'loja-virtual' && (
                <div className="space-y-5">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Obrigatórias para Lojas e Catálogos
                    </div>

                    {/* Pergunta Condicional Principal */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        1. Qual modelo você deseja contratar? <span className="text-rose-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setState(prev => ({
                            ...prev,
                            ecommerce: { ...prev.ecommerce, ecommerceType: 'catalogo_digital', orderMethod: 'WhatsApp' }
                          }))}
                          className={`p-4 rounded-xl text-left border ${
                            state.ecommerce.ecommerceType === 'catalogo_digital'
                              ? 'bg-slate-800 border-slate-400 text-white font-semibold'
                              : 'bg-[#0E121B] border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="font-bold text-xs mb-1">Catálogo Digital Ágil</div>
                          <div className="text-[11px] text-slate-400">
                            Vitrine de produtos com fotos e preços. O cliente monta o pedido e fecha direto no WhatsApp sem taxas.
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setState(prev => ({
                            ...prev,
                            ecommerce: { ...prev.ecommerce, ecommerceType: 'loja_completa', orderMethod: 'Checkout Online' }
                          }))}
                          className={`p-4 rounded-xl text-left border ${
                            state.ecommerce.ecommerceType === 'loja_completa'
                              ? 'bg-slate-800 border-slate-400 text-white font-semibold'
                              : 'bg-[#0E121B] border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="font-bold text-xs mb-1">Loja Virtual com Pagamento Online</div>
                          <div className="text-[11px] text-slate-400">
                            Loja completa com carrinho, gateway de pagamento (Pix/Cartão) e cálculo de frete.
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        2. Quais tipos de produtos serão apresentados? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.ecommerce.productTypes}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          ecommerce: { ...prev.ecommerce, productTypes: e.target.value }
                        }))}
                        placeholder="Ex: Roupas femininas, calçados, joias, eletrônicos..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.productTypes && <p className="text-xs text-rose-400 mt-1">{errors.productTypes}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        3. Quantos produtos pretende cadastrar inicialmente? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.ecommerce.initialProductCount}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          ecommerce: { ...prev.ecommerce, initialProductCount: e.target.value }
                        }))}
                        placeholder="Ex: Até 20 produtos, 50 produtos, mais de 100..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.initialProductCount && <p className="text-xs text-rose-400 mt-1">{errors.initialProductCount}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        4. Como os clientes deverão fazer os pedidos? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.ecommerce.orderMethod}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          ecommerce: { ...prev.ecommerce, orderMethod: e.target.value }
                        }))}
                        placeholder="Ex: Mensagem estruturada no WhatsApp ou checkout integrado"
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.orderMethod && <p className="text-xs text-rose-400 mt-1">{errors.orderMethod}</p>}
                    </div>

                    {/* PERGUNTAS CONDICIONAIS PARA LOJA COMPLETA */}
                    {state.ecommerce.ecommerceType === 'loja_completa' && (
                      <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-3.5 pt-4">
                        <div className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Especificidades de Loja com Pagamento Online</span>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                            Formas de pagamento desejadas (ex: Pix, Cartão de Crédito, Boleto):
                          </label>
                          <input
                            type="text"
                            value={state.ecommerce.paymentMethods || ''}
                            onChange={(e) => setState(prev => ({
                              ...prev,
                              ecommerce: { ...prev.ecommerce, paymentMethods: e.target.value }
                            }))}
                            placeholder="Ex: Mercado Pago, Asaas, Stripe (Pix e Cartão)"
                            className="w-full px-3 py-2 rounded-lg bg-[#0E121B] border border-slate-800 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                            Formas de entrega ou retirada:
                          </label>
                          <input
                            type="text"
                            value={state.ecommerce.deliveryMethods || ''}
                            onChange={(e) => setState(prev => ({
                              ...prev,
                              ecommerce: { ...prev.ecommerce, deliveryMethods: e.target.value }
                            }))}
                            placeholder="Ex: Correios (Sedex/PAC), Motoboy local, Retirada no local"
                            className="w-full px-3 py-2 rounded-lg bg-[#0E121B] border border-slate-800 text-xs text-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                              Regiões atendidas:
                            </label>
                            <input
                              type="text"
                              value={state.ecommerce.regionsServed || ''}
                              onChange={(e) => setState(prev => ({
                                ...prev,
                                ecommerce: { ...prev.ecommerce, regionsServed: e.target.value }
                              }))}
                              placeholder="Ex: Todo o Brasil ou apenas minha cidade"
                              className="w-full px-3 py-2 rounded-lg bg-[#0E121B] border border-slate-800 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-300 mb-1 font-medium">
                              Variações de produtos (tamanhos, cores):
                            </label>
                            <input
                              type="text"
                              value={state.ecommerce.estimatedVariations || ''}
                              onChange={(e) => setState(prev => ({
                                ...prev,
                                ecommerce: { ...prev.ecommerce, estimatedVariations: e.target.value }
                              }))}
                              placeholder="Ex: Sim (tamanhos P, M, G e cores)"
                              className="w-full px-3 py-2 rounded-lg bg-[#0E121B] border border-slate-800 text-xs text-white"
                            />
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 italic">
                          *Informações preliminares para elaboração da proposta técnica pela SF.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Opcionais para Loja / Catálogo
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          5. Deseja organizar por categorias?
                        </label>
                        <input
                          type="text"
                          value={state.ecommerce.hasCategories}
                          onChange={(e) => setState(prev => ({
                            ...prev,
                            ecommerce: { ...prev.ecommerce, hasCategories: e.target.value }
                          }))}
                          placeholder="Ex: Sim (Masculino, Feminino, Acessórios)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          6. Deseja filtros e busca interna?
                        </label>
                        <input
                          type="text"
                          value={state.ecommerce.hasFiltersSearch}
                          onChange={(e) => setState(prev => ({
                            ...prev,
                            ecommerce: { ...prev.ecommerce, hasFiltersSearch: e.target.value }
                          }))}
                          placeholder="Ex: Sim, busca por nome e filtro de preço"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SERVIÇO 4 — LANDING PAGE SIMPLES */}
              {state.serviceType === 'portfolio-profissional' && (
                <div className="space-y-5">
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Obrigatórias para Landing Page Simples
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        1. Qual é sua profissão ou área de atuação? <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={state.portfolio.professionArea}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, professionArea: e.target.value }
                        }))}
                        placeholder="Ex: Arquiteto, Designer Gráfico, Fotógrafo, Programador..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.professionArea && <p className="text-xs text-rose-400 mt-1">{errors.professionArea}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        2. Como gostaria de apresentar sua experiência profissional? <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={state.portfolio.experiencePresentation}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, experiencePresentation: e.target.value }
                        }))}
                        placeholder="Ex: Linha do tempo, lista de clientes atendidos, bio executiva..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.experiencePresentation && <p className="text-xs text-rose-400 mt-1">{errors.experiencePresentation}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        3. Que tipos de trabalhos ou projetos deseja apresentar? <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={2}
                        value={state.portfolio.projectsToShow}
                        onChange={(e) => setState(prev => ({
                          ...prev,
                          portfolio: { ...prev.portfolio, projectsToShow: e.target.value }
                        }))}
                        placeholder="Ex: Fotos de projetos residenciais, identidades visuais de marcas..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0E121B] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                      />
                      {errors.projectsToShow && <p className="text-xs text-rose-400 mt-1">{errors.projectsToShow}</p>}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-4">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Opcionais para Landing Page Simples
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          4. Formação acadêmica, cursos ou prêmios?
                        </label>
                        <input
                          type="text"
                          value={state.portfolio.academicCursos}
                          onChange={(e) => setState(prev => ({
                            ...prev,
                            portfolio: { ...prev.portfolio, academicCursos: e.target.value }
                          }))}
                          placeholder="Ex: Graduação em Arquitetura, Pós em Iluminação"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          5. Tom do portfólio (Discreto, Criativo, etc.)?
                        </label>
                        <input
                          type="text"
                          value={state.portfolio.portfolioTone}
                          onChange={(e) => setState(prev => ({
                            ...prev,
                            portfolio: { ...prev.portfolio, portfolioTone: e.target.value }
                          }))}
                          placeholder="Ex: Minimalista e sofisticado"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E121B] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* =========================================
              ETAPA 4: REVISÃO COMPLETA
          ========================================= */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Etapa 4 · Revisão
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  Revise as informações antes de enviar pelo WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Confira o resumo das suas respostas. Caso deseje alterar qualquer ponto, utilize os botões de edição ao lado de cada seção.
                </p>
              </div>

              {/* Card 1: Serviço Escolhido */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">Serviço Selecionado:</div>
                  <div className="text-base font-bold text-white mt-0.5">{serviceLabels[state.serviceType]}</div>
                  <div className="text-xs text-slate-400">{serviceBasePrices[state.serviceType]}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Trocar</span>
                </button>
              </div>

              {/* Card 2: Dados do Cliente & Informações Gerais */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Dados Gerais do Projeto
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div><strong className="text-white">Empresa / Projeto:</strong> {state.general.projectName}</div>
                  <div><strong className="text-white">Responsável:</strong> {state.general.responsibleName}</div>
                  <div><strong className="text-white">WhatsApp:</strong> {state.general.whatsappNumber}</div>
                  <div><strong className="text-white">Objetivo Principal:</strong> {state.general.mainObjective === 'Outro' ? state.general.customObjective : state.general.mainObjective}</div>
                  <div className="sm:col-span-2"><strong className="text-white">O que faz:</strong> {state.general.businessDescription}</div>
                  <div><strong className="text-white">Cores:</strong> {state.general.visualColors.trim() || 'A definir pela SF'}</div>
                  <div><strong className="text-white">Estilo Visual:</strong> {state.general.visualStyle}</div>
                </div>
              </div>

              {/* Card 3: Dados Específicos */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Informações Específicas do Serviço
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                </div>

                <div className="text-xs text-slate-300 space-y-1.5">
                  {state.serviceType === 'landing-page' && (
                    <>
                      <div><strong className="text-white">Oferta:</strong> {state.landing.offerName}</div>
                      <div><strong className="text-white">Ação Principal:</strong> {state.landing.mainAction}</div>
                      <div><strong className="text-white">Diferenciais:</strong> {state.landing.benefitsDiff}</div>
                    </>
                  )}
                  {state.serviceType === 'site-institucional' && (
                    <>
                      <div><strong className="text-white">Serviços da Empresa:</strong> {state.institutional.mainServices}</div>
                      <div><strong className="text-white">Atendimento:</strong> {state.institutional.attendanceType}</div>
                      <div><strong className="text-white">Informações da Marca:</strong> {state.institutional.companyInfoToShow}</div>
                    </>
                  )}
                  {state.serviceType === 'loja-virtual' && (
                    <>
                      <div><strong className="text-white">Modelo:</strong> {state.ecommerce.ecommerceType === 'loja_completa' ? 'Loja Virtual com Pagamento Online' : 'Catálogo Digital'}</div>
                      <div><strong className="text-white">Produtos:</strong> {state.ecommerce.productTypes} ({state.ecommerce.initialProductCount} itens)</div>
                      <div><strong className="text-white">Fechamento:</strong> {state.ecommerce.orderMethod}</div>
                    </>
                  )}
                  {state.serviceType === 'portfolio-profissional' && (
                    <>
                      <div><strong className="text-white">Área:</strong> {state.portfolio.professionArea}</div>
                      <div><strong className="text-white">Apresentação:</strong> {state.portfolio.experiencePresentation}</div>
                      <div><strong className="text-white">Projetos:</strong> {state.portfolio.projectsToShow}</div>
                    </>
                  )}
                </div>
              </div>

              {/* Termo de Privacidade & Consentimento Obrigatório */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.dataConsent}
                    onChange={(e) => {
                      setState(prev => ({ ...prev, dataConsent: e.target.checked }));
                      if (e.target.checked && errors.consent) {
                        setErrors({});
                      }
                    }}
                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                  />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Confirmação de Ciência & Privacidade: </span>
                    Estou ciente de que as informações fornecidas serão utilizadas exclusivamente pela equipe da SF Full Stack para entrar em contato e elaborar a proposta de orçamento. O envio final é feito pelo meu próprio WhatsApp. Não solicitamos nem armazenamos senhas, CPF ou dados bancários.
                  </div>
                </label>
                {errors.consent && (
                  <p className="text-xs text-rose-400 font-semibold">{errors.consent}</p>
                )}
              </div>
            </div>
          )}

          {/* =========================================
              ETAPA 5: ENVIO PELO WHATSAPP
          ========================================= */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="text-center max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  Seu briefing está pronto para envio!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Clique no botão abaixo para abrir o WhatsApp oficial da SF Full Stack com a mensagem estruturada pronta para envio.
                </p>
              </div>

              {/* Caixa de Visualização da Mensagem */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 sm:p-5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                  <span>Prévia da Mensagem Formatada</span>
                  <button
                    onClick={handleCopy}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 normal-case font-medium"
                  >
                    {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                  </button>
                </div>
                <div className="max-h-56 overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed p-3 rounded-xl bg-[#0B0D13] border border-slate-900">
                  {formatBriefingMessage(state)}
                </div>
              </div>

              {/* Botões de Envio e Cópia */}
              <div className="space-y-3">
                <a
                  href={getBriefingWhatsAppUrl(state)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="silver-button w-full py-4 px-6 rounded-2xl text-sm font-bold text-center flex items-center justify-center gap-2.5 shadow-xl hover:shadow-cyan-500/10"
                >
                  <MessageSquare className="w-5 h-5 text-slate-950" />
                  <span>Abrir WhatsApp com Briefing Preenchido</span>
                  <Send className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Briefing Copiado para a Área de Transferência!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copiar Briefing Completo (Alternativa caso prefira colar manualmente)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Aviso Importante de Confirmação */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ⚠️ <strong className="text-slate-300">Atenção:</strong> O envio não é realizado de forma invisível. Ao clicar no botão, seu aplicativo do WhatsApp será aberto com o texto preenchido e cabe a você clicar em <em>Enviar</em> para iniciar a conversa com a SF.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 shrink-0 flex items-center justify-between gap-4">
          {step > 1 && step < 5 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="silver-button px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md ml-auto"
            >
              <span>{step === 4 ? 'Confirmar e Ir para o WhatsApp' : 'Continuar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors ml-auto"
            >
              Fechar
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}
