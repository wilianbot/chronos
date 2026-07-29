# Chronos

Uma jornada pela História.

## Sobre

Chronos é uma plataforma educacional desenvolvida pela WR Labs para facilitar o aprendizado de História por meio de linhas do tempo, mapas, jornadas de estudo, personagens históricos, filosofia, mitologia, flashcards e revisão.

Contato: wrlabs.apps@gmail.com

Versão React + TypeScript do projeto educacional **Chronos**. A aplicação organiza uma linha do tempo interativa da Antiguidade até o fim da Segunda Guerra Mundial, com filtros, mapa real, personagens, catálogo de mitologia grega e romana, comparador de civilizações, flashcards, revisão rápida, favoritos e progresso salvo localmente.

## Branding e publicação

- Nome público: **Chronos**.
- Subtítulo: **Uma jornada pela História**.
- Desenvolvido por: **WR Labs**.
- Contato: **wrlabs.apps@gmail.com**.
- Domínio: não há domínio oficial definido neste repositório. Configure `VITE_SITE_URL` no ambiente de publicação para preencher URLs canônicas e Open Graph em runtime.
- Favicon: a estrutura está preparada para receber futuramente um ícone relacionado a tempo, como relógio, ampulheta ou símbolo cronológico. Nenhuma imagem foi gerada nesta etapa.

## Estado atual do projeto

O Chronos está atualmente como uma aplicação frontend estática em React, TypeScript e Vite. A navegação é feita por React Router, os dados ficam no próprio projeto e a persistência do usuário usa `localStorage`.

Não existe backend, banco de dados, autenticação, área administrativa ou login. Essa decisão mantém a aplicação simples de publicar e compatível com hospedagens estáticas, como Vercel, Netlify, Cloudflare Pages ou GitHub Pages com configuração adequada de SPA.

Hoje o projeto já possui:

- identidade pública como **Chronos**;
- layout global com sidebar, topbar, footer institucional e tema claro/escuro;
- logo tipográfico reutilizável em `src/components/brand/Logo.tsx`;
- cabeçalho institucional reutilizável em `src/components/brand/BrandHeader.tsx`;
- páginas institucionais de Sobre, Privacidade, Termos e Contato;
- SEO por rota, incluindo rotas dinâmicas de eventos, personagens e deuses;
- suporte a `VITE_SITE_URL` para URLs canônicas em produção;
- linha do tempo com filtros, favoritos, progresso e modal de detalhes;
- páginas de períodos, personagens, mitologia, mapas, comparações, jornadas, revisão, flashcards, glossário, favoritos e progresso;
- catálogo de mitologia grega e romana com imagens locais parciais e fallback;
- árvore genealógica mitológica interativa;
- mapa histórico com Leaflet e provedores OpenStreetMap, Esri e CARTO;
- testes automatizados, lint e build TypeScript funcionando.

Validação mais recente:

```bash
npm run build
npm run lint
npm run test
```

Resultado: build aprovado, lint aprovado e 66 testes passando.

## O que falta implementar

Antes da publicação oficial, ainda falta:

- definir o domínio oficial;
- configurar `VITE_SITE_URL` no ambiente de produção;
- atualizar `public/sitemap.xml` com URLs absolutas do domínio final;
- atualizar `public/robots.txt` com o sitemap absoluto do domínio final;
- criar e adicionar favicon real, preferencialmente com relógio, ampulheta ou símbolo relacionado ao tempo;
- criar ícones completos de PWA quando a instalação como aplicativo for priorizada;
- revisar textos legais de Privacidade e Termos antes de uso público amplo;
- validar visualmente as principais páginas em desktop e mobile no domínio final.

Funcionalidades de produto que ainda podem evoluir:

- salvar progresso por jornada guiada;
- adicionar desempenho individual dos flashcards;
- implementar revisão espaçada por data;
- criar linha do tempo comparativa entre regiões/civilizações;
- criar editor de acontecimentos ou fluxo de importação de dados;
- permitir copiar link direto de eventos abertos no modal;
- melhorar páginas individuais de eventos e personagens com layout mais completo;
- adicionar modo offline com service worker;
- exibir aviso de offline quando mapas ou imagens remotas não carregarem.

Conteúdo e acervo que ainda faltam expandir:

- completar imagens de mitologia que falharam no download;
- enriquecer divindades com fontes primárias específicas;
- adicionar novas mitologias usando a estrutura já preparada;
- ampliar o recorte histórico para Ásia, África, Américas e mundo islâmico;
- dividir temas amplos em eventos menores e mais específicos;
- revisar periodicamente fontes, créditos e licenças de imagem.

## Tecnologias

- React 18
- TypeScript 5
- Vite 7
- React Router
- Leaflet
- Esri, OpenStreetMap e CARTO como provedores de mapa base
- Lucide React
- Vitest
- Testing Library
- ESLint
- Prettier
- CSS3 puro

