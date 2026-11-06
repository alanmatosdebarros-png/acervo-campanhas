(function(){
"use strict";
var D = (window.ACERVO||[]).slice();
var T = window.TAXONOMIA||{};
var LISTA = document.getElementById('vista-lista');
var FICHA = document.getElementById('vista-ficha');
var GRADE = document.getElementById('grade');
var VAZIO = document.getElementById('vazio');
var BUSCA = document.getElementById('busca');

var CAMADAS = ['mecanismo','insight','canal','tipo','industria','tema','risco','verba'];
var estado = { anos:[], busca:'', br:false, ordem:'ano-desc' };
CAMADAS.forEach(function(k){ estado[k]=[]; });

function rot(camada, id){
  var g = T[camada]; if(!g) return id;
  for (var i=0;i<g.itens.length;i++) if(g.itens[i][0]===id) return g.itens[i][1];
  return id;
}
function arr(v){ return Array.isArray(v)?v:(v?[v]:[]); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

/* ---------- filtros ---------- */
function anosDisponiveis(){
  var s={}; D.forEach(function(c){ s[c.ano]=1; });
  return Object.keys(s).map(Number).sort(function(a,b){return b-a;});
}
function montaAnos(){
  var box = document.getElementById('f-anos');
  box.innerHTML = anosDisponiveis().map(function(a){
    return '<button class="ano-bt" type="button" data-ano="'+a+'" aria-pressed="false">'+a+'</button>';
  }).join('');
  box.addEventListener('click', function(e){
    var b = e.target.closest('[data-ano]'); if(!b) return;
    var a = Number(b.dataset.ano), i = estado.anos.indexOf(a);
    if(i<0) estado.anos.push(a); else estado.anos.splice(i,1);
    render();
  });
}
function usados(camada){
  var s={}; D.forEach(function(c){ arr(c[camada]).forEach(function(v){ s[v]=(s[v]||0)+1; }); });
  return s;
}
function montaGrupos(){
  var box = document.getElementById('f-grupos');
  box.innerHTML = CAMADAS.map(function(k){
    var g=T[k]; if(!g) return '';
    var cnt = usados(k);
    var itens = g.itens.filter(function(it){ return cnt[it[0]]; }).map(function(it){
      return '<label><input type="checkbox" data-camada="'+k+'" value="'+it[0]+'">'+esc(it[1])+
        ' <span class="q">('+cnt[it[0]]+')</span>'+(it[2]?'<small>'+esc(it[2])+'</small>':'')+'</label>';
    }).join('');
    return '<details class="grupo" data-g="'+k+'"><summary>'+esc(g.rotulo)+' <span class="q" data-cont="'+k+'"></span></summary>'+
      '<div class="painel">'+(g.ajuda?'<p class="ajuda">'+esc(g.ajuda)+'</p>':'')+itens+'</div></details>';
  }).join('');
  box.addEventListener('change', function(e){
    var el = e.target; if(!el.dataset.camada) return;
    var k = el.dataset.camada, v = el.value, i = estado[k].indexOf(v);
    if(el.checked){ if(i<0) estado[k].push(v); } else if(i>=0) estado[k].splice(i,1);
    render();
  });
  document.addEventListener('click', function(e){
    document.querySelectorAll('.grupo[open]').forEach(function(d){
      if(!d.contains(e.target)) d.removeAttribute('open');
    });
  });
}

/* ---------- filtro e ordem ---------- */
function alvoBusca(c){
  return [c.titulo,c.marca,c.agencia,c.pais,c.festival,c.premio,c.categoria,c.linha,
    c.contexto,c.problema,c.insightTexto,c.execucao,c.porque,c.replicavel,
    arr(c.mecanismo).map(function(m){return rot('mecanismo',m);}).join(' '),
    arr(c.tema).map(function(m){return rot('tema',m);}).join(' ')
  ].join(' ').toLowerCase();
}
function filtra(){
  var q = estado.busca.trim().toLowerCase();
  var termos = q? q.split(/\s+/):[];
  return D.filter(function(c){
    if(estado.anos.length && estado.anos.indexOf(c.ano)<0) return false;
    if(estado.br && !c.br) return false;
    for(var i=0;i<CAMADAS.length;i++){
      var k=CAMADAS[i]; if(!estado[k].length) continue;
      var vals = arr(c[k]);
      var ok = estado[k].some(function(v){ return vals.indexOf(v)>=0; });
      if(!ok) return false;
    }
    if(termos.length){
      var alvo = c._alvo || (c._alvo = alvoBusca(c));
      for(var j=0;j<termos.length;j++) if(alvo.indexOf(termos[j])<0) return false;
    }
    return true;
  });
}
function ordena(l){
  var o = estado.ordem;
  return l.sort(function(a,b){
    if(o==='ano-asc') return a.ano-b.ano || a.titulo.localeCompare(b.titulo,'pt');
    if(o==='marca') return a.marca.localeCompare(b.marca,'pt') || b.ano-a.ano;
    if(o==='agencia') return a.agencia.localeCompare(b.agencia,'pt') || b.ano-a.ano;
    return b.ano-a.ano || a.titulo.localeCompare(b.titulo,'pt');
  });
}

/* ---------- render lista ---------- */
function cartao(c){
  var tags = arr(c.mecanismo).slice(0,2).map(function(m){ return '<span class="tag mec">'+esc(rot('mecanismo',m))+'</span>'; });
  if(c.canal) tags.push('<span class="tag">'+esc(rot('canal',c.canal))+'</span>');
  if(c.br) tags.push('<span class="tag br">Brasil</span>');
  return '<button class="cartao" type="button" data-id="'+esc(c.id)+'">'+
    '<div class="c-topo"><span class="c-ano">'+c.ano+'</span><span>'+esc(c.premio||'')+'</span></div>'+
    '<h2 class="c-tit">'+esc(c.titulo)+'</h2>'+
    '<div class="c-marca"><b>'+esc(c.marca)+'</b> &middot; '+esc(c.agencia)+'</div>'+
    '<p class="c-linha">'+esc(c.linha)+'</p>'+
    '<div class="c-tags">'+tags.join('')+'</div></button>';
}
function render(){
  var l = ordena(filtra());
  GRADE.innerHTML = l.map(cartao).join('');
  VAZIO.hidden = l.length>0;
  document.getElementById('contador').textContent =
    l.length + (l.length===1? ' campanha':' campanhas') + (l.length!==D.length? ' de '+D.length:'');
  document.querySelectorAll('.ano-bt').forEach(function(b){
    b.setAttribute('aria-pressed', estado.anos.indexOf(Number(b.dataset.ano))>=0 ? 'true':'false');
  });
  CAMADAS.forEach(function(k){
    var el = document.querySelector('[data-cont="'+k+'"]');
    if(el) el.textContent = estado[k].length? '('+estado[k].length+')':'';
  });
  var chips=[];
  estado.anos.slice().sort().forEach(function(a){ chips.push('<button class="chip-at" data-tira-ano="'+a+'">'+a+'</button>'); });
  CAMADAS.forEach(function(k){ estado[k].forEach(function(v){
    chips.push('<button class="chip-at" data-tira="'+k+'|'+v+'">'+esc(rot(k,v))+'</button>');
  }); });
  if(estado.br) chips.push('<button class="chip-at" data-tira-br="1">Só Brasil</button>');
  document.getElementById('chips-ativos').innerHTML = chips.join('');
}

/* ---------- ficha ---------- */
function bloco(tit, txt){
  if(!txt) return '';
  var paras = String(txt).split(/\n\n+/).map(function(p){ return '<p>'+esc(p)+'</p>'; }).join('');
  return '<section class="f-bloco"><h2>'+tit+'</h2>'+paras+'</section>';
}
function linhaLado(a,b){ return '<div class="lado-linha"><span>'+a+'</span><span>'+esc(b)+'</span></div>'; }
function abreFicha(id){
  var c = D.filter(function(x){ return x.id===id; })[0];
  if(!c){ fechaFicha(); return; }
  var tagsLado = CAMADAS.filter(function(k){ return k!=='risco'&&k!=='verba'; }).reduce(function(acc,k){
    arr(c[k]).forEach(function(v){ acc.push('<span class="tag'+(k==='mecanismo'?' mec':'')+'">'+esc(rot(k,v))+'</span>'); });
    return acc;
  },[]).join('');
  var fontes = arr(c.fontes).map(function(f){
    return '<li>'+(f.u? '<a href="'+esc(f.u)+'" target="_blank" rel="noopener">'+esc(f.t)+'</a>':esc(f.t))+'</li>';
  }).join('');
  var busca = 'https://www.youtube.com/results?search_query='+encodeURIComponent(c.titulo+' '+c.marca+' '+(c.agencia||''));
  var vizinhas = ordena(D.filter(function(x){
    return x.id!==c.id && arr(x.mecanismo).some(function(m){ return arr(c.mecanismo).indexOf(m)>=0; });
  })).slice(0,3).map(cartao).join('');

  FICHA.innerHTML =
    '<button class="volta" type="button" data-volta>&larr; Voltar ao acervo</button>'+
    '<div class="f-cab">'+
      '<div class="f-meta"><b>'+c.ano+'</b> &middot; '+esc(c.festival)+' &middot; '+esc(c.premio)+(c.categoria?' &middot; '+esc(c.categoria):'')+'</div>'+
      '<h1>'+esc(c.titulo)+'</h1>'+
      '<p class="f-cred"><b>'+esc(c.marca)+'</b> &middot; '+esc(c.agencia)+' &middot; '+esc(c.pais)+'</p>'+
    '</div>'+
    '<div class="f-corpo"><div>'+
      bloco('Em uma linha', c.linha)+
      bloco('Contexto', c.contexto)+
      bloco('Problema de negócio', c.problema)+
      bloco('O insight', c.insightTexto)+
      bloco('Execução', c.execucao)+
      bloco('Por que ganhou', c.porque)+
      bloco('O que dá para levar', c.replicavel)+
    '</div><aside class="f-lado">'+
      '<a class="bt-link" href="'+esc(busca)+'" target="_blank" rel="noopener">Ver o filme no YouTube</a>'+
      '<div class="lado-caixa"><h3>Classificação</h3>'+
        linhaLado('Indústria', arr(c.industria).map(function(v){return rot('industria',v);}).join(', '))+
        linhaLado('Natureza', arr(c.tipo).map(function(v){return rot('tipo',v);}).join(', '))+
        linhaLado('Canal de origem', rot('canal',c.canal))+
        linhaLado('Tipo de insight', arr(c.insight).map(function(v){return rot('insight',v);}).join(', '))+
        linhaLado('Risco', rot('risco',c.risco))+
        linhaLado('Verba aparente', rot('verba',c.verba))+
      '</div>'+
      '<div class="lado-caixa"><h3>Camadas</h3><div class="lado-tags">'+tagsLado+'</div></div>'+
      (fontes? '<div class="lado-caixa fontes"><h3>Fontes</h3><ul>'+fontes+'</ul></div>':'')+
    '</aside></div>'+
    (vizinhas? '<div class="vizinhas"><h2>Mesmo mecanismo</h2><div class="grade">'+vizinhas+'</div></div>':'');

  LISTA.hidden = true; FICHA.hidden = false;
  document.title = c.titulo+' · Acervo de Campanhas';
  window.scrollTo(0,0);
}
function fechaFicha(){
  FICHA.hidden = true; FICHA.innerHTML=''; LISTA.hidden = false;
  document.title = 'Acervo de Campanhas';
}

/* ---------- eventos ---------- */
document.addEventListener('click', function(e){
  var cartaoEl = e.target.closest('.cartao');
  if(cartaoEl){ location.hash = '#c/'+cartaoEl.dataset.id; return; }
  if(e.target.closest('[data-volta]')){ history.length>1? history.back() : (location.hash=''); return; }
  if(e.target.closest('[data-home]')){ e.preventDefault(); location.hash=''; return; }
  var t = e.target.closest('[data-tira]');
  if(t){ var p=t.dataset.tira.split('|'); var i=estado[p[0]].indexOf(p[1]); if(i>=0) estado[p[0]].splice(i,1);
    var cb=document.querySelector('[data-camada="'+p[0]+'"][value="'+p[1]+'"]'); if(cb) cb.checked=false; render(); return; }
  var ta = e.target.closest('[data-tira-ano]');
  if(ta){ var a=Number(ta.dataset.tiraAno), j=estado.anos.indexOf(a); if(j>=0) estado.anos.splice(j,1); render(); return; }
  if(e.target.closest('[data-tira-br]')){ estado.br=false; document.getElementById('f-br').checked=false; render(); return; }
});
BUSCA.addEventListener('input', function(){
  estado.busca = BUSCA.value;
  document.getElementById('limpa-busca').hidden = !BUSCA.value;
  render();
});
document.getElementById('limpa-busca').addEventListener('click', function(){
  BUSCA.value=''; estado.busca=''; this.hidden=true; render(); BUSCA.focus();
});
document.getElementById('f-br').addEventListener('change', function(){ estado.br=this.checked; render(); });
document.getElementById('ordem').addEventListener('change', function(){ estado.ordem=this.value; render(); });
document.getElementById('zera').addEventListener('click', function(){
  estado.anos=[]; estado.br=false; estado.busca=''; BUSCA.value='';
  CAMADAS.forEach(function(k){ estado[k]=[]; });
  document.querySelectorAll('.painel input:checked').forEach(function(i){ i.checked=false; });
  document.getElementById('f-br').checked=false;
  document.getElementById('limpa-busca').hidden=true;
  render();
});
var bt = document.getElementById('btn-tema');
try{ var salvo = localStorage.getItem('acervo-tema'); if(salvo) document.documentElement.dataset.theme = salvo; }catch(_){}
bt.addEventListener('click', function(){
  var atual = document.documentElement.dataset.theme;
  var escuroAgora = atual==='dark' || (!atual && matchMedia('(prefers-color-scheme: dark)').matches);
  var novo = escuroAgora? 'light':'dark';
  document.documentElement.dataset.theme = novo;
  try{ localStorage.setItem('acervo-tema', novo); }catch(_){}
});
function rota(){
  var h = location.hash||'';
  if(h.indexOf('#c/')===0) abreFicha(decodeURIComponent(h.slice(3)));
  else fechaFicha();
}
window.addEventListener('hashchange', rota);

montaAnos(); montaGrupos(); render(); rota();
})();
