/* Shared, DOM-independent logic. Also exercised by tools/test-core.js. */
(function () {
  'use strict';
  const categories = {primary:'一次抗体',secondary:'二次抗体',isotype:'アイソタイプ',tag:'タグ抗体',reagent:'一般試薬・WB',kit:'キット・アッセイ',enzyme:'酵素・PCR',culture:'細胞培養',inhibitor:'阻害剤・化合物',cytokine:'サイトカイン',dye:'色素・染色',transfection:'遺伝子導入',consumable:'消耗品'};
  const greek = {α:'alpha',β:'beta',γ:'gamma',κ:'kappa',δ:'delta'};
  function normalize(value) {
    return String(value ?? '').normalize('NFKC').toLowerCase().replace(/[αβγκδ]/g,c=>greek[c])
      .replace(/alpha/g,'a').replace(/beta/g,'b').replace(/gamma/g,'g').replace(/kappa/g,'k')
      .replace(/[\s\p{P}\p{S}]/gu,'');
  }
  function tokens(query) { return String(query).normalize('NFKC').trim().split(/\s+/).map(normalize).filter(Boolean); }
  function score(product, query, maker) {
    const terms = tokens(query);
    if (!terms.length) return 1;
    const parts = [product.name,product.target,product.gene,product.catalog,product.clone,product.note,maker.name,maker.nameJa,...(product.aliases||[])].map(normalize);
    const haystack = parts.join('|');
    if (!terms.every(t=>haystack.includes(t))) return 0;
    const whole = normalize(query);
    return (normalize(product.catalog)===whole ? 10000 : 0) + terms.reduce((s,t)=>s+
      (normalize(product.catalog)===t ? 1000 : normalize(product.target)===t ? 500 : normalize(product.target).includes(t) ? 250 : normalize(product.name).includes(t) ? 100 : 10),0);
  }
  function escape(value) { return String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function highlight(value, query) {
    const input = String(value ?? '');
    const terms = tokens(query);
    if (!terms.length) return escape(input);
    // Map each normalized output character back to the original string, including greek expansions.
    let flattened = '', offsets = [], at = 0;
    for (const char of input) {
      const norm = normalize(char);
      for (const c of norm) { flattened += c; offsets.push([at,at+char.length]); }
      at += char.length;
    }
    // Latin words such as beta are normalized together; map using full-word substitutions too.
    for (const word of ['alpha','beta','gamma','kappa']) {
      let index;
      while ((index=flattened.indexOf(word))!==-1) {
        const end = offsets[index+word.length-1][1];
        offsets.splice(index,word.length,[offsets[index][0],end]);
        flattened = flattened.slice(0,index)+normalize(word)+flattened.slice(index+word.length);
      }
    }
    const ranges = [];
    for (const term of terms) {
      let pos = 0, index;
      while ((index=flattened.indexOf(term,pos))!==-1) {
        ranges.push([offsets[index][0],offsets[index+term.length-1][1]]); pos=index+term.length;
      }
    }
    ranges.sort((a,b)=>a[0]-b[0]);
    const merged=[];
    for (const r of ranges) {
      const prev=merged[merged.length-1];
      if (prev && r[0]<=prev[1]) prev[1]=Math.max(prev[1],r[1]); else merged.push(r.slice());
    }
    let html='', last=0;
    for (const [start,end] of merged) {html+=escape(input.slice(last,start))+'<mark>'+escape(input.slice(start,end))+'</mark>'; last=end;}
    return html+escape(input.slice(last));
  }
  function safeUrl(value) {
    if (typeof value!=='string' || !/^https?:\/\//i.test(value)) return '';
    try {const u=new URL(value); return ['http:','https:'].includes(u.protocol)&&!u.username&&!u.password ? u.href : '';} catch {return '';}
  }
  function csv(rows) {
    return '\uFEFF'+rows.map(row=>row.map(value=>{
      let s=String(value ?? '');
      if (/^[\s\uFEFF]*[=+\-@]/u.test(s)) s="'"+s;
      return '"'+s.replace(/"/g,'""')+'"';
    }).join(',')).join('\r\n');
  }
  function plain(value) { return value!==null && typeof value==='object' && !Array.isArray(value) && Object.getPrototypeOf(value)===Object.prototype; }
  const textFields=['id','maker','name','catalog','category','target','gene','host','clonality','clone','isotype','conjugate','size','storage','note','url','verificationUrl','datasheetUrl','secondaryFor'];
  const listFields=['aliases','reactivity','applications'];
  function validateProduct(value, makers, custom=false) {
    if (!plain(value)) throw Error('製品はオブジェクトで指定してください。');
    const out={};
    for (const key of Object.keys(value)) {
      if (!textFields.includes(key) && !listFields.includes(key)) throw Error('製品の未対応フィールド: '+key);
    }
    for (const key of textFields) {
      if (value[key]===undefined) continue;
      if (typeof value[key]!=='string' || value[key].length>4000) throw Error(key+' の形式が不正です。');
      out[key]=value[key].trim();
    }
    for (const key of ['id','maker','name','catalog','category','target']) if (!out[key]) throw Error(key+' は必須です。');
    if (!/^[a-z0-9][a-z0-9-]{0,99}$/.test(out.id) || (custom&&!out.id.startsWith('my-'))) throw Error('製品 id が不正です。');
    if (!makers.some(m=>m.id===out.maker)) throw Error('登録のないメーカーです。');
    if (!Object.hasOwn(categories,out.category)) throw Error('カテゴリが不正です。');
    for (const key of listFields) {
      if (value[key]===undefined) continue;
      if (!Array.isArray(value[key]) || value[key].length>100 || value[key].some(s=>typeof s!=='string'||s.length>500)) throw Error(key+' は文字列の配列にしてください。');
      out[key]=[...new Set(value[key].map(s=>s.trim()).filter(Boolean))];
    }
    for (const key of ['url','verificationUrl','datasheetUrl']) if (out[key] && !safeUrl(out[key])) throw Error('URL は認証情報を含まない http / https のみ利用できます。');
    if (out.clonality && !['Monoclonal','Polyclonal','Oligoclonal'].includes(out.clonality)) throw Error('クローナリティが不正です。');
    return out;
  }
  function validateBackup(value, makers, builtins) {
    if (!plain(value) || value.version!==1 || !Array.isArray(value.myProducts)||!Array.isArray(value.favorites)||!Array.isArray(value.purchases)) throw Error('LabPick バックアップ（version: 1）の形式ではありません。');
    if (value.myProducts.length>2000 || value.favorites.length>10000 || value.purchases.length>10000) throw Error('データ件数の上限を超えています。');
    const myProducts=value.myProducts.map(p=>validateProduct(p,makers,true));
    const ids=new Set(builtins.map(p=>p.id));
    for (const p of myProducts) { if(ids.has(p.id)) throw Error('id が重複しています: '+p.id); ids.add(p.id); }
    const favorites=[];
    for (const id of value.favorites) { if(typeof id!=='string'||!ids.has(id)||favorites.includes(id)) throw Error('お気に入りの参照が不正です。'); favorites.push(id); }
    const seen=new Set();
    const purchases=value.purchases.map(row=>{
      if (!plain(row)||!ids.has(row.id)||seen.has(row.id)||!Number.isInteger(row.quantity)||row.quantity<1||row.quantity>100000||!(row.quote===null||(typeof row.quote==='number'&&Number.isFinite(row.quote)&&row.quote>=0&&row.quote<=1e12))||typeof row.memo!=='string'||row.memo.length>4000) throw Error('購入リストの形式・数量・見積価格が不正です。');
      seen.add(row.id);return {id:row.id,quantity:row.quantity,quote:row.quote,memo:row.memo};
    });
    return {version:1,myProducts,favorites,purchases};
  }
  function compatibleSecondaries(primary, products) {
    if (!['primary','tag'].includes(primary.category)||!primary.host || (primary.isotype && !/^IgG/i.test(primary.isotype)) || (primary.conjugate && primary.conjugate!=='Unconjugated')) return [];
    return products.filter(p=>p.category==='secondary'&&p.secondaryFor===primary.host);
  }
  function antibodyDilution(factor, volumeUL) {
    if (!Number.isFinite(factor)||!Number.isFinite(volumeUL)||factor<1||volumeUL<=0) throw Error('希釈倍率は1以上、最終液量は正の数で入力してください。');
    return {stock:volumeUL/factor,diluent:volumeUL-volumeUL/factor};
  }
  function dilution(c1,c2,v2) {
    if (![c1,c2,v2].every(v=>Number.isFinite(v)&&v>0)||c2>c1) throw Error('正の値を入力し、最終濃度を原液濃度以下にしてください。');
    const stock=(c2/c1)*v2;
    if (!Number.isFinite(stock)||stock<=0) throw Error('計算範囲を超えています。単位や値を見直してください。');
    return {stock,diluent:v2-stock};
  }
  function molarMass(mw, concentrationM, volumeL) {
    if (![mw,concentrationM,volumeL].every(v=>Number.isFinite(v)&&v>0)) throw Error('分子量・濃度・液量には正の数を入力してください。');
    const result=mw*concentrationM*volumeL;
    if (!Number.isFinite(result)||result<=0) throw Error('計算範囲を超えています。単位や値を見直してください。');
    return result;
  }
  window.LabPickCore={categories,normalize,tokens,score,escape,highlight,safeUrl,csv,validateProduct,validateBackup,compatibleSecondaries,antibodyDilution,dilution,molarMass};
})();
