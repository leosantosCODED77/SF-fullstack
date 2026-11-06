# SF Fullstack — Ideias salvas: domínios, hospedagem e comunicação com clientes

Status: **planejamento, não implementado**. Elaborado em 2026-11-05.
Escopo: comunicação comercial e explicação ao cliente. **Não altera páginas, preços, layout, contrato ou infraestrutura**.

## Objetivo
Vender landing pages e sites com preço de desenvolvimento claro e sem obrigar o cliente a pagar hospedagem mensal, distinguindo **desenvolvimento**, **registro/renovação de domínio**, **hospedagem** e **suporte opcional**.

## Situação encontrada no repositório
- Página principal já renderiza `FaqSection` a partir de `siteConfig.faqs` em `src/data/siteConfig.ts`.
- Existe FAQ “Eu preciso já ter um domínio e hospedagem?” explicando assistência na contratação/configuração.
- Catálogo em `src/data/catalog.ts` indica landing de alta conversão a partir de R$ 700, site institucional a partir de R$ 1.000, entre outros. **Não modificar preços sem pedido.**
- Existe **SF CARE** como suporte **opcional** por R$ 149/mês; custos de domínio/hospedagem podem ser separados conforme contrato. **Não esconder nem contradizer essa oferta.**

## Ideias avaliadas

| Ideia | Viabilidade | Observação |
|---|---|---|
| Adicionar FAQ “Preciso pagar mensalidade?” | **Fácil** | Modificar texto/dados existentes, sem criar seção; testar responsividade |
| Esclarecer “site com pagamento único” | **Fácil, com condições** | O desenvolvimento é pontual; domínio, integrações e manutenção podem ser recorrentes |
| Explicar hospedagem gratuita em Cloudflare Pages | **Fácil** | Apenas em projetos elegíveis dentro de limites e termos da modalidade gratuita; custos podem surgir |
| Explicar domínio opcional `.com`/`.com.br` | **Fácil** | Registro não é vitalício: renovação por prazo contratado |
| Orientar domínio comprado na conta do cliente | **Fácil** | Preferível para titularidade, autonomia e renovação sem dependência da agência |
| Oferecer primeiro ano de domínio incluído | **Possível, decisão comercial** | Definir preço, margem, titularidade, autorização e política da renovação ANTES de anunciar |
| Oferecer registro por vários anos antecipados | **Possível** | Não confundir pré-pagamento de prazo com compra definitiva; disponibilidade depende do registrador/TLD |
| Exibir simulador com opção de domínio | **Possível, esforço médio** | Exige variáveis de orçamento, discriminar estimativas e distinguir pagamento à agência/registrador |
| “Domínio .com gratuito para sempre” | **Não viável de forma legítima** | Registro público de domínio normalmente possui renovação e custo |
| “Hospedagem gratuita garantida para sempre” | **Não prometer** | Depende de política, limites técnicos, serviço e necessidades futuras |

## Texto sugerido de FAQ (proposta, sujeito a revisão)
**Preciso pagar mensalidade para ter meu site?**
> O desenvolvimento do seu site pode ser contratado com pagamento único, sem plano mensal obrigatório de suporte. Em projetos compatíveis, podemos utilizar hospedagem sem custo adicional dentro dos limites do serviço escolhido. Se desejar um domínio próprio, como suaempresa.com ou suaempresa.com.br, ele exige registro e renovação periódicos. Você pode contratar e renovar diretamente em sua conta; ajudamos na configuração. Manutenção, funcionalidades extras, serviços de terceiros e o plano opcional SF CARE são contratados separadamente quando necessários.

**O domínio pode ser pago uma única vez?**
> É possível contratar alguns prazos de registro antecipadamente, mas não comprar um domínio .com para sempre. Ao fim do prazo, a renovação é necessária para preservar o endereço.

## Sugestão de orçamento (apenas apresentação)
- **Desenvolvimento do site:** R$ X, pagamento segundo proposta/contrato, podendo ser único ou parcelado.
- **Hospedagem:** sem custo adicional se o site couber na modalidade gratuita escolhida, sujeito a limites.
- **Domínio próprio:** opcional; custo e renovação do registrador informados antecipadamente, preferencialmente pagos diretamente pelo cliente.
- **Suporte/manutenção SF CARE:** opcional, conforme escopo, preço e condições vigentes.

## Condições importantes
- Não afirmar que serviços de e-commerce, pagamentos, banco de dados, e-mails profissionais ou integrações complexas estarão incluídos na hospedagem estática gratuita.
- Não publicar números de custo de domínio sem cotação atualizada e diferenciação de TLD, moeda, impostos e renovação.
- Não prometer atualizações grátis vitalícias ou cobertura contratual não prevista.
- Não mudar layout, fotos, cores, textos existentes, preços, WhatsApp ou serviços fora de uma futura solicitação específica.
- Não afirmar que domínio profissional é requisito obrigatório para usar os sites de demonstração `.pages.dev`.

## Ordem de implantação recomendada
1. **Prioridade alta:** revisar somente FAQ/explicação contratual mantendo SF CARE opcional.
2. **Prioridade média:** mostrar custos opcionais e observações no orçamento/simulador, após aprovação do texto.
3. **Prioridade condicional:** oferta promocional de primeiro ano de domínio incluso, após decidir quem registra, paga, renova e transfere.
4. Testar em mobile/desktop e conferir preços e benefícios originais antes do deploy.

## Critério para considerar concluído
Cliente compreende que **site ≠ domínio ≠ hospedagem ≠ manutenção**, conhece custos recorrentes possíveis, pode manter o domínio sob sua titularidade e não sofre cobrança surpresa.

**Nenhuma implementação foi autorizada por este documento; serve para decidir a próxima alteração com segurança.**