## Como executar

```bash
npm install
npm run dev
```

Acesse:

```text
http://127.0.0.1:5174/
```

Para gerar uma versão de produção:

```bash
npm run build
```

Comandos de qualidade:

```bash
npm run test
npm run lint
npm run format:check
npm run validate:images
npm run download:mythology-images
npm run format
```

## Estrutura

```text
jornada-historia-react/
|-- index.html
|-- package.json
|-- public/
|   `-- assets/
|       |-- images/
|       |-- images/personagens/
|       `-- images/mitologia/
|-- scripts/
|   |-- export-legacy-data.mjs
|   |-- download-personagem-images.mjs
|   |-- download-mythology-images.mjs
|   `-- validate-local-images.mjs
|-- src/
|   |-- app/                # rotas e router principal
|   |-- components/         # layout, cards, mapa, timeline e estudo
|   |-- context/            # estado global e persistência local
|   |-- data/               # acervo histórico, mitologia, mapas, geografia e ferramentas
|   |-- hooks/              # filtros, mídia e jornadas
|   |-- lib/                # regras de ordenação, normalização e revisão
|   |-- pages/              # páginas carregadas por rota
|   |-- services/           # catálogo derivado, mitologia e fontes
|   |-- types/              # tipos específicos por domínio
|   |-- App.tsx
|   |-- main.tsx
|   |-- styles.css
|   `-- types.ts
|-- vitest.config.ts
|-- vite.config.ts
`-- README.md
```

## Páginas e rotas

O projeto usa `react-router-dom` com `createBrowserRouter`. As páginas principais são carregadas com `lazy` e `Suspense`.

- `/` - início, progresso geral, continuar estudo e favoritos recentes.
- `/linha-do-tempo` - acontecimentos com busca, filtros e modal completo.
- `/periodos` - agrupamento por período histórico e progresso por período.
- `/personagens` - galeria de personagens históricos.
- `/mitologia` - catálogo de divindades gregas e romanas com busca, filtros, árvore e comparação cultural.
- `/mapas` - mapa interativo e mapas históricos de referência.
- `/comparacoes` - comparador de civilizações.
- `/jornadas` - jornadas guiadas e cadeias de causa/consequência.
- `/revisao` - revisão rápida com estatísticas.
- `/flashcards` - cartões de memorização.
- `/glossario` - conceitos históricos.
- `/favoritos` - eventos, personagens e divindades favoritas.
- `/progresso` - estudo salvo por período, progresso por mitologia e desempenho da revisão.
- `/eventos/:id`, `/personagens/:id` e `/deuses/:id` - links diretos para conteúdo específico.

## Conteúdo histórico incluído

Resumo atual do acervo:

- 107 acontecimentos históricos na linha do tempo.
- 38 personagens históricos na galeria.
- 54 divindades no catálogo de mitologia: 28 gregas e 26 romanas.
- 27 imagens locais de mitologia baixadas e validadas, com manifesto de créditos.
- 10 referências cartográficas históricas.
- 10 perguntas fixas de revisão rápida em `src/data/generated.ts`.
- 305 itens possíveis no banco de revisão em tempo de execução: perguntas fixas, 3 perguntas extras, 107 perguntas geradas por acontecimento, 38 perguntas geradas por personagem e perguntas geradas a partir das divindades.
- 7 jornadas guiadas com capítulos em ordem.
- 3 cadeias de causas e consequências.
- 10 flashcards de memorização.
- 12 termos de glossário histórico.

## Recursos implementados

### Confiabilidade histórica

Cada acontecimento possui no modal:

- data ou período;
- período histórico;
- civilização ou região;
- categoria;
- tipo de fonte, como história documentada, mito, lenda ou tradição;
- contexto;
- causas;
- consequências;
- curiosidades;
- legado;
- personagens envolvidos;
- relação com evento anterior e posterior;
- crédito de imagem;
- link da imagem quando ela é remota;
- fontes de estudo sugeridas.

As fontes exibidas no modal são selecionadas por período e tema. A base inclui referências como Encyclopaedia Britannica, World History Encyclopedia, British Museum, Metropolitan Museum of Art, Stanford Encyclopedia of Philosophy, Fordham Sourcebooks, Imperial War Museums, United States Holocaust Memorial Museum e National WWII Museum.

O projeto diferencia mito, lenda, tradição e história documentada por meio do campo `tipoFonte`. Narrativas como Guerra de Troia, origem lendária de Roma e mitologia grega aparecem como tradição, lenda ou mito, não como fato comprovado.

### Recursos de estudo salvos

O aplicativo usa `localStorage` para salvar:

- tema claro ou escuro;
- acontecimentos marcados como estudados;
- favoritos, incluindo eventos, personagens e divindades;
- perguntas marcadas como revisadas;
- último acontecimento aberto, usado pelo botão “Continuar de onde parei”.

Também há progresso geral, progresso por período e progresso por mitologia. Cada card de período mostra algo no formato:

```text
Grécia Antiga — 64% estudado (17/27)
Roma Antiga — 31% estudado (5/15)
Segunda Guerra Mundial — 10% estudado (1/9)
```

O progresso de mitologia reutiliza a chave antiga `jh-react-estudados`, sem migração destrutiva:

```text
Mitologia Grega — 8 de 28 divindades estudadas
Mitologia Romana — 4 de 26 divindades estudadas
```

### Busca e filtros

A busca textual procura em:

- título do acontecimento;
- resumo;
- descrição;
- período;
- civilização;
- categoria;
- personagens envolvidos.

Os filtros podem ser combinados:

```text
Período: Grécia Antiga
Categoria: guerra
Civilização: Atenas
```

Também existem filtros por período, civilização/região e categoria, além de botão para limpar filtros e contador de resultados.

### Modal dos acontecimentos

Cada acontecimento abre um modal com percurso histórico mais completo. Ele mostra:

- contexto;
- causas;
- descrição do acontecimento;
- consequências;
- curiosidades;
- legado;
- personagens;
- tipo de fonte;
- fontes de estudo;
- crédito/link da imagem;
- evento anterior;
- evento posterior.

Isso ajuda a entender encadeamentos como:

```text
Guerras Médicas → crescimento de Atenas → Liga de Delos → rivalidade com Esparta → Guerra do Peloponeso → enfraquecimento das pólis → expansão da Macedônia.
```

### Ferramentas de estudo guiado

Foram adicionadas ferramentas para estudar por percurso, conexão e memorização:

- **Jornadas guiadas:** 7 percursos prontos, incluindo Ascensão e queda de Atenas, Esparta às Termópilas, Alexandre, República para Império Romano, queda de Roma, guerras mundiais e filosofia grega.
- **Capítulos em ordem:** cada jornada mostra evento atual, resumo, botão para abrir o modal e botões de capítulo anterior/próximo.
- **Mapa de causas e consequências:** 3 cadeias históricas conectam eventos relacionados, como Guerras Médicas até Macedônia, República Romana até Augusto e Versalhes até 1945.
- **Flashcards:** 10 cartões de memorização com frente, verso e categoria.
- **Glossário histórico:** 12 termos com definição e exemplo, incluindo pólis, helenismo, falange, república, império, democracia direta, absolutismo, imperialismo, nacionalismo, totalitarismo, armistício e sobre-expansão imperial.
- **Catálogo de mitologia:** 54 divindades gregas e romanas com filtros, busca, imagens, símbolos, domínios, relações familiares, culto, páginas individuais e correspondências culturais aproximadas.
- **Árvore dos deuses:** diagrama por mitologia usando IDs reais do catálogo, sempre identificado como tradição mítica e não como genealogia universal.

Esses dados ficam em `src/data/studyTools.ts`, separados da linha do tempo principal.

### Revisão rápida

A revisão rápida combina perguntas fixas com perguntas geradas a partir do acervo. O banco efetivo atual possui 305 itens possíveis:

- 10 perguntas fixas cadastradas em `src/data/generated.ts`;
- 3 perguntas extras adicionadas em `src/services/historyCatalog.ts`;
- 107 perguntas geradas automaticamente a partir dos acontecimentos;
- 38 perguntas geradas automaticamente a partir dos personagens;
- 147 perguntas geradas automaticamente a partir das divindades.

Os formatos incluídos são:

- perguntas abertas;
- verdadeiro ou falso;
- múltipla escolha textual;
- ordenação de eventos;
- associação de personagem a acontecimento;
- identificação de datas;
- conceitos-chave por período;
- perguntas contextuais sobre a importância dos acontecimentos;
- perguntas de associação entre personagem e contexto histórico;
- perguntas sobre domínios, símbolos e correspondências culturais aproximadas entre divindades gregas e romanas.

O sistema salva perguntas revisadas, acertos, erros, itens difíceis e porcentagem por tema no `localStorage`. A revisão espaçada por data ainda está no roadmap.

### Acessibilidade

O projeto inclui:

- textos alternativos nas imagens;
- foco visível;
- navegação por teclado em ações principais;
- fechamento do modal com `Escape`;
- atributos `aria` em áreas interativas principais;
- contraste adequado para tema claro e escuro;
- suporte a `prefers-reduced-motion`;
- botões com área de clique confortável.

### Qualidade técnica

Já existe:

- ordenação por `anoOrdenacao`, usando valores negativos para a.C. e positivos para d.C.;
- filtros combináveis;
- fallback para imagens quebradas;
- tela de erro para falhas inesperadas e IDs duplicados;
- estado inicial de carregamento;
- rotas diretas com React Router para eventos, personagens e deuses;
- páginas separadas para favoritos e progresso;
- revisão com acerto, erro, dificuldade e porcentagem por tema;
- ESLint configurado;
- Prettier configurado;
- testes automatizados para filtros;
- testes automatizados para ordenação a.C./d.C.;
- testes automatizados para validação de eventos duplicados;
- testes automatizados para fallback de imagens quebradas;
- testes automatizados para regras responsivas críticas;
- build TypeScript validado;
- Vite 7 configurado;
- `npm audit` sem vulnerabilidades conhecidas no momento da última verificação.

Comandos validados na última execução:

```bash
npm run test
npm run lint
npm run format:check
npm run validate:images
npm run download:mythology-images
npm run build
npm audit
```

### Acontecimentos por período

- Primeiras Civilizações: 7 acontecimentos.
- Grécia Antiga: 27 acontecimentos.
- Macedônia e Helenismo: 7 acontecimentos.
- Roma Antiga: 15 acontecimentos.
- Idade Média: 11 acontecimentos.
- Renascimento: 2 acontecimentos.
- Reforma e Grandes Navegações: 3 acontecimentos.
- Absolutismo e Iluminismo: 3 acontecimentos.
- Revoluções: 4 acontecimentos.
- Era Napoleônica: 4 acontecimentos.
- Revolução Industrial: 3 acontecimentos.
- Imperialismo: 2 acontecimentos.
- Primeira Guerra Mundial: 5 acontecimentos.
- Período Entre Guerras: 5 acontecimentos.
- Segunda Guerra Mundial: 9 acontecimentos.

### Primeiras Civilizações

Inclui surgimento das primeiras cidades, Mesopotâmia, sumérios, escrita cuneiforme, Egito Antigo, faraós, pirâmides, Babilônia, Código de Hamurábi, Império Persa, Ciro, o Grande, Dario I e queda da Babilônia.

### Grécia Antiga

Inclui civilização minoica, Creta, Palácio de Cnossos, mito do Minotauro, civilização micênica, Micenas, Guerra de Troia como tradição épica, Homero, Ilíada, Odisseia, Idade das Trevas grega, surgimento das pólis, colonização grega, Jogos Olímpicos antigos, Esparta, Atenas, reformas políticas, democracia ateniense, Guerras Médicas, Maratona, Termópilas, Salamina, Plateia, Liga de Delos, Péricles, Guerra do Peloponeso e enfraquecimento das pólis.

### Mitologia Grega

Inclui origem dos deuses, Gaia, Urano, Cronos, Titãs, Titanomaquia, Gigantomaquia, Prometeu, Pandora, Héracles, Perseu, Medusa, Teseu, Minotauro, Orfeu, Eurídice, Hades, Caronte, Estige/Aqueronte, Campos Elísios, Prados de Asfódelos e Tártaro.

O catálogo atual possui 28 divindades gregas: Zeus, Hera, Poseidon, Hades, Atena, Ares, Apolo, Ártemis, Afrodite, Hermes, Hefesto, Dionísio, Deméter, Perséfone, Héstia, Cronos, Reia, Gaia, Urano, Prometeu, Hécate, Nêmesis, Nike, Eros, Hipnos, Tânatos, Asclépio e Pan.

Cada divindade possui ID estável, mitologia, cultura, categoria, domínios, símbolos, relações familiares, mitos principais, culto, contexto histórico, legado cultural, fontes e imagem com fallback. A interface diferencia deuses olímpicos, primordiais, titãs, ctônicos, personificações, heróis divinizados, divindades domésticas, de guerra, natureza, amor, morte, sabedoria, cura e limiar.

### Esparta e Atenas

Esparta inclui sociedade militarizada, espartanos, periecos, hilotas, agogê, papel das mulheres, dois reis, Gerúsia, éforos, exército, falange, Leônidas e Termópilas.

Atenas inclui aristocracia, Drácon, Sólon, Pisístrato, Clístenes, nascimento da democracia, democracia direta, limites da cidadania, Péricles, Acrópole, Partenon, teatro, tragédia, comédia e vida cívica.

### Filosofia Grega

Inclui pré-socráticos, mito e logos, arché, mudança, permanência, átomos, Tales, Anaximandro, Anaxímenes, Pitágoras, Heráclito, Parmênides, Empédocles, Demócrito, Sócrates, método socrático, julgamento e morte de Sócrates, Platão, Academia, Teoria das Formas, Alegoria da Caverna, A República, Aristóteles, Liceu, lógica, ética, política, ciência, virtude, meio-termo e observação da natureza.

### Macedônia e Helenismo

Inclui Filipe II, fortalecimento da Macedônia, falange macedônica, sarissa, Queroneia, assassinato de Filipe II, Alexandre assumindo o trono, educação com Aristóteles, campanhas na Ásia Menor, Isso, Egito, Alexandria, Gaugamela, queda do Império Persa, avanço até a Índia, retorno à Babilônia, morte de Alexandre, divisão do império, reinos helenísticos e helenismo.

### Roma Antiga

Inclui origem lendária de Roma, Eneias, Rômulo e Remo, loba, fundação tradicional de 753 a.C., Monarquia, influência etrusca, patrícios, plebeus, clientes, escravizados, Senado, queda do último rei, República, cônsules, magistrados, Tribunos da Plebe, Lei das Doze Tábuas, expansão pela Itália, socii, Guerras Púnicas, Cartago, Aníbal, Cipião Africano, crise social, irmãos Graco, Mário, Sula, Espártaco, Primeiro Triunvirato, Pompeu, Crasso, Júlio César, Gália, Rubicão, ditadura, assassinato, Marco Antônio, Cleópatra, Otaviano e Áccio.

Também inclui Império Romano, Augusto, Pax Romana, legiões, tropas auxiliares, cidadania, estradas, aquedutos, direito romano, Coliseu, gladiadores, Nero, Vespasiano, Trajano, Adriano, Marco Aurélio, crise do século III, Diocleciano, Constantino, Constantinopla, cristianismo, divisão do império, invasões germânicas, visigodos, vândalos, hunos, Átila, saque de Roma, Odoacro e queda do Império Romano do Ocidente em 476.

### Mitologia Romana

O catálogo atual possui 26 divindades romanas: Júpiter, Juno, Netuno, Plutão, Minerva, Marte, Apolo, Diana, Vênus, Mercúrio, Vulcano, Baco, Ceres, Prosérpina, Vesta, Saturno, Ops, Cupido, Vitória, Fortuna, Jano, Quirino, Bellona, Fauno, Lares e Penates.

A religião romana não é apresentada como simples renomeação da religião grega. Divindades como Jano, Quirino, Lares, Penates e Fortuna aparecem com funções próprias, e as correspondências com divindades gregas são exibidas como aproximações culturais.

### Idade Média

Inclui queda de Roma no Ocidente, reinos germânicos, Império Bizantino, Justiniano, Código de Justiniano, Hagia Sophia, surgimento do islamismo, Maomé, expansão islâmica, Carlos Magno, feudalismo, Igreja Católica, mosteiros, vikings, cruzadas, Império Mongol, Gêngis Khan, peste negra, Guerra dos Cem Anos, Joana d'Arc e queda de Constantinopla em 1453.

### Renascimento e Início da Modernidade

Inclui Renascimento, humanismo, cidades italianas, Leonardo da Vinci, Michelangelo, Rafael, imprensa de Gutenberg, Reforma Protestante, Martinho Lutero, Contrarreforma, Grandes Navegações, Portugal, Espanha, chegada dos europeus à América, colonização, comércio atlântico, escravidão e formação dos Estados modernos.

### Absolutismo, Ciência e Iluminismo

Inclui absolutismo, Luís XIV, Palácio de Versalhes, Revolução Científica, Copérnico, Galileu, Kepler, Isaac Newton, Iluminismo, John Locke, Montesquieu, Voltaire, Rousseau, separação dos poderes, direitos naturais e crítica ao absolutismo.

### Revoluções

Inclui Revolução Inglesa, Revolução Gloriosa, Independência dos Estados Unidos, Revolução Francesa, queda da Bastilha, Declaração dos Direitos do Homem e do Cidadão, fim do absolutismo francês, período do Terror, Robespierre e ascensão de Napoleão.

### Era Napoleônica

Inclui carreira militar de Napoleão, golpe do 18 de Brumário, coroação como imperador, Código Napoleônico, expansão francesa, Austerlitz, bloqueio continental, invasão da Rússia, problemas de abastecimento, retirada, abdicação, Cem Dias, Waterloo, exílio, legado e conceito de sobre-expansão imperial.

### Revolução Industrial, Século XIX e Imperialismo

Inclui Primeira Revolução Industrial, máquina a vapor, fábricas, urbanização, condições dos trabalhadores, capitalismo industrial, socialismo, Karl Marx, Segunda Revolução Industrial, eletricidade, petróleo, aço, ferrovias, nacionalismo, unificação da Itália, unificação da Alemanha, Otto von Bismarck, imperialismo, colonialismo na África e na Ásia e corrida armamentista.

### Primeira Guerra Mundial

Inclui alianças, nacionalismo, imperialismo, militarismo, assassinato de Francisco Ferdinando, início da guerra em 1914, Tríplice Entente, Potências Centrais, guerra de trincheiras, Verdun, Somme, entrada dos Estados Unidos, Revolução Russa, saída da Rússia, fim da guerra em 1918, Tratado de Versalhes e consequências humanas, econômicas e políticas.

### Período Entre Guerras

Inclui consequências do Tratado de Versalhes, República de Weimar, crise de 1929, Grande Depressão, fascismo, Mussolini, nazismo, Hitler, ascensão de Stalin, Guerra Civil Espanhola, militarismo japonês, expansionismo e política de apaziguamento. Regimes totalitários são tratados de forma crítica e contextualizada.

### Segunda Guerra Mundial

Inclui invasão da Polônia, início da guerra em 1939, Blitzkrieg, queda da França, Batalha da Inglaterra, Operação Barbarossa, Pearl Harbor, entrada dos Estados Unidos, Stalingrado, guerra no Pacífico, Holocausto, campos de concentração e extermínio, resistência, Dia D, libertação da França, queda de Berlim, morte de Hitler, rendição da Alemanha, bombas atômicas, Hiroshima, Nagasaki, rendição do Japão, fim da guerra em 1945, criação da ONU e consequências da guerra.

### Galeria de Personagens

Inclui Homero, Leônidas, Sólon, Clístenes, Péricles, Heródoto, Tucídides, Sócrates, Platão, Aristóteles, Filipe II, Alexandre, Aníbal, Cipião Africano, Júlio César, Cleópatra, Augusto, Marco Aurélio, Constantino, Justiniano, Carlos Magno, Joana d'Arc, Leonardo da Vinci, Martinho Lutero, Galileu, Isaac Newton, Luís XIV, George Washington, Napoleão, Bismarck, Karl Marx, Francisco Ferdinando, Winston Churchill, Franklin Roosevelt, Charles de Gaulle, Hitler, Mussolini e Stalin.

Personagens ligados a regimes totalitários aparecem em contexto histórico e sem glorificação.

### Comparador de Civilizações

Inclui comparações entre Atenas e Esparta, Grécia e Roma, República Romana e Império Romano, Roma Ocidental e Roma Oriental. Os critérios comparados são governo, sociedade, economia, religião, forças militares, cultura, território, personagens e legado.

### Mapas e Expansão Territorial

Inclui cidades-Estado gregas, Império Persa, conquistas de Alexandre, expansão da República Romana, maior extensão do Império Romano, divisão entre Oriente e Ocidente, Europa medieval, expansão napoleônica, alianças da Primeira Guerra Mundial e Eixo/Aliados na Segunda Guerra Mundial.

Existem dois recursos de mapa:

- **Mapa interativo:** usa Leaflet com marcadores aproximados para cidades, regiões, batalhas ou centros políticos de referência.
- **Mapas históricos de referência:** 10 links cartográficos externos, principalmente Wikimedia Commons, usados para consulta visual de expansão territorial e alianças.

## Dados históricos

O arquivo `src/data/generated.ts` é gerado a partir da versão HTML original quando ela existir. Se a versão antiga não estiver no workspace, o script normaliza o próprio `src/data/generated.ts`.

```bash
npm run sync:data
```

Quando a versão HTML existir, edite primeiro os dados em `../jornada-historia/js/data.js` e depois rode o comando acima para atualizar a versão React.

## Mapa

O mapa principal usa Leaflet. Os pontos são aproximados e ficam definidos em `src/data/geo.ts`. Para eventos muito amplos, o marcador usa uma cidade, batalha, capital ou região de referência.

Provedores de mapa base disponíveis em `src/components/maps/mapProviders.ts`:

- OpenStreetMap;
- Esri World Street Map;
- Esri Topographic;
- Esri World Imagery;
- CARTO Voyager.

O OpenStreetMap é o provedor padrão e usa `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, sem chave de API. O mapa tenta alternar automaticamente entre provedores quando há erro real de tiles. Se a rede bloquear todos os provedores remotos, a aplicação mantém uma base local simplificada em SVG com os marcadores aproximados.

