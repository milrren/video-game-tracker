# Sprint 2 - Redesign Visual City Pop + Dark/Light Mode

## Objetivo
Transformar o produto de um tracker funcional para uma experiencia memoravel, com identidade visual forte inspirada em city pop japonesa e suporte completo a temas light/dark.

## Direcao Criativa
- Linguagem visual: city pop, colagem vintage, neon, nostalgia urbana e composicoes menos tradicionais.
- Principios: impacto visual com leitura clara, ousadia controlada, consistencia entre paginas.
- Aplicacao dos referencias: camadas de textura, recortes, blocos sobrepostos, tipografia expressiva e acentos cromaticos vibrantes.

## Guia Neon Collage - Especificacao Obrigatoria

### Conceito e Mood
- A interface deve remeter a revista japonesa vintage + scrapbook analogico, com UX moderna.
- Sensacoes alvo: nostalgia, memoria, musica, cultura urbana, romance, juventude e melancolia confortavel.
- A colagem e decorativa, nao estrutural. A navegacao e a leitura sempre tem prioridade.

### Paleta Oficial (tokens base)
- Paper White: #F5EFE7
- Vintage Beige: #E8DFD2
- Light Lavender: #DCCEF8
- Dust Pink: #FFC6D9
- Neon Pink: #F87BB6
- Retro Red: #C9302C
- Tokyo Blue: #355C8C
- Deep Navy: #23324E
- Ink Black: #1A1A1A
- Warm Gray: #7A746C
- Soft Shadow: rgba(0,0,0,.08)

### Tipografia Oficial
- Headlines: Noto Serif JP, Shippori Mincho, Zen Old Mincho.
- Interface: Inter, IBM Plex Sans, Noto Sans JP.
- Regra de destaque obrigatoria para heros e secoes principais: titulo japones grande + subtitulo em ingles menor logo abaixo.

### Layout e Hierarquia
- Grid obrigatoria de 12 colunas em desktop, com adaptacao responsiva para tablet/mobile.
- Espacamentos consistentes entre secoes e componentes.
- Ordem de hierarquia obrigatoria:
  1) Grande titulo japones
  2) Headline principal
  3) Imagem hero
  4) Cards
  5) Conteudo
  6) CTA
  7) Rodape
- Aparencia pode sobrepor elementos, sair da borda e aplicar rotacoes sutis entre 2 e 5 graus.

### Fotografia e Textura
- Fotografia com granulo leve, baixa saturacao, contraste baixo e luz suave.
- Evitar HDR, nitidez excessiva e luz artificial agressiva.
- Texturas de papel devem existir no tema (reciclado, kraft, revista, rasgo, fita, carimbo), sem reduzir legibilidade.

### Componentes Visuais
- Cards: borda suave, sombra pequena, textura discreta e pelo menos 1 detalhe de colagem (etiqueta, ticket, fita ou selo).
- Botoes:
  - Primario com Neon Pink.
  - Secundario branco com borda rosa.
  - Hover com brilho leve e deslocamento sutil entre 2 e 4px.
- Icones: apenas minimalistas, outline, traco fino e monocromaticos. Proibido 3D, metalico e skeuomorphism.

### Movimento
- Animacoes discretas: fade, slide suave, parallax lento e respiracao neon lenta.
- Evitar bounce e zoom exagerado.

## Escopo da Sprint
- Redesign das principais telas: home, listagem de jogos, formulario de jogo, cards e pagina de conquistas.
- Sistema de design com tokens para light/dark mode.
- Componente de troca de tema com persistencia.
- Revisao de estados interativos (hover, foco, ativo, erro, vazio).
- Ajustes responsivos para mobile e desktop com mesma identidade visual.

## Fora de Escopo
- Alteracao de regras de negocio de jogos e conquistas.
- Novas features funcionais (gamificacao adicional, social, notificacoes).
- Internacionalizacao completa.
- Painel administrativo de branding.

## Backlog Priorizado

### P0 - Fundacao de Design System e Tema
Descricao:
- Definir tokens globais de cor, tipografia, espacamento, borda e sombra para dois temas.
- Mapear papeis semanticos de cor: fundo, superficie, destaque, texto primario, texto secundario, feedback.
- Especificar contraste minimo para garantir legibilidade.

Criterios de aceite:
- Existe um conjunto unico de tokens reutilizavel em toda a app.
- Tema dark e light cobrem todos os papeis sem quebra visual.
- Documentacao de uso de token para dev e QA.
- Paleta oficial do guia esta mapeada em tokens semanticos sem substituir os hex de referencia.
- Contraste alvo registrado: texto normal >= 4.5:1 e texto grande >= 3:1.

### P0 - Toggle de Tema e Persistencia
Descricao:
- Implementar controle de troca de tema visivel no layout principal.
- Persistir preferencia do usuario localmente.
- Definir comportamento inicial: respeitar preferencia do sistema quando ainda nao houver escolha manual.

Criterios de aceite:
- Troca de tema ocorre sem flicker perceptivel.
- Preferencia persiste em refresh e retorno do usuario.
- Elementos criticos continuam legiveis nos dois temas.

