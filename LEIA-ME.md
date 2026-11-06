# Acervo de Campanhas (2010 a 2026)

Site estático, sem dependência externa. Abre com dois cliques em `index.html` e roda em qualquer hospedagem.

## Conteúdo
- `index.html` — a página
- `assets/style.css` e `assets/app.js` — estilo e funcionamento
- `data/taxonomia.js` — as camadas de segmentação (mecanismo criativo, tipo de insight, canal, natureza, indústria, tema, risco, verba)
- `data/2010.js` até `data/2026.js` — 20 campanhas por ano, com a análise completa de cada uma

## Para publicar no GitHub Pages
1. Criar um repositório novo e subir todos estes arquivos na raiz.
2. Em Settings, Pages, escolher a branch principal e a pasta raiz.
3. O endereço sai em poucos minutos.

## Para acrescentar uma campanha
Abrir o arquivo do ano e copiar o bloco de uma ficha existente, trocando os campos. Os valores de `mecanismo`, `insight`, `canal`, `tipo`, `industria`, `tema`, `risco` e `verba` precisam existir em `data/taxonomia.js`, senão o filtro não reconhece.

## Origem do conteúdo
As campanhas vêm dos arquivos públicos de vencedores dos festivais (Cannes Lions, D&AD, One Show, Clube de Criação) e de listas editoriais públicas, creditadas em cada ficha. Os textos de análise são originais. Os filmes e peças pertencem às marcas, agências e produtoras creditadas.
