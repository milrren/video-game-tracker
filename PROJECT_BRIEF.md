# PROJECT_BRIEF

## 1) Produto
Video Game Tracker e um app web para catalogar jogos, acompanhar status e registrar notas/avaliacoes.

## 2) Objetivo Atual
Evoluir de um tracker basico para uma experiencia mais engajadora com metas e progressao visivel.

## 3) Stack
- Next.js (App Router)
- TypeScript
- MongoDB + Mongoose

## 4) Funcionalidades Ja Disponiveis
- CRUD de jogos
- Filtros por status
- Dashboard de estatisticas por status

## 5) Publico-Alvo
Pessoas que querem organizar backlog e acompanhar progresso de jogos com feedback visual.

## 6) Restricoes
- Manter simplicidade de uso (cadastro rapido)
- Evitar regressao em CRUD e pagina de jogos
- Preservar performance de listagem

## 7) Estado Atual do Projeto
- Aplicacao funcional com API REST para jogos e interface de listagem/edicao.
- Nao existe sistema de conquistas, missoes ou badges.
- Nao ha modelagem dedicada para franquias ou missao personalizada.

## 8) Sprint Atual (Planejamento)
Sprint 1: Sistema de Conquistas com progresso visivel.

Objetivo da sprint:
Entregar base tecnica e UX inicial para conquistas com duas categorias:
- Missoes globais (ex.: 10 ratings, 10 reviews em texto, 10 jogos concluidos)
- Missoes de franquia (ex.: completar trilogia especifica)

Definicao de pronto (alto nivel):
- Usuario visualiza conquistas com progresso numerico e percentual.
- Progresso atualiza automaticamente quando dados de jogos mudam.
- Conquistas concluidas ficam destacadas visualmente.
- Missao de franquia exemplo operacional (Mass Effect trilogia).
- Missoes sao versionadas para preservar historico de progresso.

Regras de negocio confirmadas:
- Rating e review em texto sao missoes separadas.
- Missao de franquia: Completed vale 100% do peso do titulo e Playing vale 50% do peso do titulo.
- 100% da missao de franquia so ocorre quando todos os titulos obrigatorios estiverem Completed.
- Na versao atual, review textual sera identificado pelo campo `notes`.
- Nesta versao, nao existe minimo de caracteres para review textual (debito tecnico aprovado).

Documento detalhado da sprint:
- docs/sprint-1/plan.md