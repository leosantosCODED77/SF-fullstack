import { BriefingState, ServiceBriefingType } from '../types/briefing';
import { siteConfig } from '../data/siteConfig';

export const serviceLabels: Record<ServiceBriefingType, string> = {
  'landing-page': 'Landing Page de Alta Conversão',
  'site-institucional': 'Site Institucional Completo',
  'loja-virtual': 'Lojas e Catálogos Virtuais',
  'cardapio-digital': 'Cardápio Interativo',
  'portfolio-profissional': 'Landing Page Simples',
};

export const serviceBasePrices: Record<ServiceBriefingType, string> = {
  'landing-page': 'A partir de R$ 700,00',
  'site-institucional': 'A partir de R$ 1.000,00',
  'loja-virtual': 'A partir de R$ 1.200,00',
  'cardapio-digital': 'A partir de R$ 600,00',
  'portfolio-profissional': 'A partir de R$ 500,00',
};

export function formatBriefingMessage(state: BriefingState): string {
  const { serviceType, general, landing, institutional, ecommerce, portfolio, cardapio } = state;

  const lines: string[] = [];

  lines.push(`*NOVA SOLICITAÇÃO DE ORÇAMENTO — SF FULL STACK*`);
  lines.push(``);
  lines.push(`🚀 *SERVIÇO SOLICITADO:*`);
  lines.push(`${serviceLabels[serviceType]} (${serviceBasePrices[serviceType]})`);
  lines.push(``);

  lines.push(`👤 *DADOS DO CLIENTE:*`);
  lines.push(`• *Responsável:* ${general.responsibleName || 'Não informado'}`);
  lines.push(`• *Empresa / Projeto:* ${general.projectName || 'Não informado'}`);
  lines.push(`• *WhatsApp:* ${general.whatsappNumber || 'Não informado'}`);
  if (general.contactChannel === 'email' || general.contactChannel === 'ambos') {
    lines.push(`• *E-mail de Contato:* ${general.channelEmail || 'Não informado'}`);
  }
  lines.push(``);

  lines.push(`📋 *INFORMAÇÕES GERAIS DO PROJETO:*`);
  lines.push(`• *O que faz:* ${general.businessDescription || 'Não informado'}`);
  lines.push(`• *Principal Objetivo:* ${general.mainObjective === 'Outro' ? (general.customObjective || 'Outro') : general.mainObjective}`);
  lines.push(`• *Canal no Site:* ${general.contactChannel ? general.contactChannel.toUpperCase() : 'WhatsApp'}`);
  lines.push(``);

  // Informações específicas do serviço
  if (serviceType === 'landing-page') {
    lines.push(`🎯 *DETALHES DA LANDING PAGE:*`);
    lines.push(`• *Produto / Oferta:* ${landing.offerName || 'Não informado'}`);
    lines.push(`• *Ação Principal:* ${landing.mainAction || 'Não informado'}`);
    lines.push(`• *Benefícios / Diferenciais:* ${landing.benefitsDiff || 'Não informado'}`);
    if (landing.hasTestimonials) lines.push(`• *Depoimentos:* ${landing.hasTestimonials}`);
    if (landing.hasSpecialPromo) lines.push(`• *Promoção Especial:* ${landing.hasSpecialPromo}`);
    if (landing.extraElements) lines.push(`• *Elementos Extras:* ${landing.extraElements}`);
    lines.push(``);
  } else if (serviceType === 'site-institucional') {
    lines.push(`🏢 *DETALHES DO SITE INSTITUCIONAL:*`);
    lines.push(`• *Principais Serviços / Produtos:* ${institutional.mainServices || 'Não informado'}`);
    lines.push(`• *Informações sobre a Empresa:* ${institutional.companyInfoToShow || 'Não informado'}`);
    lines.push(`• *Tipo de Atendimento:* ${institutional.attendanceType || 'Não informado'}`);
    if (institutional.regionServed) lines.push(`• *Região Atendida:* ${institutional.regionServed}`);
    if (institutional.specificPages) lines.push(`• *Páginas Desejadas:* ${institutional.specificPages}`);
    if (institutional.hasTeamPhotos) lines.push(`• *Fotos de Equipe / Local:* ${institutional.hasTeamPhotos}`);
    if (institutional.includeMapOrForm) lines.push(`• *Mapa / Formulário:* ${institutional.includeMapOrForm}`);
    lines.push(``);
  } else if (serviceType === 'loja-virtual') {
    lines.push(`🛍️ *DETALHES DE LOJA / CATÁLOGO:*`);
    lines.push(`• *Modalidade:* ${ecommerce.ecommerceType === 'loja_completa' ? 'Loja Virtual com Pagamento Online' : 'Catálogo Digital'}`);
    lines.push(`• *Tipos de Produtos:* ${ecommerce.productTypes || 'Não informado'}`);
    lines.push(`• *Qtd. Inicial Estimada:* ${ecommerce.initialProductCount || 'Não informado'}`);
    lines.push(`• *Como Fechar Pedidos:* ${ecommerce.orderMethod || 'Não informado'}`);

    if (ecommerce.ecommerceType === 'loja_completa') {
      lines.push(`• *Formas de Pagamento:* ${ecommerce.paymentMethods || 'A definir'}`);
      lines.push(`• *Entrega / Frete:* ${ecommerce.deliveryMethods || 'A definir'}`);
      if (ecommerce.regionsServed) lines.push(`• *Regiões:* ${ecommerce.regionsServed}`);
      if (ecommerce.estimatedVariations) lines.push(`• *Variações de Produtos:* ${ecommerce.estimatedVariations}`);
    }

    if (ecommerce.hasCategories) lines.push(`• *Categorias:* ${ecommerce.hasCategories}`);
    if (ecommerce.hasFiltersSearch) lines.push(`• *Busca / Filtros:* ${ecommerce.hasFiltersSearch}`);
    if (ecommerce.hasOwnPhotos) lines.push(`• *Fotos Próprias:* ${ecommerce.hasOwnPhotos}`);
    lines.push(``);
  } else if (serviceType === 'portfolio-profissional') {
    lines.push(`💼 *DETALHES DO PROJETO:*`);
    lines.push(`• *Profissão / Atuação:* ${portfolio.professionArea || 'Não informado'}`);
    lines.push(`• *Apresentação da Experiência:* ${portfolio.experiencePresentation || 'Não informado'}`);
    lines.push(`• *Serviços / Projetos:* ${portfolio.projectsToShow || 'Não informado'}`);
    if (portfolio.academicCursos) lines.push(`• *Formação / Cursos:* ${portfolio.academicCursos}`);
    if (portfolio.portfolioTone) lines.push(`• *Tom / Estilo:* ${portfolio.portfolioTone}`);
    lines.push(``);
  } else if (serviceType === 'cardapio-digital') {
    lines.push(`🍕 *DETALHES DO CARDÁPIO INTERATIVO:*`);
    lines.push(`• *Estabelecimento:* ${cardapio.establishmentType || 'Não informado'}`);
    lines.push(`• *Categorias do Cardápio:* ${cardapio.categoriesList || 'Não informado'}`);
    lines.push(`• *Qtd. Estimada de Itens:* ${cardapio.estimatedItemsCount || 'Não informado'}`);
    lines.push(`• *Pedidos no WhatsApp:* ${cardapio.orderViaWhatsapp || 'Sim'}`);
    if (cardapio.hasOptionalsAddons) lines.push(`• *Adicionais / Opcionais:* ${cardapio.hasOptionalsAddons}`);
    if (cardapio.hasQrCodePrint) lines.push(`• *QR Code p/ Balcão/Mesas:* ${cardapio.hasQrCodePrint}`);
    if (cardapio.hasProductPhotos) lines.push(`• *Fotos dos Produtos:* ${cardapio.hasProductPhotos}`);
    if (cardapio.additionalMenuNotes) lines.push(`• *Horários / Regras:* ${cardapio.additionalMenuNotes}`);
    lines.push(``);
  }

  lines.push(`🎨 *PREFERÊNCIAS VISUAIS & ESTRUTURA:*`);
  lines.push(`• *Logomarca:* ${general.hasLogo ? (general.hasLogo === 'sim' ? 'Já possui' : 'Não possui (utilizar identidade provisória SF)') : 'A definir pela SF'}`);
  lines.push(`• *Cores:* ${general.visualColors.trim() ? general.visualColors : 'Deixo a escolha com a SF'}`);
  lines.push(`• *Estilo Visual:* ${general.visualStyle || 'Deixo a escolha com a SF'}`);
  lines.push(`• *Fotos / Imagens:* ${general.hasPhotos ? (general.hasPhotos === 'sim' ? 'Já possui fotos' : general.hasPhotos === 'vou_providenciar' ? 'Ainda vai providenciar' : 'Não possui') : 'A definir'}`);
  lines.push(`• *Domínio e Hospedagem:* ${general.domainHosting || 'A orientar pela SF'}`);
  if (general.referenceLinks.trim()) {
    lines.push(`• *Sites de Referência:* ${general.referenceLinks}`);
  }
  if (general.socialNetworks.trim()) {
    lines.push(`• *Redes Sociais:* ${general.socialNetworks}`);
  }
  if (general.desiredDeadline.trim()) {
    lines.push(`• *Previsão Desejada:* ${general.desiredDeadline} (a combinar com SF)`);
  }
  if (general.additionalNotes.trim()) {
    lines.push(``);
    lines.push(`📝 *INFORMAÇÕES ADICIONAIS:*`);
    lines.push(general.additionalNotes.trim());
  }

  lines.push(``);
  lines.push(`_Briefing gerado pela landing page oficial da SF Full Stack._`);

  return lines.join('\n');
}

export function getBriefingWhatsAppUrl(state: BriefingState): string {
  const message = formatBriefingMessage(state);
  return `${siteConfig.whatsapp.baseUrl}?text=${encodeURIComponent(message)}`;
}
