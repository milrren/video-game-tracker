# Sprint 2 - Done (local)

Data: 2026-07-15
Owner de execucao: Nova + Milo + Sage
Branch: feature/sprint-2

## Entregas concluidas
1. Design system com tokens semanticos light/dark em `src/app/globals.css`.
2. Toggle de tema com persistencia localStorage e fallback por preferencia do sistema em `src/app/layout.tsx` e `src/app/ThemeToggle.tsx`.
3. Redesign de telas principais:
   - Home: `src/app/page.tsx`
   - Games/listagem/form/cards: `src/app/games/GamesClient.tsx`, `src/app/games/AddGameForm.tsx`, `src/app/games/GameCard.tsx`
   - Achievements: `src/app/achievements/AchievementsClient.tsx`
4. Estados e microinteracoes consistentes (hover/foco/vazio/erro) nos componentes centrais.
5. Smoke tecnico:
   - `npm test` aprovado (4 testes)
   - `npm run build` aprovado

## Decisoes de implementacao
1. Tema default segue preferencia do sistema quando nao ha escolha manual.
2. Preferencia manual fica salva em `vgt-theme` no localStorage.
3. Elementos decorativos city pop foram aplicados por camadas visuais sem impactar legibilidade da area de leitura.

## Pendencias pos-sprint
1. QA visual final em dispositivos moveis reais com `docs/sprint-2/qa-visual-gates.md`.
2. Abrir PR para revisao cruzada e ajustes finos de contraste, se necessarios.
