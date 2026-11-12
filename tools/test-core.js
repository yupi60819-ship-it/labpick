#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const context=vm.createContext({URL,console,assert});context.window=context;
for(const file of ['data/makers.js','data/products.js','assets/js/core.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context,{filename:file});
vm.runInContext(`
const C=LabPickCore, p=LABPICK_PRODUCTS, makers=LABPICK_MAKERS;
let checks=0;
function check(name,fn){fn();checks++;console.log('PASS: '+name);}
check('catalog, width, punctuation and greek normalization',()=>{
  for(const [a,b] of [['#４３７０','4370'],['ab-8245','ab8245'],['β-Actin','beta actin'],['b actin','βactin'],['α-Tubulin','alpha tubulin'],['γH2AX','gamma h2ax'],['NF-κB','nf kappa b']])assert.equal(C.normalize(a),C.normalize(b));
});
check('AND search and ranking',()=>{
 const row=p.find(x=>x.id==='cst-4370'),m=makers.find(x=>x.id==='cst');assert(C.score(row,'#4370',m)>C.score(row,'ERK',m));assert(C.score(row,'p-ERK cst',m)>0);assert.equal(C.score(row,'p-ERK xyz-does-not-exist',m),0);
});
check('highlight remains escaped, including html/quotes and greek',()=>{
 assert(!C.highlight('<img src=x onerror=alert(1)>','img').includes('<img'));assert(C.highlight('β-Actin','beta actin').includes('<mark>'));assert(C.highlight('GAPDH-71.1','gapdh').includes('<mark>GAPDH</mark>'));
});
check('URL schemes and credentials rejected',()=>{
 for(const url of ['javascript:alert(1)','data:text/html,x','file:///etc/passwd','//example.com','https://user:pass@example.com'])assert.equal(C.safeUrl(url),'');assert(C.safeUrl('https://example.com/?q=%3Cscript%3E'));
});
check('BOM CSV, quotes, multiline and spreadsheet formulas',()=>{
 const output=C.csv([['=1+1',' +1','-2','@SUM(A1)','a,b','a"b','a\\nb']]);assert(output.startsWith('\\uFEFF'));assert(output.includes('"\\\'=1+1"'));assert(output.includes('"a""b"'));assert(output.includes('"a\\nb"'));
});
check('backup roundtrip and atomic schema rejection',()=>{
 const custom={id:'my-test',maker:'cst',name:'<img src=x onerror=alert(1)>',catalog:'TEST',category:'reagent',target:'Test',url:'https://example.com',datasheetUrl:'https://example.com/manual.pdf'};
 const backup={version:1,myProducts:[custom],favorites:['my-test'],purchases:[{id:'my-test',quantity:2,quote:1234,memo:'=1+1'}]};assert.deepEqual(C.validateBackup(JSON.parse(JSON.stringify(backup)),makers,p),backup);
 for(const mutate of [v=>v.myProducts[0].url='javascript:alert(1)',v=>v.myProducts[0].datasheetUrl='javascript:alert(1)',v=>v.myProducts[0].datasheetUrl='https://user:pass@example.com/manual.pdf',v=>v.myProducts[0].datasheetUrl=123,v=>v.myProducts.push({...custom}),v=>v.favorites.push('missing'),v=>v.purchases[0].quantity=0,v=>v.purchases[0].quote=-1,v=>v.myProducts[0].price=100,v=>v.myProducts[0].maker='missing',v=>v.myProducts[0].name=123]){const copy=JSON.parse(JSON.stringify(backup));mutate(copy);assert.throws(()=>C.validateBackup(copy,makers,p));}
 assert.throws(()=>C.validateBackup(JSON.parse('{"version":1,"myProducts":[{"__proto__":{}}],"favorites":[],"purchases":[]}'),makers,p));
});
check('secondary candidates respect host, IgM and conjugation',()=>{
 const actin=p.find(x=>x.id==='cst-3700'),igm=p.find(x=>x.id==='sigma-g8795');assert(C.compatibleSecondaries(actin,p).every(s=>s.secondaryFor==='Mouse'));assert(C.compatibleSecondaries(actin,p).length>0);assert.equal(C.compatibleSecondaries(igm,p).length,0);assert.equal(C.compatibleSecondaries({...actin,conjugate:'FITC'},p).length,0);assert.equal(p.find(x=>x.id==='cst-7076').host,'Horse');
});
check('calculators, units and invalid ranges',()=>{
 assert.equal(C.antibodyDilution(1000,10000).stock,10);assert.equal(C.dilution(10,1,10).stock,1);assert(Math.abs(C.molarMass(180.16,0.01,0.1)-0.18016)<1e-12);assert.throws(()=>C.dilution(1,10,1));assert.throws(()=>C.antibodyDilution(0,10));assert.throws(()=>C.molarMass(1,Infinity,1));
});
console.log(checks+' core test groups passed.');
`,context);
