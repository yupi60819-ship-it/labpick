#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({URL,console});
context.window=context;
for(const file of ['data/makers.js','data/products.js','assets/js/core.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
// Validation runs inside the same realm as the data to check ordinary objects correctly.
vm.runInContext(`
  const errors=[], makerIds=new Set(), ids=new Set(), pairs=new Set();
  const requireFields=(value,fields,kind)=>{for(const key of fields)if(typeof value[key]!=='string'||!value[key].trim())errors.push(kind+' '+value.id+': missing '+key);};
  for(const maker of LABPICK_MAKERS){
    requireFields(maker,['id','name','country','type','homepage','searchUrl','color'],'maker');
    if(makerIds.has(maker.id))errors.push('duplicate maker id: '+maker.id);makerIds.add(maker.id);
    if(!['JP','海外'].includes(maker.country)||!['maker','distributor','aggregator'].includes(maker.type))errors.push('invalid maker enum: '+maker.id);
    if(!LabPickCore.safeUrl(maker.homepage)||!LabPickCore.safeUrl(maker.searchUrl)||!maker.searchUrl.includes('{q}'))errors.push('invalid search URL: '+maker.id);
    if(maker.productUrl&&(!LabPickCore.safeUrl(maker.productUrl)||!maker.productUrl.includes('{catalog}')))errors.push('invalid product URL: '+maker.id);
    if(!/^#[a-fA-F0-9]{6}$/.test(maker.color))errors.push('invalid badge color: '+maker.id);
    const encoded=LABPICK_LINKS.search(maker,'β Actin / #4370 & x=y');
    if(encoded.includes('{q}')||encoded.includes('β')||!encoded.includes(encodeURIComponent('β Actin / #4370 & x=y')))errors.push('unsafe query encoding: '+maker.id);
  }
  for(const product of LABPICK_PRODUCTS){
    try{LabPickCore.validateProduct(product,LABPICK_MAKERS);}catch(error){errors.push(product.id+': '+error.message);}
    requireFields(product,['id','maker','name','catalog','category','target'],'product');
    if(ids.has(product.id))errors.push('duplicate product id: '+product.id);ids.add(product.id);
    if(!makerIds.has(product.maker))errors.push('unknown maker: '+product.id);
    const pair=product.maker+'|'+product.catalog;if(pairs.has(pair))errors.push('duplicate catalog: '+pair);pairs.add(pair);
    if(['primary','tag','isotype'].includes(product.category)&&!product.host)errors.push('missing antibody host: '+product.id);
    if(product.clonality==='Monoclonal'&&!product.clone)errors.push('missing monoclonal clone: '+product.id);
    if(Object.keys(product).some(key=>/price|cost|quote/i.test(key)))errors.push('price field prohibited: '+product.id);
    const maker=LABPICK_MAKERS.find(m=>m.id===product.maker);
    if(maker&&!LabPickCore.safeUrl(LABPICK_LINKS.product(maker,product).url))errors.push('invalid resolved product link: '+product.id);
  }
  if(errors.length){console.error(errors.join('\\n'));throw Error(errors.length+' data validation error(s)');}
  const counts=key=>Object.fromEntries([...new Set(LABPICK_PRODUCTS.map(p=>p[key]))].sort().map(k=>[k,LABPICK_PRODUCTS.filter(p=>p[key]===k).length]));
  console.log('PASS: '+LABPICK_PRODUCTS.length+' products / '+LABPICK_MAKERS.length+' sites');
  console.log('By category: '+JSON.stringify(counts('category')));
  console.log('By maker: '+JSON.stringify(counts('maker')));
  console.log('Unverified search templates: '+LABPICK_MAKERS.filter(m=>!m.searchVerified).map(m=>m.id).join(', '));
  console.log('Unverified product templates: '+LABPICK_MAKERS.filter(m=>m.productUrl&&!m.productVerified).map(m=>m.id).join(', '));
`,context);
