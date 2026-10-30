import portfolioLandingTechImg from '../assets/images/portfolio_landing_tech_1793268769040.jpg';
import portfolioInstitutionalImg from '../assets/images/portfolio_institutional_1793268781441.jpg';
import portfolioEcommerceImg from '../assets/images/portfolio_ecommerce_1793268815756.jpg';
import portfolioDigitalMenuImg from '../assets/images/portfolio_digital_menu_1793268840469.jpg';

export {
  portfolioLandingTechImg,
  portfolioInstitutionalImg,
  portfolioEcommerceImg,
  portfolioDigitalMenuImg,
};

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: 'landing' | 'institutional' | 'ecommerce' | 'menu' | 'portfolio';
  categoryLabel: string;
  badge?: string;
  tagline: string;
  description: string;
  deliveryTime: string;
  deliverables: string[];
  recommendedFor: string;
  mockupImage?: string;
  ctaText: string;
  whatsappMessage: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  category?: 'landing' | 'institutional' | 'ecommerce' | 'menu' | 'portfolio' | string;
  categoryLabel?: string;
  badge?: string;
  clientType?: string;
  tagline?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  techStack?: string[];
  liveFeatures?: string[];
  featured?: boolean;
}

export interface SimulatorAddon {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  description: string;
}

export const servicesCatalog: ServiceItem[] = [
  {
    id: "landing-page",
    name: "Landing Page de Alta Conversão",
    price: 900,
    formattedPrice: "A partir de R$ 900,00",
    category: "landing",
    categoryLabel: "Landing Page",
    badge: "Mais Procurado",
    tagline: "Focada 100% em transformar visitantes em contatos diretos no WhatsApp",
    description: "Página única de impacto com estrutura persuasiva, hero marcante, seções de benefícios, prova social e botões de ação estratégicos que geram vendas imediatas.",
    deliveryTime: "3 a 5 dias úteis",
    deliverables: [
      "Hero section persuasiva e impactante",
      "Integração com WhatsApp e Instagram Direct",
      "Copywriting com gatilhos de conversão",
      "Carregamento ultrarrápido (< 1.5s)",
      "Design 100% responsivo para mobile",
      "Configuração de formulário e botão flutuante",
      "Suporte pós-lançamento de 15 dias",
    ],
    recommendedFor: "Profissionais liberais, lançamentos de infoprodutos, prestadores de serviços e captação de leads rápidos.",
    mockupImage: portfolioLandingTechImg,
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para desenvolvimento da Landing Page de Alta Conversão (a partir de R$ 900,00).",
  },
  {
    id: "site-institucional",
    name: "Site Institucional Completo",
    price: 1250,
    formattedPrice: "A partir de R$ 1.250,00",
    category: "institutional",
    categoryLabel: "Institucional",
    badge: "Para Empresas",
    tagline: "Autoridade, credibilidade e elegância para sua marca no ambiente digital",
    description: "Estrutura multipágina ou one-page estendida apresentando história da empresa, catálogo de serviços, diferenciais técnicos, equipe e canais oficiais de contato.",
    deliveryTime: "5 a 7 dias úteis",
    deliverables: [
      "Estrutura completa: Home, Sobre, Serviços e Contato",
      "SEO técnico estruturado para Google",
      "Design executivo alinhado à identidade visual",
      "Mapa interativo ou pontos de atendimento",
      "Integração WhatsApp corporativo com departamentos",
      "Otimização avançada de imagens e scripts",
      "30 dias de suporte e garantia técnica",
    ],
    recommendedFor: "Empresas consolidadas, escritórios, consultorias e marcas que buscam fortalecer reputação no mercado.",
    mockupImage: portfolioInstitutionalImg,
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para o Site Institucional Completo (a partir de R$ 1.250,00).",
  },
  {
    id: "loja-virtual",
    name: "Lojas e Catálogos Virtuais",
    price: 1500,
    formattedPrice: "A partir de R$ 1.500,00",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    badge: "Solução Completa",
    tagline: "Vitrine digital moderna com catálogo dinâmico e fechamento comercial",
    description: "Plataforma elegante para exibir produtos com fotos em alta definição, variações (tamanho/cor), cálculo de subtotal e finalização simplificada via WhatsApp ou checkout online.",
    deliveryTime: "10 a 14 dias úteis",
    deliverables: [
      "Catálogo dinâmico de produtos com busca e filtros",
      "Páginas de detalhes de produtos e galeria de fotos",
      "Carrinho inteligente no navegador",
      "Finalização com mensagem estruturada no WhatsApp ou checkout",
      "Alternativa de fechamento via Instagram Direct",
      "Painel de edição simplificada sem complicação",
      "Treinamento rápido de cadastro de produtos",
    ],
    recommendedFor: "Lojas de roupas, calçados, artesanato, cosméticos e marcas que querem vender online sem taxas abusivas de marketplaces.",
    mockupImage: portfolioEcommerceImg,
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para desenvolvimento de Lojas e Catálogos Virtuais (a partir de R$ 1.500,00).",
  },
  {
    id: "cardapio-digital",
    name: "Cardápio Interativo",
    price: 800,
    formattedPrice: "A partir de R$ 800,00",
    category: "menu",
    categoryLabel: "Gastronomia",
    badge: "Pronto para Pedidos",
    tagline: "Agilidade no atendimento e pedidos instantâneos sem comissões",
    description: "Cardápio digital moderno acessível por QR Code ou link na bio, categorizado por pratos e bebidas com botão de adicionar e enviar pedido detalhado no WhatsApp.",
    deliveryTime: "3 a 5 dias úteis",
    deliverables: [
      "Divisão por categorias (Lanches, Bebidas, Sobremesas, Combos)",
      "Fotos atraentes e descrições detalhadas dos pratos",
      "QR Code personalizado de alta resolução para impressão nas mesas",
      "Seletor de opcionais e adicionais de pratos",
      "Carrinho com cálculo automático de total",
      "Envio do pedido pronto no WhatsApp do estabelecimento",
      "Manual fácil para alterar preços e itens",
    ],
    recommendedFor: "Hamburguerias, pizzarias, cafeterias, restaurantes, bistrôs e delivery de comida.",
    mockupImage: portfolioDigitalMenuImg,
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para o Cardápio Interativo (a partir de R$ 800,00).",
  },
  {
    id: "portfolio-profissional",
    name: "Landing Page Simples",
    price: 700,
    formattedPrice: "A partir de R$ 700,00",
    category: "portfolio",
    categoryLabel: "Landing Page",
    badge: "Essencial",
    tagline: "Página direta, limpa e objetiva para apresentar seus serviços e captar clientes",
    description: "Website enxuto e funcional para profissionais autônomos e pequenos negócios apresentarem seus serviços essenciais com botão direto para WhatsApp.",
    deliveryTime: "3 a 4 dias úteis",
    deliverables: [
      "Apresentação clara dos serviços ou ofertas",
      "Botão de contato direto no WhatsApp",
      "Seção sobre o profissional ou empresa",
      "Integração com redes sociais",
      "Design 100% responsivo para mobile",
      "Carregamento rápido e código limpo",
      "Suporte pós-lançamento de 15 dias",
    ],
    recommendedFor: "Profissionais liberais, autônomos e pequenos negócios que desejam iniciar sua presença digital com investimento acessível.",
    mockupImage: portfolioLandingTechImg,
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para desenvolvimento de Landing Page Simples (a partir de R$ 700,00).",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "aguaislife",
    title: "Água is life — Distribuidora Mineral",
    description: "Website desenvolvido e implementado para uma empresa real, atualmente em operação. O projeto funciona como um canal digital de apresentação dos serviços e captação de clientes, já sendo utilizado comercialmente e gerando contatos de potenciais consumidores.",
    image: "/assets/projects/agua_profile.jpeg",
    liveUrl: "https://aguaislife.netlify.app/",
    githubUrl: "https://github.com/leosantosCODED77/aguaislife",
    category: "ecommerce",
    categoryLabel: "Lojas e Catálogos",
    badge: "Projeto real • Em produção",
    clientType: "Distribuidora Mineral & Corporativo B2B",
    tagline: "Sua empresa sem falta de água com suprimento garantido",
    metrics: [
      { label: "Catálogo", value: "20L & Descartáveis" },
      { label: "Cotação B2B", value: "WhatsApp" },
      { label: "Velocidade", value: "Ultrarrápida" },
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "WhatsApp API"],
    liveFeatures: ["Galeria de produtos", "Direcionamento B2B", "Botão WhatsApp flutuante", "Identidade visual oficial"],
    featured: true,
  },
  {
    id: "sf-full-stack",
    title: "SF Full Stack — Soluções Web",
    description: "Site institucional completo para a SF Full Stack, apresentando soluções de desenvolvimento web moderno, serviços especializados, simulador de orçamento e canais oficiais de atendimento.",
    image: "/assets/projects/project2-sf-fullstack.png",
    liveUrl: "https://sf-fullstack.netlify.app/",
    githubUrl: "https://github.com/leosantosCODED77/SF-fullstack",
    category: "institutional",
    categoryLabel: "Site Institucional",
    clientType: "Desenvolvimento de Software & Web",
    tagline: "Sites modernos que geram resultados reais para o seu negócio",
    metrics: [
      { label: "Performance", value: "99/100" },
      { label: "Simulador", value: "Integrado" },
      { label: "Briefing", value: "WhatsApp" },
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    liveFeatures: ["Simulador de orçamento", "Catálogo de serviços", "Design titânio/prata", "Totalmente responsivo"],
    featured: true,
  },
  {
    id: "advogado",
    title: "Advogado — Dr. Ricardo Silva",
    description: "Landing page de alta conversão para advocacia e defesa jurídica estratégica patrimonial e empresarial, com agendamento de consulta, prova social e contato direto via WhatsApp.",
    image: "/assets/projects/project1-advogado.png",
    liveUrl: "https://advocacia6767.netlify.app/",
    githubUrl: "https://github.com/leosantosCODED77/LP-advocacia",
    category: "landing",
    categoryLabel: "Landing Page",
    clientType: "Advocacia & Defesa Jurídica",
    tagline: "Defesa jurídica rigorosa e estratégica para proteger patrimônio",
    metrics: [
      { label: "Tempo de Carga", value: "0.7s" },
      { label: "Mobile-First", value: "100%" },
      { label: "Conversão Direta", value: "WhatsApp" },
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    liveFeatures: ["Agendamento de consulta", "Prova social e autoridade", "Integração WhatsApp", "Design executivo"],
    featured: true,
  },
  {
    id: "dennys-delivery",
    title: "Dennys Delivery — Pizzaria Artesanal",
    description: "Cardápio digital interativo para pizzaria artesanal e delivery com forno a lenha, facilitando a escolha de sabores, massas de fermentação lenta 48h e fechamento direto no WhatsApp.",
    image: "/assets/projects/project4-dennys-delivery.png",
    liveUrl: "https://pizza67.netlify.app/",
    githubUrl: "https://github.com/leosantosCODED77/Card-pio-Pizzaria",
    category: "menu",
    categoryLabel: "Cardápio Digital",
    clientType: "Pizzaria Artesanal & Delivery",
    tagline: "A verdadeira pizza artesanal assada no forno a lenha",
    metrics: [
      { label: "Cardápio", value: "Interativo" },
      { label: "Pedido", value: "WhatsApp" },
      { label: "Massa 48h", value: "Forno a Lenha" },
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "PWA"],
    liveFeatures: ["Navegação por categorias", "Status do forno ao vivo", "Envio direto do pedido", "Visual apetitoso dark"],
    featured: true,
  },
  {
    id: "site-pessoal",
    title: "Portfólio Pessoal — Leandro Fonseca",
    description: "Portfólio profissional de Leandro Fonseca, estudante de Engenharia de Software e desenvolvedor Full Stack, destacando stack de programação, trajetória técnica e projetos entregues.",
    image: "/assets/projects/project5-site-pessoal.png",
    liveUrl: "https://personal6767.netlify.app",
    githubUrl: "https://github.com/leosantosCODED77/LP-pessoal",
    category: "portfolio",
    categoryLabel: "Portfólio Profissional",
    clientType: "Engenheiro de Software & Desenvolvedor",
    tagline: "Apresentação técnica, projetos em produção e stack completa",
    metrics: [
      { label: "Formação", value: "Eng. Software" },
      { label: "Stack", value: "Full Stack" },
      { label: "Projetos", value: "Produção" },
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "GitHub"],
    liveFeatures: ["Bio e competências", "Links para repositórios", "Design autoral", "Integrações profissionais"],
    featured: true,
  },
];

export interface MonthlySupportPlan {
  name: string;
  badge: string;
  price: number;
  formattedPrice: string;
  period: string;
  features: string[];
  note: string;
  whatsappMessage: string;
}

export const monthlySupportPlan: MonthlySupportPlan = {
  name: "SF CARE · SUPORTE MENSAL",
  badge: "Opcional",
  price: 149,
  formattedPrice: "R$ 149/mês",
  period: "mensal",
  features: [
    "Até duas pequenas alterações de texto ou imagem por mês",
    "Monitoramento básico de disponibilidade",
    "Correção de pequenos problemas relacionados ao site entregue",
    "Suporte por WhatsApp em horário comercial",
  ],
  note: "Preço sugerido para sites simples. Hospedagem, domínio, integrações pagas e novas funcionalidades são cobrados separadamente, se não estiverem no contrato.",
  whatsappMessage: "Olá! Gostaria de contratar o plano opcional SF CARE · SUPORTE MENSAL (R$ 149/mês) para o meu site.",
};

export const simulatorAddons: SimulatorAddon[] = [
  {
    id: "rush-delivery",
    name: "Entrega Expressa 48h",
    price: 120,
    formattedPrice: "R$ 120,00",
    description: "Alocação de prioridade exclusiva para finalização e entrega do projeto em até 48 horas úteis.",
  },
  {
    id: "copywriting",
    name: "Redação & Copywriting Persuasivo",
    price: 150,
    formattedPrice: "R$ 150,00",
    description: "Criação profissional de textos, títulos chamativos, chamadas para ação e estruturação de argumentos persuasivos.",
  },
];