O componente também observa mudanças de tamanho do contêiner e chama `invalidateSize` para evitar tiles invisíveis em rotas lazy, mudança de viewport e layouts responsivos.

## Imagens

As imagens locais ficam em `public/assets/images`. Caminhos antigos iniciados por `public/` são normalizados para `/assets/...`, e URLs remotas são preservadas quando realmente usadas.

O aplicativo possui fallback visual caso uma imagem não carregue. Há validação para imagens locais de runtime e scripts para baixar personagens e mitologia sem salvar HTML como `.jpg`.

Imagens de mitologia ficam em:

```text
public/assets/images/mitologia/grega
public/assets/images/mitologia/romana
public/assets/images/mitologia/image-credits.json
```

O manifesto registra:

- nome do arquivo;
- autor;
- instituição;
- licença;
- origem;
- link da página original;
- data de download.

Status atual do download de mitologia: 27 de 54 imagens foram baixadas e validadas. As demais continuam usando fallback até que sejam substituídas por fontes estáveis e licenciadas.

## Melhorias futuras recomendadas

### Roadmap incremental de funcionalidades

As melhorias abaixo foram pensadas para serem adicionadas aos poucos, sem reescrever o projeto inteiro. A ideia é evoluir a aplicação de uma linha do tempo interativa para uma plataforma de estudo mais guiada.

