import sfLogoImg from '../assets/images/sf_logo.png';

export interface SiteConfig {
  name: string;
  brandTagline: string;
  proprietor: string;
  segment: string;
  role: string;
  bio: string;
  whatsapp: {
    rawNumber: string;
    displayNumber: string;
    baseUrl: string;
  };
  instagram: {
    handle: string;
    profileUrl: string;
    directUrl: string;
  };
  preferredChannel: 'whatsapp' | 'instagram';
  logoPath: string;
  guarantees: {
    title: string;
    description: string;
    icon: string;
  }[];
  stats: {
    label: string;
    value: string;
    caption: string;
  }[];
  methodology: {
    step: string;
    title: string;
    description: string;
    duration: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "SF Full Stack",
  brandTagline: "Sites que geram resultados",
  proprietor: "Léo",
  segment: "Desenvolvimento Web & Soluções Full-Stack",
  role: "Engenheiro de Software & Designer Web Full-Stack",
  bio: "Especialista em transformar ideias e negócios em plataformas web de alta conversão. Desenvolvimento com código moderno, carregamento ultrarrápido, design responsivo de elite e foco comercial para gerar clientes no piloto automático.",
  whatsapp: {
    rawNumber: "5591991532935",
    displayNumber: "+55 (91) 99153-2935",
    baseUrl: "https://wa.me/5591991532935",
  },
  instagram: {
    handle: "@leo_offensive77",
    profileUrl: "https://www.instagram.com/leo_offensive77/",
    directUrl: "https://ig.me/m/leo_offensive77",
  },
  preferredChannel: "whatsapp",
  logoPath: sfLogoImg,
  guarantees: [
    {
      title: "100% Código Autoral & Limpo",
      description: "Sem templates lentos ou código engessado. Cada linha é pensada para performance máxima e nota alta no Google PageSpeed.",
      icon: "Code2",
    },
    {
      title: "Design Responsivo de Elite",
      description: "Interface adaptada milimetricamente para smartphones, tablets e monitores ultrawide com foco na experiência do usuário.",
      icon: "Smartphone",
    },
    {
      title: "Integração Direta com Vendas",
      description: "Botões de WhatsApp com mensagens pré-formatadas, chamadas diretas e canais pensados para converter cliques em dinheiro.",
      icon: "MessageSquare",
    },
    {
      title: "Entrega Ágil & Transparente",
      description: "Prazos pontuais e acompanhamento em tempo real durante todas as etapas do desenvolvimento.",
      icon: "Zap",
    },
  ],
  stats: [
    {
      value: "100%",
      label: "Código Autoral",
      caption: "Zero templates reciclados",
    },
    {
      value: "<1.2s",
      label: "Tempo de Carregamento",
      caption: "Performance ultra-veloz",
    },
    {
      value: "5★",
      label: "Foco em Conversão",
      caption: "Arquitetura comercial",
    },
    {
      value: "24/7",
      label: "Presença Digital",
      caption: "Seu negócio sempre aberto",
    },
  ],
  methodology: [
    {
      step: "01",
      title: "Briefing Estratégico & Alinhamento",
      description: "Entendimento aprofundado do seu negócio, público-alvo, concorrentes e objetivo comercial da página.",
      duration: "Dia 1",
    },
    {
      step: "02",
      title: "Design UI/UX & Arquitetura Visual",
      description: "Criação do layout moderno, tipografia de alto impacto, harmonia de cores e experiência pensada para conversão.",
      duration: "Dias 2 - 3",
    },
    {
      step: "03",
      title: "Engenharia Full-Stack & Otimizações",
      description: "Desenvolvimento com tecnologias de ponta, animações fluidas, responsividade e integração direta com WhatsApp.",
      duration: "Dias 4 - 6",
    },
    {
      step: "04",
      title: "Testes Rigorosos & Publicação",
      description: "Validação em múltiplos dispositivos móveis, configuração de domínio, testes de velocidade e entrega final com suporte.",
      duration: "Dia 7",
    },
  ],
  faqs: [
    {
      question: "Qual é o prazo médio de entrega de um projeto?",
      answer: "O prazo varia conforme a complexidade: Landing Pages costumam ser entregues entre 3 e 5 dias úteis; Sites Institucionais e Portfólios em 5 a 7 dias; Lojas Virtuais e plataformas mais robustas entre 10 e 15 dias úteis.",
    },
    {
      question: "Como funciona a forma de pagamento?",
      answer: "Trabalhamos com modelo facilitado: 50% de entrada para início do desenvolvimento e os 50% restantes após a validação e aprovação do projeto, antes do apontamento final do domínio.",
    },
    {
      question: "Eu preciso já ter um domínio e hospedagem?",
      answer: "Não se preocupe! Se você já tiver, conectamos perfeitamente. Caso ainda não tenha, orientamos e auxiliamos em toda a contratação do seu domínio (.com.br ou .com) e configuração dos servidores mais rápidos do mercado.",
    },
    {
      question: "O site funcionará bem em celulares?",
      answer: "Sim, 100%! Desenvolvemos sob o conceito Mobile-First. Mais de 80% do tráfego hoje vem de smartphones, por isso todos os botões, fontes e elementos são testados para proporcionar uma navegação suave e instantânea.",
    },
    {
      question: "Como faço para solicitar alterações se precisar?",
      answer: "Todos os nossos pacotes incluem rodadas de alinhamento e revisão durante o desenvolvimento e suporte pós-entrega para garantir que tudo fique exatamente como você sonhou.",
    },
    {
      question: "Como posso iniciar meu projeto agora mesmo?",
      answer: "Basta clicar em qualquer botão de 'Solicitar Orçamento' ou 'Conversar no WhatsApp'. O atendimento é direto com o desenvolvedor responsável pelo seu projeto, sem intermediários.",
    },
  ],
};

/**
 * Utility to generate WhatsApp contact link with custom message
 */
export function getWhatsAppUrl(customMessage: string): string {
  return `${siteConfig.whatsapp.baseUrl}?text=${encodeURIComponent(customMessage)}`;
}
