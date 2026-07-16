# Sprint 2 - Gates de QA Visual

Escopo deste documento:
- Validacao exclusivamente visual e de experiencia.
- Sem cobertura de regra de negocio ou contrato de API.

## Gate V1 - Tema e Legibilidade Base

Objetivo:
Validar que light e dark mode estao estaveis e legiveis antes da revisao estetica profunda.

Criterios de aprovacao:
1. Alternancia de tema funciona em ate 1 clique em todas as telas principais.
2. Preferencia de tema persiste apos refresh e nova sessao.
3. Texto primario, secundario e links mantem contraste minimo de 4.5:1 (texto normal) e 3:1 (texto grande).
4. Nenhum componente critico fica ilegivel em dark ou light.
5. Tokens de tema respeitam a paleta oficial Neon Collage no design system.

Bloqueadores:
- Qualquer tela com contraste insuficiente em conteudo principal.
- Flicker visivel na troca de tema.
- Uso de cores fora da paleta oficial sem aprovacao de arte/produto.

## Gate V2 - Identidade City Pop Aplicada

Objetivo:
Garantir coerencia da direcao city pop sem sacrificar leitura.

Criterios de aprovacao:
1. Paleta e acentos neon aparecem de forma consistente entre paginas usando os tokens oficiais.
2. Elementos de colagem/textura existem, mas nao competem com texto funcional.
3. Hierarquia visual segue a ordem: titulo japones grande, headline, hero, cards, conteudo, CTA, rodape.
4. Tipografia segue contrato: headlines com familia serif JP; interface com familia sans limpa.
5. Estrutura de desktop usa grid de 12 colunas sem quebra de consistencia.
6. Fotografia segue estilo analogico: granulo leve, baixa saturacao, contraste baixo e luz suave.

Bloqueadores:
- Visual generico sem assinatura clara de identidade.
- Excesso de ruido grafico em areas de leitura.
- Uso de tipografia fora do contrato sem justificativa aprovada.

## Gate V3 - Estados Interativos e Feedback

Objetivo:
Validar clareza de interacao e previsibilidade dos componentes.

Criterios de aprovacao:
1. Estados hover, foco, ativo e desabilitado sao perceptiveis nos dois temas.
2. Inputs e formularios exibem erro/sucesso com feedback visual claro.
3. Cards seguem linguagem analogica: borda suave, sombra pequena e ao menos 1 detalhe de colagem (ticket/selo/fita/etiqueta).
4. Botoes seguem contrato: primario neon pink, secundario branco com borda rosa, hover com brilho leve e deslocamento de 2 a 4px.
5. Icones sao outline, traco fino e monocromaticos.
6. Microinteracoes sao discretas (fade/slide/parallax lento/neon breathing), sem bounce ou zoom exagerado.

Bloqueadores:
- Foco de teclado invisivel.
- Componentes com estados contraditorios entre telas.
- Icones 3D, metalicos ou skeuomorphic em componentes de interface.

## Gate V4 - Responsividade e Acabamento

Objetivo:
Aprovar o acabamento visual final em desktop e mobile.

Criterios de aprovacao:
1. Layout se adapta sem quebra de composicao em mobile e desktop.
2. Elementos de destaque nao sobrepoem controles criticos em telas pequenas.
3. Espacamentos e alinhamentos estao consistentes no app inteiro.
4. Nao ha cortes de texto, overflow inesperado ou tremor de layout.
5. Sobreposicoes e rotacoes decorativas (2 a 5 graus) nao impactam leitura nem area clicavel.
6. Conteudo funcional preserva espaco negativo suficiente para respiracao visual.

Bloqueadores:
- Sobreposicao que impede clique/toque em acao principal.
- Qualquer quebra estrutural recorrente em viewport mobile.
- Densidade visual que prejudica escaneabilidade de conteudo principal.

## Regra de Passagem

