/* All search/product URL templates live here. {q}/{catalog} are URI encoded.
 * Search verification: REVIEW.md, browser review dated 2026-11-12.
 * viaGoogle marks the five GET-search fallbacks; five bot-protected sites remain unverified.
 */
window.LABPICK_MAKERS = [
  {
    "id": "abcam",
    "name": "Abcam",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.abcam.com",
    "searchUrl": "https://www.abcam.com/en-us/search?keywords={q}",
    "color": "#e5ddfa",
    "searchVerified": true
  },
  {
    "id": "cst",
    "name": "Cell Signaling Technology",
    "nameJa": "CST",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.cellsignal.com",
    "searchUrl": "https://www.cellsignal.com/browse?search={q}&site-search-type=products&tab=product",
    "productUrl": "https://www.cellsignal.com/products/{catalog}/datasheet",
    "productVerified": true,
    "color": "#f8dce6",
    "searchVerified": true
  },
  {
    "id": "thermo",
    "name": "Thermo Fisher Scientific (Invitrogen)",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.thermofisher.com",
    "searchUrl": "https://www.thermofisher.com/search/results?query={q}",
    "productUrl": "https://www.thermofisher.com/order/catalog/product/{catalog}",
    "productVerified": true,
    "color": "#ffe3db",
    "searchVerified": true
  },
  {
    "id": "sigma",
    "name": "Sigma-Aldrich (Merck)",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.sigmaaldrich.com",
    "searchUrl": "https://www.sigmaaldrich.com/JP/ja/search/{q}?focus=products&page=1&perpage=30&sort=relevance&term={q}&type=product",
    "productUrl": "https://www.sigmaaldrich.com/JP/ja/product/sigma/{catalog}",
    "productVerified": true,
    "catalogCase": "lower",
    "color": "#ede0f7",
    "searchVerified": true
  },
  {
    "id": "scbt",
    "name": "Santa Cruz Biotechnology",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.scbt.com",
    "searchUrl": "https://www.scbt.com/search?Ntt={q}",
    "color": "#dcecf5",
    "searchVerified": true
  },
  {
    "id": "proteintech",
    "name": "Proteintech",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.ptglab.com",
    "searchUrl": "https://www.ptglab.com/results?q={q}",
    "color": "#d8f0e4",
    "searchVerified": true
  },
  {
    "id": "biolegend",
    "name": "BioLegend",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.biolegend.com",
    "searchUrl": "https://www.biolegend.com/en-us/search-results?search={q}",
    "color": "#ffeacb",
    "searchVerified": false
  },
  {
    "id": "bd",
    "name": "BD Biosciences",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.bdbiosciences.com",
    "searchUrl": "https://www.bdbiosciences.com/en-us/search-results?search={q}",
    "color": "#e0e7fb",
    "searchVerified": true
  },
  {
    "id": "rnd",
    "name": "R&D Systems",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.rndsystems.com",
    "searchUrl": "https://www.rndsystems.com/search?keywords={q}",
    "color": "#f6e2df",
    "searchVerified": true
  },
  {
    "id": "novus",
    "name": "Novus Biologicals（R&D Systems に統合）",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.rndsystems.com",
    "searchUrl": "https://www.rndsystems.com/search?keywords={q}",
    "color": "#e8e0f8",
    "searchVerified": true
  },
  {
    "id": "biorad",
    "name": "Bio-Rad",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.bio-rad.com",
    "searchUrl": "https://www.bio-rad.com/ja-jp/SearchResults?search_api_fulltext={q}",
    "color": "#fae2e9",
    "searchVerified": true
  },
  {
    "id": "jackson",
    "name": "Jackson ImmunoResearch",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.jacksonimmuno.com",
    "searchUrl": "https://www.google.com/search?q={q}%20site%3Ajacksonimmuno.com",
    "color": "#dcefe9",
    "viaGoogle": true,
    "searchVerified": true
  },
  {
    "id": "agilent",
    "name": "Agilent (Dako)",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.agilent.com",
    "searchUrl": "https://www.agilent.com/search/?Ntt={q}",
    "color": "#dfebf9",
    "searchVerified": true
  },
  {
    "id": "genetex",
    "name": "GeneTex",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.genetex.com",
    "searchUrl": "https://www.genetex.com/Product?keyword={q}",
    "color": "#f6e8ce",
    "searchVerified": true
  },
  {
    "id": "promega",
    "name": "Promega",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.promega.com",
    "searchUrl": "https://www.promega.jp/results#q={q}",
    "color": "#eae0f4",
    "searchVerified": true
  },
  {
    "id": "neb",
    "name": "New England Biolabs",
    "nameJa": "NEB",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.neb.com",
    "searchUrl": "https://www.neb.com/en/search#q={q}",
    "color": "#dcefe7",
    "searchVerified": true
  },
  {
    "id": "qiagen",
    "name": "QIAGEN",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.qiagen.com",
    "searchUrl": "https://www.qiagen.com/us/search?query={q}",
    "color": "#e2eafa",
    "searchVerified": true
  },
  {
    "id": "mce",
    "name": "MedChemExpress",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.medchemexpress.com",
    "searchUrl": "https://www.medchemexpress.com/search.html?q={q}",
    "color": "#fbe6dc",
    "searchVerified": true
  },
  {
    "id": "selleck",
    "name": "Selleck Chemicals",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.selleckchem.com",
    "searchUrl": "https://www.google.com/search?q={q}%20site%3Aselleck.co.jp",
    "color": "#f5e4fa",
    "viaGoogle": true,
    "searchVerified": true
  },
  {
    "id": "cayman",
    "name": "Cayman Chemical",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.caymanchem.com",
    "searchUrl": "https://www.caymanchem.com/search?q={q}",
    "color": "#e0f0f0",
    "searchVerified": true
  },
  {
    "id": "peprotech",
    "name": "PeproTech",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.thermofisher.com/peprotech",
    "searchUrl": "https://www.thermofisher.com/search/results?query=PeproTech%20{q}",
    "color": "#f7e6e4",
    "searchVerified": true
  },
  {
    "id": "vector",
    "name": "Vector Laboratories",
    "country": "海外",
    "type": "maker",
    "homepage": "https://vectorlabs.com",
    "searchUrl": "https://vectorlabs.com/?s={q}&post_type=product",
    "color": "#e9e0f5",
    "searchVerified": true
  },
  {
    "id": "roche",
    "name": "Roche (Sigma 経由)",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.sigmaaldrich.com",
    "searchUrl": "https://www.sigmaaldrich.com/JP/ja/search/{q}?focus=products&page=1&perpage=30&sort=relevance&term={q}&type=product",
    "color": "#e3edf6",
    "searchVerified": true
  },
  {
    "id": "cytiva",
    "name": "Cytiva",
    "country": "海外",
    "type": "maker",
    "homepage": "https://www.cytivalifesciences.com",
    "searchUrl": "https://www.cytivalifesciences.com/en/us/search#q={q}",
    "color": "#e2eee0",
    "searchVerified": false
  },
  {
    "id": "wako",
    "name": "FUJIFILM Wako",
    "nameJa": "富士フイルム和光純薬",
    "country": "JP",
    "type": "maker",
    "homepage": "https://labchem-wako.fujifilm.com",
    "searchUrl": "https://labchem-wako.fujifilm.com/jp/product/result/product.html?fw={q}",
    "color": "#f9dfdf",
    "searchVerified": true
  },
  {
    "id": "nacalai",
    "name": "Nacalai Tesque",
    "nameJa": "ナカライテスク",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.nacalai.co.jp",
    "searchUrl": "https://www.nacalai.co.jp/products/search/?q={q}",
    "color": "#dfeede",
    "searchVerified": true
  },
  {
    "id": "mbl",
    "name": "MBL",
    "nameJa": "医学生物学研究所",
    "country": "JP",
    "type": "maker",
    "homepage": "https://ruo.mbl.co.jp",
    "searchUrl": "https://mbl.dga.jp/g/?kw={q}",
    "color": "#e9e0f8",
    "searchVerified": true
  },
  {
    "id": "dojindo",
    "name": "Dojindo",
    "nameJa": "同仁化学研究所",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.dojindo.co.jp",
    "searchUrl": "https://www.google.com/search?q={q}%20site%3Adojindo.co.jp",
    "color": "#ffe9d5",
    "viaGoogle": true,
    "searchVerified": true
  },
  {
    "id": "takara",
    "name": "Takara Bio",
    "nameJa": "タカラバイオ",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.takara-bio.co.jp",
    "searchUrl": "https://search.takara-bio.co.jp/search?query={q}",
    "color": "#f7dfeb",
    "searchVerified": true
  },
  {
    "id": "toyobo",
    "name": "TOYOBO",
    "nameJa": "東洋紡",
    "country": "JP",
    "type": "maker",
    "homepage": "https://lifescience.toyobo.co.jp",
    "searchUrl": "https://lifescience.toyobo.co.jp/products/list.php?mode=search&search_fukumanai=on&search_keyword_header={q}&search_type=%E8%A3%BD%E5%93%81%E6%A4%9C%E7%B4%A2",
    "color": "#e0e9f6",
    "searchVerified": true
  },
  {
    "id": "nippongene",
    "name": "NIPPON GENE",
    "nameJa": "ニッポンジーン",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.nippongene.com",
    "searchUrl": "https://www.google.com/search?q={q}%20site%3Anippongene.com",
    "color": "#e2eee8",
    "viaGoogle": true,
    "searchVerified": true
  },
  {
    "id": "tci",
    "name": "Tokyo Chemical Industry (TCI)",
    "nameJa": "東京化成工業",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.tcichemicals.com",
    "searchUrl": "https://www.tcichemicals.com/JP/ja/search?text={q}",
    "color": "#f4e3ef",
    "searchVerified": true
  },
  {
    "id": "nichirei",
    "name": "Nichirei Biosciences",
    "nameJa": "ニチレイバイオサイエンス",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.nichirei.co.jp/bio/",
    "searchUrl": "https://www.google.com/search?q={q}%20site%3Anichirei.co.jp",
    "color": "#fae5d8",
    "viaGoogle": true,
    "searchVerified": true
  },
  {
    "id": "atto",
    "name": "ATTO",
    "nameJa": "アトー",
    "country": "JP",
    "type": "maker",
    "homepage": "https://www.atto.co.jp",
    "searchUrl": "https://www.atto.co.jp/search?q={q}",
    "color": "#e6e5f6",
    "searchVerified": true
  },
  {
    "id": "cosmo",
    "name": "Cosmo Bio",
    "nameJa": "コスモ・バイオ",
    "country": "JP",
    "type": "distributor",
    "homepage": "https://www.cosmobio.co.jp",
    "searchUrl": "https://www.cosmobio.co.jp/search/sitesearch-result-ss.asp?query={q}",
    "color": "#f9dfeb",
    "searchVerified": true
  },
  {
    "id": "funakoshi",
    "name": "Funakoshi",
    "nameJa": "フナコシ",
    "country": "JP",
    "type": "distributor",
    "homepage": "https://www.funakoshi.co.jp",
    "searchUrl": "https://www.funakoshi.co.jp/searches?search_word={q}",
    "color": "#e1eee8",
    "searchVerified": false
  },
  {
    "id": "citeab",
    "name": "CiteAb",
    "country": "海外",
    "type": "aggregator",
    "homepage": "https://www.citeab.com",
    "searchUrl": "https://www.citeab.com/antibodies/search?q={q}",
    "color": "#ece1f7",
    "searchVerified": false
  },
  {
    "id": "biocompare",
    "name": "Biocompare",
    "country": "海外",
    "type": "aggregator",
    "homepage": "https://www.biocompare.com",
    "searchUrl": "https://www.biocompare.com/General-Search/?search={q}",
    "color": "#e1eafa",
    "searchVerified": false
  },
  {
    "id": "antibodypedia",
    "name": "Antibodypedia",
    "country": "海外",
    "type": "aggregator",
    "homepage": "https://www.antibodypedia.com",
    "searchUrl": "https://www.antibodypedia.com/explore/{q}",
    "color": "#dff0e9",
    "searchVerified": true
  },
  {
    "id": "pubmed",
    "name": "PubMed",
    "country": "海外",
    "type": "aggregator",
    "homepage": "https://pubmed.ncbi.nlm.nih.gov",
    "searchUrl": "https://pubmed.ncbi.nlm.nih.gov/?term={q}",
    "color": "#dfe8f7",
    "searchVerified": true
  },
  {
    "id": "scholar",
    "name": "Google Scholar",
    "country": "海外",
    "type": "aggregator",
    "homepage": "https://scholar.google.com",
    "searchUrl": "https://scholar.google.com/scholar?q={q}",
    "color": "#f5e4ec",
    "searchVerified": true
  }
];
window.LABPICK_LINKS = {
  search: function (maker, query) {
    return maker.searchUrl.replaceAll('{q}', encodeURIComponent(query));
  },
  product: function (maker, product) {
    if (product.url) return {url:product.url, direct:true};
    if (maker.productUrl) return {url:maker.productUrl.replaceAll('{catalog}', encodeURIComponent(maker.catalogCase === 'lower' ? product.catalog.toLowerCase() : product.catalog)),direct:true};
    return {url:this.search(maker,product.catalog),direct:false};
  }
};
