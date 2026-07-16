# Sprint 1 - Progress

Status geral: In Progress
Ultima atualizacao: 2026-07-15 (implementacao inicial entregue localmente)
Producer: Remy

## Quadro de Entregas

| Item | Owner | Status | PR | Observacoes |
| --- | --- | --- | --- | --- |
| PR 1 - Dominio e versionamento | Sage | Done (local) | - | Modelos de definicao/progresso implementados |
| PR 2 - Regra review textual (`notes`) | Kira + Sage | Done (local) | - | `notes` nao vazio conta; texto curto permitido |
| PR 3 - Motor de progresso | Sage | Done (local) | - | Regra 75% implementada para franquia (2 jogos: 1 completed + 1 playing) |
| PR 4 - Seeds iniciais | Sage | Done (local) | - | Seed idempotente com 4 missoes v1 |
| PR 5 - API de conquistas | Sage | Done (local) | - | Endpoint /api/achievements entregue |
| PR 6 - UI de conquistas | Nova | Done (local) | - | Pagina /achievements com cards, barra e estado concluido |
| PR 7 - Testes e observabilidade | Ivy + Sage | Done (local) | - | Suite Vitest ativa + logs estruturados no recalculo |

## Decisoes Registradas
- Rating e review em texto sao missoes separadas.
- Review textual usa `notes` nesta versao.
- Qualquer texto nao vazio em `notes` conta (inclui "A").
- Missao de franquia: completed=100% do peso, playing=50% do peso.
- Versionamento de missoes aprovado.

## Riscos Ativos
1. Evolucao futura da regra de review textual pode exigir migracao de versao.
2. Ambiguidade de matching de franquias/remasters se slug canonico nao for consistente.

## Proximas Acoes do Producer
1. Dividir o pacote local em PRs conforme docs/sprint-1/rollout.md.
2. Iniciar abertura de PRs seguindo a ordem de rollout.
3. Preparar validacao QA ponta a ponta apos merge das etapas.