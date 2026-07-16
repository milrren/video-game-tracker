# Sprint 1 - Sistema de Conquistas com Progresso Visivel

## Objetivo
Adicionar um sistema de conquistas que transforme atividade do usuario em metas claras com feedback visual de progresso.

## Escopo da Sprint
- Catologo inicial de conquistas (missoes globais + missoes por franquia)
- Missoes separadas para rating e review em texto
- Calculo de progresso por usuario com atualizacao automatica
- Interface de conquistas com barra/progresso e estado concluido
- Primeiro pacote de missoes seedado no banco
- Versionamento de missoes/regras para preservar historico de progresso

## Fora de Escopo
- Conquistas sazonais/eventos temporarios
- Sistema completo de notificacoes push/email
- Gamificacao social (ranking, amigos, compartilhamento)

## Backlog Priorizado

### P0 - Modelagem de dominio de conquistas
Descricao:
- Definir entidades para conquista, regra e progresso do usuario.
- Suportar pelo menos 2 tipos de regra:
  1) Contagem global por tipo de acao (ex.: reviews escritas)
  2) Conjunto de jogos obrigatorios (franquia/trilogia)
- Incluir versao da missao e versao da regra para evolucao futura sem quebrar historico.

Criterios de aceite:
- Modelo suporta metas numericas e metas por checklist.
- Possivel cadastrar exemplo da Trilogia Mass Effect sem hardcode de UI.
- Missao separada para rating e missao separada para review em texto.

### P0 - Motor de avaliacao de progresso
Descricao:
- Implementar calculo deterministico de progresso com base no estado atual dos jogos.
- Definir ponto de recalculo (on-write no CRUD de jogos, com fallback por recomputacao sob demanda).
- Para missoes de franquia, aplicar pesos por titulo:
  - Completed = 100% do peso do titulo
  - Playing = 50% do peso do titulo
  - Backlog/Dropped/ausente = 0%

Criterios de aceite:
- Progresso reflete alteracao de status sem atraso perceptivel.
- Conquistas concluidas recebem flag de concluida e data de conclusao.
- Exemplo validado: franquia de 2 jogos -> 1 completed + 1 playing = 75% total.

### P0 - API de leitura de conquistas
Descricao:
- Endpoint para listar conquistas com progresso agregado para renderizacao da UI.

Criterios de aceite:
- Resposta inclui: titulo, descricao, tipo, meta, progresso atual, percentual, concluida, concluidaEm.
- Ordenacao prioriza: em progresso, quase concluidas, concluidas.

### P1 - UI de conquistas e progresso
Descricao:
- Nova area/pagina para conquistas com cards e progresso visivel.
- Estados vazios e mensagens de orientacao para primeira conquista.

Criterios de aceite:
- Cada card exibe progresso numerico (ex.: 4/10) e percentual.
- Estado concluido e visualmente distinto.
- Layout responsivo desktop/mobile.

### P1 - Seed inicial de missoes
Descricao:
- Criar conjunto inicial de conquistas:
  - Deu rating em 10 jogos
  - Escreveu 10 reviews em texto
  - Completou 10 jogos
  - Completou a Trilogia Mass Effect (ME1, ME2, ME3)

Criterios de aceite:
- Seeds idempotentes.
- Reexecucao nao duplica conquistas.

### P2 - Qualidade e observabilidade minima
Descricao:
- Cobrir regras com testes de unidade no motor de progresso.
- Logs minimos para diagnostico de recalculo.

Criterios de aceite:
- Casos felizes + casos de borda cobertos (0 progresso, meta atingida, status revertido).

## Definicao de Sucesso da Sprint
- Pelo menos 3 conquistas operacionais em producao local.
- Tempo de resposta da API de conquistas dentro de alvo interno aceitavel.
- Sem regressao nos fluxos atuais de CRUD de jogos.

## Riscos e Mitigacoes
- Risco: modelagem rigida para novas regras.
  Mitigacao: usar regra declarativa com tipo + payload validado.

- Risco: recalculo pesado a cada update.
  Mitigacao: incremental on-write + endpoint de recomputacao admin/dev para manutencao.

- Risco: ambiguidade para franquias com multiplas plataformas/remasters.
  Mitigacao: definir matching por identificador canonico de jogo na regra da conquista.

## Dependencias
- Definicao de como identificar jogos de franquia (slug canonico).
- Convencao para detectar review em texto: usar campo `notes` nesta versao inicial.

## Decisoes Confirmadas
1. Missoes de rating e review em texto serao separadas.
2. Missoes de franquia exigem todos os jogos em Completed para 100%, mas permitem progresso parcial para status Playing (50% do peso do titulo).
3. Missoes serao versionadas para permitir evolucao futura sem impactar usuarios existentes.
4. O campo usado para contar review textual sera `notes` por enquanto.
5. Nao havera minimo de caracteres para review textual nesta versao (debito tecnico assumido).

## Open Questions
1. Precisamos endpoint/admin flow para migracao de versoes de missao no futuro?

## Debitos Tecnicos Aprovados
- Review textual contara qualquer valor nao vazio em `notes`, incluindo textos muito curtos (ex.: "A").
- Refinamento futuro: adicionar heuristica/minimo de caracteres sem quebrar progresso historico.

## Prompt para o Time Dev (proxima execucao)
Objetivo:
Implementar base do sistema de conquistas sem regressao do CRUD atual.

Entregas esperadas:
1. Modelos e tipos para conquista e progresso.
2. Motor de calculo para regra de contagem e checklist.
3. Endpoint de leitura de conquistas com progresso.
4. UI de listagem de conquistas com barra e percentual.
5. Seed idempotente com 3 conquistas iniciais.
6. Testes unitarios do motor de progresso.

Restricoes:
- Manter API atual de jogos inalterada em comportamento externo.
- Evitar acoplamento da UI com regras especificas (sem hardcode de Mass Effect no componente).

Checklist de QA:
1. Alterar status de jogo para completed atualiza progresso.
2. Reverter completed reduz progresso corretamente.
3. Conquista concluida marca data e estilo visual.
4. Refresh da pagina mantem consistencia do progresso.

## Planejamento por Agente
- Kira (Produto): validar regras de negocio e copy das missoes.
- Sage (Backend): modelagem, motor de progresso, endpoint.
- Nova (Frontend): pagina/cards de conquistas com responsividade.
- Ivy (QA): matriz de testes funcionais e de regressao.
- Milo (Art): direcao visual de badges e estados concluido/em progresso.

## Execucao da Sprint
- Sequencia de rollout por PR: docs/sprint-1/rollout.md
- Acompanhamento continuo: docs/sprint-1/progress.md