Status atual:

- Primeira versão implementada: jornadas guiadas, mapa de causas e consequências, flashcards, glossário, catálogo de mitologia, árvore genealógica por mitologia, favoritos, progresso e URLs próprias para eventos, personagens e deuses.
- Próximas evoluções: completar imagens de mitologia que falharam no Wikimedia, salvar progresso por jornada, desempenho dos flashcards, revisão espaçada, linha do tempo comparativa, editor de acontecimentos e PWA.

#### 1. Jornadas guiadas

Criar percursos prontos que selecionam eventos em ordem e mostram um botão “Próximo capítulo”.

Primeiras jornadas sugeridas:

- Ascensão e queda de Atenas;
- De Esparta às Termópilas;
- A vida de Alexandre, o Grande;
- Da República ao Império Romano;
- Por que Roma caiu?;
- Da Primeira à Segunda Guerra Mundial;
- A evolução da filosofia grega.

Passos de implementação:

- Ampliar o bloco de jornadas em `src/data/studyTools.ts`;
- Cada jornada deve guardar título, descrição e lista de `ids` dos acontecimentos;
- Criar componente `JornadasGuiadas`;
- Abrir os eventos no modal já existente;
- Salvar progresso da jornada em `localStorage`.

#### 2. Mapa de causas e consequências

