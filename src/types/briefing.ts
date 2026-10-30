export type ServiceBriefingType = 
  | 'landing-page' 
  | 'site-institucional' 
  | 'loja-virtual' 
  | 'cardapio-digital'
  | 'portfolio-profissional';

export interface GeneralBriefingData {
  // Obrigatórias
  projectName: string;
  responsibleName: string;
  whatsappNumber: string;
  businessDescription: string;
  mainObjective: string;
  customObjective?: string;
  contactChannel: 'whatsapp' | 'email' | 'ambos' | '';
  channelWhatsapp?: string;
  channelEmail?: string;

  // Opcionais
  hasLogo: 'sim' | 'nao' | '';
  visualColors: string;
  visualStyle: string;
  hasPhotos: 'sim' | 'nao' | 'vou_providenciar' | '';
  referenceLinks: string;
  domainHosting: string;
  socialNetworks: string;
  desiredDeadline: string;
  additionalNotes: string;
}

export interface LandingPageBriefingData {
  // Obrigatórias
  offerName: string;
  mainAction: string;
  benefitsDiff: string;

  // Opcionais
  hasTestimonials: string;
  hasSpecialPromo: string;
  extraElements: string;
}

export interface InstitutionalBriefingData {
  // Obrigatórias
  mainServices: string;
  companyInfoToShow: string;
  attendanceType: string;
  regionServed: string;

  // Opcionais
  specificPages: string;
  hasTeamPhotos: string;
  includeMapOrForm: string;
}

export interface EcommerceBriefingData {
  // Obrigatórias
  ecommerceType: 'catalogo_digital' | 'loja_completa' | '';
  productTypes: string;
  initialProductCount: string;
  orderMethod: string;

  // Condicionais para loja_completa
  paymentMethods?: string;
  deliveryMethods?: string;
  regionsServed?: string;
  freightCalculation?: string;
  estimatedVariations?: string;

  // Opcionais
  hasCategories: string;
  hasFiltersSearch: string;
  hasOwnPhotos: string;
  featuredPromos: string;
}

export interface PortfolioBriefingData {
  // Obrigatórias
  professionArea: string;
  experiencePresentation: string;
  projectsToShow: string;

  // Opcionais
  academicCursos: string;
  portfolioTone: string;
  resumeDownload: string;
  hasProfessionalPhotos: string;
}

export interface CardapioBriefingData {
  // Obrigatórias
  establishmentType: string;
  categoriesList: string;
  estimatedItemsCount: string;
  orderViaWhatsapp: string;

  // Opcionais
  hasOptionalsAddons: string;
  hasQrCodePrint: string;
  hasProductPhotos: string;
  additionalMenuNotes: string;
}

export interface BriefingState {
  serviceType: ServiceBriefingType;
  general: GeneralBriefingData;
  landing: LandingPageBriefingData;
  institutional: InstitutionalBriefingData;
  ecommerce: EcommerceBriefingData;
  portfolio: PortfolioBriefingData;
  cardapio: CardapioBriefingData;
  dataConsent: boolean;
}

export const initialBriefingState: BriefingState = {
  serviceType: 'landing-page',
  general: {
    projectName: '',
    responsibleName: '',
    whatsappNumber: '',
    businessDescription: '',
    mainObjective: 'Atrair novos clientes',
    customObjective: '',
    contactChannel: 'whatsapp',
    channelWhatsapp: '',
    channelEmail: '',
    hasLogo: '',
    visualColors: '',
    visualStyle: 'Moderno',
    hasPhotos: '',
    referenceLinks: '',
    domainHosting: 'Não possuo',
    socialNetworks: '',
    desiredDeadline: '',
    additionalNotes: '',
  },
  landing: {
    offerName: '',
    mainAction: 'Contato via WhatsApp',
    benefitsDiff: '',
    hasTestimonials: '',
    hasSpecialPromo: '',
    extraElements: '',
  },
  institutional: {
    mainServices: '',
    companyInfoToShow: '',
    attendanceType: 'Ambos (Presencial e Online)',
    regionServed: '',
    specificPages: '',
    hasTeamPhotos: '',
    includeMapOrForm: '',
  },
  ecommerce: {
    ecommerceType: 'catalogo_digital',
    productTypes: '',
    initialProductCount: '',
    orderMethod: 'WhatsApp',
    paymentMethods: '',
    deliveryMethods: '',
    regionsServed: '',
    freightCalculation: '',
    estimatedVariations: '',
    hasCategories: '',
    hasFiltersSearch: '',
    hasOwnPhotos: '',
    featuredPromos: '',
  },
  portfolio: {
    professionArea: '',
    experiencePresentation: '',
    projectsToShow: '',
    academicCursos: '',
    portfolioTone: 'Moderno e Criativo',
    resumeDownload: '',
    hasProfessionalPhotos: '',
  },
  cardapio: {
    establishmentType: '',
    categoriesList: '',
    estimatedItemsCount: '',
    orderViaWhatsapp: 'Sim, receber pedidos prontos no WhatsApp',
    hasOptionalsAddons: '',
    hasQrCodePrint: 'Sim, preciso de QR Code para mesas e balcão',
    hasProductPhotos: '',
    additionalMenuNotes: '',
  },
  dataConsent: false,
};
