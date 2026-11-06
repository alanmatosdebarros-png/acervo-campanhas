/* Taxonomia do acervo. Cada camada existe para ser cruzada com as outras. */
window.TAXONOMIA = {
  mecanismo: {
    rotulo: "Mecanismo criativo",
    ajuda: "O movimento estrutural que faz a campanha funcionar, independente de marca ou mídia.",
    itens: [
      ["apropriacao-midia", "Apropriação de mídia", "A campanha ocupa um espaço que já existe e não foi feito para publicidade."],
      ["produto-midia", "Produto como mídia", "O próprio produto ou embalagem carrega a mensagem."],
      ["prova-publica", "Prova pública", "A marca se submete a um teste real, em público, com risco de falhar."],
      ["troca-contexto", "Troca de contexto", "Um elemento conhecido é deslocado para outro ambiente e muda de sentido."],
      ["dado-narrativa", "Dado como narrativa", "Uma base de dados é transformada em história ou em serviço."],
      ["servico-campanha", "Serviço como campanha", "A entrega é uma ferramenta, um produto ou uma infraestrutura que fica de pé depois."],
      ["mudanca-politica", "Mudança de política", "A marca altera contrato, preço, regra ou processo interno, e isso é a peça."],
      ["tabu-nomeado", "Tabu nomeado", "A campanha fala em voz alta o que a categoria evita dizer."],
      ["inversao-culpa", "Inversão de culpa", "A marca assume um defeito, uma crítica ou uma piada contra si."],
      ["cultura-fa", "Cultura de fã", "A campanha entra num território de fandom e devolve poder a quem já era fã."],
      ["tempo-real", "Oportunismo em tempo real", "A ideia depende de um acontecimento externo e de velocidade de resposta."],
      ["interface-nova", "Interface ou linguagem inventada", "A campanha cria um novo jeito de ler, ouvir, escrever ou navegar."],
      ["documental", "Documental real", "A peça se sustenta em pessoas e fatos reais, sem roteiro ficcional."],
      ["tecnologia-inedita", "Tecnologia inédita", "A ideia só existe porque uma tecnologia nova foi aplicada primeiro ali."],
      ["demonstracao-radical", "Demonstração radical", "Um atributo do produto é levado ao extremo até virar espetáculo."],
      ["artesania", "Artesania extrema", "O valor está no tempo e na mão de obra investidos, visíveis no resultado."],
      ["simbolo-publico", "Símbolo público", "A campanha instala um objeto ou gesto que a sociedade adota como símbolo."]
    ]
  },
  insight: {
    rotulo: "Tipo de insight",
    ajuda: "De onde veio a virada de chave.",
    itens: [
      ["cultural", "Cultural", "Um comportamento coletivo ou um momento da cultura."],
      ["categoria", "De categoria", "Uma convenção da própria categoria, usada a favor ou contra."],
      ["comportamental", "Comportamental", "Um hábito concreto de uso, compra ou consumo."],
      ["dado", "De dado", "Um padrão que só aparece quando se olha a base."],
      ["produto", "De produto", "Uma característica real do que se vende."],
      ["tensao-social", "De tensão social", "Uma desigualdade, um preconceito ou uma pauta pública."],
      ["marca", "De marca", "Um ativo histórico, um logo, um som, um arquivo."]
    ]
  },
  canal: {
    rotulo: "Canal de origem",
    ajuda: "Onde a ideia nasceu, não onde foi replicada depois.",
    itens: [
      ["filme", "Filme", ""], ["ooh", "Mídia exterior", ""], ["pr", "PR e imprensa", ""],
      ["social", "Social e creators", ""], ["produto", "Produto e embalagem", ""],
      ["retail", "Ponto de venda e e-commerce", ""], ["audio", "Áudio e rádio", ""],
      ["experiencia", "Experiência e ativação", ""], ["gaming", "Games", ""],
      ["print", "Impresso", ""], ["plataforma", "Plataforma e app", ""], ["design", "Design e identidade", ""]
    ]
  },
  tipo: {
    rotulo: "Natureza da campanha",
    ajuda: "O que estava em jogo.",
    itens: [
      ["marca", "Construção de marca", ""], ["produto", "Lançamento ou venda de produto", ""],
      ["servico", "Serviço ou utilidade", ""], ["causa", "Causa e interesse público", ""],
      ["institucional", "Institucional e B2B", ""], ["cultural", "Produto cultural", ""]
    ]
  },
  risco: {
    rotulo: "Nível de risco",
    ajuda: "O quanto a marca aceitou perder para a ideia existir.",
    itens: [
      ["baixo", "Baixo", "Nada que o jurídico ou o cliente perderiam o sono."],
      ["medio", "Médio", "Exigiu defender a ideia internamente."],
      ["alto", "Alto", "A marca expôs um defeito, mexeu no negócio ou entrou em terreno hostil."]
    ]
  },
  verba: {
    rotulo: "Escala de verba aparente",
    ajuda: "Estimativa de leitura, não dado de mídia.",
    itens: [
      ["enxuta", "Enxuta", "Dava para fazer com equipe pequena e pouca mídia."],
      ["media", "Média", "Produção séria, mídia localizada."],
      ["alta", "Alta", "Produção de alto padrão, celebridade ou mídia global."]
    ]
  },
  industria: {
    rotulo: "Indústria",
    ajuda: "",
    itens: [
      ["alimentos", "Alimentos", ""], ["bebidas", "Bebidas", ""], ["fastfood", "Fast food e restaurantes", ""],
      ["moda", "Moda e esporte", ""], ["beleza", "Beleza e higiene", ""], ["automotivo", "Automotivo", ""],
      ["tecnologia", "Tecnologia", ""], ["telecom", "Telecom", ""], ["financeiro", "Bancos e seguros", ""],
      ["varejo", "Varejo e marketplace", ""], ["saude", "Saúde e farma", ""], ["midia", "Mídia e entretenimento", ""],
      ["governo", "Governo e serviço público", ""], ["ong", "ONG e terceiro setor", ""],
      ["turismo", "Turismo e transporte", ""], ["casa", "Casa e limpeza", ""], ["educacao", "Educação", ""],
      ["b2b", "Indústria e B2B", ""], ["luxo", "Luxo", ""], ["games", "Games", ""]
    ]
  },
  tema: {
    rotulo: "Tema",
    ajuda: "",
    itens: [
      ["raca", "Raça", ""], ["genero", "Gênero", ""], ["lgbt", "LGBTQIA+", ""],
      ["acessibilidade", "Acessibilidade", ""], ["saude-mental", "Saúde mental", ""],
      ["clima", "Clima e sustentabilidade", ""], ["desigualdade", "Desigualdade e trabalho", ""],
      ["violencia", "Violência", ""], ["seguranca", "Segurança", ""], ["esporte", "Esporte", ""],
      ["musica", "Música", ""], ["humor", "Humor", ""], ["ia", "Inteligência artificial", ""],
      ["politica", "Política e democracia", ""], ["infancia", "Infância e família", ""],
      ["comida", "Comida", ""], ["fandom", "Fandom e cultura pop", ""], ["games", "Games e jogabilidade", ""], ["educacao", "Educação e formação", ""], ["dinheiro", "Dinheiro e consumo", ""],
      ["imprensa", "Imprensa e liberdade de expressão", ""], ["saude-publica", "Saúde pública", ""],
      ["artesania", "Artesania e craft", ""], ["moradia", "Moradia", ""], ["migracao", "Migração", ""]
    ]
  }
};
