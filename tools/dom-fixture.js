'use strict';
/* A small DOM fixture for dependency-free event-flow tests. This is not a browser
 * engine: CSS, layout, rendering, browser permissions and native focus are not tested. */
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const decode=s=>s.replace(/&(#\d+|#x[\da-f]+|amp|lt|gt|quot|apos);/gi,(m,v)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"}[v]??String.fromCodePoint(v[1]?.toLowerCase()==='x'?parseInt(v.slice(2),16):parseInt(v.slice(1),10))));
const voidTags=new Set(['input','img','meta','link','br','hr','source','wbr','area','base','embed','param','col']);
function fixture(initialUrl,storageSeed={},denyStorage=false){
  let document,unique=0;
  const state={storage:new Map(Object.entries(storageSeed)),clipboard:'',downloads:[],opened:[],timers:[],events:new Map(),errors:[]};
  const location=new URL(initialUrl);
  class Element{
    constructor(tag,attrs={},text=''){this.tagName=tag.toUpperCase();this.attrs=attrs;this.children=[];this.parentElement=null;this._text=text;this.style={};this.files=[];}
    get dataset(){return Object.fromEntries(Object.entries(this.attrs).filter(([key])=>key.startsWith('data-')).map(([key,value])=>[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),value]));}
    get id(){return this.attrs.id||'';}get name(){return this.attrs.name||'';}
    get hidden(){return 'hidden' in this.attrs;}set hidden(v){if(v)this.attrs.hidden='';else delete this.attrs.hidden;}
    get open(){return 'open' in this.attrs;}set open(v){if(v)this.attrs.open='';else delete this.attrs.open;}
    get disabled(){return 'disabled' in this.attrs;}set disabled(v){if(v)this.attrs.disabled='';else delete this.attrs.disabled;}
    get checked(){return 'checked' in this.attrs;}set checked(v){if(v)this.attrs.checked='';else delete this.attrs.checked;}
    get value(){if(this._value!==undefined)return this._value;if(this.tagName==='TEXTAREA')return this.textContent;if(this.tagName==='SELECT'){const options=this.querySelectorAll('option'),selected=options.find(o=>'selected' in o.attrs)||options[0];return selected?selected.attrs.value??selected.textContent:'';}return this.attrs.value??'';}
    set value(v){this._value=String(v);}
    get valueAsNumber(){return this.value===''?NaN:Number(this.value);}
    get download(){return this.attrs.download||'';}set download(v){this.attrs.download=v;}
    get href(){return this.attrs.href||'';}set href(v){this.attrs.href=v;}
    get textContent(){return this.tagName==='#TEXT'?this._text:this.children.map(c=>c.textContent).join('');}
    set textContent(v){this.children=[];this.append(new Element('#text',{},String(v)));}
    set innerHTML(html){this.children=[];parse(String(html),this);}
    get innerHTML(){return this.children.map(c=>c.tagName==='#TEXT'?c._text:'<'+c.tagName.toLowerCase()+'>').join('');}
    get classList(){const self=this;return {contains:c=>(self.attrs.class||'').split(/\s+/).includes(c),toggle(c,on){let set=new Set((self.attrs.class||'').split(/\s+/).filter(Boolean));const add=on??!set.has(c);if(add)set.add(c);else set.delete(c);self.attrs.class=[...set].join(' ');},add(c){this.toggle(c,true);},remove(c){this.toggle(c,false);}};}
    setAttribute(key,value){this.attrs[key]=String(value);}getAttribute(key){return this.attrs[key]??null;}removeAttribute(key){delete this.attrs[key];}
    append(...els){for(const el of els){const child=typeof el==='string'?new Element('#text',{},el):el;child.parentElement=this;this.children.push(child);}}
    remove(){if(this.parentElement)this.parentElement.children=this.parentElement.children.filter(el=>el!==this);this.parentElement=null;}
    querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
    querySelectorAll(selector){const all=[];function walk(node){for(const child of node.children){if(child.tagName!=='#TEXT'){if(matches(child,selector))all.push(child);walk(child);}}}walk(this);return all;}
    closest(selector){let el=this;while(el){if(matches(el,selector))return el;el=el.parentElement;}return null;}
    focus(){document.activeElement=this;}select(){this.focus();}scrollIntoView(){}
    get isConnected(){let el=this;while(el){if(el===document)return true;el=el.parentElement;}return false;}
    getClientRects(){let el=this;while(el){if(el.hidden||(el.tagName==='DIALOG'&&!el.open))return [];el=el.parentElement;}return [{}];}
    getBoundingClientRect(){return {left:0,top:0,right:900,bottom:800};}
    showModal(){this.open=true;}close(){this.open=false;}
    addEventListener(type,fn){const key=this.id+':'+type;if(!state.events.has(key))state.events.set(key,[]);state.events.get(key).push(fn);}
    click(){if(this.tagName==='A'&&this.download){state.downloads.push({name:this.download,blob:state.blobs.get(this.href)});}else return dispatch('click',this);}
    checkValidity(){if('required' in this.attrs&&!this.value)return false;if(this.attrs.type==='number'&&this.value!==''){const v=this.valueAsNumber;if(!Number.isFinite(v))return false;if(this.attrs.min!==undefined&&v<Number(this.attrs.min))return false;if(this.attrs.max!==undefined&&v>Number(this.attrs.max))return false;if(this.attrs.step==='1'&&!Number.isInteger(v))return false;}return true;}
    reportValidity(){return this.checkValidity();}
  }
  function simple(el,selector){let ok=true;selector=selector.replace(/:not\(([^)]+)\)/g,(_,s)=>{if(simple(el,s))ok=false;return '';});if(!ok)return false;
    const tag=selector.match(/^[a-z][\w-]*/i)?.[0];if(tag&&el.tagName!==tag.toUpperCase())return false;
    for(const [,id] of selector.matchAll(/#([\w-]+)/g))if(el.id!==id)return false;
    for(const [,cls] of selector.matchAll(/\.([\w-]+)/g))if(!el.classList.contains(cls))return false;
    for(const [,key,,value] of selector.matchAll(/\[([\w-]+)(?:=(?:(["'])(.*?)\2|([^\]\s]+)))?\]/g)){if(!(key in el.attrs))return false;const full=selector.match(new RegExp('\\['+key+'=([^\\]]+)\\]'));if(full){const expected=(value??full[1]).replace(/^["']|["']$/g,'');if(el.attrs[key]!==expected)return false;}}
    return true;
  }
  function matches(el,selector){return selector.split(',').some(part=>{const chain=part.trim().split(/\s+(?=(?:[^"']|"[^"]*"|'[^']*')*$)/);if(!simple(el,chain.pop()))return false;let parent=el.parentElement;while(chain.length){const match=chain.pop();while(parent&&!simple(parent,match))parent=parent.parentElement;if(!parent)return false;parent=parent.parentElement;}return true;});}
  function parse(html,parent){const stack=[parent];const tokens=html.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[\w:-]+(?:[^"'<>]|"[^"]*"|'[^']*')*>|[^<]+/g)||[];
    for(const token of tokens){if(token.startsWith('<!'))continue;if(token.startsWith('</')){const tag=token.slice(2,-1).trim().toUpperCase();for(let i=stack.length-1;i>0;i--)if(stack[i].tagName===tag){stack.length=i;break;}continue;}
      if(token.startsWith('<')){const tag=token.match(/^<([\w:-]+)/)[1],attrs={};const tail=token.slice(tag.length+1).replace(/\/?\s*>$/,'');for(const [,key,,quoted,plain] of tail.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:(["'])(.*?)\2|([^\s>]+)))?/g))attrs[key]=decode(quoted??plain??'');const el=new Element(tag,attrs);stack.at(-1).append(el);if(!voidTags.has(tag.toLowerCase())&&!token.endsWith('/>'))stack.push(el);
      }else stack.at(-1).append(new Element('#text',{},decode(token)));
    }
  }
  document=new Element('document');parse(fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8'),document);document.body=document.querySelector('body');document.documentElement=document.querySelector('html');document.activeElement=document.body;document.createElement=tag=>new Element(tag);document.execCommand=()=>false;document.addEventListener=(type,fn)=>{const key='document:'+type;if(!state.events.has(key))state.events.set(key,[]);state.events.get(key).push(fn);};
  state.blobs=new Map();class BrowserURL extends URL{}BrowserURL.createObjectURL=blob=>{const key='blob:test-'+(++unique);state.blobs.set(key,blob);return key;};BrowserURL.revokeObjectURL=()=>{};
  const globals={document,location,URL:BrowserURL,URLSearchParams,Blob,console,Intl,FormData:class{constructor(form){this.values=new Map(form.querySelectorAll('input,select,textarea').filter(e=>e.name).map(e=>[e.name,e.value]));}get(k){return this.values.get(k)??null;}},navigator:{clipboard:{writeText:async text=>{state.clipboard=text;}}},localStorage:{getItem:key=>{if(denyStorage)throw Error('denied');return state.storage.get(key)||null;},setItem:(key,value)=>{if(denyStorage)throw Error('denied');state.storage.set(key,value);}},setTimeout:(fn,delay)=>{const job={fn,delay,cancelled:false};state.timers.push(job);return job;},clearTimeout:job=>{if(job)job.cancelled=true;},requestAnimationFrame:fn=>fn(),crypto:{randomUUID:()=>String(++unique).padStart(8,'0')+'-0000-0000-0000-000000000000'},history:{replaceState:(_a,_b,url)=>location.href=new URL(url,location).href},scrollTo:()=>{},print:()=>{state.printed=true;},open:()=>{if(state.popupBlocked)return null;const opened={opener:null,location:{replace:url=>state.opened.push(url)},close:()=>{}};return opened;},addEventListener:(type,fn)=>{const key='window:'+type;if(!state.events.has(key))state.events.set(key,[]);state.events.get(key).push(fn);}};
  globals.window=globals;const context=vm.createContext(globals);
  async function dispatch(type,target,extra={}){const event={type,target,preventDefault(){this.defaultPrevented=true;},...extra};for(const fn of state.events.get('document:'+type)||[])await fn(event);return event;}
  function flush(max=200){const due=state.timers.filter(t=>t.delay<=max);state.timers=state.timers.filter(t=>t.delay>max);for(const job of due)if(!job.cancelled)job.fn();}
  for(const file of ['data/makers.js','data/products.js','assets/js/core.js','assets/app.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context,{filename:file});
  const query=selector=>{const el=document.querySelector(selector);if(!el)throw Error('Missing element: '+selector);return el;};
  return {state,document,context,location,query,dispatch,flush,click:selector=>dispatch('click',query(selector)),fill:async(selector,value,type='input')=>{const el=query(selector);el.value=value;await dispatch(type,el);flush();},change:async(selector,value)=>{const el=query(selector);if(el.attrs.type==='checkbox')el.checked=value;else el.value=value;await dispatch('change',el);},submit:selector=>dispatch('submit',query(selector)),hash:async value=>{location.hash=value;for(const fn of state.events.get('window:hashchange')||[])await fn();}};
}
module.exports=fixture;
