import { useState } from 'react';
import { portfolioProjects, PortfolioProject } from '../data/catalog';
import { getWhatsAppUrl } from '../data/siteConfig';
import { ExternalLink, Github, X, MessageSquare, CheckCircle, BarChart3, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Group and count available categories
  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'landing', label: 'Landing Pages' },
    { id: 'institutional', label: 'Institucionais' },
    { id: 'ecommerce', label: 'Lojas e Catálogos' },
    { id: 'menu', label: 'Cardápios' },
    { id: 'portfolio', label: 'Portfólios' },
  ];

  const filteredProjects = activeTab === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeTab);

  return (
    <section id="projetos" className="py-20 lg:py-28 relative bg-[#090B10] border-t border-b border-slate-800/80 scroll-mt-20">
      {/* Anchor alias to ensure #portfolio also scrolls to this section */}
      <div id="portfolio" className="absolute -top-24 left-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nossos Projetos</span>
              <span aria-hidden="true">·</span>
              <span>Trabalhos Desenvolvidos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Nossos <span className="silver-gradient-text">Projetos</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Conheça os sites, landing pages e plataformas criadas pela SF Full Stack com design de alto padrão, código autoral, velocidade extrema e foco comercial.
            </p>
          </div>

          {/* Interactive filter tabs */}
         

{/* Interactive filter tabs */}
<div
  className="w-full max-w-full min-w-0 overflow-x-auto overscroll-x-contain touch-pan-x md:w-auto md:shrink-0"
  style={{ WebkitOverflowScrolling: 'touch' }}
>
  <div className="flex w-max min-w-full items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
    {categories.map((cat) => {
      const count = cat.id === 'all'
        ? portfolioProjects.length
        : portfolioProjects.filter(p => p.category === cat.id).length;

      if (cat.id !== 'all' && count === 0) return null;

      return (
        <button
          key={cat.id}
          onClick={() => setActiveTab(cat.id)}
          className={`shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
            activeTab === cat.id
              ? 'bg-slate-200 text-slate-900 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {cat.label} ({count})
        </button>
      );
    })}
  </div>
</div>

        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl bg-[#0E121B] border border-slate-800 hover:border-slate-500 transition-all duration-300 overflow-hidden flex flex-col justify-between silver-card-border"
            >
              <div>
                {/* 1. Imagem de Apresentação do Projeto */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E121B] via-transparent to-transparent opacity-90" />
                  
                  {/* Category Pill Tag (quando disponível) */}
                  {project.categoryLabel && (
                    <div className="absolute top-4 left-4">
                      <span className="text-[11px] font-mono tracking-wider font-semibold px-2.5 py-1 rounded bg-black/80 text-slate-200 backdrop-blur-md border border-white/10">
                        {project.categoryLabel}
                      </span>
                    </div>
                  )}

                  {/* Badge de Projeto Real / Destaque */}
                  {project.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide px-2.5 py-1 rounded bg-black/85 text-emerald-300 backdrop-blur-md border border-emerald-500/30 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {project.badge}
                      </span>
                    </div>
                  )}

                  {/* Client Type / Tagline tag */}
                  {(project.clientType || project.tagline) && (
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-medium text-white truncate drop-shadow-md">
                        {project.clientType || project.tagline}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Nome do Projeto & 3. Breve Descrição */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5 group-hover:text-slate-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Métricas quantitativas (quando cadastradas) */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-6">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex flex-col text-center">
                          <span className="text-sm sm:text-base font-extrabold text-white font-mono tabular-nums">
                            {m.value}
                          </span>
                          <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tecnologias dominadas do projeto */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ações Obrigatórias do Card: Botão "Ver site" & "Ver código" */}
              <div className="p-6 sm:p-7 pt-0 border-t border-slate-800/70 mt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  
                  {/* Botão Principal: Ver site (abre site publicado em nova aba) */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="silver-button flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all text-center"
                    title={`Abrir ${project.title} em nova aba`}
                  >
                    <span>Ver site</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.2]" />
                  </a>

                  {/* Botão: Ver código (quando link público do GitHub for fornecido) */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                      title="Ver código-fonte público no GitHub"
                    >
                      <Github className="w-4 h-4 text-slate-300" />
                      <span>Ver código</span>
                    </a>
                  )}

                  {/* Botão secundário de detalhes ou solicitação rápida */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="py-3 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-xs font-medium text-slate-400 hover:text-slate-200 border border-slate-800/80 transition-colors flex items-center justify-center"
                    title="Ver ficha técnica e solicitar projeto similar"
                    aria-label="Ver detalhes e ficha técnica"
                  >
                    <span>Ficha</span>
                  </button>

                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Card de convite para criar novo projeto */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0E121B] to-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">
              Quer ver sua empresa ou ideia com uma presença web deste nível?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Criamos páginas modernas sob medida para o seu segmento, com entrega rápida e atendimento direto com o desenvolvedor.
            </p>
          </div>
          <a
            href={getWhatsAppUrl("Olá! Gostaria de conversar com a SF Full Stack sobre um novo projeto para meu negócio.")}
            target="_blank"
            rel="noopener noreferrer"
            className="silver-button px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar com o Desenvolvedor</span>
          </a>
        </div>

      </div>

      {/* Modal de Ficha Técnica / Detalhes */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-2xl bg-[#0E121B] border border-slate-700 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Fechar detalhes"
              >
                <X className="w-5 h-5" />
              </button>

              {selectedProject.categoryLabel && (
                <div className="inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  <span>{selectedProject.categoryLabel}</span>
                  {selectedProject.clientType && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{selectedProject.clientType}</span>
                    </>
                  )}
                  {selectedProject.badge && (
                    <span className="inline-flex items-center gap-1.5 normal-case font-medium text-[11px] px-2 py-0.5 rounded bg-black/70 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {selectedProject.badge}
                    </span>
                  )}
                </div>
              )}

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4 pr-10">
                {selectedProject.title}
              </h3>

              {/* Large Image Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-6 aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Descrição do Trabalho</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Metrics */}
                {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <span>Métricas de Performance</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((m, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                          <div className="text-xl font-extrabold text-white font-mono tabular-nums">{m.value}</div>
                          <div className="text-xs text-slate-400 mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Included */}
                {selectedProject.liveFeatures && selectedProject.liveFeatures.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-300" />
                      <span>Destaques Técnicos</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.liveFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Tecnologias Utilizadas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="text-xs font-mono px-3 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Actions */}
                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="silver-button px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
                    >
                      <span>Ver site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Ver código</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={getWhatsAppUrl(`Olá! Vi o projeto "${selectedProject.title}" nos Nossos Projetos da SF Full Stack e gostaria de um orçamento para algo parecido.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span>Quero um Projeto Parecido</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