Criar uma visualização conectando eventos relacionados, não apenas ordenando por data.

Exemplo:

```text
Guerras Médicas
↓
Crescimento de Atenas
↓
Liga de Delos
↓
Rivalidade com Esparta
↓
Guerra do Peloponeso
↓
Enfraquecimento das pólis
↓
Domínio da Macedônia
```

Passos de implementação:

- Ampliar o bloco de cadeias históricas em `src/data/studyTools.ts`;
- Cada conexão deve ter `origem`, `destino` e `tipo`, como causa, consequência ou influência;
- Criar visualização em lista vertical primeiro;
- Depois evoluir para grafo visual com SVG ou biblioteca própria;
- Permitir abrir o modal ao clicar em cada evento.

#### 3. Flashcards

Criar cartões de memorização com frente e verso.

Tipos de flashcards:

- datas;
- personagens;
- conceitos;
- guerras;
- deuses;
- civilizações.

Exemplo:

```text
Frente: O que foi a pólis?
Verso: Uma cidade-Estado independente, com governo, leis, cultos e identidade próprios.
```

Passos de implementação:

- Ampliar o bloco de flashcards em `src/data/studyTools.ts`;
- Permitir virar cartão;
- Botões “acertei”, “errei” e “revisar depois”;
- Salvar desempenho em `localStorage`;
- Filtrar flashcards por período e categoria.

