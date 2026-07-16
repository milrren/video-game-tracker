# Sprint 1 - Rollout por PR

Objetivo: reduzir risco de regressao e garantir entrega incremental da feature de conquistas.

## Regras de Merge
- Tipo de merge: regular merge (sem squash/rebase).
- PRs P0 devem ter review tecnico + checklist de QA minimo.
- Nao mergear PR de UI antes do contrato de API estabilizar.

## Ordem Recomendada de PRs

### PR 1 - Dominio e versionamento de missoes (P0)
Escopo:
- Modelos/tipos de missao, regra e progresso.
- Campos de `code` e `version` para preservacao historica.

Critico validar:
- Nao quebrar APIs atuais de jogos.
- Estrutura pronta para multiplas versoes da mesma missao.

Dependencias: nenhuma

### PR 2 - Regra de review textual e contrato de dados (P0)
Escopo:
- Formalizar regra executavel: review textual via `notes` nao vazio.
- Registrar debito tecnico de qualidade textual futura.

Critico validar:
- `notes` vazio ou apenas espacos nao conta.
- `notes` curto (ex.: "A") conta por decisao de sprint.

Dependencias: PR 1

### PR 3 - Motor de progresso (P0)
Escopo:
- Calculo global (rating/review/completed).
- Calculo de franquia com pesos por status.

Critico validar:
- Caso de 2 jogos: 1 completed + 1 playing = 75%.
- Conclusao apenas com todos os jogos obrigatorios em Completed.

Dependencias: PR 1, PR 2

### PR 4 - Seed idempotente de missoes (P1)
Escopo:
- Cadastro das missoes iniciais versionadas.

Critico validar:
- Reexecucao sem duplicidade.

Dependencias: PR 1

### PR 5 - API de conquistas (P0)
Escopo:
- Endpoint de leitura com progresso agregado e ordenacao.

Critico validar:
- Payload completo para UI sem chamada adicional.
- Ordenacao por engajamento funcionando.

Dependencias: PR 3, PR 4

### PR 6 - UI de conquistas (P1)
Escopo:
- Tela/cards de conquistas com progresso numerico e percentual.
- Estado concluido e estado vazio.

Critico validar:
- Responsividade desktop/mobile.
- Sem hardcode de franquia na UI.

Dependencias: PR 5

### PR 7 - Testes e observabilidade (P2)
Escopo:
- Testes do motor de progresso e versionamento.
- Logs estruturados de recalculo.

Critico validar:
- Cobertura de casos de borda e regressao de status.

Dependencias: PR 3, PR 5

## Gate de QA por Marco

### Gate A (apos PR 3)
- Validar regras de progresso em dados controlados.
- Confirmar que regressao de status reduz progresso.

### Gate B (apos PR 6)
- Validar experiencia completa ponta a ponta.
- Confirmar estados visuais de em progresso e concluido.

### Gate C (pre-merge final da sprint)
- Smoke test de CRUD de jogos sem regressao.
- Conferir consistencia de progresso apos refresh/reload.

## Criterio de Encerramento da Sprint
- Todas as issues P0 concluidas.
- Gate C aprovado por QA.
- Documento de encerramento criado em docs/sprint-1/done.md.