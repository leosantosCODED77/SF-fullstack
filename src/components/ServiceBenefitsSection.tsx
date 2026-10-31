import { useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  MessageSquare,
  Rocket,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { getWhatsAppUrl } from '../data/siteConfig';

const serviceBenefits = [
  {
    id: 'landing-page',
    name: 'Landing Page de Alta Conversão',
    subtitle: 'Uma oferta clara, com um caminho direto até o contato.',
    icon: Rocket,
    reason: 'Ideal para divulgar um serviço, lançamento ou oferta específica em uma página criada para incentivar pedidos de orçamento.',
    usage: 'Compartilhe o link no Instagram, WhatsApp, QR Codes ou campanhas. O visitante conhece a proposta e pode entrar em contato com a empresa.',
    benefit: 'Ajuda a organizar a divulgação e facilita o primeiro passo de quem tem interesse na sua oferta.',
  },
  {
    id: 'site-institucional',
    name: 'Site Institucional Completo',
    subtitle: 'Uma presença digital profissional para sua empresa.',
    icon: Building2,
    reason: 'Reúne a história da empresa, serviços, diferenciais e contatos em um espaço próprio, ajudando a transmitir credibilidade.',
    usage: 'Divulgue o endereço no Instagram, no Perfil da Empresa no Google, em propostas comerciais e materiais de apresentação.',
    benefit: 'Permite que possíveis clientes encontrem informações importantes sobre o negócio em qualquer horário.',
  },
  {
    id: 'loja-virtual',
    name: 'Lojas e Catálogos Virtuais',
    subtitle: 'Seus produtos organizados e fáceis de consultar.',
    icon: ShoppingBag,
    reason: 'Apresenta produtos, fotos, descrições e valores de forma organizada, reduzindo a necessidade de enviar itens individualmente.',
    usage: 'Compartilhe o catálogo com os clientes. Eles consultam os produtos e, conforme o projeto contratado, finalizam pelo WhatsApp ou por um checkout.',
    benefit: 'Facilita a escolha dos produtos e torna a jornada de compra mais clara para o consumidor.',
  },
  {
    id: 'cardapio-digital',
    name: 'Cardápio Interativo',
    subtitle: 'Mais praticidade para apresentar o menu e receber pedidos.',
    icon: UtensilsCrossed,
    reason: 'Deixa pratos, bebidas, adicionais e preços acessíveis de forma prática, sem depender de fotos avulsas do cardápio.',
    usage: 'Coloque um QR Code nas mesas ou divulgue o link nas redes sociais. O cliente escolhe os itens e pode enviar o pedido pelo WhatsApp.',
    benefit: 'Ajuda a organizar as informações dos pedidos e simplifica o atendimento do estabelecimento.',
  },
  {
    id: 'portfolio-profissional',
    name: 'Landing Page Simples',
    subtitle: 'Uma apresentação direta para profissionais e pequenos negócios.',
    icon: BriefcaseBusiness,
    reason: 'É uma forma acessível de apresentar serviços, trabalhos realizados e maneiras de entrar em contato em uma única página.',
    usage: 'Compartilhe o link no Instagram, WhatsApp, currículo ou cartão digital para que as pessoas conheçam seu trabalho e solicitem atendimento.',
    benefit: 'Centraliza sua apresentação profissional e facilita que interessados encontrem seus serviços e contatos.',
  },
];

export default function ServiceBenefitsSection() {
  const [openId, setOpenId] = useState<string | null>('landing-page');

  return (
    <section
      id="beneficios-servicos"
      aria-labelledby="beneficios-servicos-titulo"
      className="relative border-t border-slate-800/80 bg-[#090B10] py-20 scroll-mt-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
            <span>Entenda nossas soluções</span>
          </div>
          <h2
            id="beneficios-servicos-titulo"
            className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Por que contratar e <span className="silver-gradient-text">como utilizar?</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Conheça o propósito de cada serviço da SF Full Stack e descubra como usar sua solução digital no dia a dia do negócio.
          </p>
        </div>

        <div className="space-y-3">
          {serviceBenefits.map((service) => {
            const isOpen = openId === service.id;
            const Icon = service.icon;
            const panelId = 'beneficio-' + service.id;

            return (
              <div
                key={service.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0E121B] transition-colors hover:border-slate-700"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full min-w-0 items-center gap-3 p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 sm:gap-4 sm:p-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-cyan-300 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-snug text-white sm:text-lg">
                        {service.name}
                      </span>
                      <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-400 sm:text-sm">
                        {service.subtitle}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={'h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ' + (isOpen ? 'rotate-180' : '')}
                    />
                  </button>
                </h3>

                <div id={panelId} hidden={!isOpen} className="border-t border-slate-800/80 px-4 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-300">Por que contratar?</h4>
                      <p className="text-sm leading-relaxed text-slate-300">{service.reason}</p>
                    </div>
                    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-300">Como utilizar?</h4>
                      <p className="text-sm leading-relaxed text-slate-300">{service.usage}</p>
                    </div>
                    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-cyan-300">Benefício para o negócio</h4>
                      <p className="text-sm leading-relaxed text-slate-300">{service.benefit}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-start sm:justify-end">
                    <a
                      href={getWhatsAppUrl('Olá! Li sobre ' + service.name + ' no site da SF Full Stack e gostaria de saber mais sobre essa solução.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="silver-button inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold sm:w-auto"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      <span>Tirar dúvidas sobre este serviço</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          Cada projeto é personalizado. A disponibilidade de recursos depende do que for contratado; resultados comerciais também dependem da divulgação e do atendimento da empresa.
        </p>
      </div>
    </section>
  );
}