#### 4. Revisão espaçada

Evoluir a revisão rápida para um sistema de repetição espaçada.

Regras iniciais:

- erro: revisar novamente hoje;
- acerto com dúvida: revisar em 3 dias;
- acerto normal: revisar em 7 dias;
- acerto fácil: revisar em 30 dias.

Passos de implementação:

- Salvar por pergunta: quantidade de acertos, erros, última revisão e próxima revisão;
- Criar fila “Revisar hoje”;
- Priorizar perguntas erradas;
- Mostrar estatísticas como “8 de 10 respostas corretas”;
- Mostrar “melhor tema” e “tema para revisar”.

#### 5. Glossário histórico

Criar uma seção de conceitos com explicações curtas.

Termos iniciais:

- pólis;
- helenismo;
- falange;
- república;
- império;
- democracia direta;
- absolutismo;
- imperialismo;
- nacionalismo;
- totalitarismo;
- armistício;
- sobre-expansão imperial.

Passos de implementação:

- Ampliar o bloco de glossário em `src/data/studyTools.ts`;
- Adicionar seção “Glossário”;
- Criar componente `TermoGlossario`;
- Futuramente destacar palavras nos textos e abrir explicação em popover ou modal.

#### 6. Linha do tempo comparativa

Permitir ver acontecimentos simultâneos em regiões diferentes.

