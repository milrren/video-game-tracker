# Sprint 1 - Issues de Implementacao

Status: pronto para abrir no GitHub
Sprint: 1

## Issue 1 - Modelagem de Conquistas Versionadas

Labels sugeridas: `feature`, `backend`, `priority:P0`
Owner sugerido: Sage

Titulo:
feat(achievements): modelar conquistas, regras e progresso com versionamento

Descricao:
Criar modelos e tipos para suportar missoes globais e de franquia com versionamento de missao/regra.

Escopo tecnico:
- Modelo `AchievementDefinition` com campos de identidade funcional (`code`) e versao (`version`).
- Modelo `AchievementRule` declarativo com `type` + `payload` validado.
- Modelo `UserAchievementProgress` contendo progresso, percentual, status e `completedAt`.
- Relacao entre progresso do usuario e versao especifica da missao (historico preservado).

Criterios de aceite:
- Suporta regras de contagem global e checklist por franquia.
- Suporta missoes separadas para rating e review em texto.
- Nao permite ambiguidade entre versoes da mesma missao.
- Migra com compatibilidade para usuarios sem progresso previo.

Dependencias:
- Nenhuma

---

## Issue 2 - Motor de Progresso com Peso por Status

Labels sugeridas: `feature`, `backend`, `priority:P0`
Owner sugerido: Sage

Titulo:
feat(achievements): implementar avaliador de progresso para regras globais e franquias

Descricao:
Construir servico deterministico para calcular progresso de todas as missoes por usuario com suporte a pesos por status em franquias.

Regras obrigatorias:
- Missoes globais de contagem (rating, review em texto, jogos completed).
- Missoes de franquia com peso por titulo:
  - Completed = 1.0 do peso do titulo
  - Playing = 0.5 do peso do titulo
  - Backlog/Dropped/ausente = 0
- Conclusao da missao de franquia so em 100% quando todos os jogos obrigatorios estiverem Completed.

Criterios de aceite:
- Caso exemplo passa: franquia de 2 jogos -> 1 completed + 1 playing = 75%.
- Recalculo on-write em alteracoes de jogo e recomputacao sob demanda.
- Atualiza `completedAt` apenas quando atingir condicao de conclusao.

Dependencias:
- Issue 1

---

## Issue 3 - API de Conquistas com Ordenacao por Prioridade de Engajamento

Labels sugeridas: `feature`, `backend`, `api`, `priority:P0`
Owner sugerido: Sage

Titulo:
feat(api): expor endpoint de conquistas com progresso agregado por usuario

Descricao:
Criar endpoint para listar conquistas e progresso, otimizado para renderizacao da tela.

Contrato minimo de resposta:
- `code`, `version`, `title`, `description`, `category`
- `target`, `current`, `progressPercent`
- `isCompleted`, `completedAt`
- `ruleType` (para debug/observabilidade)

Requisitos:
- Ordenacao: em progresso -> quase concluidas -> concluidas.
- Sem regressao nos endpoints atuais de jogos.
- Tratamento de usuario sem conquistas concluidas.

Criterios de aceite:
- Endpoint documentado e testado manualmente.
- Payload suficiente para UI sem chamadas adicionais.

Dependencias:
- Issue 1
- Issue 2

---

## Issue 4 - Seeds Idempotentes de Missoes Iniciais

Labels sugeridas: `feature`, `backend`, `data`, `priority:P1`
Owner sugerido: Sage

Titulo:
feat(seed): cadastrar missoes iniciais versionadas de conquistas

Descricao:
Implementar seed idempotente para criar as missoes iniciais.

Missoes obrigatorias v1:
- `global.rate-10-games` (dar rating em 10 jogos)
- `global.write-10-text-reviews` (escrever 10 reviews em texto)
- `global.complete-10-games` (completar 10 jogos)
- `franchise.mass-effect-trilogy` (ME1, ME2, ME3)

Criterios de aceite:
- Reexecucao nao duplica definicoes.
- Seeds preservam versao e metadados de regra.

Dependencias:
- Issue 1

---

## Issue 5 - UI de Conquistas com Progresso Visivel

Labels sugeridas: `feature`, `frontend`, `priority:P1`
Owner sugerido: Nova

Titulo:
feat(ui): criar tela de conquistas com cards, progresso e estado concluido

Descricao:
Construir experiencia de visualizacao de conquistas com foco em clareza de progresso.

Escopo tecnico:
- Nova rota/pagina de conquistas.
- Card com titulo, descricao, progresso numerico e barra percentual.
- Estado concluido visualmente distinto + data de conclusao.
- Estado vazio com orientacao de proximo passo.

Criterios de aceite:
- Responsivo em desktop e mobile.
- Renderiza corretamente conquistas versionadas do endpoint.
- Sem hardcode da franquia Mass Effect no componente.

Dependencias:
- Issue 3

---

## Issue 6 - Definicao de Regra para Review em Texto

Labels sugeridas: `product`, `backend`, `priority:P0`
Owner sugerido: Kira + Sage

Titulo:
decision(achievements): formalizar criterio de review textual para contagem de missao

Descricao:
Definir regra de negocio e implementacao para detectar review em texto com confianca.

Decisoes esperadas:
- Campo fonte do review textual: usar `notes` nesta versao.
- Nao exigir minimo de caracteres nesta versao (debito tecnico aprovado).
- Impacto em UX de cadastro/edicao de jogo.

Criterios de aceite:
- Regra documentada em formato executavel para o motor de progresso.
- Casos de borda cobertos (texto vazio e espacos nao contam; texto curto como "A" conta).

Debito tecnico registrado:
- Evoluir regra de review textual no futuro com criterio de qualidade/minimo de caracteres e estrategia de migracao de versao.

Dependencias:
- Issue 1

---

## Issue 7 - Testes do Motor de Conquistas

Labels sugeridas: `test`, `backend`, `priority:P2`
Owner sugerido: Ivy + Sage

Titulo:
test(achievements): cobrir regras globais, franquia e versionamento

Descricao:
Criar suite de testes para garantir estabilidade da logica de progresso.

Cenarios minimos:
- 0 progresso em todas as missoes.
- Meta atingida por contagem global.
- Regressao de progresso ao reverter status.
- Franquia com completed/playing/backlog (incluindo caso 75%).
- Conclusao depende de todos os titulos em Completed.
- Isolamento entre versoes de mesma missao.

Criterios de aceite:
- Testes automatizados executando em CI local do projeto.
- Falhas apontam claramente qual regra foi quebrada.

Dependencias:
- Issue 2

---

## Issue 8 - Observabilidade Minima de Recalculo

Labels sugeridas: `chore`, `backend`, `priority:P2`
Owner sugerido: Sage

Titulo:
chore(achievements): adicionar logs estruturados para recalculo e depuracao

Descricao:
Adicionar telemetria minima para diagnostico de recalculo de conquistas sem expor dados sensiveis.

Criterios de aceite:
- Logs por usuario/operacao com ids tecnicos.
- Registro de tempo de execucao do recalculo.
- Registro de quantidade de conquistas atualizadas por evento.

Dependencias:
- Issue 2

---

## Ordem Recomendada de Execucao
1. Issue 1
2. Issue 6
3. Issue 2
4. Issue 4
5. Issue 3
6. Issue 5
7. Issue 7
8. Issue 8

## Gate de QA para Merge
- Nao mergear sem validar os cenarios de progresso parcial de franquia.
- Nao mergear sem validar separacao entre missao de rating e review em texto.
- Nao mergear sem validar comportamento de versao de missao.