# PROJECT_BRIEF

## 1) Produto
Video Game Tracker e um app web para catalogar jogos, acompanhar status e registrar notas/avaliacoes.

## 2) Objetivo Atual
Evoluir de um tracker basico para uma experiencia mais engajadora com metas e progressao visivel.

## 3) Stack
- Next.js (App Router)
- TypeScript
- MongoDB (driver nativo)

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
- Base de conquistas entregue localmente (modelagem, motor de progresso, API e UI), em fase de rollout/QA da Sprint 1.
- Missoes globais e de franquia com versionamento estao disponiveis.
- Sprint 2 entregue localmente: design system city pop com tokens semanticos, dark/light mode com persistencia e repaginacao das telas principais.
- Fluxos funcionais de CRUD e conquistas mantidos apos validacao de build e testes.

## 8) Sprint Atual (Planejamento)
Sprint 2: Redesign Visual City Pop + Sistema de Tema (entregue localmente).

Resultado da sprint:
- Tokens globais de cor/tipografia/superficie/sombra para light e dark implementados.
- Toggle de tema visivel com persistencia local e comportamento inicial por preferencia do sistema.
- Home, games (listagem/form/cards) e achievements repaginados com hierarquia visual city pop.
- Estados de hover, foco, vazio e erro padronizados por componentes reutilizaveis.
- Nenhuma alteracao de contratos de API e sem regressao nos fluxos existentes.

Proxima sprint sugerida:
- Sprint 3: QA visual hardening + refinamento de acessibilidade e performance de interface.