Exemplo:

```text
Ano       Grécia              Roma                Pérsia
490 a.C. Maratona            República Romana    Dario I
334 a.C. Domínio macedônico  Expansão na Itália  Campanha de Alexandre
```

Passos de implementação:

- Criar agrupamento por faixas de tempo;
- Definir colunas por civilização ou região;
- Criar componente `TimelineComparativa`;
- Permitir selecionar quais civilizações aparecem;
- Usar `anoOrdenacao` para manter a ordem correta entre a.C. e d.C.

#### 7. Editor de acontecimentos

Criar uma tela administrativa simples para adicionar eventos sem editar código.

Campos sugeridos:

- título;
- data;
- ano de ordenação;
- resumo;
- descrição;
- personagens;
- causas;
- consequências;
- curiosidades;
- legado;
- imagem;
- fontes;
- latitude e longitude.

Passos de implementação:

- Criar formulário com validação;
- Pré-visualizar o card antes de salvar;
- Exportar JSON;
- Criar função para converter JSON em módulo TypeScript;
- Validar duplicidade de `id`.

#### 8. Links próprios para cada conteúdo

URLs diretas para eventos, personagens e deuses já existem no router principal.

Exemplos:

```text
/eventos/batalha-de-maratona
/personagens/alexandre-o-grande
/deuses/zeus
```

