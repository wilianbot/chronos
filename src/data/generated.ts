import type {
  Acontecimento,
  ComparadorCivilizacao,
  DeusGrego,
  MapaHistorico,
  PerguntaRevisao,
  Personagem
} from "../types";

export const acontecimentos = [
  {
    id: "primeiras-cidades",
    ano: "c. 3500 a.C.",
    anoOrdenacao: -3500,
    titulo: "Surgimento das primeiras cidades",
    periodo: "Primeiras Civilizações",
    civilizacao: "Mesopotâmia",
    categoria: "política",
    resumo: "Centros urbanos aparecem no Crescente Fértil.",
    descricao:
      "Cidades como Uruk reuniram administração, templos, agricultura irrigada, comércio e especialização do trabalho.",
    personagens: ["sumérios"],
    causas: ["Agricultura excedente", "Irrigação", "Necessidade de administração"],
    curiosidades: [],
    consequencias: ["Formação do Estado", "Divisão social do trabalho"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Cidades como Uruk reuniram administração, templos, agricultura irrigada, comércio e especialização do trabalho.",
    imagem: "assets/images/ziggurat-ur.jpg",
    alt: "Surgimento das primeiras cidades",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "escrita-cuneiforme",
    ano: "c. 3200 a.C.",
    anoOrdenacao: -3200,
    titulo: "Escrita cuneiforme",
    periodo: "Primeiras Civilizações",
    civilizacao: "Mesopotâmia",
    categoria: "ciência",
    resumo: "A escrita nasce ligada a registros econômicos e administrativos.",
    descricao:
      "Os sumérios desenvolveram sinais em tabuletas de argila, primeiro para contabilidade e depois para textos legais, literários e religiosos.",
    personagens: ["sumérios"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Memória administrativa", "Literatura antiga", "Registros jurídicos"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Os sumérios desenvolveram sinais em tabuletas de argila, primeiro para contabilidade e depois para textos legais, literários e religiosos.",
    imagem: "assets/images/ziggurat-ur.jpg",
    alt: "Escrita cuneiforme",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "egito-unificacao",
    ano: "c. 3100 a.C.",
    anoOrdenacao: -3100,
    titulo: "Unificação do Egito Antigo",
    periodo: "Primeiras Civilizações",
    civilizacao: "Egito",
    categoria: "império",
    resumo: "O vale do Nilo se organiza sob poder faraônico.",
    descricao:
      "A tradição atribui a Menés ou Narmer a unificação do Alto e Baixo Egito, criando uma monarquia sagrada duradoura.",
    personagens: ["Narmer"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A tradição atribui a Menés ou Narmer a unificação do Alto e Baixo Egito, criando uma monarquia sagrada duradoura.",
    imagem: "assets/images/piramides-gize.jpg",
    alt: "Unificação do Egito Antigo",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada com tradição antiga"
  },
  {
    id: "piramides-gize",
    ano: "c. 2580 a.C.",
    anoOrdenacao: -2580,
    titulo: "Pirâmides de Gizé",
    periodo: "Primeiras Civilizações",
    civilizacao: "Egito",
    categoria: "arte",
    resumo: "Grandes complexos funerários expressam poder faraônico.",
    descricao:
      "As pirâmides, especialmente a de Quéops, mobilizaram planejamento, trabalho especializado, crenças funerárias e autoridade central.",
    personagens: ["Quéops", "Quéfren", "Miquerinos"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Símbolo da civilização egípcia", "Avanços em engenharia e organização"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "As pirâmides, especialmente a de Quéops, mobilizaram planejamento, trabalho especializado, crenças funerárias e autoridade central.",
    imagem: "assets/images/piramides-gize.jpg",
    alt: "Pirâmides de Gizé",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "minoicos-creta",
    ano: "c. 2000 a.C.",
    anoOrdenacao: -2000,
    titulo: "Civilização minoica em Creta",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "arte",
    resumo: "Creta desenvolve palácios, comércio marítimo e cultura refinada.",
    descricao:
      "A civilização minoica floresceu na ilha de Creta, com centros como Cnossos e forte ligação com o mar Egeu.",
    personagens: ["minoicos"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influências sobre o mundo grego"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A civilização minoica floresceu na ilha de Creta, com centros como Cnossos e forte ligação com o mar Egeu.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Knossos_-_North_entrance.jpg",
    alt: "Civilização minoica em Creta",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "palacio-cnossos",
    ano: "c. 1900 a.C.",
    anoOrdenacao: -1900,
    titulo: "Palácio de Cnossos",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "arte",
    resumo: "Complexo palaciano ligado à memória do labirinto.",
    descricao:
      "Cnossos mostra arquitetura elaborada, afrescos e administração palacial. O mito do Minotauro pertence à tradição, não à história comprovada.",
    personagens: ["Minos"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: ["O labirinto e o Minotauro são narrativas míticas associadas a Creta."],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Cnossos mostra arquitetura elaborada, afrescos e administração palacial. O mito do Minotauro pertence à tradição, não à história comprovada.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Knossos_-_North_entrance.jpg",
    alt: "Palácio de Cnossos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada e mito diferenciado"
  },
  {
    id: "codigo-hamurabi",
    ano: "c. 1754 a.C.",
    anoOrdenacao: -1754,
    titulo: "Código de Hamurábi",
    periodo: "Primeiras Civilizações",
    civilizacao: "Babilônia",
    categoria: "política",
    resumo: "Um dos conjuntos legais mais conhecidos da Antiguidade.",
    descricao:
      "O rei Hamurábi reuniu normas sobre propriedade, comércio, família, punições e hierarquia social, refletindo a sociedade babilônica.",
    personagens: ["Hamurábi"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Registro jurídico monumental", "Fonte para estudar desigualdade e poder"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O rei Hamurábi reuniu normas sobre propriedade, comércio, família, punições e hierarquia social, refletindo a sociedade babilônica.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Ishtar_gate_in_Pergamon_museum.jpg",
    alt: "Código de Hamurábi",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "micenicos",
    ano: "c. 1600 a.C.",
    anoOrdenacao: -1600,
    titulo: "Civilização micênica",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "império",
    resumo: "Micenas domina parte do mundo grego pré-clássico.",
    descricao:
      "A cultura micênica deixou palácios fortificados, escrita Linear B e elite guerreira. Sua memória aparece nos poemas homéricos.",
    personagens: ["micênicos"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A cultura micênica deixou palácios fortificados, escrita Linear B e elite guerreira. Sua memória aparece nos poemas homéricos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Lion_gate_in_Mycenae.jpg",
    alt: "Civilização micênica",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "guerra-troia",
    ano: "c. 1200 a.C.",
    anoOrdenacao: -1200,
    titulo: "Guerra de Troia na tradição épica",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "mitologia",
    resumo: "A tradição narra um conflito entre aqueus e troianos.",
    descricao:
      "A Ilíada apresenta uma versão poética da guerra. Escavações indicam destruições em Troia, mas os detalhes homéricos são tradição literária.",
    personagens: ["Homero", "Aquiles", "Heitor"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A Ilíada apresenta uma versão poética da guerra. Escavações indicam destruições em Troia, mas os detalhes homéricos são tradição literária.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Walls_of_Ancient_Troy.jpg",
    alt: "Guerra de Troia na tradição épica",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Tradição e evidência arqueológica parcial"
  },
  {
    id: "idade-trevas-grega",
    ano: "c. 1100-800 a.C.",
    anoOrdenacao: -1100,
    titulo: "Idade das Trevas grega",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "política",
    resumo: "Após o colapso micênico, há redução de registros escritos.",
    descricao:
      "O período teve mudanças populacionais e materiais, mas não foi vazio: tradições orais e novas formas sociais amadureceram.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O período teve mudanças populacionais e materiais, mas não foi vazio: tradições orais e novas formas sociais amadureceram.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Dipylon%20vase%20NAMA%20804.jpg",
    alt: "Idade das Trevas grega",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "surgimento-polis",
    ano: "c. 800 a.C.",
    anoOrdenacao: -800,
    titulo: "Surgimento das pólis",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "política",
    resumo: "A pólis era a cidade-Estado grega.",
    descricao:
      "Uma pólis combinava núcleo urbano, território rural, instituições, cultos, leis e identidade cívica. Atenas e Esparta foram modelos muito diferentes.",
    personagens: ["cidadãos gregos"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Autonomia política", "Experimentação institucional", "Rivalidades entre cidades"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Uma pólis combinava núcleo urbano, território rural, instituições, cultos, leis e identidade cívica. Atenas e Esparta foram modelos muito diferentes.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Agora%20of%20Athens%20view.jpg",
    alt: "Surgimento das pólis",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "jogos-olimpicos",
    ano: "776 a.C.",
    anoOrdenacao: -776,
    titulo: "Jogos Olímpicos antigos",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "religião",
    resumo: "Competições pan-helênicas honram Zeus em Olímpia.",
    descricao:
      "Os jogos uniam atletas de várias pólis, reforçando identidade cultural grega apesar das rivalidades políticas.",
    personagens: ["Zeus"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Os jogos uniam atletas de várias pólis, reforçando identidade cultural grega apesar das rivalidades políticas.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Olympia%20Stadium%20track.jpg",
    alt: "Jogos Olímpicos antigos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada com contexto religioso"
  },
  {
    id: "roma-lendaria",
    ano: "753 a.C.",
    anoOrdenacao: -753,
    titulo: "Fundação lendária de Roma",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "mitologia",
    resumo: "A tradição fala de Eneias, Reia Sílvia, Rômulo, Remo e a loba.",
    descricao:
      "Romanos narravam a origem desde Troia até a fundação por Rômulo. A data de 753 a.C. é tradicional; a narrativa é lendária.",
    personagens: ["Eneias", "Rômulo", "Remo", "Reia Sílvia"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Romanos narravam a origem desde Troia até a fundação por Rômulo. A data de 753 a.C. é tradicional; a narrativa é lendária.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Roman_Forum_%28Foro_Romano%29.jpg",
    alt: "Fundação lendária de Roma",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Lenda e tradição romana"
  },
  {
    id: "monarquia-romana",
    ano: "753-509 a.C.",
    anoOrdenacao: -752,
    titulo: "Monarquia romana",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "política",
    resumo: "Roma é governada por reis e recebe influência etrusca.",
    descricao:
      "A sociedade incluía patrícios, plebeus, clientes e pessoas escravizadas; o Senado tinha papel aristocrático.",
    personagens: ["Tarquínio, o Soberbo"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A sociedade incluía patrícios, plebeus, clientes e pessoas escravizadas; o Senado tinha papel aristocrático.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20%28Foro%20Romano%29.jpg",
    alt: "Monarquia romana",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "homero-epicos",
    ano: "c. séc. VIII a.C.",
    anoOrdenacao: -750,
    titulo: "Homero, Ilíada e Odisseia",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "arte",
    resumo: "Poemas épicos moldam a memória cultural grega.",
    descricao:
      "A Ilíada e a Odisseia preservam tradições orais sobre heróis, honra, viagem e deuses. Homero pode representar uma tradição poética mais ampla.",
    personagens: ["Homero"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A Ilíada e a Odisseia preservam tradições orais sobre heróis, honra, viagem e deuses. Homero pode representar uma tradição poética mais ampla.",
    imagem:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg/960px-Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg",
    alt: "Homero, Ilíada e Odisseia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Tradição literária"
  },
  {
    id: "colonizacao-grega",
    ano: "c. 750-550 a.C.",
    anoOrdenacao: -750,
    titulo: "Colonização grega",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "expansão",
    resumo: "Gregos fundam colônias no Mediterrâneo e Mar Negro.",
    descricao:
      "Pressões demográficas, comércio e disputas internas impulsionaram fundações como Siracusa, Massália e Bizâncio.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Pressões demográficas, comércio e disputas internas impulsionaram fundações como Siracusa, Massália e Bizâncio.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Greek%20colonization%20archaic%20period.svg",
    alt: "Colonização grega",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "origem-deuses-gregos",
    ano: "Tradição mítica",
    anoOrdenacao: -700,
    titulo: "Origem dos deuses gregos",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "mitologia",
    resumo: "Gaia, Urano, Cronos e os Titãs pertencem ao universo mítico.",
    descricao:
      "Na Teogonia atribuída a Hesíodo, gerações divinas lutam até Zeus e os olímpicos afirmarem sua ordem. Isso é mito, não acontecimento comprovado.",
    personagens: ["Gaia", "Urano", "Cronos", "Zeus"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Na Teogonia atribuída a Hesíodo, gerações divinas lutam até Zeus e os olímpicos afirmarem sua ordem. Isso é mito, não acontecimento comprovado.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Zeus%20Otricoli%20Pio-Clementino%20Inv257.jpg",
    alt: "Origem dos deuses gregos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Mito"
  },
  {
    id: "titanomaquia-gigantomaquia",
    ano: "Tradição mítica",
    anoOrdenacao: -699,
    titulo: "Titanomaquia e Gigantomaquia",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "mitologia",
    resumo: "Guerras divinas explicam simbolicamente a ordem cósmica.",
    descricao:
      "A Titanomaquia opõe olímpicos e Titãs; a Gigantomaquia apresenta conflito contra gigantes. São narrativas religiosas e poéticas.",
    personagens: ["Zeus", "Cronos", "Titãs"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A Titanomaquia opõe olímpicos e Titãs; a Gigantomaquia apresenta conflito contra gigantes. São narrativas religiosas e poéticas.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pergamonmuseum%20-%20Antikensammlung%20-%20Pergamonaltar%2006.jpg",
    alt: "Titanomaquia e Gigantomaquia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Mito"
  },
  {
    id: "prometeu-pandora",
    ano: "Tradição mítica",
    anoOrdenacao: -698,
    titulo: "Prometeu e Pandora",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "mitologia",
    resumo: "Mitos refletem explicações sobre técnica, sofrimento e condição humana.",
    descricao:
      "Prometeu aparece ligado ao fogo e à astúcia; Pandora a uma narrativa etiológica sobre males humanos. Não são eventos históricos.",
    personagens: ["Prometeu", "Pandora"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Prometeu aparece ligado ao fogo e à astúcia; Pandora a uma narrativa etiológica sobre males humanos. Não são eventos históricos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Prometheus%20brings%20fire%20to%20mankind.jpg",
    alt: "Prometeu e Pandora",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Mito"
  },
  {
    id: "herois-gregos",
    ano: "Tradição mítica",
    anoOrdenacao: -697,
    titulo: "Heróis gregos: Héracles, Perseu, Teseu e Orfeu",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "mitologia",
    resumo: "Heróis enfrentam monstros, viagens e dilemas morais.",
    descricao:
      "Héracles, Perseu e Medusa, Teseu e o Minotauro, Orfeu e Eurídice pertencem a ciclos míticos que expressavam valores e medos gregos.",
    personagens: ["Héracles", "Perseu", "Teseu", "Orfeu"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Héracles, Perseu e Medusa, Teseu e o Minotauro, Orfeu e Eurídice pertencem a ciclos míticos que expressavam valores e medos gregos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Farnese%20Hercules%20MAN%20Napoli%20Inv6001%20n01.jpg",
    alt: "Heróis gregos: Héracles, Perseu, Teseu e Orfeu",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Mito"
  },
  {
    id: "mundo-dos-mortos-grego",
    ano: "Tradição mítica",
    anoOrdenacao: -696,
    titulo: "Hades e o mundo dos mortos",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "religião",
    resumo: "O imaginário grego descrevia Hades, Caronte e rios subterrâneos.",
    descricao:
      "Narrativas sobre Estige, Aqueronte, Campos Elísios, Prados de Asfódelos e Tártaro revelam crenças e tradições sobre destino após a morte.",
    personagens: ["Hades", "Caronte", "Perséfone"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Narrativas sobre Estige, Aqueronte, Campos Elísios, Prados de Asfódelos e Tártaro revelam crenças e tradições sobre destino após a morte.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Hades%20abducting%20Persephone%20fresco%20Vergina.jpg",
    alt: "Hades e o mundo dos mortos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Mito e religião"
  },
  {
    id: "esparta-sociedade",
    ano: "c. 650 a.C.",
    anoOrdenacao: -650,
    titulo: "Esparta militarizada",
    periodo: "Grécia Antiga",
    civilizacao: "Esparta",
    categoria: "política",
    resumo: "Esparta estrutura uma sociedade voltada à disciplina militar.",
    descricao:
      "Espartanos, periecos e hilotas formavam grupos desiguais. A agogê educava jovens para resistência, obediência e guerra; mulheres espartanas tinham mais visibilidade pública que em muitas pólis.",
    personagens: ["Licurgo"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Forte exército hoplita", "Controle rígido dos hilotas"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Espartanos, periecos e hilotas formavam grupos desiguais. A agogê educava jovens para resistência, obediência e guerra; mulheres espartanas tinham mais visibilidade pública que em muitas pólis.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Ancient_Sparta_theatre_ruins.jpg",
    alt: "Esparta militarizada",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "atenas-reformas",
    ano: "621-508 a.C.",
    anoOrdenacao: -621,
    titulo: "De Drácon a Clístenes",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "política",
    resumo: "Atenas passa de aristocracia a reformas que abrem caminho à democracia.",
    descricao:
      "Drácon codificou leis severas; Sólon reduziu tensões sociais; Pisístrato governou como tirano; Clístenes reorganizou a cidadania e fortaleceu participação política.",
    personagens: ["Drácon", "Sólon", "Pisístrato", "Clístenes"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Drácon codificou leis severas; Sólon reduziu tensões sociais; Pisístrato governou como tirano; Clístenes reorganizou a cidadania e fortaleceu participação política.",
    imagem: "assets/images/partenon.jpg",
    alt: "De Drácon a Clístenes",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "pre-socraticos",
    ano: "sécs. VI-V a.C.",
    anoOrdenacao: -600,
    titulo: "Pré-socráticos e arché",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "filosofia",
    resumo: "Pensadores buscam explicações racionais para a natureza.",
    descricao:
      "Tales, Anaximandro, Anaxímenes, Pitágoras, Heráclito, Parmênides, Empédocles e Demócrito investigaram princípios, mudança, permanência e átomos.",
    personagens: [
      "Tales",
      "Anaximandro",
      "Anaxímenes",
      "Pitágoras",
      "Heráclito",
      "Parmênides",
      "Empédocles",
      "Demócrito"
    ],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Tales, Anaximandro, Anaxímenes, Pitágoras, Heráclito, Parmênides, Empédocles e Demócrito investigaram princípios, mudança, permanência e átomos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Sanzio%2001.jpg",
    alt: "Pré-socráticos e arché",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "ciro-babilonia",
    ano: "539 a.C.",
    anoOrdenacao: -539,
    titulo: "Ciro conquista Babilônia",
    periodo: "Primeiras Civilizações",
    civilizacao: "Pérsia",
    categoria: "império",
    resumo: "A Babilônia cai diante do Império Persa.",
    descricao:
      "Ciro, o Grande incorporou a Babilônia ao império aquemênida e consolidou uma política de administração imperial ampla.",
    personagens: ["Ciro, o Grande"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Expansão persa", "Integração de povos diversos"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Ciro, o Grande incorporou a Babilônia ao império aquemênida e consolidou uma política de administração imperial ampla.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Persepolis%20-%20Apadana%2001.jpg",
    alt: "Ciro conquista Babilônia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "dario-organizacao",
    ano: "c. 522-486 a.C.",
    anoOrdenacao: -522,
    titulo: "Dario I organiza o Império Persa",
    periodo: "Primeiras Civilizações",
    civilizacao: "Pérsia",
    categoria: "política",
    resumo: "Satrapias, estradas e tributos fortalecem a administração.",
    descricao:
      "Dario I reorganizou o império em províncias, ampliou redes de comunicação e enfrentou revoltas em regiões gregas da Ásia Menor.",
    personagens: ["Dario I"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Dario I reorganizou o império em províncias, ampliou redes de comunicação e enfrentou revoltas em regiões gregas da Ásia Menor.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Persepolis%20-%20Apadana%2001.jpg",
    alt: "Dario I organiza o Império Persa",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "republica-romana",
    ano: "509 a.C.",
    anoOrdenacao: -509,
    titulo: "Início da República Romana",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "política",
    resumo: "A queda do último rei abre a República.",
    descricao:
      "Cônsules, Senado e magistrados substituíram a monarquia. A República não era democrática no sentido moderno, mas criou mecanismos de poder compartilhado.",
    personagens: ["patrícios", "plebeus"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Cônsules, Senado e magistrados substituíram a monarquia. A República não era democrática no sentido moderno, mas criou mecanismos de poder compartilhado.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Forum%20%28Foro%20Romano%29.jpg",
    alt: "Início da República Romana",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "democracia-ateniense",
    ano: "c. 508 a.C.",
    anoOrdenacao: -508,
    titulo: "Nascimento da democracia ateniense",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "política",
    resumo: "A democracia direta envolvia cidadãos homens adultos atenienses.",
    descricao:
      "Atenas criou assembleias e sorteios para cargos, mas excluía mulheres, pessoas escravizadas, estrangeiros residentes e grande parte da população.",
    personagens: ["Clístenes", "Péricles"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Modelo influente de participação política", "Debates sobre limites da cidadania"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Atenas criou assembleias e sorteios para cargos, mas excluía mulheres, pessoas escravizadas, estrangeiros residentes e grande parte da população.",
    imagem: "assets/images/partenon.jpg",
    alt: "Nascimento da democracia ateniense",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "revolta-jonica",
    ano: "499-494 a.C.",
    anoOrdenacao: -499,
    titulo: "Revolta das cidades jônicas",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "guerra",
    resumo: "Cidades gregas da Ásia Menor se revoltam contra os persas.",
    descricao: "O apoio de Atenas a cidades jônicas contribuiu para a reação persa e para as Guerras Médicas.",
    personagens: ["Dario I"],
    causas: ["Domínio persa sobre cidades jônicas"],
    curiosidades: [],
    consequencias: ["Preparou o conflito persa contra Atenas"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "O apoio de Atenas a cidades jônicas contribuiu para a reação persa e para as Guerras Médicas.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Persepolis%20-%20Apadana%2001.jpg",
    alt: "Revolta das cidades jônicas",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "maratona",
    ano: "490 a.C.",
    anoOrdenacao: -490,
    titulo: "Batalha de Maratona",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "guerra",
    resumo: "Atenas derrota uma expedição persa.",
    descricao:
      "Milcíades comandou forças atenienses contra tropas de Dario I. A famosa corrida de Fidípides é tradição posterior, não detalhe seguro da batalha.",
    personagens: ["Milcíades", "Dario I", "Fidípides"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Milcíades comandou forças atenienses contra tropas de Dario I. A famosa corrida de Fidípides é tradição posterior, não detalhe seguro da batalha.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Plain%20of%20Marathon.jpg",
    alt: "Batalha de Maratona",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada com lenda diferenciada"
  },
  {
    id: "termopilas",
    ano: "480 a.C.",
    anoOrdenacao: -480,
    titulo: "Batalha das Termópilas",
    periodo: "Grécia Antiga",
    civilizacao: "Esparta",
    categoria: "guerra",
    resumo: "Leônidas lidera resistência contra Xerxes.",
    descricao:
      "Uma força grega, famosa pelos espartanos, segurou temporariamente o avanço persa. O episódio ganhou enorme valor simbólico.",
    personagens: ["Leônidas", "Xerxes"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Uma força grega, famosa pelos espartanos, segurou temporariamente o avanço persa. O episódio ganhou enorme valor simbólico.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Ancient_Sparta_theatre_ruins.jpg",
    alt: "Batalha das Termópilas",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "salamina-plateia",
    ano: "480-479 a.C.",
    anoOrdenacao: -479,
    titulo: "Salamina e Plateia",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "guerra",
    resumo: "Vitórias gregas reduzem a ameaça persa.",
    descricao:
      "Atenas teve papel naval decisivo em Salamina; Plateia consolidou a derrota persa na Grécia continental.",
    personagens: ["Temístocles", "Xerxes"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Atenas teve papel naval decisivo em Salamina; Plateia consolidou a derrota persa na Grécia continental.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wilhelm%20von%20Kaulbach%20-%20Die%20Seeschlacht%20bei%20Salamis.jpg",
    alt: "Salamina e Plateia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "liga-delos-pericles",
    ano: "478-429 a.C.",
    anoOrdenacao: -478,
    titulo: "Liga de Delos e Atenas de Péricles",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "império",
    resumo: "A aliança contra a Pérsia vira base do poder ateniense.",
    descricao:
      "Atenas usou recursos da Liga de Delos para crescer politicamente, navalmente e culturalmente. A Acrópole, o Partenon, o teatro, tragédia e comédia floresceram no século V a.C.",
    personagens: ["Péricles", "Fídias", "Sófocles", "Aristófanes"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Atenas usou recursos da Liga de Delos para crescer politicamente, navalmente e culturalmente. A Acrópole, o Partenon, o teatro, tragédia e comédia floresceram no século V a.C.",
    imagem: "assets/images/partenon.jpg",
    alt: "Liga de Delos e Atenas de Péricles",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "doze-tabuas",
    ano: "451-450 a.C.",
    anoOrdenacao: -451,
    titulo: "Lei das Doze Tábuas",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "política",
    resumo: "Plebeus pressionam por leis escritas.",
    descricao:
      "A codificação tornou normas mais visíveis, embora preservasse hierarquias sociais. Tribunos da Plebe e conflitos sociais marcaram a República.",
    personagens: ["Tribunos da Plebe"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A codificação tornou normas mais visíveis, embora preservasse hierarquias sociais. Tribunos da Plebe e conflitos sociais marcaram a República.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20Twelve%20Tables.jpg",
    alt: "Lei das Doze Tábuas",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "peloponeso",
    ano: "431-404 a.C.",
    anoOrdenacao: -431,
    titulo: "Guerra do Peloponeso",
    periodo: "Grécia Antiga",
    civilizacao: "Grécia",
    categoria: "guerra",
    resumo: "Atenas e Esparta disputam hegemonia.",
    descricao:
      "A guerra incluiu peste em Atenas, longas campanhas, desgaste econômico e derrota ateniense. O conflito enfraqueceu muitas pólis.",
    personagens: ["Péricles", "Tucídides"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Derrota de Atenas", "Enfraquecimento das pólis", "Abertura para a influência macedônica"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A guerra incluiu peste em Atenas, longas campanhas, desgaste econômico e derrota ateniense. O conflito enfraqueceu muitas pólis.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Map%20Peloponnesian%20War%20431%20BC-en.svg",
    alt: "Guerra do Peloponeso",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "socrates",
    ano: "399 a.C.",
    anoOrdenacao: -399,
    titulo: "Julgamento e morte de Sócrates",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "filosofia",
    resumo: "Sócrates é condenado em Atenas.",
    descricao:
      "Seu método de perguntas, diálogo e exame da ignorância marcou a filosofia. Não escreveu livros diretamente; conhecemos suas ideias por autores como Platão e Xenofonte.",
    personagens: ["Sócrates", "Platão"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Seu método de perguntas, diálogo e exame da ignorância marcou a filosofia. Não escreveu livros diretamente; conhecemos suas ideias por autores como Platão e Xenofonte.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Socrates%20Louvre.jpg",
    alt: "Julgamento e morte de Sócrates",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "expansao-italia",
    ano: "sécs. IV-III a.C.",
    anoOrdenacao: -390,
    titulo: "Expansão romana pela Itália",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "expansão",
    resumo: "Roma incorpora aliados italianos e tropas socii.",
    descricao: "A República dominou a península com alianças, colônias, estradas e recrutamento de povos aliados.",
    personagens: ["socii"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A República dominou a península com alianças, colônias, estradas e recrutamento de povos aliados.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Roman%20conquest%20of%20Italy.png",
    alt: "Expansão romana pela Itália",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "platao-academia",
    ano: "c. 387 a.C.",
    anoOrdenacao: -387,
    titulo: "Platão funda a Academia",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "filosofia",
    resumo: "A Academia se torna centro filosófico duradouro.",
    descricao:
      "Platão desenvolveu a Teoria das Formas, a distinção entre mundo sensível e inteligível, a Alegoria da Caverna e a ideia do filósofo-rei em A República.",
    personagens: ["Platão"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Platão desenvolveu a Teoria das Formas, a distinção entre mundo sensível e inteligível, a Alegoria da Caverna e a ideia do filósofo-rei em A República.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Plato%20Silanion%20Musei%20Capitolini%20MC1377.png",
    alt: "Platão funda a Academia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "macedonia-filipe",
    ano: "359-338 a.C.",
    anoOrdenacao: -359,
    titulo: "Filipe II fortalece a Macedônia",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Macedônia",
    categoria: "império",
    resumo: "A Macedônia ganha força militar e política.",
    descricao:
      "Filipe II reorganizou o exército com falange macedônica e sarissa, venceu em Queroneia e dominou as cidades gregas.",
    personagens: ["Filipe II"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Hegemonia macedônica sobre a Grécia"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Filipe II reorganizou o exército com falange macedônica e sarissa, venceu em Queroneia e dominou as cidades gregas.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Filipe II fortalece a Macedônia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "alexandre-trono",
    ano: "336 a.C.",
    anoOrdenacao: -336,
    titulo: "Alexandre assume o trono",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Macedônia",
    categoria: "personagens",
    resumo: "Após o assassinato de Filipe II, Alexandre herda um reino militarizado.",
    descricao: "Educado por Aristóteles, Alexandre combinou ambição política, comando militar e propaganda real.",
    personagens: ["Alexandre, o Grande", "Aristóteles"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Educado por Aristóteles, Alexandre combinou ambição política, comando militar e propaganda real.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Alexandre assume o trono",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "aristoteles-liceu",
    ano: "335 a.C.",
    anoOrdenacao: -335,
    titulo: "Aristóteles funda o Liceu",
    periodo: "Grécia Antiga",
    civilizacao: "Atenas",
    categoria: "filosofia",
    resumo: "Aristóteles sistematiza lógica, ética, política e ciências.",
    descricao:
      "Aluno de Platão e professor de Alexandre, valorizou observação, classificação, virtude, meio-termo e felicidade como vida racional plena.",
    personagens: ["Aristóteles", "Alexandre, o Grande"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Aluno de Platão e professor de Alexandre, valorizou observação, classificação, virtude, meio-termo e felicidade como vida racional plena.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Aristotle%20Altemps%20Inv8575.jpg",
    alt: "Aristóteles funda o Liceu",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "alexandre-asia-isso",
    ano: "334-333 a.C.",
    anoOrdenacao: -334,
    titulo: "Alexandre conquista a Ásia Menor e vence em Isso",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Macedônia",
    categoria: "guerra",
    resumo: "O avanço macedônico derrota forças persas.",
    descricao: "As vitórias no Granico e em Isso abriram caminho para a queda do poder persa no Mediterrâneo oriental.",
    personagens: ["Alexandre, o Grande", "Dario III"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "As vitórias no Granico e em Isso abriram caminho para a queda do poder persa no Mediterrâneo oriental.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Alexandre conquista a Ásia Menor e vence em Isso",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "alexandria-egito",
    ano: "332-331 a.C.",
    anoOrdenacao: -332,
    titulo: "Conquista do Egito e fundação de Alexandria",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Egito",
    categoria: "expansão",
    resumo: "Alexandre funda uma cidade que se tornaria centro cultural.",
    descricao: "Alexandria simbolizou a fusão entre poder macedônico, tradições egípcias e cultura grega.",
    personagens: ["Alexandre, o Grande"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Alexandria simbolizou a fusão entre poder macedônico, tradições egípcias e cultura grega.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Conquista do Egito e fundação de Alexandria",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "gaugamela-persia",
    ano: "331 a.C.",
    anoOrdenacao: -331,
    titulo: "Batalha de Gaugamela",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Pérsia",
    categoria: "guerra",
    resumo: "A derrota persa abre caminho para a queda do império aquemênida.",
    descricao:
      "Alexandre venceu Dario III e tomou centros do poder persa. Recebeu o título de “o Grande” pela escala, rapidez e impacto de suas conquistas.",
    personagens: ["Alexandre, o Grande", "Dario III"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Alexandre venceu Dario III e tomou centros do poder persa. Recebeu o título de “o Grande” pela escala, rapidez e impacto de suas conquistas.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Batalha de Gaugamela",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "alexandre-india-morte",
    ano: "326-323 a.C.",
    anoOrdenacao: -326,
    titulo: "Da Índia à morte de Alexandre",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Macedônia",
    categoria: "expansão",
    resumo: "Soldados se recusam a avançar além da Índia.",
    descricao:
      "Após campanha exaustiva, Alexandre retornou à Babilônia, morreu em 323 a.C. e deixou um império sem sucessão estável.",
    personagens: ["Alexandre, o Grande"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Após campanha exaustiva, Alexandre retornou à Babilônia, morreu em 323 a.C. e deixou um império sem sucessão estável.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Da Índia à morte de Alexandre",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "reinos-helenisticos",
    ano: "323-30 a.C.",
    anoOrdenacao: -323,
    titulo: "Reinos helenísticos",
    periodo: "Macedônia e Helenismo",
    civilizacao: "Grécia",
    categoria: "império",
    resumo: "Generais dividem o império de Alexandre.",
    descricao:
      "Ptolomeus, Selêucidas e Antigônidas governaram regiões diferentes. O helenismo misturou cultura grega e tradições locais.",
    personagens: ["Ptolomeu", "Seleuco"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Ptolomeus, Selêucidas e Antigônidas governaram regiões diferentes. O helenismo misturou cultura grega e tradições locais.",
    imagem: "assets/images/alexander-mosaic.jpg",
    alt: "Reinos helenísticos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "guerras-punicas",
    ano: "264-146 a.C.",
    anoOrdenacao: -264,
    titulo: "Guerras Púnicas",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "guerra",
    resumo: "Roma e Cartago disputam o Mediterrâneo.",
    descricao:
      "Aníbal atravessou os Alpes e venceu batalhas marcantes, mas Cipião Africano derrotou Cartago. Em 146 a.C., Cartago foi destruída.",
    personagens: ["Aníbal", "Cipião Africano"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Aníbal atravessou os Alpes e venceu batalhas marcantes, mas Cipião Africano derrotou Cartago. Em 146 a.C., Cartago foi destruída.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Hannibal%20route%20of%20invasion-en.svg",
    alt: "Guerras Púnicas",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "mitologia-romana",
    ano: "República e Império",
    anoOrdenacao: -200,
    titulo: "Mitologia romana adaptada",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "religião",
    resumo: "Romanos adaptaram divindades gregas, itálicas e orientais.",
    descricao:
      "Júpiter, Juno, Netuno, Minerva, Marte, Vênus, Mercúrio, Diana, Vulcano, Plutão, Saturno e Hércules dialogam com equivalentes gregos, mas não são mera cópia.",
    personagens: ["Júpiter", "Juno", "Marte"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Júpiter, Juno, Netuno, Minerva, Marte, Vênus, Mercúrio, Diana, Vulcano, Plutão, Saturno e Hércules dialogam com equivalentes gregos, mas não são mera cópia.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Jupiter%20Smyrna%20Louvre%20Ma13.jpg",
    alt: "Mitologia romana adaptada",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "Religião e tradição"
  },
  {
    id: "crise-republica",
    ano: "133-71 a.C.",
    anoOrdenacao: -133,
    titulo: "Crise social da República",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "revolução",
    resumo: "Conflitos agrários, militares e sociais abalam Roma.",
    descricao:
      "Os irmãos Graco tentaram reformas; Mário profissionalizou tropas; Sula usou poder militar; a revolta de Espártaco expôs tensões da escravidão.",
    personagens: ["Tibério Graco", "Caio Graco", "Mário", "Sula", "Espártaco"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Os irmãos Graco tentaram reformas; Mário profissionalizou tropas; Sula usou poder militar; a revolta de Espártaco expôs tensões da escravidão.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Spartacus%20by%20Denis%20Foyatier%20Louvre%20MR1745.jpg",
    alt: "Crise social da República",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "cesar-rubicao",
    ano: "60-44 a.C.",
    anoOrdenacao: -60,
    titulo: "Júlio César e o fim da República",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "política",
    resumo: "Primeiro Triunvirato, Gália, Rubicão e ditadura concentram poder.",
    descricao:
      "César aliou-se a Pompeu e Crasso, conquistou a Gália, cruzou o Rubicão e tornou-se ditador. Seu assassinato não restaurou a estabilidade republicana.",
    personagens: ["Júlio César", "Pompeu", "Crasso"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "César aliou-se a Pompeu e Crasso, conquistou a Gália, cruzou o Rubicão e tornou-se ditador. Seu assassinato não restaurou a estabilidade republicana.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Bust%20of%20Julius%20Caesar.jpg",
    alt: "Júlio César e o fim da República",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "accio-otaviano",
    ano: "31 a.C.",
    anoOrdenacao: -31,
    titulo: "Batalha de Áccio",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "guerra",
    resumo: "Otaviano derrota Marco Antônio e Cleópatra.",
    descricao: "A vitória encerrou a disputa final pelo poder romano e preparou o Principado de Augusto.",
    personagens: ["Otaviano", "Marco Antônio", "Cleópatra"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A vitória encerrou a disputa final pelo poder romano e preparou o Principado de Augusto.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Actium%20battle%20map-en.svg",
    alt: "Batalha de Áccio",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "augusto-pax",
    ano: "27 a.C.-14 d.C.",
    anoOrdenacao: -27,
    titulo: "Augusto e a Pax Romana",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "império",
    resumo: "Otaviano torna-se Augusto e inaugura o Império.",
    descricao:
      "O Principado manteve formas republicanas, mas concentrou autoridade. A Pax Romana favoreceu estradas, cidades, comércio e direito.",
    personagens: ["Augusto"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O Principado manteve formas republicanas, mas concentrou autoridade. A Pax Romana favoreceu estradas, cidades, comércio e direito.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Augustus%20of%20Prima%20Porta%20%28inv.%202290%29.jpg",
    alt: "Augusto e a Pax Romana",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "alto-imperio",
    ano: "sécs. I-II d.C.",
    anoOrdenacao: 100,
    titulo: "Expansão e sociedade imperial",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "império",
    resumo: "Legiões, tropas auxiliares, cidadania, aquedutos e direito articulam o império.",
    descricao:
      "Nero, Vespasiano, Trajano, Adriano e Marco Aurélio mostram diferentes fases do poder imperial, do Coliseu às fronteiras defensivas.",
    personagens: ["Nero", "Vespasiano", "Trajano", "Adriano", "Marco Aurélio"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Nero, Vespasiano, Trajano, Adriano e Marco Aurélio mostram diferentes fases do poder imperial, do Coliseu às fronteiras defensivas.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Trajans-Column-lower-animated.jpeg",
    alt: "Expansão e sociedade imperial",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "crise-seculo-iii",
    ano: "séc. III d.C.",
    anoOrdenacao: 235,
    titulo: "Crise do século III",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "política",
    resumo: "Guerras civis, inflação, fronteiras e disputas sucessórias enfraquecem o império.",
    descricao:
      "Roma não caiu de uma só vez: crises econômicas, impostos, instabilidade política e pressão militar se acumularam por séculos.",
    personagens: ["imperadores-soldados"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Roma não caiu de uma só vez: crises econômicas, impostos, instabilidade política e pressão militar se acumularam por séculos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Aurelian%20Wall%20Rome%202006.jpg",
    alt: "Crise do século III",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "diocleciano-constantino",
    ano: "284-337",
    anoOrdenacao: 284,
    titulo: "Diocleciano e Constantino",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "política",
    resumo: "Reformas administrativas e nova capital remodelam o império.",
    descricao:
      "Diocleciano dividiu a administração; Constantino apoiou o cristianismo e fundou Constantinopla, fortalecendo o Oriente.",
    personagens: ["Diocleciano", "Constantino"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Diocleciano dividiu a administração; Constantino apoiou o cristianismo e fundou Constantinopla, fortalecendo o Oriente.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Constantino-capitolino.jpg",
    alt: "Diocleciano e Constantino",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "queda-roma-ocidente",
    ano: "476",
    anoOrdenacao: 476,
    titulo: "Queda do Império Romano do Ocidente",
    periodo: "Roma Antiga",
    civilizacao: "Roma",
    categoria: "império",
    resumo: "Odoacro depõe Rômulo Augusto.",
    descricao:
      "A queda resultou de tamanho excessivo, fronteiras difíceis, crises fiscais, guerras civis, tropas estrangeiras, invasões germânicas, visigodos, vândalos, hunos e divisão imperial. O Oriente continuou como Império Bizantino.",
    personagens: ["Odoacro", "Rômulo Augusto", "Átila"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A queda resultou de tamanho excessivo, fronteiras difíceis, crises fiscais, guerras civis, tropas estrangeiras, invasões germânicas, visigodos, vândalos, hunos e divisão imperial. O Oriente continuou como Império Bizantino.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sack%20of%20Rome%20by%20the%20Visigoths%20on%2024%20August%20410%20by%20J-N%20Sylvestre%201890.jpg",
    alt: "Queda do Império Romano do Ocidente",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "reinos-germanicos",
    ano: "sécs. V-VI",
    anoOrdenacao: 500,
    titulo: "Reinos germânicos no Ocidente",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "política",
    resumo: "Novos reinos se formam sobre antigas estruturas romanas.",
    descricao:
      "Francos, visigodos, ostrogodos e outros povos combinaram costumes germânicos, cristianismo e heranças romanas.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Francos, visigodos, ostrogodos e outros povos combinaram costumes germânicos, cristianismo e heranças romanas.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%20476.svg",
    alt: "Reinos germânicos no Ocidente",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "justiniano",
    ano: "527-565",
    anoOrdenacao: 527,
    titulo: "Justiniano e o Império Bizantino",
    periodo: "Idade Média",
    civilizacao: "Império Bizantino",
    categoria: "império",
    resumo: "Código de Justiniano e Hagia Sophia marcam o governo.",
    descricao:
      "Justiniano tentou restaurar territórios romanos no Ocidente e consolidou o direito imperial. Constantinopla permaneceu centro político e cultural.",
    personagens: ["Justiniano", "Teodora"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Justiniano tentou restaurar territórios romanos no Ocidente e consolidou o direito imperial. Constantinopla permaneceu centro político e cultural.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Justinian%20mosaik%20ravenna.jpg",
    alt: "Justiniano e o Império Bizantino",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "islamismo-expansao",
    ano: "610-750",
    anoOrdenacao: 610,
    titulo: "Surgimento e expansão do islamismo",
    periodo: "Idade Média",
    civilizacao: "Império Otomano",
    categoria: "religião",
    resumo: "Maomé inicia uma nova tradição religiosa na Arábia.",
    descricao:
      "Após a pregação de Maomé, califados expandiram o Islã por Oriente Médio, norte da África e Península Ibérica.",
    personagens: ["Maomé"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Novas redes culturais, comerciais e científicas"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Após a pregação de Maomé, califados expandiram o Islã por Oriente Médio, norte da África e Península Ibérica.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Great%20Mosque%20of%20Kairouan%20Panorama.jpg",
    alt: "Surgimento e expansão do islamismo",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "vikings",
    ano: "sécs. VIII-XI",
    anoOrdenacao: 793,
    titulo: "Expansão viking",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "expansão",
    resumo: "Navegadores escandinavos atacam, comerciam e colonizam.",
    descricao:
      "Vikings chegaram às Ilhas Britânicas, França, Rússia e Atlântico Norte, combinando guerra, comércio e assentamento.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Vikings chegaram às Ilhas Britânicas, França, Rússia e Atlântico Norte, combinando guerra, comércio e assentamento.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Osebergskipet.jpg",
    alt: "Expansão viking",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "carlos-magno",
    ano: "800",
    anoOrdenacao: 800,
    titulo: "Coroação de Carlos Magno",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "império",
    resumo: "O rei franco é coroado imperador.",
    descricao:
      "Carlos Magno fortaleceu o Império Carolíngio, patrocinou reformas e simbolizou alianças entre poder régio e Igreja latina.",
    personagens: ["Carlos Magno"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Carlos Magno fortaleceu o Império Carolíngio, patrocinou reformas e simbolizou alianças entre poder régio e Igreja latina.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Charlemagne-by-Durer.jpg",
    alt: "Coroação de Carlos Magno",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "feudalismo-igreja",
    ano: "sécs. IX-XIII",
    anoOrdenacao: 900,
    titulo: "Feudalismo, Igreja e mosteiros",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "política",
    resumo: "A sociedade medieval foi diversa e não deve ser reduzida a “trevas”.",
    descricao:
      "Relações senhoriais, vassalagem, trabalho camponês, mosteiros e universidades coexistiram com comércio, arte, fé e conflitos.",
    personagens: ["monges", "senhores", "camponeses"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Relações senhoriais, vassalagem, trabalho camponês, mosteiros e universidades coexistiram com comércio, arte, fé e conflitos.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Cit%C3%A9%20m%C3%A9di%C3%A9vale%20de%20Carcassonne.jpg",
    alt: "Feudalismo, Igreja e mosteiros",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "cruzadas",
    ano: "1095-1291",
    anoOrdenacao: 1095,
    titulo: "Cruzadas",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "guerra",
    resumo: "Expedições religiosas e militares conectam Europa e Oriente.",
    descricao:
      "As cruzadas envolveram fé, poder, comércio e violência, deixando marcas nas relações entre cristãos, muçulmanos e judeus.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Intensificação de contatos e conflitos mediterrâneos"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "As cruzadas envolveram fé, poder, comércio e violência, deixando marcas nas relações entre cristãos, muçulmanos e judeus.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/1099jerusalem.jpg",
    alt: "Cruzadas",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "imperio-mongol",
    ano: "1206-1368",
    anoOrdenacao: 1206,
    titulo: "Império Mongol",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "império",
    resumo: "Gêngis Khan cria um dos maiores impérios territoriais.",
    descricao:
      "Conquistas mongóis remodelaram rotas, impérios asiáticos e contatos eurasiáticos, com enorme violência e integração comercial.",
    personagens: ["Gêngis Khan"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Conquistas mongóis remodelaram rotas, impérios asiáticos e contatos eurasiáticos, com enorme violência e integração comercial.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Mongol%20Empire%20map.gif",
    alt: "Império Mongol",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "cem-anos-joana",
    ano: "1337-1453",
    anoOrdenacao: 1337,
    titulo: "Guerra dos Cem Anos e Joana d'Arc",
    periodo: "Idade Média",
    civilizacao: "França",
    categoria: "guerra",
    resumo: "França e Inglaterra disputam territórios e legitimidade.",
    descricao:
      "Joana d'Arc tornou-se símbolo político e religioso francês. A guerra contribuiu para identidades monárquicas mais fortes.",
    personagens: ["Joana d'Arc"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Joana d'Arc tornou-se símbolo político e religioso francês. A guerra contribuiu para identidades monárquicas mais fortes.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Joan%20of%20Arc%20miniature%20graded.jpg",
    alt: "Guerra dos Cem Anos e Joana d'Arc",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "peste-negra",
    ano: "1347-1351",
    anoOrdenacao: 1347,
    titulo: "Peste Negra",
    periodo: "Idade Média",
    civilizacao: "Europa Medieval",
    categoria: "ciência",
    resumo: "A pandemia mata grande parte da população europeia.",
    descricao: "A peste bubônica teve consequências demográficas, econômicas, religiosas e sociais profundas.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Escassez de mão de obra", "Tensões sociais", "Mudanças econômicas"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A peste bubônica teve consequências demográficas, econômicas, religiosas e sociais profundas.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tournai%20-%20Doornik%20-%20Manuscript%20black%20death.jpg",
    alt: "Peste Negra",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "renascimento",
    ano: "sécs. XIV-XVI",
    anoOrdenacao: 1400,
    titulo: "Renascimento e humanismo",
    periodo: "Renascimento",
    civilizacao: "Itália",
    categoria: "arte",
    resumo: "Cidades italianas patrocinam artes, letras e ciência.",
    descricao: "Humanismo, mecenato urbano e estudo da Antiguidade favoreceram Leonardo, Michelangelo e Rafael.",
    personagens: ["Leonardo da Vinci", "Michelangelo", "Rafael"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Humanismo, mecenato urbano e estudo da Antiguidade favoreceram Leonardo, Michelangelo e Rafael.",
    imagem: "assets/images/leonardo.jpg",
    alt: "Renascimento e humanismo",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "gutenberg",
    ano: "c. 1450",
    anoOrdenacao: 1450,
    titulo: "Imprensa de Gutenberg",
    periodo: "Renascimento",
    civilizacao: "Alemanha",
    categoria: "ciência",
    resumo: "Tipos móveis ampliam a circulação de livros.",
    descricao: "A imprensa acelerou a difusão de ideias religiosas, científicas e políticas na Europa.",
    personagens: ["Johannes Gutenberg"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A imprensa acelerou a difusão de ideias religiosas, científicas e políticas na Europa.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gutenberg%20Bible%2C%20Lenox%20Copy%2C%20New%20York%20Public%20Library%2C%202009.%20Pic%2001.jpg",
    alt: "Imprensa de Gutenberg",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "queda-constantinopla",
    ano: "1453",
    anoOrdenacao: 1453,
    titulo: "Queda de Constantinopla",
    periodo: "Idade Média",
    civilizacao: "Império Otomano",
    categoria: "guerra",
    resumo: "Os otomanos conquistam a capital bizantina.",
    descricao:
      "A tomada por Mehmed II encerrou o Império Bizantino e reposicionou rotas, poderes e imaginários europeus.",
    personagens: ["Mehmed II", "Constantino XI"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A tomada por Mehmed II encerrou o Império Bizantino e reposicionou rotas, poderes e imaginários europeus.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Siege%20of%20Constantinople%201453.jpg",
    alt: "Queda de Constantinopla",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "grandes-navegacoes",
    ano: "sécs. XV-XVI",
    anoOrdenacao: 1492,
    titulo: "Grandes Navegações e chegada à América",
    periodo: "Reforma e Grandes Navegações",
    civilizacao: "Portugal",
    categoria: "expansão",
    resumo: "Portugal e Espanha expandem rotas atlânticas.",
    descricao:
      "Viagens europeias conectaram continentes, impulsionaram colonização, comércio atlântico e escravidão, com consequências violentas para povos indígenas e africanos.",
    personagens: ["Cristóvão Colombo", "Vasco da Gama"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Viagens europeias conectaram continentes, impulsionaram colonização, comércio atlântico e escravidão, com consequências violentas para povos indígenas e africanos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Cantino%20planisphere%20%281502%29.jpg",
    alt: "Grandes Navegações e chegada à América",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "reforma",
    ano: "1517",
    anoOrdenacao: 1517,
    titulo: "Reforma Protestante",
    periodo: "Reforma e Grandes Navegações",
    civilizacao: "Alemanha",
    categoria: "religião",
    resumo: "Martinho Lutero critica práticas da Igreja latina.",
    descricao: "A Reforma abriu divisões religiosas duradouras; a Contrarreforma reorganizou a resposta católica.",
    personagens: ["Martinho Lutero"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A Reforma abriu divisões religiosas duradouras; a Contrarreforma reorganizou a resposta católica.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Cranach%20Martin%20Luther.JPG",
    alt: "Reforma Protestante",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "revolucao-cientifica",
    ano: "sécs. XVI-XVII",
    anoOrdenacao: 1543,
    titulo: "Revolução Científica",
    periodo: "Absolutismo e Iluminismo",
    civilizacao: "Europa Medieval",
    categoria: "ciência",
    resumo: "Copérnico, Galileu, Kepler e Newton transformam a compreensão da natureza.",
    descricao:
      "Observação, matemática e experimentação ganharam centralidade, desafiando modelos antigos e autoridades tradicionais.",
    personagens: ["Copérnico", "Galileu", "Kepler", "Isaac Newton"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Observação, matemática e experimentação ganharam centralidade, desafiando modelos antigos e autoridades tradicionais.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Galileo%20Galilei%20by%20Justus%20Sustermans.jpg",
    alt: "Revolução Científica",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "estados-modernos",
    ano: "sécs. XV-XVII",
    anoOrdenacao: 1550,
    titulo: "Formação dos Estados modernos",
    periodo: "Reforma e Grandes Navegações",
    civilizacao: "França",
    categoria: "política",
    resumo: "Monarquias ampliam burocracia, impostos e exércitos.",
    descricao: "Estados modernos se consolidaram com centralização, diplomacia permanente e administração territorial.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Estados modernos se consolidaram com centralização, diplomacia permanente e administração territorial.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Europe%201700.jpg",
    alt: "Formação dos Estados modernos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "revolucao-inglesa",
    ano: "1640-1688",
    anoOrdenacao: 1640,
    titulo: "Revolução Inglesa e Revolução Gloriosa",
    periodo: "Revoluções",
    civilizacao: "Inglaterra",
    categoria: "revolução",
    resumo: "Conflitos limitam o poder real inglês.",
    descricao:
      "Guerra civil, execução de Carlos I e Revolução Gloriosa fortaleceram o Parlamento e a monarquia constitucional.",
    personagens: ["Oliver Cromwell", "Guilherme de Orange"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Guerra civil, execução de Carlos I e Revolução Gloriosa fortaleceram o Parlamento e a monarquia constitucional.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Cromwell%20at%20Dunbar%20Andrew%20Carrick%20Gow.jpg",
    alt: "Revolução Inglesa e Revolução Gloriosa",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "absolutismo-luis-xiv",
    ano: "1643-1715",
    anoOrdenacao: 1643,
    titulo: "Luís XIV e o absolutismo",
    periodo: "Absolutismo e Iluminismo",
    civilizacao: "França",
    categoria: "política",
    resumo: "Versalhes simboliza a monarquia absolutista francesa.",
    descricao:
      "O absolutismo concentrou autoridade real, corte, exército e administração, embora sempre dependesse de negociações sociais.",
    personagens: ["Luís XIV"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O absolutismo concentrou autoridade real, corte, exército e administração, embora sempre dependesse de negociações sociais.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Fa%C3%A7ade%20of%20the%20Palace%20of%20Versailles.jpg",
    alt: "Luís XIV e o absolutismo",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "iluminismo",
    ano: "séc. XVIII",
    anoOrdenacao: 1700,
    titulo: "Iluminismo",
    periodo: "Absolutismo e Iluminismo",
    civilizacao: "França",
    categoria: "filosofia",
    resumo: "Pensadores criticam absolutismo e defendem razão política.",
    descricao:
      "Locke, Montesquieu, Voltaire e Rousseau discutiram direitos naturais, separação dos poderes, tolerância e contrato social.",
    personagens: ["John Locke", "Montesquieu", "Voltaire", "Rousseau"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Locke, Montesquieu, Voltaire e Rousseau discutiram direitos naturais, separação dos poderes, tolerância e contrato social.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Salon%20de%20Madame%20Geoffrin.jpg",
    alt: "Iluminismo",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "primeira-industrial",
    ano: "c. 1760-1840",
    anoOrdenacao: 1760,
    titulo: "Primeira Revolução Industrial",
    periodo: "Revolução Industrial",
    civilizacao: "Inglaterra",
    categoria: "ciência",
    resumo: "Máquina a vapor, fábricas e urbanização transformam o trabalho.",
    descricao:
      "A industrialização impulsionou capitalismo industrial, cidades, ferrovias e novas condições de exploração dos trabalhadores.",
    personagens: ["James Watt"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A industrialização impulsionou capitalismo industrial, cidades, ferrovias e novas condições de exploração dos trabalhadores.",
    imagem: "assets/images/cottonopolis.jpg",
    alt: "Primeira Revolução Industrial",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "independencia-eua",
    ano: "1776-1783",
    anoOrdenacao: 1776,
    titulo: "Independência dos Estados Unidos",
    periodo: "Revoluções",
    civilizacao: "Estados Unidos",
    categoria: "revolução",
    resumo: "Colônias britânicas declaram independência.",
    descricao:
      "A independência combinou resistência fiscal, ideias iluministas e guerra contra a Inglaterra, influenciando revoluções posteriores.",
    personagens: ["George Washington", "Thomas Jefferson"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A independência combinou resistência fiscal, ideias iluministas e guerra contra a Inglaterra, influenciando revoluções posteriores.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Declaration%20of%20Independence%20%281819%29%2C%20by%20John%20Trumbull.jpg",
    alt: "Independência dos Estados Unidos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "revolucao-francesa",
    ano: "1789",
    anoOrdenacao: 1789,
    titulo: "Revolução Francesa e queda da Bastilha",
    periodo: "Revoluções",
    civilizacao: "França",
    categoria: "revolução",
    resumo: "A crise do Antigo Regime explode em 1789.",
    descricao:
      "A queda da Bastilha e a Declaração dos Direitos do Homem e do Cidadão simbolizaram o fim do absolutismo francês e novas ideias de cidadania.",
    personagens: ["Robespierre", "Luís XVI"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A queda da Bastilha e a Declaração dos Direitos do Homem e do Cidadão simbolizaram o fim do absolutismo francês e novas ideias de cidadania.",
    imagem: "assets/images/bastilha.jpg",
    alt: "Revolução Francesa e queda da Bastilha",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "terror-napoleao",
    ano: "1793-1799",
    anoOrdenacao: 1793,
    titulo: "Terror e ascensão de Napoleão",
    periodo: "Revoluções",
    civilizacao: "França",
    categoria: "política",
    resumo: "A revolução enfrenta guerra, radicalização e repressão.",
    descricao:
      "O período do Terror sob Robespierre foi seguido por instabilidade do Diretório, abrindo espaço para o golpe do 18 de Brumário.",
    personagens: ["Robespierre", "Napoleão"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O período do Terror sob Robespierre foi seguido por instabilidade do Diretório, abrindo espaço para o golpe do 18 de Brumário.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Robespierre%2C%20Mus%C3%A9e%20Carnavalet.jpg",
    alt: "Terror e ascensão de Napoleão",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "napoleao-imperador",
    ano: "1799-1804",
    anoOrdenacao: 1799,
    titulo: "Napoleão chega ao poder",
    periodo: "Era Napoleônica",
    civilizacao: "França",
    categoria: "personagens",
    resumo: "O golpe do 18 de Brumário inicia o Consulado.",
    descricao: "Napoleão consolidou poder, reformou o Estado e coroou-se imperador em 1804.",
    personagens: ["Napoleão"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Napoleão consolidou poder, reformou o Estado e coroou-se imperador em 1804.",
    imagem:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/960px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    alt: "Napoleão chega ao poder",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "codigo-napoleonico",
    ano: "1804",
    anoOrdenacao: 1804,
    titulo: "Código Napoleônico",
    periodo: "Era Napoleônica",
    civilizacao: "França",
    categoria: "política",
    resumo: "A codificação civil difunde princípios jurídicos modernos.",
    descricao:
      "O código reforçou igualdade jurídica masculina, propriedade e autoridade estatal, mas preservou limites sociais e patriarcais.",
    personagens: ["Napoleão"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O código reforçou igualdade jurídica masculina, propriedade e autoridade estatal, mas preservou limites sociais e patriarcais.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Code%20civil%201804.png",
    alt: "Código Napoleônico",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "austerlitz-bloqueio",
    ano: "1805-1806",
    anoOrdenacao: 1805,
    titulo: "Austerlitz e Bloqueio Continental",
    periodo: "Era Napoleônica",
    civilizacao: "França",
    categoria: "guerra",
    resumo: "Napoleão vence coalizões, mas tenta sufocar economicamente a Inglaterra.",
    descricao:
      "A expansão francesa alterou a Europa; o Bloqueio Continental mostrou os limites econômicos do domínio napoleônico.",
    personagens: ["Napoleão"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A expansão francesa alterou a Europa; o Bloqueio Continental mostrou os limites econômicos do domínio napoleônico.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Fran%C3%A7ois%20G%C3%A9rard%20-%20Battle%20of%20Austerlitz.jpg",
    alt: "Austerlitz e Bloqueio Continental",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "russia-waterloo",
    ano: "1812-1815",
    anoOrdenacao: 1812,
    titulo: "Invasão da Rússia, Cem Dias e Waterloo",
    periodo: "Era Napoleônica",
    civilizacao: "Rússia",
    categoria: "guerra",
    resumo: "A sobre-expansão imperial enfraquece Napoleão.",
    descricao:
      "A invasão da Rússia expôs problemas de abastecimento, clima e resistência. Após abdicação e retorno, Napoleão foi derrotado em Waterloo e exilado.",
    personagens: ["Napoleão", "Duque de Wellington"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A invasão da Rússia expôs problemas de abastecimento, clima e resistência. Após abdicação e retorno, Napoleão foi derrotado em Waterloo e exilado.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/William%20Sadler%20II%20-%20The%20Battle%20of%20Waterloo.jpg",
    alt: "Invasão da Rússia, Cem Dias e Waterloo",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "socialismo-marx",
    ano: "1848",
    anoOrdenacao: 1848,
    titulo: "Socialismo e Karl Marx",
    periodo: "Revolução Industrial",
    civilizacao: "Alemanha",
    categoria: "política",
    resumo: "Críticas ao capitalismo industrial ganham força.",
    descricao:
      "Marx analisou luta de classes, exploração e transformação histórica, influenciando movimentos políticos dos séculos XIX e XX.",
    personagens: ["Karl Marx", "Friedrich Engels"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Marx analisou luta de classes, exploração e transformação histórica, influenciando movimentos políticos dos séculos XIX e XX.",
    imagem:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png/960px-Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png",
    alt: "Socialismo e Karl Marx",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "unificacoes",
    ano: "1861-1871",
    anoOrdenacao: 1861,
    titulo: "Unificações da Itália e da Alemanha",
    periodo: "Imperialismo",
    civilizacao: "Itália",
    categoria: "política",
    resumo: "Nacionalismo reorganiza a Europa.",
    descricao: "A Itália unificou-se em 1861; a Alemanha em 1871 sob liderança prussiana e de Otto von Bismarck.",
    personagens: ["Bismarck", "Garibaldi"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A Itália unificou-se em 1861; a Alemanha em 1871 sob liderança prussiana e de Otto von Bismarck.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Wernerprokla.jpg",
    alt: "Unificações da Itália e da Alemanha",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "segunda-industrial",
    ano: "c. 1870-1914",
    anoOrdenacao: 1870,
    titulo: "Segunda Revolução Industrial",
    periodo: "Revolução Industrial",
    civilizacao: "Alemanha",
    categoria: "ciência",
    resumo: "Eletricidade, petróleo, aço e química aceleram a produção.",
    descricao: "Novas tecnologias, grandes empresas, ferrovias e comunicações mudaram guerra, economia e vida urbana.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Novas tecnologias, grandes empresas, ferrovias e comunicações mudaram guerra, economia e vida urbana.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Edison%20light%20bulb%20Museum%20of%20Science%20and%20Industry%20Chicago%202005.jpg",
    alt: "Segunda Revolução Industrial",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "imperialismo",
    ano: "séc. XIX",
    anoOrdenacao: 1880,
    titulo: "Imperialismo na África e na Ásia",
    periodo: "Imperialismo",
    civilizacao: "Inglaterra",
    categoria: "império",
    resumo: "Potências industrializadas ampliam domínios coloniais.",
    descricao:
      "Colonialismo, exploração econômica, racismo científico e rivalidades internacionais intensificaram tensões globais e corrida armamentista.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Dominação colonial", "Resistências locais", "Tensões pré-1914"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Colonialismo, exploração econômica, racismo científico e rivalidades internacionais intensificaram tensões globais e corrida armamentista.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Africa%20colonial%201913%20map.svg",
    alt: "Imperialismo na África e na Ásia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "causas-ww1",
    ano: "1914",
    anoOrdenacao: 1914,
    titulo: "Causas da Primeira Guerra Mundial",
    periodo: "Primeira Guerra Mundial",
    civilizacao: "Alemanha",
    categoria: "guerra",
    resumo: "Alianças, nacionalismo, imperialismo e militarismo criam um sistema instável.",
    descricao:
      "O assassinato de Francisco Ferdinando em Sarajevo detonou uma crise internacional entre Tríplice Entente e Potências Centrais.",
    personagens: ["Francisco Ferdinando"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O assassinato de Francisco Ferdinando em Sarajevo detonou uma crise internacional entre Tríplice Entente e Potências Centrais.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Franz%20Ferdinand%20d%27Este%2C%20Sophie%20Chotek%20leaving%20Sarajevo%20City%20Hall%20on%2028%20June%201914.jpg",
    alt: "Causas da Primeira Guerra Mundial",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "trincheiras",
    ano: "1914-1918",
    anoOrdenacao: 1915,
    titulo: "Guerra de trincheiras",
    periodo: "Primeira Guerra Mundial",
    civilizacao: "França",
    categoria: "guerra",
    resumo: "A frente ocidental se torna guerra de desgaste.",
    descricao: "Trincheiras, artilharia, metralhadoras, gás e lama produziram perdas humanas massivas e avanço lento.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Trincheiras, artilharia, metralhadoras, gás e lama produziram perdas humanas massivas e avanço lento.",
    imagem: "assets/images/trincheira-somme.jpg",
    alt: "Guerra de trincheiras",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "verdun-somme",
    ano: "1916",
    anoOrdenacao: 1916,
    titulo: "Verdun e Somme",
    periodo: "Primeira Guerra Mundial",
    civilizacao: "França",
    categoria: "guerra",
    resumo: "Batalhas simbolizam o desgaste extremo.",
    descricao: "Verdun e Somme causaram centenas de milhares de baixas e mostraram a brutalidade da guerra industrial.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Verdun e Somme causaram centenas de milhares de baixas e mostraram a brutalidade da guerra industrial.",
    imagem: "assets/images/trincheira-somme.jpg",
    alt: "Verdun e Somme",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "eua-russia-ww1",
    ano: "1917",
    anoOrdenacao: 1917,
    titulo: "Entrada dos EUA e Revolução Russa",
    periodo: "Primeira Guerra Mundial",
    civilizacao: "Rússia",
    categoria: "revolução",
    resumo: "1917 muda o equilíbrio da guerra.",
    descricao:
      "Os Estados Unidos entraram no conflito; a Revolução Russa levou à saída da Rússia e ao Tratado de Brest-Litovski.",
    personagens: ["Lenin", "Woodrow Wilson"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Os Estados Unidos entraram no conflito; a Revolução Russa levou à saída da Rússia e ao Tratado de Brest-Litovski.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Lenin%20in%201920%20%28cropped%29.jpg",
    alt: "Entrada dos EUA e Revolução Russa",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "versailles",
    ano: "1918-1919",
    anoOrdenacao: 1918,
    titulo: "Fim da guerra e Tratado de Versalhes",
    periodo: "Primeira Guerra Mundial",
    civilizacao: "Alemanha",
    categoria: "tratados",
    resumo: "A guerra termina em 1918; a paz impõe duras condições à Alemanha.",
    descricao:
      "Versalhes redesenhou fronteiras, gerou ressentimentos, reparações e novas tensões políticas, além de enormes perdas humanas e econômicas.",
    personagens: ["Woodrow Wilson"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Versalhes redesenhou fronteiras, gerou ressentimentos, reparações e novas tensões políticas, além de enormes perdas humanas e econômicas.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Treaty%20of%20Versailles%2C%20English%20version.jpg",
    alt: "Fim da guerra e Tratado de Versalhes",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "weimar-versailles",
    ano: "1919-1933",
    anoOrdenacao: 1919,
    titulo: "República de Weimar",
    periodo: "Período Entre Guerras",
    civilizacao: "Alemanha",
    categoria: "política",
    resumo: "A democracia alemã nasce sob crise e ressentimento pós-Versalhes.",
    descricao: "Weimar enfrentou hiperinflação, polarização, instabilidade e pressões de grupos extremistas.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "Weimar enfrentou hiperinflação, polarização, instabilidade e pressões de grupos extremistas.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv%20Bild%20102-00604%2C%20Inflation%2C%20Tapezieren%20mit%20Geldscheinen.jpg",
    alt: "República de Weimar",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "fascismo-nazismo-stalinismo",
    ano: "1922-1939",
    anoOrdenacao: 1922,
    titulo: "Totalitarismos e autoritarismos",
    periodo: "Período Entre Guerras",
    civilizacao: "Itália",
    categoria: "política",
    resumo: "Fascismo, nazismo e stalinismo crescem em contextos de crise.",
    descricao:
      "Mussolini, Hitler e Stalin devem ser estudados pelas estruturas de violência, propaganda, repressão, perseguição e consequências humanas de seus regimes.",
    personagens: ["Benito Mussolini", "Adolf Hitler", "Stalin"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Perseguição política", "Violência estatal", "Preparação para guerra"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Mussolini, Hitler e Stalin devem ser estudados pelas estruturas de violência, propaganda, repressão, perseguição e consequências humanas de seus regimes.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv%20Bild%20183-R99542%2C%20Berlin%2C%20Reichstagssitzung%2C%20Rede%20Adolf%20Hitler.jpg",
    alt: "Totalitarismos e autoritarismos",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "crise-1929",
    ano: "1929",
    anoOrdenacao: 1929,
    titulo: "Crise de 1929 e Grande Depressão",
    periodo: "Período Entre Guerras",
    civilizacao: "Estados Unidos",
    categoria: "revolução",
    resumo: "A quebra da bolsa de Nova York aprofunda crise global.",
    descricao:
      "Desemprego, falências e retração comercial favoreceram instabilidade social e radicalização política em vários países.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Desemprego, falências e retração comercial favoreceram instabilidade social e radicalização política em vários países.",
    imagem: "assets/images/bolsa-nyse-1929.jpg",
    alt: "Crise de 1929 e Grande Depressão",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "japao-apaziguamento",
    ano: "1931-1938",
    anoOrdenacao: 1931,
    titulo: "Militarismo japonês e apaziguamento europeu",
    periodo: "Período Entre Guerras",
    civilizacao: "Japão",
    categoria: "expansão",
    resumo: "Expansionismo japonês e concessões europeias revelam a fragilidade da ordem internacional.",
    descricao:
      "A invasão da Manchúria, agressões na China e a política de apaziguamento diante da Alemanha nazista enfraqueceram respostas coletivas.",
    personagens: [],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A invasão da Manchúria, agressões na China e a política de apaziguamento diante da Alemanha nazista enfraqueceram respostas coletivas.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Mukden%20Incident%20railway.jpg",
    alt: "Militarismo japonês e apaziguamento europeu",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "guerra-civil-espanhola",
    ano: "1936-1939",
    anoOrdenacao: 1936,
    titulo: "Guerra Civil Espanhola",
    periodo: "Período Entre Guerras",
    civilizacao: "Europa Medieval",
    categoria: "guerra",
    resumo: "A Espanha vira campo de disputa ideológica internacional.",
    descricao: "O conflito antecipou táticas, alianças e violências que apareceriam na Segunda Guerra Mundial.",
    personagens: ["Francisco Franco"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "O conflito antecipou táticas, alianças e violências que apareceriam na Segunda Guerra Mundial.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Spanish%20Civil%20War%20-%20Mass%20grave%20-%20Est%C3%A9par%20%28Burgos%29.jpg",
    alt: "Guerra Civil Espanhola",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "polonia-1939",
    ano: "1939",
    anoOrdenacao: 1939,
    titulo: "Invasão da Polônia",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Alemanha",
    categoria: "guerra",
    resumo: "A Alemanha invade a Polônia; Reino Unido e França declaram guerra.",
    descricao:
      "A Blitzkrieg combinou aviação, blindados e coordenação rápida. O pacto germano-soviético também abriu caminho à partilha da Polônia.",
    personagens: ["Adolf Hitler"],
    causas: ["Expansionismo nazista", "Fracasso da segurança coletiva"],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A Blitzkrieg combinou aviação, blindados e coordenação rápida. O pacto germano-soviético também abriu caminho à partilha da Polônia.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Polish%20Infantry%20marching%20-%201939.jpg",
    alt: "Invasão da Polônia",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "queda-franca-inglaterra",
    ano: "1940",
    anoOrdenacao: 1940,
    titulo: "Queda da França e Batalha da Inglaterra",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Inglaterra",
    categoria: "guerra",
    resumo: "A França cai; o Reino Unido resiste a ataques aéreos.",
    descricao:
      "A resistência britânica impediu invasão alemã imediata e manteve uma frente aliada na Europa Ocidental.",
    personagens: ["Winston Churchill", "Charles de Gaulle"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A resistência britânica impediu invasão alemã imediata e manteve uma frente aliada na Europa Ocidental.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Heinkel%20He%20111%20during%20the%20Battle%20of%20Britain.jpg",
    alt: "Queda da França e Batalha da Inglaterra",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "barbarossa-pearl",
    ano: "1941",
    anoOrdenacao: 1941,
    titulo: "Operação Barbarossa e Pearl Harbor",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Rússia",
    categoria: "guerra",
    resumo: "A guerra se amplia no Leste e no Pacífico.",
    descricao:
      "A invasão alemã da União Soviética e o ataque japonês a Pearl Harbor levaram à entrada decisiva da URSS e dos EUA em guerra total.",
    personagens: ["Stalin", "Franklin Roosevelt"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A invasão alemã da União Soviética e o ataque japonês a Pearl Harbor levaram à entrada decisiva da URSS e dos EUA em guerra total.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Pearl%20Harbor%20looking%20southwest-Oct41.jpg",
    alt: "Operação Barbarossa e Pearl Harbor",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "holocausto",
    ano: "1941-1945",
    anoOrdenacao: 1941.5,
    titulo: "Holocausto",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Alemanha",
    categoria: "política",
    resumo: "Genocídio sistemático promovido pelo regime nazista.",
    descricao:
      "O Holocausto assassinou cerca de seis milhões de judeus e milhões de outras vítimas perseguidas em guetos, fuzilamentos, campos de concentração e centros de extermínio. Deve ser estudado com respeito às vítimas e precisão histórica.",
    personagens: ["vítimas do nazismo"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: [
      "Trauma humano irreparável",
      "Julgamentos de crimes contra a humanidade",
      "Memória e educação contra o genocídio"
    ],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "O Holocausto assassinou cerca de seis milhões de judeus e milhões de outras vítimas perseguidas em guetos, fuzilamentos, campos de concentração e centros de extermínio. Deve ser estudado com respeito às vítimas e precisão histórica.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Auschwitz-Birkenau%20railway%20tracks.jpg",
    alt: "Holocausto",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "stalingrado-pacifico",
    ano: "1942-1943",
    anoOrdenacao: 1942,
    titulo: "Stalingrado e virada da guerra",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Rússia",
    categoria: "guerra",
    resumo: "Stalingrado marca uma virada no front oriental.",
    descricao:
      "A derrota alemã em Stalingrado, junto a campanhas aliadas no Pacífico e no norte da África, alterou o equilíbrio militar.",
    personagens: ["Stalin"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A derrota alemã em Stalingrado, junto a campanhas aliadas no Pacífico e no norte da África, alterou o equilíbrio militar.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Stalingrad%20after%20liberation.jpg",
    alt: "Stalingrado e virada da guerra",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "dia-d-franca",
    ano: "1944",
    anoOrdenacao: 1944,
    titulo: "Dia D e libertação da França",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "França",
    categoria: "guerra",
    resumo: "Aliados desembarcam na Normandia.",
    descricao: "O Dia D abriu uma frente ocidental ampla contra a Alemanha nazista e levou à libertação de Paris.",
    personagens: ["Dwight Eisenhower", "Charles de Gaulle"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "O Dia D abriu uma frente ocidental ampla contra a Alemanha nazista e levou à libertação de Paris.",
    imagem: "assets/images/dia-d.jpg",
    alt: "Dia D e libertação da França",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "queda-berlim",
    ano: "1945",
    anoOrdenacao: 1945,
    titulo: "Queda de Berlim e rendição alemã",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Alemanha",
    categoria: "guerra",
    resumo: "Berlim cai; Hitler morre; a Alemanha se rende.",
    descricao: "A ofensiva soviética e o avanço aliado encerraram a guerra na Europa em maio de 1945.",
    personagens: ["Adolf Hitler", "Stalin", "Winston Churchill"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto: "A ofensiva soviética e o avanço aliado encerraram a guerra na Europa em maio de 1945.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Raising%20a%20flag%20over%20the%20Reichstag%202.jpg",
    alt: "Queda de Berlim e rendição alemã",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "hiroshima-nagasaki",
    ano: "1945",
    anoOrdenacao: 1945.1,
    titulo: "Hiroshima, Nagasaki e rendição do Japão",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Japão",
    categoria: "guerra",
    resumo: "Bombas atômicas devastam cidades japonesas.",
    descricao:
      "Os bombardeios atômicos, a entrada soviética contra o Japão e o desgaste militar levaram à rendição japonesa em setembro de 1945.",
    personagens: ["Harry Truman", "Hirohito"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Fim da Segunda Guerra Mundial", "Era nuclear", "Debates éticos duradouros"],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "Os bombardeios atômicos, a entrada soviética contra o Japão e o desgaste militar levaram à rendição japonesa em setembro de 1945.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Atomic%20bombing%20of%20Japan.jpg",
    alt: "Hiroshima, Nagasaki e rendição do Japão",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  },
  {
    id: "onu-pos-guerra",
    ano: "1945",
    anoOrdenacao: 1945.2,
    titulo: "Criação da ONU e consequências da guerra",
    periodo: "Segunda Guerra Mundial",
    civilizacao: "Estados Unidos",
    categoria: "tratados",
    resumo: "A Organização das Nações Unidas nasce em 1945.",
    descricao:
      "A guerra deixou destruição, deslocamentos, novas fronteiras de poder, julgamentos internacionais, descolonização e início da ordem bipolar da Guerra Fria.",
    personagens: ["Franklin Roosevelt", "Winston Churchill"],
    causas: ["Processos políticos, sociais e econômicos acumulados no período."],
    curiosidades: [],
    consequencias: ["Influenciou acontecimentos posteriores e alterou equilíbrios regionais."],
    legado: "Ajuda a compreender mudanças de longa duração na história.",
    contexto:
      "A guerra deixou destruição, deslocamentos, novas fronteiras de poder, julgamentos internacionais, descolonização e início da ordem bipolar da Guerra Fria.",
    imagem:
      "https://commons.wikimedia.org/wiki/Special:FilePath/United%20Nations%20Conference%20on%20International%20Organization%20UNCIO%20delegates.jpg",
    alt: "Criação da ONU e consequências da guerra",
    creditoImagem:
      "Imagem pública ou livre em Wikimedia Commons quando disponível; fallback visual local se indisponível.",
    tipoFonte: "História documentada"
  }
] satisfies Acontecimento[];

export const deusesGregos = [
  {
    nome: "Zeus",
    dominio: "céu e soberania",
    simbolo: "raio",
    parentesco: "filho de Cronos e Reia",
    historia: "lidera os olímpicos após a Titanomaquia",
    romano: "Júpiter"
  },
  {
    nome: "Hera",
    dominio: "casamento e rainha dos deuses",
    simbolo: "pavão",
    parentesco: "irmã e esposa de Zeus",
    historia: "protege o casamento em muitos cultos",
    romano: "Juno"
  },
  {
    nome: "Poseidon",
    dominio: "mares e terremotos",
    simbolo: "tridente",
    parentesco: "irmão de Zeus",
    historia: "disputa cidades e protege navegantes",
    romano: "Netuno"
  },
  {
    nome: "Hades",
    dominio: "mundo dos mortos",
    simbolo: "elmo",
    parentesco: "irmão de Zeus",
    historia: "governa o submundo com Perséfone",
    romano: "Plutão"
  },
  {
    nome: "Atena",
    dominio: "sabedoria e estratégia",
    simbolo: "coruja",
    parentesco: "filha de Zeus",
    historia: "patrona de Atenas",
    romano: "Minerva"
  },
  {
    nome: "Ares",
    dominio: "guerra violenta",
    simbolo: "lança",
    parentesco: "filho de Zeus e Hera",
    historia: "representa brutalidade do combate",
    romano: "Marte"
  },
  {
    nome: "Apolo",
    dominio: "luz, música e profecia",
    simbolo: "lira",
    parentesco: "filho de Zeus e Leto",
    historia: "associado ao oráculo de Delfos",
    romano: "Apolo"
  },
  {
    nome: "Ártemis",
    dominio: "caça e natureza",
    simbolo: "arco",
    parentesco: "irmã de Apolo",
    historia: "protetora de jovens e animais",
    romano: "Diana"
  },
  {
    nome: "Afrodite",
    dominio: "amor e beleza",
    simbolo: "concha",
    parentesco: "versões variam sobre sua origem",
    historia: "aparece em mitos de desejo e disputa",
    romano: "Vênus"
  },
  {
    nome: "Hermes",
    dominio: "mensagens e caminhos",
    simbolo: "caduceu",
    parentesco: "filho de Zeus e Maia",
    historia: "mensageiro e guia de viajantes",
    romano: "Mercúrio"
  },
  {
    nome: "Hefesto",
    dominio: "metalurgia e fogo técnico",
    simbolo: "martelo",
    parentesco: "filho de Hera ou de Zeus e Hera",
    historia: "artesão divino",
    romano: "Vulcano"
  },
  {
    nome: "Dionísio",
    dominio: "vinho e êxtase ritual",
    simbolo: "videira",
    parentesco: "filho de Zeus e Sêmele",
    historia: "ligado a teatro e cultos dionisíacos",
    romano: "Baco"
  },
  {
    nome: "Deméter",
    dominio: "agricultura",
    simbolo: "trigo",
    parentesco: "irmã de Zeus",
    historia: "sua dor por Perséfone explica ciclos agrícolas em mito",
    romano: "Ceres"
  },
  {
    nome: "Perséfone",
    dominio: "renovação e submundo",
    simbolo: "romã",
    parentesco: "filha de Deméter e Zeus",
    historia: "rainha do Hades parte do ano",
    romano: "Prosérpina"
  }
] satisfies DeusGrego[];

export const personagens = [
  {
    id: "homero",
    nome: "Homero",
    periodo: "Grécia Arcaica",
    origem: "Jônia ou tradição grega",
    ocupacao: "poeta épico",
    feitos: "Ilíada e Odisseia",
    impacto: "Moldou memória cultural grega.",
    curiosidade: "Pode representar uma tradição oral coletiva.",
    imagem: "assets/images/acropole-atenas.jpg",
    foto: "assets/images/personagens/homero.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg/960px-Homer_At_the_British_Museum_2024_%283x4_cropped%29.jpg"
  },
  {
    id: "leonidas",
    nome: "Leônidas",
    periodo: "Grécia Clássica",
    origem: "Esparta",
    ocupacao: "rei e comandante",
    feitos: "Termópilas",
    impacto: "Símbolo de resistência militar grega.",
    curiosidade: "Esparta tinha dois reis simultâneos.",
    imagem: "https://commons.wikimedia.org/wiki/Special:FilePath/Ancient_Sparta_theatre_ruins.jpg",
    foto: "assets/images/personagens/leonidas.jpg",
    fotoRemota: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Helmed_Hoplite_Sparta.JPG"
  },
  {
    id: "solon",
    nome: "Sólon",
    periodo: "Grécia Arcaica",
    origem: "Atenas",
    ocupacao: "legislador",
    feitos: "reformas sociais",
    impacto: "Reduziu tensões entre aristocratas e devedores.",
    curiosidade: "Não criou sozinho a democracia ateniense.",
    imagem: "assets/images/partenon.jpg",
    foto: "assets/images/personagens/solon.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ignoto%2C_c.d._solone%2C_replica_del_90_dc_ca_da_orig._greco_del_110_ac._ca%2C_6143.JPG/960px-Ignoto%2C_c.d._solone%2C_replica_del_90_dc_ca_da_orig._greco_del_110_ac._ca%2C_6143.JPG"
  },
  {
    id: "clistenes",
    nome: "Clístenes",
    periodo: "Grécia Clássica",
    origem: "Atenas",
    ocupacao: "reformador",
    feitos: "democracia ateniense",
    impacto: "Reorganizou tribos e participação cívica.",
    curiosidade: "Cidadania seguia limitada a homens atenienses.",
    imagem: "assets/images/partenon.jpg",
    foto: "assets/images/personagens/clistenes.jpg",
    fotoRemota: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cleisthenes.jpg/960px-Cleisthenes.jpg"
  },
  {
    id: "pericles",
    nome: "Péricles",
    periodo: "Grécia Clássica",
    origem: "Atenas",
    ocupacao: "estadista",
    feitos: "Acrópole e liderança ateniense",
    impacto: "Associado ao auge cultural e imperial de Atenas.",
    curiosidade: "Governou por influência repetida, não como rei.",
    imagem: "assets/images/partenon.jpg",
    foto: "assets/images/personagens/pericles.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Pericles_Pio-Clementino_Inv269_n2.jpg/960px-Pericles_Pio-Clementino_Inv269_n2.jpg"
  },
  {
    id: "herodoto",
    nome: "Heródoto",
    periodo: "Grécia Clássica",
    origem: "Halicarnasso",
    ocupacao: "historiador",
    feitos: "Histórias",
    impacto: "Registrou costumes e Guerras Médicas.",
    curiosidade: "Misturou investigação e relatos tradicionais.",
    imagem: "assets/images/acropole-atenas.jpg",
    foto: "assets/images/personagens/herodoto.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Marble_bust_of_Herodotos_MET_DT11742_%28cropped%29.jpg/960px-Marble_bust_of_Herodotos_MET_DT11742_%28cropped%29.jpg"
  },
  {
    id: "tucidides",
    nome: "Tucídides",
    periodo: "Grécia Clássica",
    origem: "Atenas",
    ocupacao: "historiador",
    feitos: "Guerra do Peloponeso",
    impacto: "Buscou análise política e causal rigorosa.",
    curiosidade: "Participou da guerra que narrou.",
    imagem: "assets/images/acropole-atenas.jpg",
    foto: "assets/images/personagens/tucidides.jpg",
    fotoRemota: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Thucydides_pushkin01.jpg"
  },
  {
    id: "socrates",
    nome: "Sócrates",
    periodo: "Grécia Clássica",
    origem: "Atenas",
    ocupacao: "filósofo",
    feitos: "método socrático",
    impacto: "Mudou a filosofia ética e política.",
    curiosidade: "Não escreveu suas próprias obras.",
    imagem: "assets/images/partenon.jpg",
    foto: "assets/images/personagens/socrates.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Socrates_Louvre.jpg/960px-Socrates_Louvre.jpg"
  },
  {
    id: "platao",
    nome: "Platão",
    periodo: "Grécia Clássica",
    origem: "Atenas",
    ocupacao: "filósofo",
    feitos: "Academia e A República",
    impacto: "Influenciou metafísica e política ocidental.",
    curiosidade: "Usou diálogos como forma literária.",
    imagem: "assets/images/partenon.jpg",
    foto: "assets/images/personagens/platao.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Plato_Silanion_Musei_Capitolini_MC1377.png/960px-Plato_Silanion_Musei_Capitolini_MC1377.png"
  },
  {
    id: "aristoteles",
    nome: "Aristóteles",
    periodo: "Grécia Clássica",
    origem: "Estagira",
    ocupacao: "filósofo",
    feitos: "Liceu e lógica",
    impacto: "Sistematizou campos do saber antigo.",
    curiosidade: "Foi professor de Alexandre.",
    imagem: "assets/images/acropole-atenas.jpg",
    foto: "assets/images/personagens/aristoteles.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/960px-Aristotle_Altemps_Inv8575.jpg"
  },
  {
    id: "filipe-ii",
    nome: "Filipe II",
    periodo: "Macedônia",
    origem: "Macedônia",
    ocupacao: "rei",
    feitos: "falange macedônica",
    impacto: "Preparou conquistas de Alexandre.",
    curiosidade: "A sarissa dava alcance à falange.",
    imagem: "assets/images/alexander-mosaic.jpg",
    foto: "assets/images/personagens/filipe-ii.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Filip%20II%20Macedonia.jpg"
  },
  {
    id: "alexandre-o-grande",
    nome: "Alexandre, o Grande",
    periodo: "Helenismo",
    origem: "Macedônia",
    ocupacao: "rei e conquistador",
    feitos: "conquista do Império Persa",
    impacto: "Espalhou cultura helenística.",
    curiosidade: "Morreu jovem, aos 32 anos.",
    imagem: "assets/images/alexander-mosaic.jpg",
    foto: "assets/images/personagens/alexandre-o-grande.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/AlexanderTheGreat%20Bust.jpg"
  },
  {
    id: "anibal",
    nome: "Aníbal",
    periodo: "República Romana",
    origem: "Cartago",
    ocupacao: "general",
    feitos: "travessia dos Alpes",
    impacto: "Ameaçou Roma nas Guerras Púnicas.",
    curiosidade: "Usou elefantes em parte da campanha.",
    imagem: "assets/images/coliseu.jpg",
    foto: "assets/images/personagens/anibal.jpg"
  },
  {
    id: "cipiao-africano",
    nome: "Cipião Africano",
    periodo: "República Romana",
    origem: "Roma",
    ocupacao: "general",
    feitos: "vitória sobre Aníbal",
    impacto: "Consolidou a ascensão romana.",
    curiosidade: "Recebeu cognome ligado à África.",
    imagem: "assets/images/coliseu.jpg",
    foto: "assets/images/personagens/cipiao-africano.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/EB1911%20Roman%20Art%20-%20Scipio%20Africanus.jpg"
  },
  {
    id: "julio-cesar",
    nome: "Júlio César",
    periodo: "República Romana",
    origem: "Roma",
    ocupacao: "general e ditador",
    feitos: "Gália e Rubicão",
    impacto: "Acelerou o fim da República.",
    curiosidade: "Seu nome virou título político em várias línguas.",
    imagem: "assets/images/coliseu.jpg",
    foto: "assets/images/personagens/julio-cesar.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Bust%20of%20Julius%20Caesar.jpg"
  },
  {
    id: "cleopatra",
    nome: "Cleópatra",
    periodo: "Helenismo/Roma",
    origem: "Egito",
    ocupacao: "rainha",
    feitos: "alianças com César e Antônio",
    impacto: "Última governante ptolomaica relevante.",
    curiosidade: "Falava várias línguas segundo tradições antigas.",
    imagem: "assets/images/alexander-mosaic.jpg",
    foto: "assets/images/personagens/cleopatra.jpg"
  },
  {
    id: "augusto",
    nome: "Augusto",
    periodo: "Império Romano",
    origem: "Roma",
    ocupacao: "imperador",
    feitos: "Pax Romana",
    impacto: "Fundou o Principado.",
    curiosidade: "Chamava-se Otaviano antes do título Augusto.",
    imagem: "assets/images/coliseu.jpg",
    foto: "assets/images/personagens/augusto.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Augusto%20de%20Prima%20Porta..jpg"
  },
  {
    id: "marco-aurelio",
    nome: "Marco Aurélio",
    periodo: "Império Romano",
    origem: "Roma",
    ocupacao: "imperador e filósofo",
    feitos: "Meditações",
    impacto: "Exemplo de estoicismo imperial.",
    curiosidade: "Escreveu para si, não para publicar.",
    imagem: "assets/images/coliseu.jpg",
    foto: "assets/images/personagens/marco-aurelio.jpg",
    fotoRemota:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Bust%20of%20Marcus%20Aurelius%20%282%29%20%28head%29.jpg"
  },
  {
    id: "constantino",
    nome: "Constantino",
    periodo: "Antiguidade tardia",
    origem: "Roma",
    ocupacao: "imperador",
    feitos: "Constantinopla e cristianismo",
    impacto: "Mudou a política religiosa imperial.",
    curiosidade: "Sua nova capital durou mais de mil anos.",
    imagem: "assets/images/hagia-sophia.jpg",
    foto: "assets/images/personagens/constantino.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Constantino-capitolino.jpg"
  },
  {
    id: "justiniano",
    nome: "Justiniano",
    periodo: "Idade Média",
    origem: "Bizâncio",
    ocupacao: "imperador",
    feitos: "Código de Justiniano",
    impacto: "Preservou e reorganizou direito romano.",
    curiosidade: "Hagia Sophia marcou seu reinado.",
    imagem: "assets/images/hagia-sophia.jpg",
    foto: "assets/images/personagens/justiniano.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Justinian%20mosaik%20ravenna.jpg"
  },
  {
    id: "carlos-magno",
    nome: "Carlos Magno",
    periodo: "Idade Média",
    origem: "Francos",
    ocupacao: "rei e imperador",
    feitos: "Império Carolíngio",
    impacto: "Reforçou alianças entre monarquia e Igreja.",
    curiosidade: "Foi coroado em Roma no ano 800.",
    imagem: "assets/images/hagia-sophia.jpg",
    foto: "assets/images/personagens/carlos-magno.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Charlemagne-by-Durer.jpg"
  },
  {
    id: "joana-d-arc",
    nome: "Joana d'Arc",
    periodo: "Idade Média",
    origem: "França",
    ocupacao: "líder militar e religiosa",
    feitos: "Guerra dos Cem Anos",
    impacto: "Virou símbolo francês.",
    curiosidade: "Foi julgada e executada em 1431.",
    imagem: "assets/images/hagia-sophia.jpg",
    foto: "assets/images/personagens/joana-d-arc.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Joan%20of%20Arc%20miniature%20graded.jpg"
  },
  {
    id: "leonardo-da-vinci",
    nome: "Leonardo da Vinci",
    periodo: "Renascimento",
    origem: "Itália",
    ocupacao: "artista e inventor",
    feitos: "Mona Lisa e estudos técnicos",
    impacto: "Símbolo do humanismo renascentista.",
    curiosidade: "Seus cadernos unem arte e observação.",
    imagem: "assets/images/leonardo.jpg",
    foto: "assets/images/personagens/leonardo-da-vinci.jpg"
  },
  {
    id: "martinho-lutero",
    nome: "Martinho Lutero",
    periodo: "Reforma",
    origem: "Alemanha",
    ocupacao: "teólogo",
    feitos: "95 teses",
    impacto: "Catalisou a Reforma Protestante.",
    curiosidade: "A imprensa ampliou o alcance de suas ideias.",
    imagem: "assets/images/leonardo.jpg",
    foto: "assets/images/personagens/martinho-lutero.jpg",
    fotoRemota: "https://commons.wikimedia.org/wiki/Special:FilePath/Cranach%20Martin%20Luther.JPG"
  },
  {
    id: "galileu",
    nome: "Galileu",
    periodo: "Revolução Científica",
    origem: "Itália",
    ocupacao: "cientista",
    feitos: "observações astronômicas",
    impacto: "Defendeu evidências contra modelos tradicionais.",
    curiosidade: "Enfrentou julgamento religioso.",
    imagem: "assets/images/leonardo.jpg",
    foto: "assets/images/personagens/galileu.jpg",
    fotoRemota:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Justus%20Sustermans%20-%20Portrait%20of%20Galileo%20Galilei%20%28Uffizi%29.jpg"
  },
  {
    id: "isaac-newton",
    nome: "Isaac Newton",
    periodo: "Revolução Científica",
    origem: "Inglaterra",
    ocupacao: "cientista",
    feitos: "leis do movimento",
    impacto: "Transformou física e matemática.",
    curiosidade: "Também estudou alquimia e teologia.",
    imagem: "assets/images/leonardo.jpg",
    foto: "assets/images/personagens/isaac-newton.jpg"
  },
  {
    id: "luis-xiv",
    nome: "Luís XIV",
    periodo: "Absolutismo",
    origem: "França",
    ocupacao: "rei",
    feitos: "Versalhes",
    impacto: "Símbolo do absolutismo francês.",
    curiosidade: "A corte era instrumento político.",
    imagem: "assets/images/leonardo.jpg",
    foto: "assets/images/personagens/luis-xiv.jpg"
  },
  {
    id: "george-washington",
    nome: "George Washington",
    periodo: "Revoluções",
    origem: "Estados Unidos",
    ocupacao: "general e presidente",
    feitos: "Independência dos EUA",
    impacto: "Ajudou a fundar a república estadunidense.",
    curiosidade: "Recusou um terceiro mandato.",
    imagem: "assets/images/bastilha.jpg",
    foto: "assets/images/personagens/george-washington.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/960px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
  },
  {
    id: "napoleao",
    nome: "Napoleão",
    periodo: "Era Napoleônica",
    origem: "França",
    ocupacao: "general e imperador",
    feitos: "Código Napoleônico e guerras",
    impacto: "Redesenhou a Europa e difundiu reformas.",
    curiosidade: "Sua queda ilustra sobre-expansão imperial.",
    imagem: "assets/images/bastilha.jpg",
    foto: "assets/images/personagens/napoleao.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/960px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg"
  },
  {
    id: "bismarck",
    nome: "Bismarck",
    periodo: "Século XIX",
    origem: "Prússia/Alemanha",
    ocupacao: "estadista",
    feitos: "unificação alemã",
    impacto: "Alterou o equilíbrio europeu.",
    curiosidade: "Usou diplomacia e guerras calculadas.",
    imagem: "assets/images/cottonopolis.jpg",
    foto: "assets/images/personagens/bismarck.jpg",
    fotoRemota: "https://upload.wikimedia.org/wikipedia/commons/5/59/Otto_von_Bismarck_1885_%28cropped%29.jpg"
  },
  {
    id: "karl-marx",
    nome: "Karl Marx",
    periodo: "Século XIX",
    origem: "Alemanha",
    ocupacao: "filósofo e economista",
    feitos: "crítica ao capitalismo",
    impacto: "Influenciou movimentos socialistas.",
    curiosidade: "Escreveu com Friedrich Engels.",
    imagem: "assets/images/cottonopolis.jpg",
    foto: "assets/images/personagens/karl-marx.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png/960px-Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png"
  },
  {
    id: "francisco-ferdinando",
    nome: "Francisco Ferdinando",
    periodo: "Primeira Guerra Mundial",
    origem: "Áustria-Hungria",
    ocupacao: "arquiduque",
    feitos: "assassinato em Sarajevo",
    impacto: "Seu assassinato detonou a crise de 1914.",
    curiosidade: "O atentado não foi a única causa da guerra.",
    imagem: "assets/images/trincheira-somme.jpg",
    foto: "assets/images/personagens/francisco-ferdinando.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ferdinand_Schmutzer_-_Franz_Ferdinand_von_%C3%96sterreich-Este%2C_um_1914_%28cropped%29.jpg/960px-Ferdinand_Schmutzer_-_Franz_Ferdinand_von_%C3%96sterreich-Este%2C_um_1914_%28cropped%29.jpg"
  },
  {
    id: "winston-churchill",
    nome: "Winston Churchill",
    periodo: "Segunda Guerra Mundial",
    origem: "Reino Unido",
    ocupacao: "primeiro-ministro",
    feitos: "resistência britânica",
    impacto: "Liderou o Reino Unido contra o nazismo.",
    curiosidade: "Era também escritor e orador.",
    imagem: "assets/images/dia-d.jpg",
    foto: "assets/images/personagens/winston-churchill.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sir_Winston_Churchill_-_19086236948_%28restored%29.jpg/960px-Sir_Winston_Churchill_-_19086236948_%28restored%29.jpg"
  },
  {
    id: "franklin-roosevelt",
    nome: "Franklin Roosevelt",
    periodo: "Segunda Guerra Mundial",
    origem: "Estados Unidos",
    ocupacao: "presidente",
    feitos: "New Deal e liderança aliada",
    impacto: "Conduziu os EUA na guerra até 1945.",
    curiosidade: "Foi eleito quatro vezes.",
    imagem: "assets/images/dia-d.jpg",
    foto: "assets/images/personagens/franklin-roosevelt.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/FDR-1944-Campaign-Portrait_%283x4_retouched%2C_cropped%29.jpg/960px-FDR-1944-Campaign-Portrait_%283x4_retouched%2C_cropped%29.jpg"
  },
  {
    id: "charles-de-gaulle",
    nome: "Charles de Gaulle",
    periodo: "Segunda Guerra Mundial",
    origem: "França",
    ocupacao: "general e estadista",
    feitos: "França Livre",
    impacto: "Símbolo da resistência francesa.",
    curiosidade: "Depois presidiu a Quinta República.",
    imagem: "assets/images/dia-d.jpg",
    foto: "assets/images/personagens/charles-de-gaulle.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/De_Gaulle-OWI_%28cropped%29_%28c%29%282%29.jpg/960px-De_Gaulle-OWI_%28cropped%29_%28c%29%282%29.jpg"
  },
  {
    id: "adolf-hitler",
    nome: "Adolf Hitler",
    periodo: "Entre guerras/Segunda Guerra",
    origem: "Áustria/Alemanha",
    ocupacao: "ditador",
    feitos: "regime nazista e guerra",
    impacto: "Responsável por agressão expansionista, perseguições e genocídio.",
    curiosidade: "Deve ser estudado criticamente, sem admiração.",
    imagem: "assets/images/dia-d.jpg",
    foto: "assets/images/personagens/adolf-hitler.jpg",
    fotoRemota:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Hitler_portrait_crop_%28cropped%29%282%29.jpg/960px-Hitler_portrait_crop_%28cropped%29%282%29.jpg"
  },
  {
    id: "benito-mussolini",
    nome: "Benito Mussolini",
    periodo: "Entre guerras",
    origem: "Itália",
    ocupacao: "ditador",
    feitos: "fascismo italiano",
    impacto: "Implantou repressão e inspirou movimentos autoritários.",
    curiosidade: "Seu regime aliou-se à Alemanha nazista.",
    imagem: "assets/images/bolsa-nyse-1929.jpg",
    foto: "assets/images/personagens/benito-mussolini.jpg",
    fotoRemota: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Mussolini_mezzobusto.jpg"
  },
  {
    id: "stalin",
    nome: "Stalin",
    periodo: "Entre guerras/Segunda Guerra",
    origem: "Geórgia/URSS",
    ocupacao: "ditador",
    feitos: "industrialização forçada e repressão",
    impacto: "Governou por violência estatal e culto de personalidade.",
    curiosidade: "A URSS sofreu perdas enormes na guerra.",
    imagem: "assets/images/dia-d.jpg",
    foto: "assets/images/personagens/stalin.jpg"
  }
] satisfies Personagem[];

export const comparacoesDivinas = [
  ["Zeus", "Júpiter"],
  ["Hera", "Juno"],
  ["Poseidon", "Netuno"],
  ["Atena", "Minerva"],
  ["Ares", "Marte"],
  ["Afrodite", "Vênus"],
  ["Hermes", "Mercúrio"],
  ["Ártemis", "Diana"],
  ["Hefesto", "Vulcano"],
  ["Hades", "Plutão"],
  ["Cronos", "Saturno"],
  ["Héracles", "Hércules"]
] satisfies Array<[string, string]>;

export const comparadores = {
  Atenas: {
    governo: "democracia direta limitada a cidadãos homens",
    sociedade: "cidadãos, metecos, mulheres excluídas da cidadania e escravizados",
    economia: "comércio marítimo, artesanato e tributos aliados",
    religiao: "cultos cívicos, Atena como patrona",
    militar: "marinha forte",
    cultura: "teatro, filosofia, arquitetura",
    territorio: "Ática e império marítimo",
    personagens: "Sólon, Clístenes, Péricles, Sócrates",
    legado: "debate democrático e cultura clássica"
  },
  Esparta: {
    governo: "diarquia, Gerúsia, éforos e assembleia",
    sociedade: "espartanos, periecos e hilotas",
    economia: "agricultura sustentada por hilotas",
    religiao: "cultos cívicos e disciplina ritual",
    militar: "falange hoplita e agogê",
    cultura: "austeridade e formação militar",
    territorio: "Lacônia e Messênia",
    personagens: "Leônidas, Licurgo tradicional",
    legado: "modelo de militarização e disciplina"
  },
  Grécia: {
    governo: "múltiplas pólis autônomas",
    sociedade: "variação entre cidades",
    economia: "comércio, agricultura e colônias",
    religiao: "deuses olímpicos e cultos locais",
    militar: "hoplitas e marinhas",
    cultura: "filosofia, arte, teatro, ciência",
    territorio: "Egeu e Mediterrâneo",
    personagens: "Homero, Péricles, Platão, Aristóteles",
    legado: "linguagem política e pensamento ocidental"
  },
  Roma: {
    governo: "monarquia, república e império",
    sociedade: "patrícios, plebeus, clientes, escravizados e cidadãos",
    economia: "agricultura, tributos, comércio e escravidão",
    religiao: "cultos romanos, adaptações gregas e cristianismo tardio",
    militar: "legiões e auxiliares",
    cultura: "direito, engenharia, urbanismo",
    territorio: "Mediterrâneo",
    personagens: "César, Augusto, Constantino",
    legado: "direito, línguas românicas e instituições"
  },
  "República Romana": {
    governo: "Senado, cônsules e magistraturas",
    sociedade: "conflito patrício-plebeu",
    economia: "expansão agrícola e escravista",
    religiao: "cultos cívicos tradicionais",
    militar: "exército de cidadãos e aliados socii",
    cultura: "virtudes cívicas republicanas",
    territorio: "Itália e Mediterrâneo em expansão",
    personagens: "Gracos, Mário, Sula, César",
    legado: "instituições republicanas e conflitos sociais"
  },
  "Império Romano": {
    governo: "príncipe/imperador e burocracia",
    sociedade: "cidadania ampliada e hierarquias imperiais",
    economia: "tributos, comércio e grandes propriedades",
    religiao: "pluralismo religioso e cristianismo",
    militar: "legiões profissionais e auxiliares",
    cultura: "cidades, direito e obras públicas",
    territorio: "maior extensão sob Trajano",
    personagens: "Augusto, Trajano, Adriano, Marco Aurélio",
    legado: "administração imperial e direito"
  },
  "Roma Ocidental": {
    governo: "administração latina fragilizada",
    sociedade: "pressão fiscal e ruralização",
    economia: "crises monetárias e fiscais",
    religiao: "cristianismo latino",
    militar: "dependência crescente de federados",
    cultura: "herança latina",
    territorio: "Itália, Gália, Hispânia e África em disputa",
    personagens: "Odoacro, Rômulo Augusto",
    legado: "base dos reinos medievais ocidentais"
  },
  "Roma Oriental": {
    governo: "imperador em Constantinopla",
    sociedade: "urbana e helenizada em muitas regiões",
    economia: "mais resiliente no Mediterrâneo oriental",
    religiao: "cristianismo oriental",
    militar: "exército imperial reformado",
    cultura: "síntese greco-romana e cristã",
    territorio: "Bálcãs, Anatólia e Mediterrâneo oriental",
    personagens: "Constantino, Justiniano",
    legado: "Império Bizantino continuou até 1453"
  }
} satisfies Record<string, ComparadorCivilizacao>;

export const mapas = [
  {
    titulo: "Cidades-Estado gregas",
    descricao: "Atenas, Esparta, Corinto e Tebas como polos autônomos ligados pelo Egeu.",
    foco: "Grécia"
  },
  {
    titulo: "Império Persa",
    descricao: "Administração por satrapias e grandes rotas conectando povos diversos.",
    foco: "Pérsia"
  },
  {
    titulo: "Conquistas de Alexandre",
    descricao: "Da Macedônia ao Egito, Mesopotâmia, Pérsia e noroeste da Índia.",
    foco: "Macedônia"
  },
  {
    titulo: "Expansão da República Romana",
    descricao: "Da Itália às guerras pelo Mediterrâneo contra Cartago e reinos helenísticos.",
    foco: "Roma"
  },
  {
    titulo: "Maior extensão do Império Romano",
    descricao: "Mediterrâneo como eixo interno sob Trajano.",
    foco: "Roma"
  },
  {
    titulo: "Oriente e Ocidente",
    descricao: "Divisão administrativa com Constantinopla como centro oriental.",
    foco: "Império Bizantino"
  },
  {
    titulo: "Europa medieval",
    descricao: "Reinos, feudos, rotas, Igreja latina, Bizâncio e mundo islâmico em contato.",
    foco: "Europa Medieval"
  },
  {
    titulo: "Expansão napoleônica",
    descricao: "Domínio francês, estados aliados e coalizões adversárias na Europa.",
    foco: "França"
  },
  {
    titulo: "Alianças da Primeira Guerra",
    descricao: "Tríplice Entente contra Potências Centrais em guerra global.",
    foco: "Europa"
  },
  {
    titulo: "Eixo e Aliados na Segunda Guerra",
    descricao: "Conflito mundial envolvendo Europa, África, Ásia e Pacífico.",
    foco: "Mundo"
  }
] satisfies MapaHistorico[];

export const perguntasRevisao = [
  {
    tipo: "Conceito",
    pergunta: "O que era uma pólis?",
    resposta:
      "Era a cidade-Estado grega: comunidade política com núcleo urbano, território rural, leis, cultos e identidade cívica."
  },
  {
    tipo: "Comparação",
    pergunta: "Qual era a diferença entre Atenas e Esparta?",
    resposta:
      "Atenas valorizou democracia direta limitada, marinha e cultura urbana; Esparta organizou-se em torno de disciplina militar, hilotas e governo misto."
  },
  {
    tipo: "Mitologia",
    pergunta: "O que foi a Titanomaquia?",
    resposta: "Um mito sobre a guerra entre olímpicos liderados por Zeus e os Titãs de Cronos."
  },
  {
    tipo: "Grécia",
    pergunta: "O que foram as Guerras Médicas?",
    resposta: "Conflitos entre cidades gregas e o Império Persa no início do século V a.C."
  },
  {
    tipo: "Helenismo",
    pergunta: "Quem foi Alexandre, o Grande?",
    resposta: "Rei macedônico que conquistou o Império Persa e espalhou culturas helenísticas do Mediterrâneo à Ásia."
  },
  {
    tipo: "Roma",
    pergunta: "Por que Roma caiu?",
    resposta:
      "Por várias causas acumuladas: crises fiscais, disputas políticas, guerras civis, pressão nas fronteiras, invasões, divisão imperial e dependência militar."
  },
  {
    tipo: "Helenismo",
    pergunta: "O que foi o helenismo?",
    resposta: "Mistura e difusão da cultura grega com tradições locais após as conquistas de Alexandre."
  },
  {
    tipo: "Filosofia",
    pergunta: "Qual foi a importância de Sócrates?",
    resposta: "Transformou a filosofia por meio do diálogo, perguntas, ética e exame crítico das próprias ideias."
  },
  {
    tipo: "Primeira Guerra",
    pergunta: "Quais foram as causas da Primeira Guerra Mundial?",
    resposta:
      "Alianças, nacionalismo, imperialismo, militarismo e a crise detonada pelo assassinato de Francisco Ferdinando."
  },
  {
    tipo: "Segunda Guerra",
    pergunta: "Quais acontecimentos mudaram o rumo da Segunda Guerra Mundial?",
    resposta: "Barbarossa, Pearl Harbor, Stalingrado, campanhas no Pacífico, Dia D e avanço aliado até Berlim."
  }
] satisfies PerguntaRevisao[];

export const periodosFiltro = [
  "Primeiras Civilizações",
  "Grécia Antiga",
  "Macedônia e Helenismo",
  "Roma Antiga",
  "Idade Média",
  "Renascimento",
  "Reforma e Grandes Navegações",
  "Absolutismo e Iluminismo",
  "Revoluções",
  "Era Napoleônica",
  "Revolução Industrial",
  "Imperialismo",
  "Primeira Guerra Mundial",
  "Período Entre Guerras",
  "Segunda Guerra Mundial"
] satisfies string[];

export const civilizacoesFiltro = [
  "Mesopotâmia",
  "Babilônia",
  "Egito",
  "Pérsia",
  "Grécia",
  "Esparta",
  "Atenas",
  "Macedônia",
  "Roma",
  "Império Bizantino",
  "Europa Medieval",
  "Império Otomano",
  "França",
  "Inglaterra",
  "Alemanha",
  "Itália",
  "Rússia",
  "Estados Unidos",
  "Japão"
] satisfies string[];

export const categoriasFiltro = [
  "guerra",
  "filosofia",
  "política",
  "religião",
  "mitologia",
  "ciência",
  "arte",
  "expansão",
  "revolução",
  "império",
  "tratados",
  "personagens"
] satisfies string[];