1. Gate V1 deve passar antes do inicio formal do Gate V2.
2. Gate V2 e Gate V3 podem rodar em paralelo apos V1.
3. Gate V4 e gate final de aprovacao visual para merge.
4. Falha em um bloqueador reabre o gate correspondente.

## Checklist Operacional por Tela

Instrucoes de uso:
1. Executar na ordem V1 -> (V2 + V3) -> V4.
2. Marcar cada item somente quando validado em light e dark.
3. Se houver bloqueador, registrar evidencias e reabrir o gate correspondente.

### Home

- [ ] V1: Toggle de tema funciona em 1 clique e persiste apos refresh.
- [ ] V1: Hero, menu e CTAs mantem contraste minimo (4.5:1 texto normal; 3:1 texto grande).
- [ ] V2: Hierarquia visual segue ordem obrigatoria (titulo JP, headline, hero, cards, conteudo, CTA, rodape).
- [ ] V2: Paleta oficial aparece de forma coerente (sem cores fora do contrato).
- [ ] V2: Elementos de colagem/textura existem sem competir com leitura do texto principal.
- [ ] V3: Botoes da hero seguem contrato (primario neon, secundario branco com borda rosa, hover com 2-4px).
- [ ] V3: Icones do header/acoes sao outline, finos e monocromaticos.
- [ ] V4: Layout da home nao quebra em mobile e nao sobrepoe controles da navegacao.

### Games (Listagem)

- [ ] V1: Filtros, titulos e metadados dos cards permanecem legiveis em ambos os temas.
- [ ] V1: Cards de jogo e barras/indicadores nao perdem contraste no tema dark.
- [ ] V2: Grid desktop respeita estrutura de 12 colunas para distribuicao principal.
- [ ] V2: Cards usam linguagem analogica (textura discreta + detalhe de colagem).
- [ ] V2: Acentos visuais city pop aparecem sem poluicao em listas longas.
- [ ] V3: Estados hover/foco/ativo dos filtros e acoes dos cards sao claramente distintos.
- [ ] V3: Feedback visual de acao (ex.: abrir detalhe/editar) e consistente entre cards.
- [ ] V4: Lista longa nao gera cortes, overflow horizontal ou tremor de layout no scroll.

### Add/Edit Game (Formulario)

- [ ] V1: Labels, placeholders e mensagens de ajuda mantem legibilidade em light/dark.
- [ ] V1: Campos obrigatorios e erros mantem contraste adequado.
- [ ] V2: Tipografia de interface segue familia sans definida e hierarquia limpa.
- [ ] V2: Decoracao de colagem no formulario e discreta (foco no preenchimento).
- [ ] V3: Estados de input (foco, erro, desabilitado, sucesso) sao visiveis e consistentes.
- [ ] V3: Botoes de salvar/cancelar seguem contrato visual de cor e hover.
- [ ] V3: Navegacao por teclado exibe foco perceptivel em todos os campos.
- [ ] V4: Em mobile, teclado virtual nao quebra o layout nem encobre CTA primario.

### Achievements

- [ ] V1: Cards, barras de progresso e textos de status mantem contraste nos dois temas.
- [ ] V1: Diferenciacao visual de concluida vs em progresso permanece clara em dark/light.
- [ ] V2: Identidade city pop esta presente com equilibrio (texturas e sobreposicoes sem ruido).
- [ ] V2: Hierarquia da tela destaca progresso e acao principal antes da decoracao.
- [ ] V3: Estados interativos dos cards e filtros de conquistas sao previsiveis.
- [ ] V3: Microinteracoes de progresso sao discretas (sem bounce/zoom exagerado).
- [ ] V4: Sobreposicoes e rotacoes decorativas nao invadem labels de progresso nem area clicavel.
- [ ] V4: Conteudo continua escaneavel em mobile com espaco negativo suficiente.

## Registro de Resultado

- [ ] Gate V1 aprovado
- [ ] Gate V2 aprovado
- [ ] Gate V3 aprovado
- [ ] Gate V4 aprovado
- [ ] Pronto para merge visual