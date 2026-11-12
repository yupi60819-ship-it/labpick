(function () {
  'use strict';
  const C=window.LabPickCore, makers=window.LABPICK_MAKERS, builtins=window.LABPICK_PRODUCTS;
  const makerMap=new Map(makers.map(m=>[m.id,m])), h=C.escape, $=s=>document.querySelector(s);
  const storageKey='labpick.personal.v1', historyKey='labpick.history.v1';
  const filterDefs=[['category','カテゴリ'],['maker','メーカー'],['applications','アプリケーション'],['host','宿主'],['reactivity','交差性'],['clonality','クローナリティ'],['conjugate','標識']];
  const views=['catalog','launcher','my','purchase','tools'];
  const blankPersonal=()=>({version:1,myProducts:[],favorites:[],purchases:[]});
  let storageFailed=false, initialWarning='', personal=blankPersonal(), history=[];
  function readStorage(key) {try{return localStorage.getItem(key);}catch{storageFailed=true;return null;}}
  function writeStorage(key,value) {try{localStorage.setItem(key,JSON.stringify(value));}catch{storageFailed=true;$('#storage-warning').hidden=false;}}
  try {const raw=readStorage(storageKey);if(raw) personal=C.validateBackup(JSON.parse(raw),makers,builtins);}catch{initialWarning='保存データの形式が不正です。初期状態で表示しています。JSON バックアップがあればデータ管理から復元できます。';}
  try {const raw=readStorage(historyKey);if(raw){const value=JSON.parse(raw);if(Array.isArray(value))history=value.filter(s=>typeof s==='string'&&s.length<=500).slice(0,10);}}catch{/* Broken history never prevents startup. */}
  const state={view:'catalog',q:'',filters:{},favoriteOnly:false,myOnly:false,sort:'relevance',layout:'cards',compare:[],limit:24,detail:''};
  let searchTimer, historyTimer, toastTimer, suggestionsIndex=-1, lastFocus=null, modalKind='', pendingImport=null, importGeneration=0;
  let launcherQuery='', launcherSelection=new Set();
  const modal=$('#modal');
  function products(){return [...builtins,...personal.myProducts.map(p=>({...p,_custom:true}))];}
  function findProduct(id){return products().find(p=>p.id===id);}
  function makerFor(p){return makerMap.get(p.maker);}
  function save(){writeStorage(storageKey,personal);}
  function icon(id){return '<svg class="icon" aria-hidden="true"><use href="#i-'+id+'"/></svg>';}
  function categoryIcon(p){return ['primary','secondary','tag','isotype'].includes(p.category)?'antibody':'flask';}
  function toast(message){const el=$('#toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,4200);}
  function money(value){return new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:2}).format(value);}
  function number(value){return Number(value.toPrecision(8)).toLocaleString('ja-JP',{maximumSignificantDigits:8});}
  function array(value){return Array.isArray(value)?value:[];}
  function fieldValue(p,key){if(key==='maker')return makerFor(p).name;if(key==='category')return C.categories[p.category];const value=p[key];return Array.isArray(value)?value.join(' / '):value||'未収録';}
  function badge(p){const m=makerFor(p);return '<span class="maker-badge" style="--maker-color:'+h(m.color)+'">'+C.highlight(m.name,state.q)+'</span>'+ (p._custom?'<span class="custom-badge">マイ試薬</span>':'');}
  function safeLink(url,label,className='button'){const safe=C.safeUrl(url);return safe?'<a class="'+h(className)+'" href="'+h(safe)+'" target="_blank" rel="noopener noreferrer">'+h(label)+' ↗</a>':'';}
  function productLink(p){return window.LABPICK_LINKS.product(makerFor(p),p);}
  function relatedProducts(p){const antibody=['primary','tag'].includes(p.category);return products().filter(o=>o.id!==p.id&&o.maker!==p.maker&&C.normalize(o.target)===C.normalize(p.target)&&(antibody?['primary','tag'].includes(o.category):o.category===p.category));}
  function externalSearch(makerId,q,label){return safeLink(window.LABPICK_LINKS.search(makerMap.get(makerId),q),label);}
  function addHistory(q){q=q.trim();if(!q)return;history=[q,...history.filter(s=>s!==q)].slice(0,10);writeStorage(historyKey,history);renderHistory();}
  function renderHistory(){$('#history-row').hidden=!history.length;$('#history-chips').innerHTML=history.map(q=>'<button type="button" class="chip" data-act="search-chip" data-query="'+h(q)+'">'+h(q)+'</button>').join('');}
  function matches(p,except=''){
    for(const [key] of filterDefs){const selected=state.filters[key];if(key===except||!selected)continue;const v=p[key];if(Array.isArray(v)?!v.includes(selected):v!==selected)return false;}
    if(except!=='favorite'&&state.favoriteOnly&&!personal.favorites.includes(p.id))return false;
    if(except!=='my'&&state.myOnly&&!p._custom)return false;
    return true;
  }
  function queried(){return products().map(p=>({p,score:C.score(p,state.q,makerFor(p))})).filter(row=>row.score>0);}
  function renderFilters(rows){
    $('#filter-fields').innerHTML=filterDefs.map(([key,label])=>{
      const options=new Set();for(const p of products()){const value=p[key];if(Array.isArray(value))value.forEach(v=>options.add(v));else if(value)options.add(value);}
      const available=rows.map(r=>r.p).filter(p=>matches(p,key));
      const labelFor=v=>key==='category'?C.categories[v]:key==='maker'?makerMap.get(v).name:v;
      return '<label class="filter-field">'+h(label)+'<select data-filter="'+h(key)+'" aria-label="'+h(label)+'"><option value="">すべて ('+available.length+')</option>'+[...options].sort((a,b)=>labelFor(a).localeCompare(labelFor(b),'ja')).map(v=>{
        const count=available.filter(p=>Array.isArray(p[key])?p[key].includes(v):p[key]===v).length;
        return '<option value="'+h(v)+'"'+(state.filters[key]===v?' selected':'')+'>'+h(labelFor(v))+' ('+count+')</option>';
      }).join('')+'</select></label>';
    }).join('');
    $('#filter-favorites').checked=state.favoriteOnly;$('#filter-my').checked=state.myOnly;
    $('#favorite-total').textContent=rows.filter(r=>matches(r.p,'favorite')&&personal.favorites.includes(r.p.id)).length;
    $('#my-total').textContent=rows.filter(r=>matches(r.p,'my')&&r.p._custom).length;
  }
  function renderCategoryChips(rows){
    const choices=[['','すべて'],['primary','一次抗体'],['secondary','二次抗体'],['tag','タグ抗体'],['kit','キット'],['reagent','一般試薬']];
    $('#category-chips').innerHTML=choices.map(([value,label])=>{
      const n=rows.filter(r=>matches(r.p,'category')&&(!value||r.p.category===value)).length;
      return '<button type="button" class="category-chip'+((state.filters.category||'')===value?' active':'')+'" data-act="category" data-category="'+value+'" aria-pressed="'+((state.filters.category||'')===value)+'">'+(value==='primary'?icon('antibody'):value==='reagent'?icon('flask'):'')+h(label)+' <span>'+n+'</span></button>';
    }).join('');
  }
  function renderActive(){
    const active=filterDefs.filter(([key])=>state.filters[key]).map(([key,label])=>{
      const v=state.filters[key];return '<button type="button" data-act="remove-filter" data-key="'+h(key)+'">'+h(label)+': '+h(key==='category'?C.categories[v]:key==='maker'?makerMap.get(v)?.name||v:v)+' ×</button>';
    });
    if(state.favoriteOnly)active.push('<button type="button" data-act="remove-filter" data-key="favorite">お気に入り ×</button>');
    if(state.myOnly)active.push('<button type="button" data-act="remove-filter" data-key="my">マイ試薬 ×</button>');
    $('#active-filters').innerHTML=active.join('');
    $('#filter-applied-count').textContent=Object.values(state.filters).filter(Boolean).length+Number(state.favoriteOnly)+Number(state.myOnly);
  }
  function card(p){
    const favorite=personal.favorites.includes(p.id), compared=state.compare.includes(p.id), purchased=personal.purchases.some(r=>r.id===p.id);
    return '<article class="product-card'+(compared?' is-compared':'')+'" data-product="'+h(p.id)+'"><div class="card-top"><span class="category-label">'+icon(categoryIcon(p))+h(C.categories[p.category])+'</span><button type="button" class="favorite-button" data-act="favorite" data-id="'+h(p.id)+'" aria-label="'+h(p.catalog)+' をお気に入り'+(favorite?'から解除':'に追加')+'" aria-pressed="'+favorite+'">'+(favorite?'★':'☆')+'</button></div><span class="catalog-label"># '+C.highlight(p.catalog,state.q)+'</span><h3><button type="button" class="product-name" data-act="detail" data-id="'+h(p.id)+'">'+C.highlight(p.name,state.q)+'</button></h3><div>'+badge(p)+'</div><dl class="card-specs"><dt>ターゲット</dt><dd>'+C.highlight(p.target,state.q)+'</dd><dt>'+(['primary','secondary','tag','isotype'].includes(p.category)?'宿主 / クローン':'容量')+'</dt><dd>'+(['primary','secondary','tag','isotype'].includes(p.category)?h([p.host,p.clone].filter(Boolean).join(' / ')||'未収録'):h(p.size||'未収録'))+'</dd></dl><div class="card-tags">'+(p.applications||[]).map(a=>'<span class="tag">'+h(a)+'</span>').join('')+(p.conjugate&&p.conjugate!=='Unconjugated'?'<span class="tag">'+h(p.conjugate)+'</span>':'')+'</div><div class="card-actions"><label class="compare-label"><input type="checkbox" data-compare="'+h(p.id)+'"'+(compared?' checked':'')+' aria-label="'+h(p.catalog)+' を比較">比較する</label><button type="button" class="button'+(purchased?' in-list':'')+'" data-act="purchase-add" data-id="'+h(p.id)+'">'+icon('bag')+(purchased?'追加済み':'購入リストへ')+'</button></div></article>';
  }
  function resultTable(list){return '<div class="table-scroll"><table class="results-table"><thead><tr><th>カタログ番号</th><th>製品名 / ターゲット</th><th>メーカー</th><th>宿主</th><th>用途</th><th>リスト</th></tr></thead><tbody>'+list.map(p=>'<tr><td><span class="catalog-label">'+C.highlight(p.catalog,state.q)+'</span></td><td><button type="button" class="product-name" data-act="detail" data-id="'+h(p.id)+'">'+C.highlight(p.name,state.q)+'</button><small>'+C.highlight(p.target,state.q)+'</small></td><td>'+badge(p)+'</td><td>'+h(p.host||'未収録')+'</td><td>'+h((p.applications||[]).join(' / ')||'未収録')+'</td><td><div class="table-actions"><button type="button" class="favorite-button" data-act="favorite" data-id="'+h(p.id)+'" aria-pressed="'+personal.favorites.includes(p.id)+'" aria-label="'+h(p.catalog)+' のお気に入りを切り替え">'+(personal.favorites.includes(p.id)?'★':'☆')+'</button><label class="compare-label"><input type="checkbox" data-compare="'+h(p.id)+'"'+(state.compare.includes(p.id)?' checked':'')+'>比較</label><button type="button" class="button" data-act="purchase-add" data-id="'+h(p.id)+'">'+(personal.purchases.some(r=>r.id===p.id)?'追加済み':'＋ 購入')+'</button></div></td></tr>').join('')+'</tbody></table></div>';}
  function empty(title,message,actions=''){return '<div class="empty-state">'+icon('flask')+'<h3>'+h(title)+'</h3><p>'+h(message)+'</p><div class="button-row">'+actions+'</div></div>';}
  function renderCatalog(){
    const rows=queried();renderFilters(rows);renderCategoryChips(rows);renderActive();
    let matchesRows=rows.filter(r=>matches(r.p));
    matchesRows.sort((a,b)=>state.sort==='relevance' ? b.score-a.score : fieldValue(a.p,state.sort).localeCompare(fieldValue(b.p,state.sort),'ja',{numeric:true}));
    $('#result-count').innerHTML='<strong>'+matchesRows.length+'</strong> 件の製品'+(state.q?' <span>「'+h(state.q)+'」</span>':'');
    const list=matchesRows.slice(0,state.limit).map(r=>r.p);
    $('#results').innerHTML=list.length?(state.layout==='table'?resultTable(list):'<div class="product-grid">'+list.map(card).join('')+'</div>'):empty('ぴったりの試薬は、まだカタログの外かも。','キーワードや絞り込みを変えるか、メーカー公式サイトを検索してみてください。','<button type="button" class="button primary" data-view="launcher">メーカー横断検索へ</button><button type="button" class="button" data-act="reset">絞り込みをリセット</button>');
    $('#load-more').hidden=list.length>=matchesRows.length;$('#load-more').textContent='もっと見る（残り '+(matchesRows.length-list.length)+' 件）';
    $('#cards-mode').setAttribute('aria-pressed',state.layout==='cards');$('#table-mode').setAttribute('aria-pressed',state.layout==='table');$('#sort').value=state.sort;
    $('#catalog-total').textContent=builtins.length;$('#maker-total').textContent=makers.length;
  }
  function renderTray(){
    state.compare=state.compare.filter(id=>findProduct(id)).slice(0,4);
    const tray=$('#compare-tray');tray.hidden=!state.compare.length;document.body.classList.toggle('has-tray',!!state.compare.length);
    tray.innerHTML='<strong>比較リスト <span>'+state.compare.length+' / 4</span></strong><div class="tray-products">'+state.compare.map(id=>{const p=findProduct(id);return '<div class="tray-item" title="'+h(p.name)+'"><span>'+h(p.catalog)+'</span><button type="button" data-act="compare-remove" data-id="'+h(id)+'" aria-label="'+h(p.catalog)+' を比較から外す">×</button></div>';}).join('')+'</div><button type="button" class="text-button" data-act="compare-clear">すべて解除</button><button type="button" class="button primary" data-act="compare-open"'+(state.compare.length<2?' disabled':'')+'>比較する</button>';
  }
  function renderPurchase(){
    $('#purchase-count').textContent=personal.purchases.length;
    if(!personal.purchases.length){$('#purchase-products').innerHTML=empty('次の実験に必要なものを。','カタログから「購入リストへ」を押すと、ここに製品が並びます。','<button type="button" class="button primary" data-view="catalog">試薬を探す</button>');return;}
    $('#purchase-products').innerHTML='<div class="table-scroll"><table class="purchase-table"><thead><tr><th>製品</th><th>メーカー / 番号</th><th>数量</th><th>見積単価（円）</th><th>小計</th><th>メモ</th><th><span class="sr-only">削除</span></th></tr></thead><tbody>'+personal.purchases.map(row=>{
      const p=findProduct(row.id);return '<tr data-purchase="'+h(p.id)+'"><td><button type="button" class="product-name" data-act="detail" data-id="'+h(p.id)+'">'+h(p.name)+'</button></td><td>'+badge(p)+'<br><span class="catalog-label">'+h(p.catalog)+'</span></td><td><label><span class="sr-only">'+h(p.catalog)+' 数量</span><input type="number" name="quantity" min="1" max="100000" step="1" required value="'+row.quantity+'"></label><span class="print-only" data-print="quantity">'+row.quantity+'</span></td><td><label><span class="sr-only">'+h(p.catalog)+' 見積単価（円）</span><input type="number" name="quote" min="0" max="1000000000000" step="any" placeholder="未入力" value="'+(row.quote===null?'':row.quote)+'"></label><span class="print-only" data-print="quote">'+(row.quote===null?'未入力':h(money(row.quote)))+'</span></td><td class="money" data-subtotal>'+h(row.quote===null?'未入力':money(row.quantity*row.quote))+'</td><td><label><span class="sr-only">'+h(p.catalog)+' メモ</span><input name="memo" maxlength="4000" value="'+h(row.memo)+'" placeholder="用途や見積番号など"></label><span class="print-only" data-print="memo">'+h(row.memo)+'</span></td><td><button type="button" class="icon-button" data-act="purchase-remove" data-id="'+h(p.id)+'" aria-label="'+h(p.catalog)+' を購入リストから削除">×</button></td></tr>';
    }).join('')+'</tbody></table></div><div id="purchase-total" class="purchase-total"></div>';renderTotal();
  }
  function renderTotal(){const node=$('#purchase-total');if(!node)return;const total=personal.purchases.reduce((n,r)=>n+(r.quote===null?0:r.quantity*r.quote),0),missing=personal.purchases.filter(r=>r.quote===null).length;node.innerHTML='<span>見積合計 <small>（税込・税別は入力した見積に準じます）</small></span><strong>'+h(money(total))+'</strong><small>'+ (missing?'未入力 '+missing+' 件を除く':'全 '+personal.purchases.length+' 件')+'</small>';}
  function renderMy(){
    const list=products().filter(p=>p._custom);
    $('#my-products').innerHTML=list.length?'<div class="my-grid">'+list.map(p=>'<div class="my-item">'+card(p)+'<div class="my-edit-actions"><button type="button" data-act="my-edit" data-id="'+h(p.id)+'">編集</button><button type="button" data-act="my-delete" data-id="'+h(p.id)+'">削除</button></div></div>').join('')+'</div>':empty('あなたのラボの定番を、ここに。','自分で追加した製品も、検索・比較・購入リストに使えます。','<button type="button" class="button primary" data-act="my-new">＋ 最初の試薬を追加する</button>');
  }
  function renderLauncher(){
    $('#launcher-query').value=launcherQuery;
    $('#launcher-selected').textContent=launcherSelection.size+' サイトを選択';
    const groups=[['海外メーカー',m=>m.type==='maker'&&m.country==='海外'],['国内メーカー',m=>m.type==='maker'&&m.country==='JP'],['国内代理店',m=>m.type==='distributor'],['集約・文献サイト',m=>m.type==='aggregator']];
    $('#launcher-results').innerHTML=groups.map(([label,predicate])=>{const group=makers.filter(predicate);return '<section class="launcher-group"><h2>'+h(label)+' <small>'+group.length+' SITES</small></h2><div class="maker-grid">'+group.map(m=>'<article class="maker-card"><label><input type="checkbox" data-site="'+h(m.id)+'" aria-label="'+h(m.name)+' を選択"'+(launcherSelection.has(m.id)?' checked':'')+'></label><div>'+safeLink(launcherQuery.trim()?window.LABPICK_LINKS.search(m,launcherQuery.trim()):m.homepage,m.name,'')+'<small>'+h(m.nameJa||'')+'</small><small>'+(!launcherQuery.trim()?'キーワードを入力して検索':m.viaGoogle?'Google 経由':'検索リンク')+'</small>'+safeLink(m.homepage,'公式トップ','homepage')+'</div></article>').join('')+'</div></section>';}).join('');
  }
  function syncHash(){
    const params=new URLSearchParams();if(state.q)params.set('q',state.q);
    if(Object.keys(state.filters).length)params.set('f',JSON.stringify(state.filters));if(state.favoriteOnly)params.set('fav','1');if(state.myOnly)params.set('my','1');
    if(state.compare.length)params.set('compare',state.compare.join(','));if(state.detail)params.set('product',state.detail);
    if(state.view!=='catalog')params.set('view',state.view);if(state.sort!=='relevance')params.set('sort',state.sort);if(state.layout!=='cards')params.set('layout',state.layout);
    if(state.view==='launcher'&&launcherQuery!==state.q)params.set('launch',launcherQuery);
    const next=params.toString()?'#'+params.toString():'';
    if(location.hash!==next){try{window.history.replaceState(null,'',location.pathname+location.search+next);}catch{/* Some file viewers disallow history. Share still builds the current URL. */}}
    return next;
  }
  function readHash(){
    const params=new URLSearchParams(location.hash.slice(1));state.q=(params.get('q')||'').slice(0,500);state.filters={};
    try{const f=JSON.parse(params.get('f')||'{}');if(f&&typeof f==='object'&&!Array.isArray(f))for(const [key] of filterDefs){if(typeof f[key]==='string'&&products().some(p=>Array.isArray(p[key])?p[key].includes(f[key]):p[key]===f[key]))state.filters[key]=f[key];}}catch{/* Ignore malformed URL state. */}
    state.favoriteOnly=params.get('fav')==='1';state.myOnly=params.get('my')==='1';state.compare=[...new Set((params.get('compare')||'').split(',').filter(id=>findProduct(id)))].slice(0,4);
    state.view=views.includes(params.get('view'))?params.get('view'):'catalog';state.sort=['relevance','maker','name','catalog'].includes(params.get('sort'))?params.get('sort'):'relevance';state.layout=params.get('layout')==='table'?'table':'cards';
    state.detail=findProduct(params.get('product'))?params.get('product'):'';state.limit=24;launcherQuery=(params.get('launch')??state.q).slice(0,500);$('#search').value=state.q;
  }
  function render(){renderCatalog();renderTray();renderPurchase();renderMy();for(const v of views)$('#view-'+v).hidden=state.view!==v;document.querySelectorAll('.main-nav [data-view]').forEach(el=>{el.classList.toggle('active',el.dataset.view===state.view);if(el.dataset.view===state.view)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});if(state.view==='launcher')renderLauncher();syncHash();}
  function navigate(view){if(!views.includes(view))return;if(state.view==='catalog'){clearTimeout(searchTimer);state.q=$('#search').value.slice(0,500);if(view==='launcher')launcherQuery=state.q;}state.view=view;closeModal(false);render();window.scrollTo({top:0,behavior:'auto'});$('#main').focus({preventScroll:true});}
  function showModal(kind,html){
    if(!modal.open){lastFocus=document.activeElement;modal.showModal();}
    modalKind=kind;$('#modal-body').innerHTML=html;modal.scrollTop=0;
    const first=modal.querySelector('#modal-title');if(first){first.tabIndex=-1;first.focus();}
  }
  function closeModal(restore=true,update=true){if(modal.open)modal.close();state.detail='';modalKind='';pendingImport=null;importGeneration++;if(update)syncHash();if(restore&&lastFocus?.isConnected)lastFocus.focus({preventScroll:true});}
  function showDetail(id){
    const p=findProduct(id);if(!p)return;state.detail=id;
    const m=makerFor(p),link=productLink(p);
    const specs=[['カタログ番号',p.catalog],['メーカー',m.name],['カテゴリ',C.categories[p.category]],['ターゲット',p.target],['遺伝子',p.gene],['別名',p.aliases],['宿主',p.host],['クローナリティ',p.clonality],['クローン',p.clone],['アイソタイプ',p.isotype],['標識',p.conjugate],['交差性',p.reactivity],['用途',p.applications],['容量',p.size],['保存',p.storage],['二次抗体の認識対象',p.secondaryFor],['製品 id',p.id]];
    const others=relatedProducts(p);
    const secondaries=C.compatibleSecondaries(p,builtins);
    const related=list=>'<div class="related-list">'+list.map(o=>'<button type="button" class="related-button" data-act="detail" data-id="'+h(o.id)+'"><small>'+h(makerFor(o).name)+' · '+h(o.catalog)+'</small>'+h(o.name)+'</button>').join('')+'</div>';
    showModal('detail','<p class="eyebrow modal-kicker">'+(p._custom?'マイ試薬':'内蔵カタログ')+'</p><span class="catalog-label"># '+h(p.catalog)+'</span><h2 class="modal-title" id="modal-title">'+h(p.name)+'</h2><p class="modal-subtitle">'+h(m.name)+'</p><div class="button-row"><button type="button" class="button" data-act="favorite" data-id="'+h(id)+'">'+(personal.favorites.includes(id)?'★ お気に入り登録済み':'☆ お気に入りに追加')+'</button><button type="button" class="button" data-act="compare-add" data-id="'+h(id)+'">'+(state.compare.includes(id)?'✓ 比較に追加済み':'＋ 比較する')+'</button><button type="button" class="button primary" data-act="purchase-add" data-id="'+h(id)+'">購入リストへ</button><button type="button" class="button" data-act="share">'+icon('link')+'共有</button></div><dl class="spec-grid">'+specs.map(([label,value])=>'<div class="spec-row"><dt>'+h(label)+'</dt><dd>'+h(Array.isArray(value)?value.join(' / '):value||'未収録')+'</dd></div>').join('')+'</dl>'+(p.note?'<p class="detail-note">'+h(p.note)+'</p>':'')+'<p class="data-note">未収録の項目を推測で補完していません。交差性・用途は確認できた一部の情報です。</p><section class="modal-section"><h3>公式情報・文献を確認する</h3><div class="detail-links">'+safeLink(link.url,link.direct?'メーカー商品ページを開く':'メーカーサイトで検索')+(p.datasheetUrl?safeLink(p.datasheetUrl,'データシート (PDF)'):'')+(p.verificationUrl?safeLink(p.verificationUrl,'確認に使用した公式資料'):'')+externalSearch('citeab',m.name+' '+p.catalog,'CiteAb で引用実績を見る')+externalSearch('pubmed',m.name+' '+p.catalog,'PubMed で検索')+externalSearch('scholar',m.name+' '+p.catalog,'Google Scholar')+externalSearch('cosmo',p.catalog,'コスモ・バイオ')+externalSearch('funakoshi',p.catalog,'フナコシ')+'</div></section><section class="modal-section"><h3>製品情報をコピー</h3><div class="button-row"><button type="button" class="button" data-act="copy-catalog" data-id="'+h(id)+'">カタログ番号</button><button type="button" class="button" data-act="copy-methods" data-id="'+h(id)+'">Methods 用表記</button><button type="button" class="button" data-act="copy-product" data-id="'+h(id)+'">製品情報一式</button></div></section><section class="modal-section"><h3>同じターゲットの他社製品</h3>'+(others.length?related(others)+'<button type="button" class="button" data-act="compare-related" data-id="'+h(id)+'">この製品と他社製品を比較に追加（最大4件）</button>':'<p class="modal-subtitle">他社製品はまだ収録していません。横断検索で探せます。</p><button type="button" class="button" data-act="target-launch" data-query="'+h(p.target)+'">'+h(p.target)+' を横断検索</button>')+'</section>'+(['primary','tag'].includes(p.category)?'<section class="modal-section"><h3>この抗体に合う二次抗体の候補</h3>'+(secondaries.length?'<p class="modal-subtitle">宿主 '+h(p.host)+' と IgG 認識に基づく候補です。交差吸収・用途・試料種・標識を公式仕様で確認してください。</p>'+related(secondaries):'<p class="modal-subtitle">適合する候補を提示できません。IgM / IgA の抗体や標識済み抗体は IgG 用二次抗体の候補から除外しています。未収録のアイソタイプは公式で確認してください。</p>')+'</section>':'')+(p._custom?'<div class="modal-section"><button type="button" class="button" data-act="my-edit" data-id="'+h(id)+'">このマイ試薬を編集</button></div>':''));syncHash();
  }
  const compareFields=[['メーカー','maker'],['カタログ番号','catalog'],['カテゴリ','category'],['ターゲット','target'],['遺伝子','gene'],['宿主','host'],['クローナリティ','clonality'],['クローン','clone'],['アイソタイプ','isotype'],['標識','conjugate'],['交差性','reactivity'],['用途','applications'],['容量','size'],['保存','storage'],['メモ','note']];
  function compareRows(){const list=state.compare.map(findProduct).filter(Boolean);return compareFields.map(([label,key])=>{const values=list.map(p=>fieldValue(p,key)),canonical=list.map(p=>Array.isArray(p[key])?[...p[key]].sort().join('|'):fieldValue(p,key));return {label,values,diff:new Set(canonical).size>1};});}
  function showCompare(onlyDiff=false){
    if(state.compare.length<2){toast('比較する製品を2件以上選択してください。');return;}
    state.detail='';const list=state.compare.map(findProduct),rows=compareRows().filter(r=>!onlyDiff||r.diff);
    showModal('compare','<h2 class="modal-title" id="modal-title">製品比較</h2><p class="modal-subtitle">値が異なる行を色付きで表示。未収録は未確認であり、不適合を意味しません。</p><div class="compare-options"><label class="check-row"><input id="only-diff" type="checkbox"'+(onlyDiff?' checked':'')+'>違いだけ表示</label><div class="button-row"><button type="button" class="button small" data-act="compare-copy">表をコピー（タブ区切り）</button><button type="button" class="button small" data-act="compare-csv">CSV を出力</button><button type="button" class="button small" data-act="share">共有</button></div></div><div class="table-scroll"><table class="compare-table"><thead><tr><th scope="col">項目</th>'+list.map(p=>'<th scope="col"><span class="catalog-label">'+h(p.catalog)+'</span><span class="product-name">'+h(p.name)+'</span>'+safeLink(productLink(p).url,productLink(p).direct?'メーカー商品ページ':'メーカーサイトで検索','button small')+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr'+(row.diff?' class="diff"':'')+'><th scope="row">'+h(row.label)+'</th>'+row.values.map(v=>'<td>'+h(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'+(!rows.length?'<p class="compare-empty">異なる項目はありません。</p>':''));syncHash();
  }
  async function copy(text,success='コピーしました。'){
    try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);toast(success);return;}}catch{/* fall through to file:// compatible copy */}
    const previous=document.activeElement,ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;top:-10000px;left:0';(modal.open?modal:document.body).append(ta);ta.focus();ta.select();let ok=false;try{ok=document.execCommand('copy');}catch{/* present selectable text below */}ta.remove();if(previous?.isConnected)previous.focus();
    if(ok)toast(success);else{state.detail='';showModal('copy','<h2 class="modal-title" id="modal-title">選択してコピー</h2><p class="modal-subtitle">ブラウザの自動コピーを利用できません。下のテキストを選択してコピーしてください。</p><textarea class="copy-fallback" readonly aria-label="コピーするテキスト">'+h(text)+'</textarea>');const fallback=$('.copy-fallback');fallback.focus();fallback.select();syncHash();}
  }
  function download(filename,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.style.display='none';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(filename+' を出力しました。');}
  function purchaseRows(){return [['メーカー','製品名','カタログ番号','数量','見積単価（円）','小計（円）','メモ'],...personal.purchases.map(row=>{const p=findProduct(row.id);return [makerFor(p).name,p.name,p.catalog,row.quantity,row.quote??'',row.quote===null?'':row.quantity*row.quote,row.memo];})];}
  function comparisonRows(){const list=state.compare.map(findProduct);return [['項目',...list.map(p=>p.name)],...compareRows().filter(r=>!$('#only-diff')?.checked||r.diff).map(r=>[r.label,...r.values])];}
  function tsv(rows){return rows.map(row=>row.map(v=>{let s=String(v??'').replace(/[\t\r\n]+/g,' ');return /^[\s]*[=+\-@]/.test(s)?"'"+s:s;}).join('\t')).join('\n');}
  function methods(p){const m=makerFor(p);return (['primary','tag'].includes(p.category)?'anti-'+p.target+' antibody':p.name)+' ('+m.name+', Cat# '+p.catalog+')';}
  function showMyForm(id=''){
    const p=id?personal.myProducts.find(item=>item.id===id):null;if(id&&!p)return;state.detail='';
    const input=(key,label,options={})=>'<label>'+h(label)+(options.required?' *':'')+(options.hint?' <small>'+h(options.hint)+'</small>':'')+'<input name="'+h(key)+'" value="'+h(p?.[key]||'')+'" maxlength="'+(key==='url'?2000:500)+'"'+(options.required?' required':'')+(key==='url'?' type="url"':'')+'></label>';
    const list=(key,label,hint)=>'<label>'+h(label)+' <small>'+h(hint)+'</small><input name="'+h(key)+'" value="'+h((p?.[key]||[]).join(', '))+'" maxlength="3000"></label>';
    showModal('my-form','<h2 class="modal-title" id="modal-title">'+(p?'マイ試薬を編集':'マイ試薬を追加')+'</h2><p class="modal-subtitle">* は必須。未確認のスペックは空欄のまま保存できます。</p><form id="my-form" class="my-form" data-edit-id="'+h(p?.id||'')+'"><p class="form-error" id="my-error" role="alert" hidden></p>'+input('name','製品名',{required:true})+'<div class="two-cols"><label>メーカー *<select name="maker" required>'+makers.filter(m=>m.type!=='aggregator').map(m=>'<option value="'+h(m.id)+'"'+(p?.maker===m.id?' selected':'')+'>'+h(m.name)+(m.nameJa?' / '+h(m.nameJa):'')+'</option>').join('')+'</select></label>'+input('catalog','カタログ番号',{required:true})+'</div><div class="two-cols"><label>カテゴリ *<select name="category" required>'+Object.entries(C.categories).map(([key,label])=>'<option value="'+key+'"'+(p?.category===key?' selected':'')+'>'+h(label)+'</option>').join('')+'</select></label>'+input('target','ターゲット / 用途',{required:true})+'</div>'+input('url','商品ページ URL',{hint:'http / https のみ'})+list('aliases','別名','カンマ区切り。日本語も利用できます。')+'<label>メモ<textarea name="note" rows="3" maxlength="4000">'+h(p?.note||'')+'</textarea></label><details'+(p?' open':'')+'><summary>抗体・試薬の詳細スペック（任意）</summary><div><div class="two-cols">'+input('gene','遺伝子')+input('host','宿主',{hint:'例：Rabbit'})+'</div><div class="two-cols"><label>クローナリティ<select name="clonality"><option value="">未収録</option>'+['Monoclonal','Polyclonal','Oligoclonal'].map(v=>'<option'+(p?.clonality===v?' selected':'')+'>'+v+'</option>').join('')+'</select></label>'+input('clone','クローン')+'</div><div class="two-cols">'+input('isotype','アイソタイプ',{hint:'例：IgG1'})+input('conjugate','標識',{hint:'非標識：Unconjugated'})+'</div>'+list('reactivity','交差性','例：Human, Mouse, Rat')+list('applications','アプリケーション','例：WB, IHC, IF, FC')+'<div class="two-cols">'+input('size','容量')+input('storage','保存条件')+'</div>'+input('secondaryFor','二次抗体の認識対象となる宿主',{hint:'例：Rabbit / Mouse'})+'</div></details><div class="button-row"><button type="submit" class="button primary">'+(p?'変更を保存':'マイ試薬に追加')+'</button><button type="button" class="button" data-act="close">キャンセル</button></div></form>');syncHash();
  }
  function deleteMyPrompt(id){const p=personal.myProducts.find(p=>p.id===id);if(!p)return;state.detail='';showModal('delete','<h2 class="modal-title" id="modal-title">このマイ試薬を削除しますか。</h2><p class="modal-subtitle">'+h(p.name)+' / '+h(p.catalog)+'</p><p class="notice">この製品のお気に入り・購入リスト・比較への登録も解除されます。</p><div class="button-row"><button type="button" class="button danger" data-act="my-delete-confirm" data-id="'+h(id)+'">削除する</button><button type="button" class="button" data-act="close">キャンセル</button></div>');syncHash();}
  function showData(){state.detail='';pendingImport=null;showModal('data','<h2 class="modal-title" id="modal-title">データ管理</h2><p class="modal-subtitle">お気に入り '+personal.favorites.length+' 件 · 購入リスト '+personal.purchases.length+' 件 · マイ試薬 '+personal.myProducts.length+' 件</p><p class="notice">保存先はこのブラウザです。別の端末やブラウザに移すときは JSON を出力してください。検索履歴と比較リストはバックアップに含まれません。</p><button type="button" class="button primary" data-act="backup-export">JSON バックアップを保存</button><section class="modal-section"><h3>バックアップを読み込む</h3><p class="modal-subtitle">検証後に件数を表示します。「この内容で置き換える」を押すと、現在のお気に入り・購入リスト・マイ試薬が置き換わります。</p><div class="data-form"><label>LabPick の JSON ファイル（5 MB まで）<input id="import-file" type="file" accept="application/json,.json"></label><p class="form-error" id="import-error" role="alert" hidden></p><div class="data-preview" id="import-preview" hidden></div><button type="button" class="button primary" id="import-apply" data-act="backup-apply" disabled>この内容で置き換える</button></div></section>');syncHash();}
  function changeCompare(id,checked){
    if(!findProduct(id))return;
    if(checked&&!state.compare.includes(id)){if(state.compare.length>=4){toast('比較できる製品は最大4件です。');render();return;}state.compare.push(id);}else if(!checked)state.compare=state.compare.filter(v=>v!==id);
    render();if(modalKind==='detail')showDetail(state.detail);
  }
  function addPurchase(id){if(!findProduct(id))return;if(personal.purchases.some(r=>r.id===id)){toast('この製品は購入リストに追加済みです。数量は購入リストから変更できます。');return;}personal.purchases.push({id,quantity:1,quote:null,memo:''});save();render();toast('購入リストに追加しました。');}
  function refreshPersonal(){save();render();}
  function performSearch(q){clearTimeout(searchTimer);clearTimeout(historyTimer);state.q=String(q).slice(0,500);state.limit=24;$('#search').value=state.q;hideSuggestions();addHistory(state.q);if(state.view!=='catalog')navigate('catalog');else render();}
  function hideSuggestions(){$('#suggestions').hidden=true;$('#search').setAttribute('aria-expanded','false');suggestionsIndex=-1;}
  function showSuggestions(){
    const query=$('#search').value.trim();if(!query){hideSuggestions();return;}
    const possible=[...history,...products().flatMap(p=>[p.target,p.catalog,...(p.aliases||[])])],norm=C.normalize(query);
    const list=[...new Set(possible)].filter(s=>C.normalize(s).includes(norm)&&s!==query).slice(0,7);
    $('#suggestions').innerHTML=list.map((s,i)=>'<button type="button" id="suggestion-'+i+'" role="option" aria-selected="false" data-act="search-chip" data-query="'+h(s)+'">'+C.highlight(s,query)+'</button>').join('');$('#suggestions').hidden=!list.length;$('#search').setAttribute('aria-expanded',!!list.length);suggestionsIndex=-1;
  }
  function runTool(form){
    const data=new FormData(form),get=k=>Number(data.get(k)),out=form.querySelector('output');out.classList.remove('error');
    try{let result;
      if(form.dataset.tool==='antibody'){const r=C.antibodyDilution(get('factor'),get('volume')*get('volumeUnit'));result='抗体 '+number(r.stock)+' µL\n希釈液 '+number(r.diluent)+' µL';}
      else if(form.dataset.tool==='dilution'){const r=C.dilution(get('c1'),get('c2'),get('v2')),unit=data.get('volumeUnit');result='原液 V₁ = '+number(r.stock)+' '+unit+'\n希釈液 '+number(r.diluent)+' '+unit;}
      else {const grams=C.molarMass(get('mw'),get('concentration')*get('concentrationUnit'),get('volume')*get('volumeUnit'));result='必要質量 '+number(grams*1000)+' mg\n= '+number(grams)+' g';}
      out.textContent=result;
    }catch(error){out.textContent=error.message;out.classList.add('error');}
  }
  document.addEventListener('click',event=>{
    if(event.target.closest('.skip-link')){event.preventDefault();$('#main').focus();return;}
    const nav=event.target.closest('[data-view]');if(nav){event.preventDefault();navigate(nav.dataset.view);return;}
    const btn=event.target.closest('[data-act]');if(!btn)return;
    const {act,id}=btn.dataset,p=id?findProduct(id):null;
    if(act==='close'){closeModal();return;}
    if(act==='filter-toggle'){const open=$('#filter-toggle').getAttribute('aria-expanded')!=='true';$('#filter-toggle').setAttribute('aria-expanded',open);$('.filters').classList.toggle('filters-open',open);return;}
    if(act==='detail'){showDetail(id);return;}
    if(act==='favorite'&&p){personal.favorites=personal.favorites.includes(id)?personal.favorites.filter(v=>v!==id):[...personal.favorites,id];refreshPersonal();if(modalKind==='detail')showDetail(id);return;}
    if(act==='purchase-add'){addPurchase(id);return;}
    if(act==='purchase-remove'){personal.purchases=personal.purchases.filter(r=>r.id!==id);refreshPersonal();return;}
    if(act==='compare-add'){changeCompare(id,true);return;}
    if(act==='compare-remove'){changeCompare(id,false);return;}
    if(act==='compare-clear'){state.compare=[];render();return;}
    if(act==='compare-open'){showCompare();return;}
    if(act==='compare-related'&&p){const list=[p,...relatedProducts(p)];for(const o of list){if(state.compare.length<4&&!state.compare.includes(o.id))state.compare.push(o.id);}render();showDetail(id);toast('最大4件まで比較に追加しました。');return;}
    if(act==='compare-copy'){copy(tsv(comparisonRows()));return;}
    if(act==='compare-csv'){download('LabPick-comparison.csv',C.csv(comparisonRows()),'text/csv;charset=utf-8');return;}
    if(act==='category'){if(btn.dataset.category)state.filters.category=btn.dataset.category;else delete state.filters.category;state.limit=24;render();return;}
    if(act==='reset'){state.filters={};state.favoriteOnly=false;state.myOnly=false;state.limit=24;render();return;}
    if(act==='remove-filter'){const key=btn.dataset.key;if(key==='favorite')state.favoriteOnly=false;else if(key==='my')state.myOnly=false;else delete state.filters[key];state.limit=24;render();return;}
    if(act==='layout'){state.layout=btn.dataset.layout==='table'?'table':'cards';render();return;}
    if(act==='more'){state.limit+=24;renderCatalog();return;}
    if(act==='search-chip'){performSearch(btn.dataset.query);$('#search').focus();return;}
    if(act==='clear-history'){history=[];writeStorage(historyKey,history);renderHistory();toast('検索履歴を消去しました。');return;}
    if(act==='share'){if(state.view==='catalog'){clearTimeout(searchTimer);state.q=$('#search').value.slice(0,500);}const hash=syncHash(),url=location.href.split('#')[0]+hash;copy(url,'現在の検索・絞り込み・比較対象を含む URL をコピーしました。');return;}
    if(act==='target-launch'){launcherQuery=btn.dataset.query;state.view='launcher';closeModal(false);render();window.scrollTo({top:0,behavior:'auto'});return;}
    if(act==='copy-catalog'&&p){copy(p.catalog);return;}
    if(act==='copy-methods'&&p){copy(methods(p));return;}
    if(act==='copy-product'&&p){copy(['製品名: '+p.name,...compareFields.map(([label,key])=>label+': '+fieldValue(p,key)),'別名: '+(p.aliases||[]).join(' / '),'URL: '+productLink(p).url].join('\n'));return;}
    if(act==='my-new'){showMyForm();return;}
    if(act==='my-edit'){showMyForm(id);return;}
    if(act==='my-delete'){deleteMyPrompt(id);return;}
    if(act==='my-delete-confirm'){personal.myProducts=personal.myProducts.filter(p=>p.id!==id);personal.favorites=personal.favorites.filter(v=>v!==id);personal.purchases=personal.purchases.filter(r=>r.id!==id);state.compare=state.compare.filter(v=>v!==id);closeModal();refreshPersonal();toast('マイ試薬を削除しました。');return;}
    if(act==='purchase-csv'){if(!personal.purchases.length){toast('購入リストが空です。');return;}download('LabPick-purchase.csv',C.csv(purchaseRows()),'text/csv;charset=utf-8');return;}
    if(act==='purchase-copy'){if(!personal.purchases.length){toast('購入リストが空です。');return;}copy('以下の製品の発注をお願いいたします。\n\n'+personal.purchases.map(r=>{const p=findProduct(r.id);return '・'+makerFor(p).name+' / '+p.name+' / Cat# '+p.catalog+' / 数量 '+r.quantity+(r.memo?'\n  メモ: '+r.memo:'');}).join('\n'));return;}
    if(act==='print'){window.print();return;}
    if(act==='data'){showData();return;}
    if(act==='backup-export'){download('LabPick-backup-'+window.LABPICK_DATA_UPDATED+'.json',JSON.stringify(personal,null,2),'application/json;charset=utf-8');return;}
    if(act==='backup-apply'){if(!pendingImport)return;personal=pendingImport;state.compare=state.compare.filter(id=>findProduct(id));closeModal();refreshPersonal();toast('バックアップを読み込みました。');return;}
    if(act==='launcher-clear'){launcherSelection.clear();renderLauncher();return;}
    if(act==='launcher-open'){
      if(!launcherQuery.trim()){toast('検索キーワードを入力してください。');$('#launcher-query').focus();return;}
      if(!launcherSelection.size){toast('開くサイトをチェックしてください。');return;}
      // Keep window.open calls in this click event. Each tab is isolated before navigating.
      let blocked=0;for(const site of launcherSelection){const m=makerMap.get(site),url=C.safeUrl(window.LABPICK_LINKS.search(m,launcherQuery.trim()));if(!url)continue;let opened=null;try{opened=window.open('about:blank','_blank');if(opened){opened.opener=null;opened.location.replace(url);}else blocked++;}catch{blocked++;if(opened)opened.close();}}
      toast(blocked?blocked+' サイトを開けませんでした。ポップアップを許可するか、個別リンクを開いてください。':'選択したサイトを開きました。開けない場合はポップアップ設定をご確認ください。');return;
    }
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(form.id==='search-form'){event.preventDefault();performSearch($('#search').value);return;}
    if(form.id==='launcher-form'){event.preventDefault();launcherQuery=$('#launcher-query').value.slice(0,500);renderLauncher();syncHash();return;}
    if(form.dataset.tool){event.preventDefault();runTool(form);return;}
    if(form.id==='my-form'){
      event.preventDefault();const data=new FormData(form),id=form.dataset.editId||'my-'+(window.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));
      const draft={id};for(const key of ['name','maker','catalog','category','target','url','note','gene','host','clonality','clone','isotype','conjugate','size','storage','secondaryFor']){const value=String(data.get(key)||'').trim();if(value)draft[key]=value;}
      for(const key of ['aliases','reactivity','applications']){const value=String(data.get(key)||'').split(/[,、\n]/).map(s=>s.trim()).filter(Boolean);if(value.length)draft[key]=value;}
      try{const valid=C.validateProduct(draft,makers,true);if(form.dataset.editId){const index=personal.myProducts.findIndex(p=>p.id===id);if(index===-1)throw Error('編集する試薬が見つかりません。');personal.myProducts[index]=valid;}else {if(personal.myProducts.length>=2000)throw Error('マイ試薬は2000件までです。');personal.myProducts.push(valid);}state.view='my';closeModal(false);refreshPersonal();toast('マイ試薬を保存しました。');}catch(error){const el=$('#my-error');el.textContent=error.message;el.hidden=false;el.scrollIntoView({block:'nearest'});}return;
    }
  });
  document.addEventListener('change',async event=>{
    const el=event.target;
    if(el.dataset.filter){if(el.value)state.filters[el.dataset.filter]=el.value;else delete state.filters[el.dataset.filter];state.limit=24;render();document.querySelector('[data-filter="'+el.dataset.filter+'"]').focus({preventScroll:true});return;}
    if(el.id==='filter-favorites'||el.id==='filter-my'){state[el.id==='filter-favorites'?'favoriteOnly':'myOnly']=el.checked;state.limit=24;render();return;}
    if(el.id==='sort'){state.sort=el.value;render();return;}
    if(el.dataset.compare){changeCompare(el.dataset.compare,el.checked);return;}
    if(el.id==='only-diff'){showCompare(el.checked);$('#only-diff').focus({preventScroll:true});return;}
    if(el.dataset.site){if(el.checked)launcherSelection.add(el.dataset.site);else launcherSelection.delete(el.dataset.site);$('#launcher-selected').textContent=launcherSelection.size+' サイトを選択';return;}
    if(el.closest('[data-purchase]')&&!el.checkValidity()){el.reportValidity();return;}
    if(el.id==='import-file'){
      const generation=++importGeneration;pendingImport=null;$('#import-apply').disabled=true;$('#import-preview').hidden=true;$('#import-error').hidden=true;
      try{const file=el.files[0];if(!file)return;if(file.size>5*1024*1024)throw Error('5 MB 以下の JSON を選択してください。');const parsed=JSON.parse(await file.text()),validated=C.validateBackup(parsed,makers,builtins);if(generation!==importGeneration||modalKind!=='data')return;pendingImport=validated;$('#import-preview').textContent='検証を通過しました。\nお気に入り '+validated.favorites.length+' 件\n購入リスト '+validated.purchases.length+' 件\nマイ試薬 '+validated.myProducts.length+' 件\n現在の保存データを置き換えます。必要なら先にバックアップしてください。';$('#import-preview').hidden=false;$('#import-apply').disabled=false;}catch(error){if(generation!==importGeneration||modalKind!=='data')return;$('#import-error').textContent='読み込めませんでした: '+error.message;$('#import-error').hidden=false;}return;
    }
  });
  document.addEventListener('input',event=>{
    const el=event.target;
    if(el.id==='search'){
      clearTimeout(searchTimer);clearTimeout(historyTimer);showSuggestions();searchTimer=setTimeout(()=>{state.q=el.value.slice(0,500);state.limit=24;renderCatalog();syncHash();},160);historyTimer=setTimeout(()=>addHistory(el.value),1400);return;
    }
    if(el.id==='launcher-query'){launcherQuery=el.value.slice(0,500);const focused=el;renderLauncher();focused.focus({preventScroll:true});syncHash();return;}
    if(el.closest('[data-tool]')){const output=el.closest('[data-tool]').querySelector('output');output.textContent='値を変更しました。再計算してください。';output.classList.remove('error');return;}
    const row=el.closest('[data-purchase]');if(!row)return;const record=personal.purchases.find(r=>r.id===row.dataset.purchase);if(!record)return;
    if(el.name==='memo')record.memo=el.value.slice(0,4000);
    else if(el.name==='quantity'&&el.checkValidity()&&Number.isInteger(el.valueAsNumber))record.quantity=el.valueAsNumber;
    else if(el.name==='quote'&&el.value==='')record.quote=null;
    else if(el.name==='quote'&&el.checkValidity()&&Number.isFinite(el.valueAsNumber))record.quote=el.valueAsNumber;
    else return;
    row.querySelector('[data-subtotal]').textContent=record.quote===null?'未入力':money(record.quantity*record.quote);row.querySelector('[data-print="'+el.name+'"]').textContent=el.name==='quote'?(record.quote===null?'未入力':money(record.quote)):String(record[el.name]);save();renderTotal();
  });
  document.addEventListener('keydown',event=>{
    if(modal.open){
      if(event.key==='Escape'){event.preventDefault();closeModal();return;}
      if(event.key==='Tab'){const focusables=[...modal.querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')].filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));const first=focusables[0],last=focusables.at(-1);if(!first){event.preventDefault();return;}if(event.shiftKey&&(document.activeElement===first||!focusables.includes(document.activeElement))){event.preventDefault();last.focus();}else if(!event.shiftKey&&(document.activeElement===last||!focusables.includes(document.activeElement))){event.preventDefault();first.focus();}}return;
    }
    if(event.key==='Escape'){hideSuggestions();return;}
    if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest('input,textarea,select,[contenteditable="true"]')){event.preventDefault();if(state.view!=='catalog')navigate('catalog');$('#search').focus();return;}
    if(!$('#suggestions').hidden&&(event.target.id==='search'||event.target.closest('#suggestions'))){
      const items=[...$('#suggestions').querySelectorAll('button')];
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();suggestionsIndex=(suggestionsIndex+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((item,i)=>item.setAttribute('aria-selected',i===suggestionsIndex));items[suggestionsIndex]?.focus();}
    }
  });
  document.addEventListener('click',event=>{if(!event.target.closest('.search-panel'))hideSuggestions();});
  modal.addEventListener('cancel',event=>{event.preventDefault();closeModal();});
  modal.addEventListener('click',event=>{if(event.target!==modal)return;const rect=modal.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeModal();});
  window.addEventListener('hashchange',()=>{closeModal(false,false);readHash();render();if(state.detail)showDetail(state.detail);});
  window.addEventListener('beforeprint',()=>renderPurchase());
  $('#popular-chips').innerHTML=['β-Actin','GAPDH','p-ERK','LC3B','二次抗体','CCK-8'].map(q=>'<button type="button" class="chip" data-act="search-chip" data-query="'+h(q)+'">'+h(q)+'</button>').join('');
  $('#data-updated').textContent=window.LABPICK_DATA_UPDATED;$('#data-updated').dateTime=window.LABPICK_DATA_UPDATED;$('#storage-warning').hidden=!storageFailed;
  readHash();renderHistory();render();if(state.detail)showDetail(state.detail);if(initialWarning)toast(initialWarning);
})();