Implementado atualmente:

- React Router com `createBrowserRouter`;
- páginas de detalhe para evento, personagem e deus;
- fallback para conteúdo inexistente;
- carregamento lazy das páginas.

Melhorias possíveis:

- atualizar URL automaticamente ao abrir um evento pelo modal;
- permitir copiar link direto por botão dedicado;
- Manter fallback para evento inexistente.

#### 9. Instalação como aplicativo

Transformar o projeto em PWA.

Recursos desejados:

- instalar no celular;
- abrir como aplicativo;
- acessar parte do conteúdo sem internet;
- manter progresso salvo;
- revisar História em qualquer lugar.

Passos de implementação:

- Adicionar `manifest.webmanifest`;
- Criar ícones do app;
- Configurar service worker;
- Cachear assets principais;
- Cachear dados históricos;
- Mostrar aviso quando estiver offline.

#### 10. Catálogo e árvore de mitologia

Status atual:

- catálogo tipado em `src/data/mythology`;
- filtros por mitologia, categoria, domínio, gênero e busca textual;
- URLs compartilháveis, como `/mitologia?mitologia=grega&categoria=olimpico`;
- páginas individuais em `/deuses/:id`;
- árvore por mitologia usando IDs reais;
- correspondências culturais aproximadas entre gregos e romanos;
- progresso por mitologia;
- imagens locais com fallback e manifesto de créditos.

Pendências reais:

- completar imagens que falharam no Wikimedia;
- enriquecer textos com fontes primárias específicas por divindade;
- adicionar novas mitologias usando o modelo já preparado.

### Ampliar história global

O recorte atual privilegia Antiguidade mediterrânea, Grécia, Roma, Europa e guerras mundiais. Para tornar a proposta mais global, futuras versões podem incluir:

- fenícios e origem do alfabeto;
- assírios;
- hebreus e judaísmo antigo;
- Índia antiga;
- Império Máuria;
- budismo;
- China antiga;
- Qin Shi Huang;
- dinastia Han;
- Rota da Seda;
- civilizações maia, asteca e inca;
- expansão otomana;
- Era de Ouro do mundo islâmico;
- Japão feudal;
- Restauração Meiji;
- guerras do ópio;
- independências da América Latina;
- Guerra Civil Americana;
- abolição da escravidão;
- Revolução Haitiana.

### Transformar temas amplos em eventos separados

Alguns períodos ainda têm poucos eventos na linha do tempo. Futuras versões podem dividir melhor:

- Renascimento;
- Absolutismo e Iluminismo;
- Revolução Industrial;
- Imperialismo;
- Era Moderna;
- século XIX.

Exemplos de eventos recomendados:

- nascimento e contexto histórico de Jesus;
- perseguições aos cristãos;
- Édito de Milão;
- Concílio de Niceia;
- cristianismo como religião oficial;
- saque de Roma em 410;
- saque de Roma em 455;
- Cisma do Oriente;
- Magna Carta;
- surgimento das universidades;
- Reconquista Ibérica;
- Guerra dos Trinta Anos;
- Tratado de Vestfália;
- Revolução Haitiana;
- independências latino-americanas;
- Congresso de Viena;
- Guerra Civil Americana;
- Restauração Meiji;
- Conferência de Berlim;
- Guerra Russo-Japonesa;
- criação da União Soviética;
- Leis de Nuremberg;
- invasão japonesa da China;
- Batalha de Midway;
- campanha do Norte da África;
- Batalha de Kursk;
- conferências de Yalta e Potsdam;
- Julgamentos de Nuremberg.

### Testes e ferramentas

Primeira versão implementada:

- ESLint;
- Prettier;
- testes dos filtros;
- testes da ordenação de datas a.C. e d.C.;
- validação de eventos duplicados;
- testes de imagens quebradas;
- testes responsivos críticos;
- tela de erro;
- estado de carregamento;
- revisão com pontuação e dificuldade;
- porcentagem por tema dentro da revisão.

Melhorias técnicas futuras:

- testes end-to-end com navegador real;
- relatório de cobertura;
- teste visual por screenshot;
- CI para rodar `test`, `lint`, `format:check`, `build` e `audit` automaticamente.

## Observações

- A versão HTML pura pode continuar preservada em `../jornada-historia`, quando essa pasta existir.
- A versão React precisa de servidor local Vite; diferente da versão HTML, não deve ser aberta diretamente pelo arquivo `index.html`.
- O `package.json` atual usa Vite 7.3.6 e `@vitejs/plugin-react` 5.1.4.