### P0 - Redesign de Estruturas Base
Descricao:
- Reestruturar grade e hierarquia visual das telas principais.
- Aplicar composicao menos convencional com blocos sobrepostos e acentos graficos.
- Preservar clareza das acoes primarias (criar, editar, filtrar, concluir).

Criterios de aceite:
- Navegacao principal continua intuitiva apos redesign.
- Acoes de CRUD e filtros mantem destaque visual e usabilidade.
- Nenhuma regressao de fluxo funcional.
- Estrutura de 12 colunas aplicada em desktop nas telas principais.
- Hierarquia obrigatoria (titulo JP > headline > hero > cards > conteudo > CTA > rodape) validada em revisao visual.

### P1 - Biblioteca Visual City Pop
Descricao:
- Criar pacote leve de elementos visuais reutilizaveis: gradientes, texturas suaves, molduras, etiquetas e badges neon.
- Definir regra de intensidade visual por contexto (fundo mais rico, area de leitura mais limpa).

Criterios de aceite:
- Visual city pop perceptivel sem comprometer leitura.
- Elementos decorativos podem ser ligados/desligados por classe de pagina quando necessario.
- Elementos previstos no guia foram contemplados no kit visual (tickets, selos, recortes, ondas, fitas, carimbos), ao menos em variantes reutilizaveis.

### P1 - Estados, Microinteracoes e Feedback
Descricao:
- Revisar estados de componentes (botao, input, card, modal) para consistencia entre temas.
- Adicionar microinteracoes significativas (entrada de pagina, hover de card, feedback de sucesso/erro).

Criterios de aceite:
- Estados de foco visiveis para navegacao por teclado.
- Animacoes curtas e funcionais, sem prejudicar performance.
- Botoes seguem contrato visual do guia (primario neon, secundario branco com borda rosa, hover com deslocamento entre 2 e 4px).
- Iconografia segue padrao outline fino monocromatico sem efeitos 3D.

### P2 - Hardening de UX e Acessibilidade
Descricao:
- Rodar checklist de contraste, foco, responsividade e densidade de informacao.
- Validar cenarios de uso real: lista longa, campos com erro, estado vazio, loading.

Criterios de aceite:
- Problemas criticos de legibilidade e navegacao resolvidos antes do merge final.
- QA aprova smoke test visual em mobile e desktop.

## Definicao de Sucesso da Sprint
- Aplicacao apresenta identidade visual city pop consistente nas telas centrais.
- Dark mode e light mode estao estaveis, com preferencia persistida.
- Usuarios internos percebem melhora clara de atratividade sem perda de usabilidade.

## Riscos e Mitigacoes
- Risco: excesso de elementos visuais reduzir clareza.
  Mitigacao: separar plano decorativo e plano funcional com limites de contraste e ruído.

- Risco: custo de manutencao alto por estilos pontuais.
  Mitigacao: centralizar tudo em tokens e componentes reutilizaveis.

- Risco: regressao de performance por fundos e efeitos.
  Mitigacao: limitar camadas, evitar assets pesados e testar em mobile intermediario.

## Dependencias
- Base funcional da Sprint 1 estabilizada em rollout.
- Alinhamento entre Produto, Frontend e Arte sobre nivel de ousadia visual.

## Open Questions
1. O tema default deve ser light, dark ou seguir estritamente o sistema?
2. Qual nivel de textura visual maximo permitido nas areas de leitura?
3. Vamos priorizar fontes externas especificas ou manter stack local por performance?
4. Em quais secoes permitimos rotacao de colagem (2 a 5 graus) sem comprometer leitura?

## Prompt para o Time Dev (proxima execucao)
Objetivo:
Entregar um redesign completo com assinatura city pop e suporte robusto a dark/light mode sem alterar regras de negocio.

Entregas esperadas:
1. Base de tokens semanticos para dois temas.
2. Toggle de tema com persistencia e comportamento inicial por preferencia do sistema.
3. Repaginacao das telas principais com nova hierarquia visual.
4. Estados interativos e feedback consistentes entre temas.
5. Validacao de acessibilidade minima e responsividade.

Restricoes:
- Nao alterar contratos de API.
- Nao introduzir regressao no CRUD de jogos e conquistas.
- Evitar solucao ad-hoc por pagina; preferir componentes/tokens reutilizaveis.

Checklist de QA:
1. Troca de tema funciona e persiste apos refresh.
2. Textos e controles sao legiveis em light e dark.
3. Fluxos principais (criar/editar/remover jogo, ver conquistas) continuam estaveis.
4. Mobile e desktop mantem coerencia visual e navegabilidade.
5. Estados de foco, erro e vazio estao claros.

## Planejamento por Agente
- Kira (Produto): guardrails de UX, priorizacao de telas e criterios de aceite.
- Milo (Art): direcao de arte city pop, paleta, textura e composicao.
- Nova (Frontend): implementacao do design system, theming e repaginacao.
- Sage (Backend): apoio tecnico para garantir que mudancas nao impactem APIs e contratos.
- Ivy (QA): matriz de testes visuais, tema, responsividade e regressao funcional.