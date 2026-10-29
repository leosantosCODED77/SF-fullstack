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
    price: 790,
    formattedPrice: "A partir de R$ 790,00",
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
    mockupImage: "/src/assets/images/portfolio_landing_tech_1793268769040.jpg",
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para desenvolvimento da Landing Page de Alta Conversão (a partir de R$ 790,00).",
  },
  {
    id: "site-institucional",
    name: "Site Institucional Completo",
    price: 1300,
    formattedPrice: "A partir de R$ 1.300,00",
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
    mockupImage: "/src/assets/images/portfolio_institutional_1793268781441.jpg",
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para o Site Institucional Completo (a partir de R$ 1.300,00).",
  },
  {
    id: "loja-virtual",
    name: "Lojas e Catálogos Virtuais",
    price: 2000,
    formattedPrice: "A partir de R$ 2.000,00",
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
    mockupImage: "/src/assets/images/portfolio_ecommerce_1793268815756.jpg",
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para desenvolvimento de Lojas e Catálogos Virtuais (a partir de R$ 2.000,00).",
  },
  {
    id: "cardapio-digital",
    name: "Cardápio Digital Interativo",
    price: 750,
    formattedPrice: "A partir de R$ 750,00",
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
    mockupImage: "/src/assets/images/portfolio_digital_menu_1793268840469.jpg",
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para o Cardápio Digital Interativo (a partir de R$ 750,00).",
  },
  {
    id: "portfolio-profissional",
    name: "Portfólio Profissional",
    price: 800,
    formattedPrice: "A partir de R$ 800,00",
    category: "portfolio",
    categoryLabel: "Portfólio",
    badge: "Destaque Pessoal",
    tagline: "Apresente seus trabalhos com estilo autoral e feche contratos de alto valor",
    description: "Website pessoal para designers, fotógrafos, arquitetos e desenvolvedores destacarem seus cases de sucesso, habilidades técnicas e links de contato.",
    deliveryTime: "4 a 6 dias úteis",
    deliverables: [
      "Galeria visual com filtros por categoria de projeto",
      "Modais de visualização de cases detalhados",
      "Seção de habilidades técnicas e stack utilizada",
      "Integração com LinkedIn, GitHub e Instagram",
      "Download de currículo/media kit estruturado",
      "Animações elegantes e transições fluidas",
      "Otimização completa para busca e compartilhamento",
    ],
    recommendedFor: "Designers, programadores, fotógrafos, arquitetos, videomakers e criadores que desejam impressionar clientes e recrutadores.",
    mockupImage: "/src/assets/images/portfolio_landing_tech_1793268769040.jpg",
    ctaText: "Solicitar Orçamento",
    whatsappMessage: "Olá! Gostaria de solicitar um orçamento para desenvolvimento de Portfólio Profissional (a partir de R$ 800,00).",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "nexus-tech",
    title: "Nexus Platform - SaaS & Tech Launch",
    description: "Landing page desenvolvida para lançamento de software corporativo. Construída com arquitetura moderna, tempo de resposta inferior a 1 segundo e funil integrado de demonstração.",
    image: "/src/assets/images/portfolio_landing_tech_1793268769040.jpg",
    liveUrl: "https://nexus-ai-platform.example.com",
    githubUrl: "https://github.com/leo-offensive77/nexus-saas-platform",
    category: "landing",
    categoryLabel: "Landing Page",
    clientType: "Startup de Inteligência Artificial",
    tagline: "Página de conversão de alto impacto com foco em conversão de leads B2B",
    metrics: [
      { label: "Taxa de Conversão", value: "8.4%" },
      { label: "Tempo de Carga", value: "0.8s" },
      { label: "Performance", value: "99/100" },
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    liveFeatures: ["Design escuro executivo", "Gráficos de demonstração", "CTA flutuante", "Gatilhos de prova social"],
    featured: true,
  },
  {
    id: "aether-corporate",
    title: "Aether Digital - Consultoria Corporativa",
    description: "Site institucional desenvolvido para posicionar a consultoria com autoridade máxima. Inclui seções de portfólio de clientes, metodologia proprietária e formulário com triagem.",
    image: "/src/assets/images/portfolio_institutional_1793268781441.jpg",
    liveUrl: "https://aether-digital-consulting.example.com",
    category: "institutional",
    categoryLabel: "Site Institucional",
    clientType: "Consultoria Empresarial & Estratégia",
    tagline: "Presença institucional elegante com foco em captação de clientes corporativos",
    metrics: [
      { label: "Leads Qualificados", value: "+130%" },
      { label: "Pontuação SEO", value: "100/100" },
      { label: "Retenção", value: "+45%" },
    ],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveFeatures: ["Tipografia refinada", "Grid editorial", "Integração WhatsApp", "Seção institucional"],
    featured: true,
  },
  {
    id: "aura-luxury",
    title: "Aura Timepieces & Fashion Store",
    description: "E-commerce moderno com estética minimalista dark mode. Permite seleção de atributos de produtos, carrinho reativo em tempo real e finalização com pedido pronto no WhatsApp.",
    image: "/src/assets/images/portfolio_ecommerce_1793268815756.jpg",
    liveUrl: "https://aura-store-ecommerce.example.com",
    githubUrl: "https://github.com/leo-offensive77/aura-luxury-store",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    clientType: "Boutique de Relógios e Acessórios",
    tagline: "Vitrine e-commerce minimalista com fechamento rápido sem taxas abusivas",
    metrics: [
      { label: "Carrinho Abandonado", value: "-38%" },
      { label: "Tempo de Checkout", value: "30s" },
      { label: "Mobile-First", value: "100%" },
    ],
    techStack: ["React", "Tailwind CSS", "LocalStorage", "WhatsApp API"],
    liveFeatures: ["Carrinho reativo", "Filtro por categorias", "Fechamento WhatsApp", "Visualização detalhada"],
    featured: true,
  },
  {
    id: "grill-house-menu",
    title: "The Grill House - Cardápio Digital",
    description: "Cardápio digital responsivo com categorização intuitiva, fotos dos pratos, seleção de pontos de carne e adicionais, permitindo envio do pedido completo no WhatsApp.",
    image: "/src/assets/images/portfolio_digital_menu_1793268840469.jpg",
    liveUrl: "https://grill-house-menu.example.com",
    category: "menu",
    categoryLabel: "Gastronomia",
    clientType: "Hamburgueria Gourmet & Steakhouse",
    tagline: "Cardápio ágil por QR Code que acelera o giro de mesas e fideliza clientes",
    metrics: [
      { label: "Giro de Mesa", value: "+28%" },
      { label: "Economia com Impressão", value: "100%" },
      { label: "Ticket Médio", value: "+19%" },
    ],
    techStack: ["React", "TypeScript", "Mobile PWA", "Tailwind"],
    liveFeatures: ["QR Code pronto", "Seletor de adicionais", "Resumo de pedido", "Carga instantânea"],
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
