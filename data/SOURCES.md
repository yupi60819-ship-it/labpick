# 製品同定・仕様の公式確認元

確認日：**2026-11-12**。**317製品／26メーカー**。メーカー公式の商品ページ・データシート・取扱説明書を閲覧、または検索エンジンに掲載された公式ページ本文で、製品名・カタログ番号・抗体同定と掲載仕様を照合しました。全ページを実ブラウザで開いたという意味ではありません。`validate-data.js` は形式・重複・価格禁止・仕様欄等を検査するもので、資料の科学的な正しさを自動判定するものではありません。

## 採用・記録基準

- メーカー、番号、抗体の宿主・クローナリティ・クローンを公式資料で同定できた製品だけを採用。価格・引用数は記録していません。
- 元の52製品のidを維持し、265製品を追加しました。既存製品も含め、確認できた交差性・用途・アイソタイプ・保存条件・容量を補完しています。
- 交差性はメーカーの確認済み／Species Reactivity欄を基本にし、配列相同性だけの予測種、引用例だけで追加された種は原則として加えていません。用途と交差性のリストは、全ての種×用途の組合せを保証しません。
- アイソタイプコントロールの交差性、非抗体の宿主・アイソタイプ等、該当しない項目は省略。公式資料のSourceが宿主だけの抗体について、IgGを推定していません。
- 容量は公式資料で確認できた包装のみ。複数の包装を1製品にまとめた基本番号もあります。CST等の包装サフィックス、Dojindoの国内外の包装コードは注文前に公式で確認してください。保存条件は原液／受領時を基本とし、開封・溶解後が異なる場合は明示しました。
- URLテンプレートは引き続き `data/makers.js` のみ。以下は製品ごとの具体的な確認先です。リンクは将来の到達性、地域での入手可能性、販売継続を保証しません。

## 収録数

内蔵317製品／41サイト（製品収録26メーカー）。カテゴリ別・メーカー別は以下のとおりです。

### カテゴリ別

| カテゴリ | 件数 |
|---|---:|
| 消耗品 (`consumable`) | 1 |
| 細胞培養 (`culture`) | 10 |
| サイトカイン (`cytokine`) | 5 |
| 色素・染色 (`dye`) | 3 |
| 酵素・PCR (`enzyme`) | 4 |
| 阻害剤・化合物 (`inhibitor`) | 10 |
| アイソタイプ (`isotype`) | 4 |
| キット・アッセイ (`kit`) | 18 |
| 一次抗体 (`primary`) | 194 |
| 一般試薬・WB (`reagent`) | 34 |
| 二次抗体 (`secondary`) | 12 |
| タグ抗体 (`tag`) | 18 |
| 遺伝子導入 (`transfection`) | 4 |

### メーカー別

| メーカー | 件数 |
|---|---:|
| Abcam (`abcam`) | 69 |
| Agilent (Dako) (`agilent`) | 1 |
| ATTO (`atto`) | 2 |
| Bio-Rad (`biorad`) | 2 |
| Cell Signaling Technology (`cst`) | 69 |
| Cytiva (`cytiva`) | 1 |
| Dojindo (`dojindo`) | 3 |
| Jackson ImmunoResearch (`jackson`) | 2 |
| MBL (`mbl`) | 1 |
| Nacalai Tesque (`nacalai`) | 12 |
| New England Biolabs (`neb`) | 1 |
| Nichirei Biosciences (`nichirei`) | 1 |
| NIPPON GENE (`nippongene`) | 1 |
| Novus Biologicals（R&D Systems に統合） (`novus`) | 2 |
| Promega (`promega`) | 3 |
| Proteintech (`proteintech`) | 63 |
| QIAGEN (`qiagen`) | 2 |
| R&D Systems (`rnd`) | 7 |
| Roche (Sigma 経由) (`roche`) | 2 |
| Santa Cruz Biotechnology (`scbt`) | 3 |
| Sigma-Aldrich (Merck) (`sigma`) | 19 |
| Takara Bio (`takara`) | 3 |
| Thermo Fisher Scientific (Invitrogen) (`thermo`) | 33 |
| TOYOBO (`toyobo`) | 4 |
| Vector Laboratories (`vector`) | 4 |
| FUJIFILM Wako (`wako`) | 7 |

## 同定・比較上の注意

- CST #7076の宿主はHorse、Sigma G8795はIgM。一般的なMouse IgG抗体と混同しません。
- CST #3868の確認交差性はHumanのみ。CST #12653（FOXP3 D6O8R）はMouse／Monkeyです。
- Proteintech Vinculinは現行ページで確認できた66305-2-Ig（3A11F8）を採用。旧66305-1-Igを推定で追加していません。
- Proteintech 30278-1-APはメーカー表記Tyr1092。成熟EGFRのTyr1068に相当する表記差をメモに記録し、比較ターゲットに反映しています。
- AMPKα・p38・HSP90等は抗体ごとのアイソフォーム範囲が異なり、Cleaved Caspase-3でも認識部位・前駆体への反応が異なります。個別メモと公式特異性を確認してください。
- Roche 04693132001はcOmplete EDTA-free（Miniではありません）。Sigma M7449は10 mM DMSO溶液。Staurosporine S5921の原品は2–8°Cです。Chloroquine C6628の粉末の保存はメーカーFAQで室温と確認しました。
- Sigma／MilliporeのWBKLS0500には、ブランドmmの確認済み個別URLを指定。Cytiva RPN2232は1,000 cm²用、説明書指定の受領時保存は18–30°C・遮光です。
- Thermo 10270106は公式ページにValue FBSへの切替案内があります。Sigma P2938は地域によって販売終了表示があり、メーカー記載の対応製品はMillipore IPVH00010です。

- KIF1Bはtotalを5社8製品、Ser1487リン酸化体をCSTの1製品で収録。リン酸化体は別ターゲットです。`KIF1Bα`／`KIF1Bβ`は検索用の別名であり、各製品が両アイソフォームを認識する保証ではありません。抗原部位と参照配列が異なるため、公式の免疫原範囲を各製品のnoteに記録しました。
- Abcam ab234869は提示された日本語URLを取得できなかったため、同じ番号の現行英語公式商品ページで照合しました。IHC-P／Humanのみを収録しています。CST #11993のMouse・Rat・Monkeyは予測交差性なので加えていません。NB100-57494の用途は公式用途欄のIPのみです。
- 現行品の確認は、公式商品ページと購入欄または現行ターゲット別カタログへの掲載に基づきます。ThermoのBethyl A301-055Aは既存の`thermo`、Novusの2製品は既存の`novus`に帰属させ、メーカー定義は変更していません。

## 製品別の確認先（全317件）

| 製品id | メーカー／カタログ番号 | ターゲット | 公式確認元 |
|---|---|---|---|
| `sigma-a5441` | Sigma-Aldrich (Merck) / `A5441` | β-Actin | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/a5441) / [公式資料2](https://www.merckmillipore.com/deepweb/assets/sigmaaldrich/product/documents/296/386/a5441dat.pdf) |
| `cst-3700` | Cell Signaling Technology / `3700` | β-Actin | [公式資料1](https://media.cellsignal.com/pdf/3700.pdf) |
| `proteintech-66009` | Proteintech / `66009-1-Ig` | β-Actin | [公式資料1](https://www.ptglab.com/products/Pan-Actin-Antibody-66009-1-Ig.htm) / [公式資料2](https://www.ptglab.com/Products/Pictures/pdf/66009-1-Ig.pdf) |
| `thermo-ma5-15739` | Thermo Fisher Scientific (Invitrogen) / `MA5-15739` | β-Actin | [公式資料1](https://www.thermofisher.com/order/genome-database/dataSheetPdf?productId=MA5-15739&productsubtype=antibody_primary&producttype=antibody&version=Local) / [公式資料2](https://www.thermofisher.com/order/genome-database/generatePdf?assayType=ANTIBODY&detailed=true&productId=MA5-15739&productName=beta+Actin+Loading+Control) |
| `scbt-sc-47778` | Santa Cruz Biotechnology / `sc-47778` | β-Actin | [公式資料1](https://www.scbt.com/p/beta-actin-antibody-c4) / [公式資料2](https://datasheets.scbt.com/sc-47778.pdf) |
| `abcam-ab8245` | Abcam / `ab8245` | GAPDH | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/gapdh-antibody-6c5-loading-control-ab8245) |
| `proteintech-60004` | Proteintech / `60004-1-Ig` | GAPDH | [公式資料1](https://www.ptglab.com/products/GAPDH-Antibody-60004-1-Ig.htm) / [公式資料2](https://www.ptglab.com/products/pictures/pdf/60004-1-Ig.pdf) |
| `cst-2118` | Cell Signaling Technology / `2118` | GAPDH | [公式資料1](https://www.cellsignal.com/products/primary-antibodies/gapdh-14c10-rabbit-monoclonal-antibody/2118) / [公式資料2](https://media.cellsignal.com/pdf/2118.pdf) |
| `sigma-g8795` | Sigma-Aldrich (Merck) / `G8795` | GAPDH | [公式資料1](https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/documents/375/053/g8795dat.pdf) |
| `cst-4370` | Cell Signaling Technology / `4370` | ERK1/2 (phospho Thr202/Tyr204) | [公式資料1](https://media.cellsignal.com/pdf/4370.pdf) / [公式資料2](https://www.cellsignal.com/products/4370/datasheet?images=1&protocol=0) |
| `cst-9102` | Cell Signaling Technology / `9102` | ERK1/2 | [公式資料1](https://www.cellsignal.com/products/primary-antibodies/p44-42-mapk-erk1-2-antibody/9102) |
| `cst-4060` | Cell Signaling Technology / `4060` | Akt (phospho Ser473) | [公式資料1](https://www.cellsignal.com/products/4060/datasheet) |
| `cst-4691` | Cell Signaling Technology / `4691` | Akt | [公式資料1](https://media.cellsignal.com/pdf/4691.pdf) / [公式資料2](https://www.cellsignal.com/products/antibodies/akt) |
| `cst-9664` | Cell Signaling Technology / `9664` | Cleaved Caspase-3 | [公式資料1](https://www.cellsignal.com/products/9664/datasheet) |
| `cst-3868` | Cell Signaling Technology / `3868` | LC3B | [公式資料1](https://media.cellsignal.com/pdf/3868.pdf) / [公式資料2](https://www.cellsignal.com/products/primary-antibodies/lc3b-d11-rabbit-monoclonal-antibody/3868) |
| `sigma-f1804` | Sigma-Aldrich (Merck) / `F1804` | FLAG tag | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/f1804) |
| `scbt-sc-40` | Santa Cruz Biotechnology / `sc-40` | Myc | [公式資料1](https://www.scbt.com/p/c-myc-antibody-9e10) / [公式資料2](https://datasheets.scbt.com/sc-40.pdf) |
| `abcam-ab290` | Abcam / `ab290` | GFP | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/gfp-antibody-ab290) |
| `cst-7074` | Cell Signaling Technology / `7074` | Rabbit IgG | [公式資料1](https://www.cellsignal.com/products/7074/datasheet) |
| `cst-7076` | Cell Signaling Technology / `7076` | Mouse IgG | [公式資料1](https://media.cellsignal.com/pdf/7076.pdf) / [公式資料2](https://www.cellsignal.com/products/9781/datasheet?images=0&protocol=0) |
| `thermo-a-11008` | Thermo Fisher Scientific (Invitrogen) / `A-11008` | Rabbit IgG | [公式資料1](https://www.thermofisher.com/order/genome-database/dataSheetPdf?productId=A-11008&productsubtype=antibody_secondary&producttype=antibody&version=Local) / [公式資料2](https://www.thermofisher.com/antibody/product/Goat-anti-Rabbit-IgG-H-L-Cross-Adsorbed-Secondary-Antibody-Polyclonal/A-11008) |
| `thermo-a-11001` | Thermo Fisher Scientific (Invitrogen) / `A-11001` | Mouse IgG | [公式資料1](https://www.thermofisher.com/antibody/product/Goat-anti-Mouse-IgG-H-L-Cross-Adsorbed-Secondary-Antibody-Polyclonal/A-11001) / [公式資料2](https://www.thermofisher.com/antibody/product/A-11001.html) |
| `thermo-a-11012` | Thermo Fisher Scientific (Invitrogen) / `A-11012` | Rabbit IgG | [公式資料1](https://www.thermofisher.com/antibody/product/Goat-anti-Rabbit-IgG-H-L-Cross-Adsorbed-Secondary-Antibody-Polyclonal/A-11012) |
| `thermo-a-11005` | Thermo Fisher Scientific (Invitrogen) / `A-11005` | Mouse IgG | [公式資料1](https://www.thermofisher.com/order/genome-database/dataSheetPdf?productId=A-11005&productsubtype=antibody_secondary&producttype=antibody&version=Local) / [公式資料2](https://www.thermofisher.com/antibody/product/Goat-anti-Mouse-IgG-H-L-Secondary-Antibody-Polyclonal/A-11005) |
| `cst-3900` | Cell Signaling Technology / `3900` | Isotype control | [公式資料1](https://media.cellsignal.com/pdf/3900.pdf) / [公式資料2](https://www.cellsignal.com/learn-and-support/technical-support/what-is-the-difference-between-normal-rabbit-igg-2729-and-rabbit-da1e-mab-igg-xp-isotype-control-3900/000001493) |
| `thermo-23225` | Thermo Fisher Scientific (Invitrogen) / `23225` | Protein quantification | [公式資料1](https://www.thermofisher.com/order/catalog/product/23225) |
| `thermo-32106` | Thermo Fisher Scientific (Invitrogen) / `32106` | Chemiluminescent detection | [公式資料1](https://www.thermofisher.com/order/catalog/product/32106) |
| `nacalai-03953-95` | Nacalai Tesque / `03953-95` | Blocking | [公式資料1](https://www.nacalai.co.jp/products/24/) |
| `toyobo-nkb-101` | TOYOBO / `NKB-101` | Antibody dilution | [公式資料1](https://www.toyobo-global.com/sites/default/static_root/products/lifescience/support/manual/NKB-101.pdf) / [公式資料2](https://lifescience.toyobo.co.jp/detail/detail.php?product_detail_id=122) |
| `thermo-d1306` | Thermo Fisher Scientific (Invitrogen) / `D1306` | DNA | [公式資料1](https://www.thermofisher.com/order/catalog/product/D1306) |
| `thermo-p36930` | Thermo Fisher Scientific (Invitrogen) / `P36930` | Antifade mounting | [公式資料1](https://www.thermofisher.com/order/catalog/product/cn/en/P36930) / [公式資料2](https://www.thermofisher.com/order/catalog/product/P36930) |
| `thermo-15596026` | Thermo Fisher Scientific (Invitrogen) / `15596026` | RNA isolation | [公式資料1](https://www.thermofisher.com/order/catalog/product/15596026) |
| `qiagen-74104` | QIAGEN / `74104` | RNA isolation | [公式資料1](https://www.qiagen.com/co/products/discovery-and-translational-research/dna-rna-purification/rna-purification/total-rna/rneasy-kits) / [公式資料2](https://www.qiagen.com/en-us/resources/download/protocols/rneasy-mini-kit-part-2-en) |
| `takara-rr037a` | Takara Bio / `RR037A` | Reverse transcription | [公式資料1](https://catalog.takara-bio.co.jp/product/basic_info.php?unitid=U100005168) / [公式資料2](https://catalog.takara-bio.co.jp/PDFS/rr037a_j.pdf) |
| `neb-m0491s` | New England Biolabs / `M0491S` | PCR | [公式資料1](https://www.neb.com/en-us/products/m0491-q5-high-fidelity-dna-polymerase) / [公式資料2](https://www.neb.com/en-us/-/media/catalog/certificates-of-analysis/m/0/m0491s_v2_10298675.pdf?hash=9AAAC542DE5BE0EB485A3A6E4298A73A&rev=e06667ab4c834321a0faf256628a3ccd) / [公式資料3](https://www.neb.com/en-us/-/media/nebus/files/catalogs/us_neb_catalog_technicalreference_2023_24.pdf) |
| `thermo-11965092` | Thermo Fisher Scientific (Invitrogen) / `11965092` | Cell culture medium | [公式資料1](https://www.thermofisher.com/order/catalog/product/11965092) |
| `thermo-11875093` | Thermo Fisher Scientific (Invitrogen) / `11875093` | Cell culture medium | [公式資料1](https://www.thermofisher.com/order/catalog/product/11875093) |
| `thermo-15140122` | Thermo Fisher Scientific (Invitrogen) / `15140122` | Antibiotic supplement | [公式資料1](https://www.thermofisher.com/order/catalog/product/15140122) |
| `thermo-l3000008` | Thermo Fisher Scientific (Invitrogen) / `L3000008` | Transfection | [公式資料1](https://www.thermofisher.com/order/catalog/product/L3000008) |
| `thermo-11668019` | Thermo Fisher Scientific (Invitrogen) / `11668019` | Transfection | [公式資料1](https://www.thermofisher.com/order/catalog/product/11668019) |
| `thermo-13778030` | Thermo Fisher Scientific (Invitrogen) / `13778030` | Transfection | [公式資料1](https://www.thermofisher.com/order/catalog/product/hk/en/13778030) / [公式資料2](https://www.thermofisher.com/order/catalog/product/13778030) |
| `dojindo-ck04` | Dojindo / `CK04` | Cell viability assay | [公式資料1](https://www.dojindo.co.jp/products/CK04/) / [公式資料2](https://www.dojindo.co.jp/manual/CK04/) |
| `promega-g7570` | Promega / `G7570` | Cell viability assay | [公式資料1](https://www.promega.com/products/cell-health-assays/cell-viability-and-cytotoxicity-assays/celltiter_glo-luminescent-cell-viability-assay/) / [公式資料2](https://france.promega.com/-/media/files/resources/protcards/fb256-celltiter-glo-luminescent-cell-viability-assay.pdf?rev=d8c51091b58c43fea4cad5b36f503658&sc_lang=fr-fr) |
| `promega-e1910` | Promega / `E1910` | Luciferase reporter assay | [公式資料1](https://www.promega.com/products/luciferase-assays/reporter-assays/dual_luciferase-reporter-assay-system) / [公式資料2](https://worldwide.promega.com/-/media/files/resources/protocols/technical-manuals/0/dual-luciferase-reporter-assay-system-protocol.pdf?rev=f0acb9ea85df40e3b3c9a6ec6152a844&sc_lang=en) |
| `sigma-m7449` | Sigma-Aldrich (Merck) / `M7449` | Proteasome | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/m7449) |
| `sigma-r0395` | Sigma-Aldrich (Merck) / `R0395` | mTOR | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/r0395) |
| `sigma-c7698` | Sigma-Aldrich (Merck) / `C7698` | Protein synthesis | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/c7698) |
| `sigma-c6628` | Sigma-Aldrich (Merck) / `C6628` | Lysosome | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/c6628) |
| `rnd-240-b` | R&D Systems / `240-B` | TGF-β1 | [公式資料1](https://www.rndsystems.com/products/recombinant-human-tgf-beta-1-protein_240-b) / [公式資料2](https://resources.rndsystems.com/pdfs/datasheets/240-b.pdf) |
| `rnd-236-eg` | R&D Systems / `236-EG` | EGF | [公式資料1](https://www.rndsystems.com/products/recombinant-human-egf-protein-cf_236-eg) / [公式資料2](https://resources.rndsystems.com/pdfs/datasheets/236-eg.pdf) |
| `rnd-206-il` | R&D Systems / `206-IL` | IL-6 | [公式資料1](https://www.rndsystems.com/products/recombinant-human-il-6-protein_206-il) / [公式資料2](https://resources.rndsystems.com/pdfs/datasheets/206-il.pdf) |
| `rnd-210-ta` | R&D Systems / `210-TA` | TNF-α | [公式資料1](https://www.rndsystems.com/products/recombinant-human-tnf-alpha-protein_210-ta) / [公式資料2](https://resources.rndsystems.com/pdfs/datasheets/210-ta.pdf) |
| `cst-3873` | Cell Signaling Technology / `3873` | α-Tubulin | [公式資料1](https://media.cellsignal.com/pdf/3873.pdf) |
| `cst-2128` | Cell Signaling Technology / `2128` | β-Tubulin | [公式資料1](https://media.cellsignal.com/pdf/2128.pdf) |
| `cst-4499` | Cell Signaling Technology / `4499` | Histone H3 | [公式資料1](https://media.cellsignal.com/pdf/4499.pdf) |
| `cst-2524` | Cell Signaling Technology / `2524` | p53 | [公式資料1](https://media.cellsignal.com/pdf/2524.pdf) |
| `cst-2947` | Cell Signaling Technology / `2947` | p21 | [公式資料1](https://media.cellsignal.com/pdf/2947.pdf) |
| `cst-2978` | Cell Signaling Technology / `2978` | Cyclin D1 | [公式資料1](https://media.cellsignal.com/pdf/2978.pdf) |
| `cst-9129` | Cell Signaling Technology / `9129` | Ki-67 | [公式資料1](https://media.cellsignal.com/pdf/9129.pdf) |
| `cst-2586` | Cell Signaling Technology / `2586` | PCNA | [公式資料1](https://media.cellsignal.com/pdf/2586.pdf) |
| `cst-9139` | Cell Signaling Technology / `9139` | STAT3 | [公式資料1](https://media.cellsignal.com/pdf/9139.pdf) |
| `cst-9145` | Cell Signaling Technology / `9145` | STAT3 (phospho Tyr705) | [公式資料1](https://media.cellsignal.com/pdf/9145.pdf) |
| `cst-8242` | Cell Signaling Technology / `8242` | NF-κB p65 | [公式資料1](https://media.cellsignal.com/pdf/8242.pdf) |
| `cst-2983` | Cell Signaling Technology / `2983` | mTOR | [公式資料1](https://media.cellsignal.com/pdf/2983.pdf) |
| `cst-5536` | Cell Signaling Technology / `5536` | mTOR (phospho Ser2448) | [公式資料1](https://media.cellsignal.com/pdf/5536.pdf) |
| `cst-2217` | Cell Signaling Technology / `2217` | S6 | [公式資料1](https://media.cellsignal.com/pdf/2217.pdf) |
| `cst-2211` | Cell Signaling Technology / `2211` | S6 (phospho Ser235/236) | [公式資料1](https://media.cellsignal.com/pdf/2211.pdf) |
| `cst-9212` | Cell Signaling Technology / `9212` | p38 MAPK | [公式資料1](https://media.cellsignal.com/pdf/9212.pdf) |
| `cst-2532` | Cell Signaling Technology / `2532` | AMPKα | [公式資料1](https://media.cellsignal.com/pdf/2532.pdf) |
| `cst-4267` | Cell Signaling Technology / `4267` | EGFR | [公式資料1](https://media.cellsignal.com/pdf/4267.pdf) |
| `cst-2165` | Cell Signaling Technology / `2165` | HER2 | [公式資料1](https://media.cellsignal.com/pdf/2165.pdf) |
| `cst-8480` | Cell Signaling Technology / `8480` | β-Catenin | [公式資料1](https://media.cellsignal.com/pdf/8480.pdf) |
| `cst-14074` | Cell Signaling Technology / `14074` | YAP | [公式資料1](https://media.cellsignal.com/pdf/14074.pdf) |
| `cst-3195` | Cell Signaling Technology / `3195` | E-Cadherin | [公式資料1](https://media.cellsignal.com/pdf/3195.pdf) |
| `cst-13116` | Cell Signaling Technology / `13116` | N-Cadherin | [公式資料1](https://media.cellsignal.com/pdf/13116.pdf) |
| `cst-5741` | Cell Signaling Technology / `5741` | Vimentin | [公式資料1](https://media.cellsignal.com/pdf/5741.pdf) |
| `cst-3879` | Cell Signaling Technology / `3879` | Snail | [公式資料1](https://media.cellsignal.com/pdf/3879.pdf) |
| `cst-19245` | Cell Signaling Technology / `19245` | α-SMA | [公式資料1](https://media.cellsignal.com/pdf/19245.pdf) |
| `cst-5605` | Cell Signaling Technology / `5605` | c-Myc | [公式資料1](https://media.cellsignal.com/pdf/5605.pdf) |
| `cst-9542` | Cell Signaling Technology / `9542` | PARP1 | [公式資料1](https://media.cellsignal.com/pdf/9542.pdf) |
| `cst-9662` | Cell Signaling Technology / `9662` | Caspase-3 | [公式資料1](https://media.cellsignal.com/pdf/9662.pdf) |
| `cst-2870` | Cell Signaling Technology / `2870` | Bcl-2 | [公式資料1](https://media.cellsignal.com/pdf/2870.pdf) |
| `cst-5023` | Cell Signaling Technology / `5023` | Bax | [公式資料1](https://media.cellsignal.com/pdf/5023.pdf) |
| `cst-5114` | Cell Signaling Technology / `5114` | p62/SQSTM1 | [公式資料1](https://media.cellsignal.com/pdf/5114.pdf) |
| `cst-9718` | Cell Signaling Technology / `9718` | γH2AX (Ser139) | [公式資料1](https://media.cellsignal.com/pdf/9718.pdf) |
| `cst-99940` | Cell Signaling Technology / `99940` | CD3 | [公式資料1](https://media.cellsignal.com/pdf/99940.pdf) |
| `cst-25229` | Cell Signaling Technology / `25229` | CD4 | [公式資料1](https://media.cellsignal.com/pdf/25229.pdf) |
| `cst-98941` | Cell Signaling Technology / `98941` | CD8 | [公式資料1](https://media.cellsignal.com/pdf/98941.pdf) |
| `cst-77699` | Cell Signaling Technology / `77699` | CD31 | [公式資料1](https://media.cellsignal.com/pdf/77699.pdf) |
| `cst-76437` | Cell Signaling Technology / `76437` | CD68 | [公式資料1](https://media.cellsignal.com/pdf/76437.pdf) |
| `cst-70076` | Cell Signaling Technology / `70076` | F4/80 | [公式資料1](https://media.cellsignal.com/pdf/70076.pdf) |
| `cst-86163` | Cell Signaling Technology / `86163` | PD-1 | [公式資料1](https://media.cellsignal.com/pdf/86163.pdf) |
| `cst-13684` | Cell Signaling Technology / `13684` | PD-L1 | [公式資料1](https://media.cellsignal.com/pdf/13684.pdf) |
| `cst-12653` | Cell Signaling Technology / `12653` | FOXP3 | [公式資料1](https://media.cellsignal.com/pdf/12653.pdf) |
| `cst-13917` | Cell Signaling Technology / `13917` | CD45 | [公式資料1](https://media.cellsignal.com/pdf/13917.pdf) |
| `cst-3724` | Cell Signaling Technology / `3724` | HA tag | [公式資料1](https://media.cellsignal.com/pdf/3724.pdf) |
| `cst-12698` | Cell Signaling Technology / `12698` | His tag | [公式資料1](https://media.cellsignal.com/pdf/12698.pdf) |
| `cst-13202` | Cell Signaling Technology / `13202` | V5 tag | [公式資料1](https://media.cellsignal.com/pdf/13202.pdf) |
| `cst-12586` | Cell Signaling Technology / `12586` | Lamin B1 | [公式資料1](https://www.cellsignal.com/products/12586/datasheet?images=0&protocol=0) |
| `cst-13901` | Cell Signaling Technology / `13901` | Vinculin | [公式資料1](https://www.cellsignal.com/products/13901/datasheet?images=0&protocol=0) |
| `cst-36169` | Cell Signaling Technology / `36169` | HIF-1α | [公式資料1](https://www.cellsignal.com/products/primary-antibodies/hif-1-alpha-d1s7w-rabbit-monoclonal-antibody/36169) |
| `cst-17800` | Cell Signaling Technology / `17800` | CD11b | [公式資料1](https://www.cellsignal.com/products/17800/datasheet?images=1&protocol=0) |
| `proteintech-11224-1-ap` | Proteintech / `11224-1-AP` | α-Tubulin | [公式資料1](https://www.ptglab.com/products/Pictures/pdf/11224-1-AP.pdf) |
| `proteintech-10094-1-ap` | Proteintech / `10094-1-AP` | β-Tubulin | [公式資料1](https://www.ptglab.com/products/TUBB-Antibody-10094-1-AP.htm) / [公式資料2](https://www.ptglab.com/Products/Pictures/pdf/10094-1-AP.pdf) |
| `proteintech-12987-1-ap` | Proteintech / `12987-1-AP` | Lamin B1 | [公式資料1](https://www.ptglab.com/products/LMNB1-Antibody-12987-1-AP.htm) / [公式資料2](https://www.ptglab.com/products/pictures/pdf/12987-1-AP.pdf) |
| `proteintech-17168-1-ap` | Proteintech / `17168-1-AP` | Histone H3 | [公式資料1](https://www.ptglab.com/products/Histone-H3-Antibody-17168-1-AP.htm) |
| `proteintech-66305-2-ig` | Proteintech / `66305-2-Ig` | Vinculin | [公式資料1](https://www.ptglab.com/products/Vinculin-Antibody-66305-2-Ig.htm) |
| `proteintech-26939-1-ap` | Proteintech / `26939-1-AP` | Cyclin D1 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/26939-1-AP.pdf) |
| `proteintech-27309-1-ap` | Proteintech / `27309-1-AP` | Ki-67 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/27309-1-AP.pdf) |
| `proteintech-10253-2-ap` | Proteintech / `10253-2-AP` | STAT3 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/10253-2-AP.pdf) |
| `proteintech-10745-1-ap` | Proteintech / `10745-1-AP` | NF-κB p65 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/10745-1-AP.pdf) |
| `proteintech-20657-1-ap` | Proteintech / `20657-1-AP` | mTOR | [公式資料1](https://www.ptglab.com/products/pictures/pdf/20657-1-AP.pdf) |
| `proteintech-14064-1-ap` | Proteintech / `14064-1-AP` | p38 MAPK | [公式資料1](https://www.ptglab.com/products/pictures/pdf/14064-1-AP.pdf) |
| `proteintech-18299-1-ap` | Proteintech / `18299-1-AP` | HER2 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/18299-1-AP.pdf) |
| `proteintech-51067-2-ap` | Proteintech / `51067-2-AP` | β-Catenin | [公式資料1](https://www.ptglab.com/products/pictures/pdf/51067-2-AP.pdf) |
| `proteintech-13584-1-ap` | Proteintech / `13584-1-AP` | YAP | [公式資料1](https://www.ptglab.com/products/pictures/pdf/13584-1-AP.pdf) |
| `proteintech-10355-1-ap` | Proteintech / `10355-1-AP` | p21 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/10355-1-AP.pdf) |
| `proteintech-10205-2-ap` | Proteintech / `10205-2-AP` | PCNA | [公式資料1](https://www.ptglab.com/products/Pictures/pdf/10205-2-AP.pdf) |
| `proteintech-10442-1-ap` | Proteintech / `10442-1-AP` | p53 | [公式資料1](https://www.ptglab.com/products/P53-Antibody-10442-1-AP.htm) |
| `proteintech-66886-1-ig` | Proteintech / `66886-1-Ig` | S6 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/66886-1-Ig.pdf) |
| `proteintech-10929-2-ap` | Proteintech / `10929-2-AP` | AMPKα | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/10929-2-AP.pdf) |
| `proteintech-18986-1-ap` | Proteintech / `18986-1-AP` | EGFR | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/18986-1-AP.pdf) |
| `proteintech-10366-1-ap` | Proteintech / `10366-1-AP` | Vimentin | [公式資料1](https://www.ptglab.com/products/pictures/pdf/10366-1-AP.pdf) |
| `proteintech-20960-1-ap` | Proteintech / `20960-1-AP` | HIF-1α | [公式資料1](https://www.ptglab.com/products/pictures/pdf/20960-1-AP.pdf) |
| `proteintech-13371-1-ap` | Proteintech / `13371-1-AP` | PARP1 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/13371-1-AP.pdf) |
| `proteintech-12789-1-ap` | Proteintech / `12789-1-AP` | Bcl-2 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/12789-1-AP.pdf) |
| `proteintech-50599-2-ig` | Proteintech / `50599-2-Ig` | Bax | [公式資料1](https://www.ptglab.com/products/pictures/pdf/50599-2-Ig.pdf) |
| `proteintech-18420-1-ap` | Proteintech / `18420-1-AP` | p62/SQSTM1 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/18420-1-AP.pdf) |
| `proteintech-22018-1-ap` | Proteintech / `22018-1-AP` | N-Cadherin | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/22018-1-AP.pdf) |
| `proteintech-13099-1-ap` | Proteintech / `13099-1-AP` | Snail | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/13099-1-AP.pdf) |
| `proteintech-14395-1-ap` | Proteintech / `14395-1-AP` | α-SMA | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/14395-1-AP.pdf) |
| `proteintech-10828-1-ap` | Proteintech / `10828-1-AP` | c-Myc | [公式資料1](https://www.ptglab.com/products/Pictures/pdf/10828-1-AP.pdf) |
| `proteintech-19677-1-ap` | Proteintech / `19677-1-AP` | Caspase-3 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/19677-1-AP.pdf) |
| `proteintech-20874-1-ap` | Proteintech / `20874-1-AP` | E-Cadherin | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/20874-1-AP.pdf) |
| `proteintech-18725-1-ap` | Proteintech / `18725-1-AP` | LC3B | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/18725-1-AP.pdf) |
| `abcam-ab7291` | Abcam / `ab7291` | α-Tubulin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/alpha-tubulin-antibody-dm1a-loading-control-ab7291) |
| `abcam-ab6046` | Abcam / `ab6046` | β-Tubulin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/beta-tubulin-antibody-loading-control-ab6046) |
| `abcam-ab129002` | Abcam / `ab129002` | Vinculin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/vinculin-antibody-epr8185-loading-control-ab129002) |
| `abcam-ab1791` | Abcam / `ab1791` | Histone H3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/histone-h3-antibody-nuclear-marker-and-chip-grade-ab1791) |
| `abcam-ab109520` | Abcam / `ab109520` | p21 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/p21-antibody-epr362-ab109520) |
| `abcam-ab134175` | Abcam / `ab134175` | Cyclin D1 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cyclin-d1-antibody-epr2241-c-terminal-ab134175) |
| `abcam-ab16667` | Abcam / `ab16667` | Ki-67 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/ki67-antibody-sp6-ab16667) |
| `abcam-ab16048` | Abcam / `ab16048` | Lamin B1 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/lamin-b1-antibody-nuclear-envelope-marker-ab16048) |
| `abcam-ab26` | Abcam / `ab26` | p53 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/p53-antibody-pab-240-ab26) |
| `abcam-ab29` | Abcam / `ab29` | PCNA | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/pcna-antibody-pc10-ab29) |
| `abcam-ab68153` | Abcam / `ab68153` | STAT3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/stat3-antibody-epr787y-ab68153) |
| `abcam-ab76315` | Abcam / `ab76315` | STAT3 (phospho Tyr705) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/stat3-phospho-y705-antibody-ep2147y-ab76315) |
| `abcam-ab16502` | Abcam / `ab16502` | NF-κB p65 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/nf-kb-p65-antibody-ab16502) |
| `abcam-ab2732` | Abcam / `ab2732` | mTOR | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/mtor-antibody-ab2732) |
| `abcam-ab109268` | Abcam / `ab109268` | mTOR (phospho Ser2448) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/mtor-phospho-s2448-antibody-epr4262-ab109268) |
| `abcam-ab40820` | Abcam / `ab40820` | S6 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/rps6-antibody-ribosome-marker-ab40820) |
| `abcam-ab32047` | Abcam / `ab32047` | AMPKα | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/ampk-alpha-1-antibody-y365-ab32047) |
| `abcam-ab170099` | Abcam / `ab170099` | p38 MAPK | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/p38-alpha-mapk14-antibody-e229-ab170099) |
| `abcam-ab52894` | Abcam / `ab52894` | EGFR | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/egfr-antibody-ep38y-ab52894) |
| `abcam-ab134182` | Abcam / `ab134182` | HER2 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/erbb2-her2-antibody-ep1045y-ab134182) |
| `abcam-ab32572` | Abcam / `ab32572` | β-Catenin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/beta-catenin-antibody-e247-chip-grade-ab32572) |
| `abcam-ab52771` | Abcam / `ab52771` | YAP | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/yap1-antibody-ep1674y-ab52771) |
| `abcam-ab40772` | Abcam / `ab40772` | E-Cadherin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/e-cadherin-antibody-ep700y-intercellular-junction-marker-ab40772) |
| `abcam-ab18203` | Abcam / `ab18203` | N-Cadherin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/n-cadherin-antibody-intercellular-junction-marker-ab18203) |
| `abcam-ab92547` | Abcam / `ab92547` | Vimentin | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/vimentin-antibody-epr3776-cytoskeleton-marker-ab92547) |
| `abcam-ab216347` | Abcam / `ab216347` | Snail | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/snail-antibody-epr21043-ab216347) |
| `abcam-ab5694` | Abcam / `ab5694` | α-SMA | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/alpha-smooth-muscle-actin-antibody-ab5694) |
| `abcam-ab32072` | Abcam / `ab32072` | c-Myc | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/c-myc-antibody-y69-chip-grade-ab32072) |
| `abcam-ab179483` | Abcam / `ab179483` | HIF-1α | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/hif-1-alpha-antibody-epr16897-ab179483) |
| `abcam-ab191217` | Abcam / `ab191217` | PARP1 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/parp1-antibody-epr18461-ab191217) |
| `abcam-ab32351` | Abcam / `ab32351` | Caspase-3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/caspase-3-antibody-e87-ab32351) |
| `abcam-ab182858` | Abcam / `ab182858` | Bcl-2 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/bcl-2-antibody-epr17509-ab182858) |
| `abcam-ab32503` | Abcam / `ab32503` | Bax | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/bax-antibody-e63-ab32503) |
| `abcam-ab56416` | Abcam / `ab56416` | p62/SQSTM1 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/sqstm1-p62-antibody-2c11-bsa-and-azide-free-ab56416) |
| `abcam-ab26350` | Abcam / `ab26350` | γH2AX (Ser139) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/gamma-h2ax-phospho-s139-antibody-9f3-ab26350) |
| `abcam-ab16669` | Abcam / `ab16669` | CD3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd3-epsilon-antibody-sp7-ab16669) |
| `abcam-ab133616` | Abcam / `ab133616` | CD4 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd4-antibody-epr6855-ab133616) |
| `abcam-ab17147` | Abcam / `ab17147` | CD8 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd8-alpha-antibody-c8-144b-ab17147) |
| `abcam-ab40763` | Abcam / `ab40763` | CD45 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd45-antibody-ep322y-ab40763) |
| `abcam-ab28364` | Abcam / `ab28364` | CD31 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd31-antibody-ab28364) |
| `abcam-ab955` | Abcam / `ab955` | CD68 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd68-antibody-kp1-ab955) |
| `abcam-ab6640` | Abcam / `ab6640` | F4/80 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/f4-80-antibody-cia3-1-macrophage-marker-ab6640) |
| `abcam-ab133357` | Abcam / `ab133357` | CD11b | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cd11b-antibody-epr1344-ab133357) |
| `abcam-ab137132` | Abcam / `ab137132` | PD-1 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/pd1-antibody-epr48772-ab137132) |
| `abcam-ab205921` | Abcam / `ab205921` | PD-L1 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/pd-l1-antibody-28-8-ab205921) |
| `abcam-ab20034` | Abcam / `ab20034` | FOXP3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/foxp3-antibody-236a-e7-ab20034) |
| `abcam-ab18181` | Abcam / `ab18181` | HA tag | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/ha-tag-antibody-hac5-ab18181) |
| `abcam-ab18184` | Abcam / `ab18184` | His tag | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/6x-his-tag-antibody-hish8-ab18184) |
| `abcam-ab9116` | Abcam / `ab9116` | V5 tag | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/v5-tag-antibody-ab9116) |
| `toyobo-kmm-101` | TOYOBO / `KMM-101` | PCR | [公式資料1](https://lifescience.toyobo.co.jp/detail/detail.php?product_detail_id=241) |
| `toyobo-fsq-101` | TOYOBO / `FSQ-101` | Reverse transcription | [公式資料1](https://lifescience.toyobo.co.jp/detail/detail.php?product_detail_id=9) |
| `nacalai-07880-54` | Nacalai Tesque / `07880-54` | Chemiluminescent detection | [公式資料1](https://www.nacalai.co.jp/products/314/) |
| `nacalai-02230-14` | Nacalai Tesque / `02230-14` | Chemiluminescent detection | [公式資料1](https://www.nacalai.co.jp/products/317/) |
| `nacalai-11644-24` | Nacalai Tesque / `11644-24` | Chemiluminescent detection | [公式資料1](https://www.nacalai.co.jp/products/317/) |
| `atto-2332632` | ATTO / `2332632` | Chemiluminescent detection | [公式資料1](https://www.atto.co.jp/products/protein_blotting/reagent/hrp_detection_reagent/wse-7110ezwestlumi-one) |
| `proteintech-66868-1-ig` | Proteintech / `66868-1-Ig` | CD8 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/66868-1-Ig.pdf) |
| `proteintech-67786-1-ig` | Proteintech / `67786-1-Ig` | CD4 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/67786-1-Ig.pdf) |
| `proteintech-17617-1-ap` | Proteintech / `17617-1-AP` | CD3 | [公式資料1](https://www.ptglab.com/products/CD3E-Antibody-17617-1-AP.htm) |
| `atto-2332637` | ATTO / `2332637` | Chemiluminescent detection | [公式資料1](https://www.atto.co.jp/products/protein_blotting/reagent/hrp_detection_reagent/wse-7120s-7120lezwestlumi-plus) |
| `toyobo-qpx-201` | TOYOBO / `QPX-201` | qPCR | [公式資料1](https://lifescience.toyobo.co.jp/detail/detail.php?product_detail_id=262) |
| `nippongene-311-02501` | NIPPON GENE / `311-02501` | RNA isolation | [公式資料1](https://www.nippongene.com/siyaku/product/extraction/isogen/isogen.html) |
| `wako-163-20145` | FUJIFILM Wako / `163-20145` | Sample fixation | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/163-20145.html) |
| `thermo-89900` | Thermo Fisher Scientific (Invitrogen) / `89900` | Protein extraction | [公式資料1](https://www.thermofisher.com/order/catalog/product/89900) / [公式資料2](https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0011565_RIPA_Buff_UG_ND.pdf) |
| `thermo-34580` | Thermo Fisher Scientific (Invitrogen) / `34580` | Chemiluminescent detection | [公式資料1](https://www.thermofisher.com/order/catalog/product/34580) / [公式資料2](https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0015920_2162617_SuperSigWestPicoPLUS_Chemil_Substr_UG.pdf) |
| `thermo-34095` | Thermo Fisher Scientific (Invitrogen) / `34095` | Chemiluminescent detection | [公式資料1](https://www.thermofisher.com/order/catalog/product/34095) / [公式資料2](https://documents.thermofisher.com/TFS-Assets/LSG/manuals/MAN0011345_SupSig_West_Femto_MaxSensi_Subs_UG.pdf) |
| `biorad-1705060` | Bio-Rad / `1705060` | Chemiluminescent detection | [公式資料1](https://www.bio-rad.com/sites/default/files/2023-04/Bulletin_7479.pdf) |
| `nacalai-16488-34` | Nacalai Tesque / `16488-34` | Protein extraction | [公式資料1](https://www.nacalai.co.jp/images/product/pdf/WesternBlotting.pdf) |
| `proteintech-11265-1-ap` | Proteintech / `11265-1-AP` | CD31 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/11265-1-AP.pdf) |
| `proteintech-25747-1-ap` | Proteintech / `25747-1-AP` | CD68 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/25747-1-AP.pdf) |
| `proteintech-22228-1-ap` | Proteintech / `22228-1-AP` | FOXP3 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/22228-1-AP.pdf) |
| `proteintech-17952-1-ap` | Proteintech / `17952-1-AP` | PD-L1 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/17952-1-AP.pdf) |
| `proteintech-18106-1-ap` | Proteintech / `18106-1-AP` | PD-1 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/18106-1-AP.pdf) |
| `proteintech-28463-1-ap` | Proteintech / `28463-1-AP` | F4/80 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/28463-1-AP.pdf) |
| `proteintech-21851-1-ap` | Proteintech / `21851-1-AP` | CD11b | [公式資料1](https://www.ptglab.com/products/ITGAM-Antibody-21851-1-AP.htm) |
| `proteintech-67778-1-ig` | Proteintech / `67778-1-Ig` | mTOR (phospho Ser2448) | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/67778-1-Ig.pdf) |
| `proteintech-65109-1-pbs` | Proteintech / `65109-1-PBS` | CD45 | [公式資料1](https://www.ptglab.com/products/CD45-Antibody-65109-1-PBS.htm) |
| `proteintech-29223-1-ap` | Proteintech / `29223-1-AP` | S6 (phospho Ser235/236) | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/29223-1-AP.pdf) |
| `sigma-sab4300033` | Sigma-Aldrich (Merck) / `SAB4300033` | STAT3 (phospho Tyr705) | [公式資料1](https://www.sigmaaldrich.com/FR/fr/product/sigma/sab4300033) |
| `abcam-ab236224` | Abcam / `ab236224` | S6 (phospho Ser235/236) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/rps6-phospho-s235-s236-antibody-sp50-bsa-and-azide-free-ab236224) |
| `sigma-h6908` | Sigma-Aldrich (Merck) / `H6908` | HA tag | [公式資料1](https://www.sigmaaldrich.com/GB/en/product/sigma/h6908) |
| `sigma-h1029` | Sigma-Aldrich (Merck) / `H1029` | His tag | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/h1029) |
| `sigma-v8012` | Sigma-Aldrich (Merck) / `V8012` | V5 tag | [公式資料1](https://www.sigmaaldrich.com/CA/en/product/sigma/v8012) |
| `thermo-a-21244` | Thermo Fisher Scientific (Invitrogen) / `A-21244` | Rabbit IgG | [公式資料1](https://www.thermofisher.com/antibody/product/goat-anti-Rabbit-IgG-H-L-Cross-Adsorbed-Secondary-Antibody-Polyclonal/A-21244) |
| `thermo-a-21235` | Thermo Fisher Scientific (Invitrogen) / `A-21235` | Mouse IgG | [公式資料1](https://www.thermofisher.com/antibody/product/Goat-anti-Mouse-IgG-H-L-Cross-Adsorbed-Secondary-Antibody-Polyclonal/A-21235) |
| `abcam-ab97051` | Abcam / `ab97051` | Rabbit IgG | [公式資料1](https://www.abcam.com/en-us/products/secondary-antibodies/goat-rabbit-igg-h-l-hrp-ab97051) |
| `abcam-ab6789` | Abcam / `ab6789` | Mouse IgG | [公式資料1](https://www.abcam.com/en-us/products/secondary-antibodies/goat-mouse-igg-h-l-hrp-ab6789) |
| `jackson-111-035-144` | Jackson ImmunoResearch / `111-035-144` | Rabbit IgG | [公式資料1](https://www.jacksonimmuno.com/catalog/products/111-035-144/Goat-Rabbit-IgG-HL-Horseradish-Peroxidase) |
| `jackson-115-035-003` | Jackson ImmunoResearch / `115-035-003` | Mouse IgG | [公式資料1](https://jacksonimmuno.com/catalog/products/115-035-003) |
| `abcam-ab18443` | Abcam / `ab18443` | Isotype control | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/mouse-igg1-kappa-monoclonal-mopc-21-isotype-control-ab18443) |
| `abcam-ab18415` | Abcam / `ab18415` | Isotype control | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/mouse-igg2a-kappa-monoclonal-mg2a-53-isotype-control-ab18415) |
| `abcam-ab172730` | Abcam / `ab172730` | Isotype control | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/rabbit-igg-monoclonal-epr25a-isotype-control-ab172730) |
| `abcam-ab184699` | Abcam / `ab184699` | ERK1/2 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/erk1-erk2-antibody-epr17526-ab184699) |
| `abcam-ab179463` | Abcam / `ab179463` | Akt | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/akt1-akt2-akt3-antibody-epr16798-ab179463) |
| `abcam-ab81283` | Abcam / `ab81283` | Akt (phospho Ser473) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/akt1-phospho-s473-antibody-ep2109y-ab81283) |
| `abcam-ab192890` | Abcam / `ab192890` | LC3B | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/lc3b-antibody-epr18709-autophagosome-marker-ab192890) |
| `abcam-ab214362` | Abcam / `ab214362` | ERK1/2 (phospho Thr202/Tyr204) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/erk1-phospho-t202-y204-erk2-phospho-t185-y187-antibody-ab214362) |
| `proteintech-10176-2-ap` | Proteintech / `10176-2-AP` | Akt | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/10176-2-AP.pdf) |
| `proteintech-16443-1-ap` | Proteintech / `16443-1-AP` | ERK1/2 | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/16443-1-AP.pdf) |
| `proteintech-66444-1-ig` | Proteintech / `66444-1-Ig` | Akt (phospho Ser473) | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/66444-1-Ig.pdf) |
| `proteintech-80031-1-rr` | Proteintech / `80031-1-RR` | ERK1/2 (phospho Thr202/Tyr204) | [公式資料1](https://www.ptglab.com/products/pictures/pdf/80031-1-RR.pdf) |
| `sigma-05-636` | Sigma-Aldrich (Merck) / `05-636` | γH2AX (Ser139) | [公式資料1](https://www.sigmaaldrich.com/JP/ja/product/mm/05636) / [公式資料2](https://www.sigmaaldrich.com/deepweb/assets/sigmaaldrich/product/documents/278/222/17-327.pdf) |
| `cst-2956` | Cell Signaling Technology / `2956` | GFP | [公式資料1](https://media.cellsignal.com/pdf/2956.pdf) |
| `cst-2276` | Cell Signaling Technology / `2276` | Myc | [公式資料1](https://media.cellsignal.com/pdf/2276.pdf) |
| `proteintech-66002-1-ig` | Proteintech / `66002-1-Ig` | GFP | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/66002-1-Ig.pdf) |
| `proteintech-60003-2-ig` | Proteintech / `60003-2-Ig` | Myc | [公式資料1](https://www.ptglab.com/products/pictures/pdf/60003-2-IG.pdf) |
| `mbl-m185-3l` | MBL / `M185-3L` | FLAG tag | [公式資料1](https://www.mblbio.com/bio/g/dtl/A/index.html?pcd=M185-3L) / [公式資料2](https://ruo.mbl.co.jp/bio/dtl/dtlfiles/M185-3L-v7.pdf) |
| `cst-4877` | Cell Signaling Technology / `4877` | HSP90 | [公式資料1](https://media.cellsignal.com/pdf/4877.pdf) |
| `cst-9252` | Cell Signaling Technology / `9252` | JNK | [公式資料1](https://media.cellsignal.com/pdf/9252.pdf) |
| `cst-3777` | Cell Signaling Technology / `3777` | EGFR (phospho Tyr1068) | [公式資料1](https://media.cellsignal.com/pdf/3777.pdf) |
| `cst-5678` | Cell Signaling Technology / `5678` | Smad2/3 | [公式資料1](https://media.cellsignal.com/pdf/5678.pdf) |
| `abcam-ab32042` | Abcam / `ab32042` | Cleaved Caspase-3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/cleaved-caspase-3-antibody-e83-77-ab32042) |
| `sigma-c8487` | Sigma-Aldrich (Merck) / `C8487` | Cleaved Caspase-3 | [公式資料1](https://www.sigmaaldrich.com/WS/en/product/sigma/c8487) |
| `proteintech-66008-4-ig` | Proteintech / `66008-4-Ig` | FLAG tag | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/66008-4-Ig.pdf) |
| `abcam-ab13492` | Abcam / `ab13492` | HSP90 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/hsp90-antibody-ac88-ab13492) |
| `abcam-ab179461` | Abcam / `ab179461` | JNK | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/jnk1-jnk2-jnk3-antibody-epr16797-211-ab179461) |
| `abcam-ab40815` | Abcam / `ab40815` | EGFR (phospho Tyr1068) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/egfr-phospho-y1068-antibody-ep774y-ab40815) |
| `abcam-ab217553` | Abcam / `ab217553` | Smad2/3 | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/smad2-smad3-antibody-ab217553) |
| `abcam-ab4822` | Abcam / `ab4822` | p38 MAPK (phospho Thr180/Tyr182) | [公式資料1](https://www.abcam.com/en-us/products/primary-antibodies/p38-phospho-t180-y182-antibody-ab4822) |
| `proteintech-13171-1-ap` | Proteintech / `13171-1-AP` | HSP90 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/13171-1-AP.pdf) |
| `proteintech-66210-1-ig` | Proteintech / `66210-1-Ig` | JNK | [公式資料1](https://www.ptglab.com/products/pictures/pdf/66210-1-Ig.pdf) |
| `proteintech-12570-1-ap` | Proteintech / `12570-1-AP` | Smad2/3 | [公式資料1](https://www.ptglab.com/products/pictures/pdf/12570-1-AP.pdf) |
| `proteintech-30278-1-ap` | Proteintech / `30278-1-AP` | EGFR (phospho Tyr1068) | [公式資料1](https://www.ptglab.com/products/pictures/pdf/30278-1-AP.pdf) |
| `cst-4511` | Cell Signaling Technology / `4511` | p38 MAPK (phospho Thr180/Tyr182) | [公式資料1](https://www.cellsignal.com/products/4511/datasheet?images=0&protocol=0) |
| `proteintech-28796-1-ap` | Proteintech / `28796-1-AP` | p38 MAPK (phospho Thr180/Tyr182) | [公式資料1](https://www.ptglab.com/Products/Pictures/pdf/28796-1-AP.pdf) |
| `thermo-18090010` | Thermo Fisher Scientific (Invitrogen) / `18090010` | Reverse transcription | [公式資料1](https://www.thermofisher.com/order/catalog/product/18090010) |
| `thermo-a25742` | Thermo Fisher Scientific (Invitrogen) / `A25742` | qPCR | [公式資料1](https://www.thermofisher.com/order/catalog/product/A25742) |
| `thermo-25300054` | Thermo Fisher Scientific (Invitrogen) / `25300054` | Cell dissociation | [公式資料1](https://www.thermofisher.com/order/catalog/product/25300054) |
| `thermo-10270106` | Thermo Fisher Scientific (Invitrogen) / `10270106` | Serum supplement | [公式資料1](https://www.thermofisher.com/order/catalog/product/10270106) |
| `promega-e2311` | Promega / `E2311` | Transfection | [公式資料1](https://www.promega.com/products/transfection/transfection-reagents/fugene-hd-transfection-reagent/) / [公式資料2](https://nld.promega.com/~/media/Files/Resources/Protocols/Technical%20Manuals/101/FuGENE%20HD%20Transfection%20Reagent.pdf) |
| `roche-04906837001` | Roche (Sigma 経由) / `04906837001` | Phosphatase inhibition | [公式資料1](https://www.sigmaaldrich.com/JP/ja/product/roche/phossro) |
| `nacalai-15342-54` | Nacalai Tesque / `15342-54` | Apoptosis assay | [公式資料1](https://www.nacalai.co.jp/products/223/) |
| `nacalai-18146-44` | Nacalai Tesque / `18146-44` | Apoptosis assay | [公式資料1](https://www.nacalai.co.jp/products/224/) |
| `nacalai-14249-95` | Nacalai Tesque / `14249-95` | Balanced salt solution | [公式資料1](https://www.nacalai.co.jp/global/download/pdf/Cell_Cultivation_ver.2.2.pdf) |
| `nacalai-05364-55` | Nacalai Tesque / `05364-55` | Antibody stripping | [公式資料1](https://www.nacalai.co.jp/products/30/) |
| `wako-160-23151` | FUJIFILM Wako / `160-23151` | Selection antibiotic | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/W01W0116-2315.html) |
| `wako-078-05961` | FUJIFILM Wako / `078-05961` | Selection antibiotic | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/W01W0107-0596.html) |
| `wako-049-31121` | FUJIFILM Wako / `049-31121` | Inducible gene expression | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/W01W0104-3112.html) |
| `roche-04693132001` | Roche (Sigma 経由) / `04693132001` | Protease inhibition | [公式資料1](https://www.sigmaaldrich.com/JP/ja/product/roche/04693132001) |
| `vector-h-1000` | Vector Laboratories / `H-1000` | Antifade mounting | [公式資料1](https://vectorlabs.com/productattachments/protocol/VL_H-1000_UserGuide_LBL02351.pdf) |
| `takara-rr820a` | Takara Bio / `RR820A` | qPCR | [公式資料1](https://catalog.takara-bio.co.jp/product/basic_info.php?unitid=U100006658) / [公式資料2](https://catalog.takara-bio.co.jp/PDFS/rr820a_j.pdf) |
| `rnd-d6050` | R&D Systems / `D6050` | IL-6 quantification | [公式資料1](https://resources.rndsystems.com/pdfs/datasheets/d6050.pdf?v=20240415) |
| `dojindo-m009` | Dojindo / `M009` | Cell viability assay | [公式資料1](https://www.dojindo.co.jp/products/M009/) |
| `sigma-s5921` | Sigma-Aldrich (Merck) / `S5921` | Protein kinases | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/s5921) |
| `sigma-u120` | Sigma-Aldrich (Merck) / `U120` | MEK1/2 | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/u120) |
| `sigma-b1793` | Sigma-Aldrich (Merck) / `B1793` | V-ATPase | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/b1793) |
| `wako-129-04861` | FUJIFILM Wako / `129-04861` | PI3K | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/129-04861.html) |
| `wako-068-01401` | FUJIFILM Wako / `068-01401` | Pyrimidine metabolism | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/W01W0106-0140.html) |
| `takara-r045a` | Takara Bio / `R045A` | PCR | [公式資料1](https://catalog.takara-bio.co.jp/PDFFiles/R045A_j.pdf) |
| `nacalai-03969-21` | Nacalai Tesque / `03969-21` | Protease inhibition | [公式資料1](https://www.nacalai.co.jp/products/168/) |
| `nacalai-19593-25` | Nacalai Tesque / `19593-25` | Protein molecular weight marker | [公式資料1](https://www.nacalai.co.jp/products/178/) |
| `thermo-h3570` | Thermo Fisher Scientific (Invitrogen) / `H3570` | DNA | [公式資料1](https://www.thermofisher.com/order/catalog/product/H3570) |
| `wako-033-20091` | FUJIFILM Wako / `033-20091` | DNA crosslinking | [公式資料1](https://labchem-wako.fujifilm.com/jp/product/detail/W01W0103-2009.html) |
| `nacalai-07575-51` | Nacalai Tesque / `07575-51` | Phosphatase inhibition | [公式資料1](https://www.nacalai.co.jp/global/reagent/img/07575-3-E.pdf) |
| `biorad-5000201` | Bio-Rad / `5000201` | Protein quantification | [公式資料1](https://www.bio-rad.com/sites/default/files/2025-05/C12521L-2304e.pdf) |
| `qiagen-27104` | QIAGEN / `27104` | Plasmid DNA purification | [公式資料1](https://www.qiagen.com/bo/products/discovery-and-translational-research/dna-rna-purification/dna-purification/plasmid-dna/qiaprep-spin-miniprep-kit) / [公式資料2](https://www.qiagen.com/en-us/resources/download/protocols/hb-1921-1091289-pcard-qiaprepspinmini-0215-ww) |
| `vector-mp-7401` | Vector Laboratories / `MP-7401` | IHC polymer detection | [公式資料1](https://vectorlabs.com/app/uploads/2025/08/VL_MP-7401_UserGuide_LBL02241.pdf) |
| `sigma-p2938` | Sigma-Aldrich (Merck) / `P2938` | Protein transfer membrane | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/p2938) |
| `thermo-88802` | Thermo Fisher Scientific (Invitrogen) / `88802` | Immunoprecipitation | [公式資料1](https://www.thermofisher.com/order/catalog/product/88802) |
| `thermo-10003d` | Thermo Fisher Scientific (Invitrogen) / `10003D` | Immunoprecipitation | [公式資料1](https://www.thermofisher.com/order/catalog/product/10003D) |
| `sigma-a2220` | Sigma-Aldrich (Merck) / `A2220` | FLAG affinity purification | [公式資料1](https://www.sigmaaldrich.com/US/en/product/sigma/a2220) |
| `vector-h-3300` | Vector Laboratories / `H-3300` | Antigen retrieval | [公式資料1](https://vectorlabs.com/app/uploads/2025/08/VL_H-3300_UserGuide_LBL02289.pdf) |
| `vector-sk-4100` | Vector Laboratories / `SK-4100` | Chromogenic detection | [公式資料1](https://vectorlabs.com/app/uploads/2025/08/VL_SK-4100_UserGuide_LBL02267.pdf) |
| `agilent-k4003` | Agilent (Dako) / `K4003` | IHC polymer detection | [公式資料1](https://www.agilent.com/cs/library/packageinsert/public/302063EN_05.pdf) |
| `nichirei-424151` | Nichirei Biosciences / `424151` | IHC polymer detection | [公式資料1](https://www.nichirei.co.jp/sites/default/files/inline-images/news/pdf/20200901.pdf) |
| `sigma-wbkls0500` | Sigma-Aldrich (Merck) / `WBKLS0500` | Chemiluminescent detection | [公式資料1](https://www.sigmaaldrich.com/JP/ja/product/mm/wbkls) / [公式資料2](https://www.sigmaaldrich.com/US/en/product/mm/wbkls) |
| `rnd-285-if` | R&D Systems / `285-IF` | IFN-γ | [公式資料1](https://resources.rndsystems.com/pdfs/datasheets/285-if.pdf) |
| `thermo-78440` | Thermo Fisher Scientific (Invitrogen) / `78440` | Protease and phosphatase inhibition | [公式資料1](https://www.thermofisher.com/order/catalog/product/78440) |
| `thermo-31985070` | Thermo Fisher Scientific (Invitrogen) / `31985070` | Cell culture medium | [公式資料1](https://www.thermofisher.com/order/catalog/product/31985070) |
| `cytiva-rpn2232` | Cytiva / `RPN2232` | Chemiluminescent detection | [公式資料1](https://d3.cytivalifesciences.com/prod/IFU/29032061.pdf) / [公式資料2](https://d3.cytivalifesciences.com/prod/IFU/28982942.pdf) |
| `dojindo-ad12` | Dojindo / `AD12` | Apoptosis assay | [公式資料1](https://www.dojindo.co.jp/products/AD12/) / [公式資料2](https://www.dojindo.co.jp/manual/AD12/) |
| `proteintech-cl647-65109` | Proteintech / `CL647-65109` | CD45 | [公式資料1](https://www.ptglab.com/products/CD45-Antibody-CL647-65109.htm) |
| `proteintech-cl488-65109` | Proteintech / `CL488-65109` | CD45 | [公式資料1](https://www.ptglab.com/products/CD45-Antibody-CL488-65109.htm) |
| `rnd-m6000b-1` | R&D Systems / `M6000B-1` | Mouse IL-6 ELISA | [公式資料1](https://resources.rndsystems.com/pdfs/datasheets/m6000b.pdf) |

| `abcam-ab234869` | Abcam / `ab234869` | KIF1B | [商品ページ](https://www.abcam.com/en-us/products/primary-antibodies/kif1b-antibody-ab234869) |
| `proteintech-15263-1-ap` | Proteintech / `15263-1-AP` | KIF1B | [商品ページ](https://www.ptglab.com/products/KIF1B-Antibody-15263-1-AP.htm) |
| `scbt-sc-376246` | Santa Cruz Biotechnology / `sc-376246` | KIF1B | [商品ページ](https://www.scbt.com/p/kif1b-antibody-e-12) / [データシート (PDF)](https://datasheets.scbt.com/sc-376246.pdf) |
| `thermo-pa5-93117` | Thermo Fisher Scientific (Invitrogen) / `PA5-93117` | KIF1B | [商品ページ](https://www.thermofisher.com/antibody/product/KIF1B-Antibody-Polyclonal/PA5-93117) / [追加公式資料](https://www.thermofisher.com/antibody/primary/target/kif1b) |
| `thermo-pa5-76971` | Thermo Fisher Scientific (Invitrogen) / `PA5-76971` | KIF1B | [商品ページ](https://www.thermofisher.com/antibody/product/KIF1B-Antibody-Polyclonal/PA5-76971) / [追加公式資料](https://www.thermofisher.com/antibody/primary/target/kif1b) |
| `thermo-a301-055a` | Thermo Fisher Scientific (Invitrogen) / `A301-055A` | KIF1B | [商品ページ](https://www.thermofisher.com/antibody/product/KIF1B-Antibody-Polyclonal/A301-055A) / [追加公式資料](https://www.thermofisher.com/antibody/primary/target/kif1b) |
| `novus-nb100-57493` | Novus Biologicals（R&D Systems に統合） / `NB100-57493` | KIF1B | [商品ページ](https://www.rndsystems.com/products/kif1b-antibody_nb100-57493) / [追加公式資料](https://www.rndsystems.com/target/kif1b/antibodies) |
| `novus-nb100-57494` | Novus Biologicals（R&D Systems に統合） / `NB100-57494` | KIF1B | [商品ページ](https://www.rndsystems.com/products/kif1b-antibody_nb100-57494) / [追加公式資料](https://www.rndsystems.com/target/kif1b/antibodies) |
| `cst-11993` | Cell Signaling Technology / `11993` | KIF1B (phospho Ser1487) | [商品ページ](https://www.cellsignal.com/products/primary-antibodies/phospho-kif1b-ser1487-antibody/11993) |

## 3社以上で比較できる抗体ターゲット

**67ターゲット／一次・タグ抗体の全68ターゲット**。メーカーidの重複を除いて集計。リン酸化体は非リン酸化特異性の製品と別ターゲット、Mycタグは内在性c-Mycと別ターゲットとして数えています。同一メーカーの蛍光標識違いをメーカー数の水増しに使っていません。

| ターゲット | メーカー数 | 収録メーカー |
|---|---:|---|
| Akt | 3 | `abcam`, `cst`, `proteintech` |
| Akt (phospho Ser473) | 3 | `abcam`, `cst`, `proteintech` |
| AMPKα | 3 | `abcam`, `cst`, `proteintech` |
| Bax | 3 | `abcam`, `cst`, `proteintech` |
| Bcl-2 | 3 | `abcam`, `cst`, `proteintech` |
| c-Myc | 3 | `abcam`, `cst`, `proteintech` |
| Caspase-3 | 3 | `abcam`, `cst`, `proteintech` |
| CD11b | 3 | `abcam`, `cst`, `proteintech` |
| CD3 | 3 | `abcam`, `cst`, `proteintech` |
| CD31 | 3 | `abcam`, `cst`, `proteintech` |
| CD4 | 3 | `abcam`, `cst`, `proteintech` |
| CD45 | 3 | `abcam`, `cst`, `proteintech` |
| CD68 | 3 | `abcam`, `cst`, `proteintech` |
| CD8 | 3 | `abcam`, `cst`, `proteintech` |
| Cleaved Caspase-3 | 3 | `abcam`, `cst`, `sigma` |
| Cyclin D1 | 3 | `abcam`, `cst`, `proteintech` |
| E-Cadherin | 3 | `abcam`, `cst`, `proteintech` |
| EGFR | 3 | `abcam`, `cst`, `proteintech` |
| EGFR (phospho Tyr1068) | 3 | `abcam`, `cst`, `proteintech` |
| ERK1/2 | 3 | `abcam`, `cst`, `proteintech` |
| ERK1/2 (phospho Thr202/Tyr204) | 3 | `abcam`, `cst`, `proteintech` |
| F4/80 | 3 | `abcam`, `cst`, `proteintech` |
| FLAG tag | 3 | `mbl`, `proteintech`, `sigma` |
| FOXP3 | 3 | `abcam`, `cst`, `proteintech` |
| GAPDH | 4 | `abcam`, `cst`, `proteintech`, `sigma` |
| GFP | 3 | `abcam`, `cst`, `proteintech` |
| HA tag | 3 | `abcam`, `cst`, `sigma` |
| HER2 | 3 | `abcam`, `cst`, `proteintech` |
| HIF-1α | 3 | `abcam`, `cst`, `proteintech` |
| His tag | 3 | `abcam`, `cst`, `sigma` |
| Histone H3 | 3 | `abcam`, `cst`, `proteintech` |
| HSP90 | 3 | `abcam`, `cst`, `proteintech` |
| JNK | 3 | `abcam`, `cst`, `proteintech` |
| Ki-67 | 3 | `abcam`, `cst`, `proteintech` |
| KIF1B | 5 | `abcam`, `novus`, `proteintech`, `scbt`, `thermo` |
| Lamin B1 | 3 | `abcam`, `cst`, `proteintech` |
| LC3B | 3 | `abcam`, `cst`, `proteintech` |
| mTOR | 3 | `abcam`, `cst`, `proteintech` |
| mTOR (phospho Ser2448) | 3 | `abcam`, `cst`, `proteintech` |
| Myc | 3 | `cst`, `proteintech`, `scbt` |
| N-Cadherin | 3 | `abcam`, `cst`, `proteintech` |
| NF-κB p65 | 3 | `abcam`, `cst`, `proteintech` |
| p21 | 3 | `abcam`, `cst`, `proteintech` |
| p38 MAPK | 3 | `abcam`, `cst`, `proteintech` |
| p38 MAPK (phospho Thr180/Tyr182) | 3 | `abcam`, `cst`, `proteintech` |
| p53 | 3 | `abcam`, `cst`, `proteintech` |
| p62/SQSTM1 | 3 | `abcam`, `cst`, `proteintech` |
| PARP1 | 3 | `abcam`, `cst`, `proteintech` |
| PCNA | 3 | `abcam`, `cst`, `proteintech` |
| PD-1 | 3 | `abcam`, `cst`, `proteintech` |
| PD-L1 | 3 | `abcam`, `cst`, `proteintech` |
| S6 | 3 | `abcam`, `cst`, `proteintech` |
| S6 (phospho Ser235/236) | 3 | `abcam`, `cst`, `proteintech` |
| Smad2/3 | 3 | `abcam`, `cst`, `proteintech` |
| Snail | 3 | `abcam`, `cst`, `proteintech` |
| STAT3 | 3 | `abcam`, `cst`, `proteintech` |
| STAT3 (phospho Tyr705) | 3 | `abcam`, `cst`, `sigma` |
| V5 tag | 3 | `abcam`, `cst`, `sigma` |
| Vimentin | 3 | `abcam`, `cst`, `proteintech` |
| Vinculin | 3 | `abcam`, `cst`, `proteintech` |
| YAP | 3 | `abcam`, `cst`, `proteintech` |
| α-SMA | 3 | `abcam`, `cst`, `proteintech` |
| α-Tubulin | 3 | `abcam`, `cst`, `proteintech` |
| β-Actin | 5 | `cst`, `proteintech`, `scbt`, `sigma`, `thermo` |
| β-Catenin | 3 | `abcam`, `cst`, `proteintech` |
| β-Tubulin | 3 | `abcam`, `cst`, `proteintech` |
| γH2AX (Ser139) | 3 | `abcam`, `cst`, `sigma` |

KIF1B (phospho Ser1487) はCSTの1社のみで、上表の3社以上の集計には含めません。

## 未収録の仕様と理由

製品同定に不安が残る採用idは**なし**。以下は製品そのものの同定とは別の、仕様確認の残りです。空欄は未収録であり、非対応・交差性なしを意味しません。

| 項目 | 対象id／範囲 | 理由 |
|---|---|---|
| 保存条件 | `dojindo-m009`, `sigma-p2938`, `nichirei-424151`, `sigma-wbkls0500` | 取得できた公式本文に温度の明記がない、または関連キット／別製品の保存条件と区別して確定できなかったため。輸送温度や保管分類からは推定しない。 |
| 容量（CST） | `cst-11993`, `cst-3700`, `cst-4370`, `cst-9102`, `cst-4060`, `cst-4691`, `cst-9664`, `cst-3868`, `cst-7074`, `cst-7076`, `cst-3900`, `cst-3873`, `cst-2128`, `cst-4499`, `cst-2524`, `cst-2947`, `cst-2978`, `cst-9129`, `cst-2586`, `cst-9139`, `cst-9145`, `cst-8242`, `cst-2983`, `cst-5536`, `cst-2217`, `cst-2211`, `cst-9212`, `cst-2532`, `cst-4267`, `cst-2165`, `cst-8480`, `cst-14074`, `cst-3195`, `cst-13116`, `cst-5741`, `cst-3879`, `cst-19245`, `cst-5605`, `cst-9542`, `cst-9662`, `cst-2870`, `cst-5023`, `cst-5114`, `cst-9718`, `cst-99940`, `cst-25229`, `cst-98941`, `cst-77699`, `cst-76437`, `cst-70076`, `cst-86163`, `cst-13684`, `cst-12653`, `cst-13917`, `cst-3724`, `cst-12698`, `cst-13202`, `cst-12586`, `cst-13901`, `cst-36169`, `cst-2956`, `cst-2276`, `cst-4877`, `cst-9252`, `cst-3777`, `cst-5678`, `cst-4511` | 公式資料が基本番号だけを記載している、または包装選択欄を取得本文から確定できなかったため。確認できた他製品の容量を流用しない。 |
| 容量（Abcam） | `abcam-ab234869`, `abcam-ab2732`, `abcam-ab40820`, `abcam-ab216347`, `abcam-ab955`, `abcam-ab9116`, `abcam-ab236224`, `abcam-ab97051`, `abcam-ab6789`, `abcam-ab18443`, `abcam-ab18415`, `abcam-ab214362`, `abcam-ab13492`, `abcam-ab217553`, `abcam-ab4822` | 公式資料が基本番号だけを記載している、または包装選択欄を取得本文から確定できなかったため。確認できた他製品の容量を流用しない。 |
| 容量（Proteintech） | `proteintech-15263-1-ap`, `proteintech-66305-2-ig`, `proteintech-17617-1-ap`, `proteintech-21851-1-ap`, `proteintech-65109-1-pbs`, `proteintech-cl647-65109`, `proteintech-cl488-65109` | 公式資料が基本番号だけを記載している、または包装選択欄を取得本文から確定できなかったため。確認できた他製品の容量を流用しない。 |
| 容量（R&D Systems） | `rnd-240-b`, `rnd-236-eg`, `rnd-206-il`, `rnd-210-ta`, `rnd-285-if` | 公式資料が基本番号だけを記載している、または包装選択欄を取得本文から確定できなかったため。確認できた他製品の容量を流用しない。 |
| 容量（KIF1Bのその他製品） | `thermo-a301-055a`, `novus-nb100-57493`, `novus-nb100-57494` | 取得した公式資料の包装選択欄から容量を確定できなかったため。濃度から容量を推定しない。 |
| アイソタイプ | `cst-11993`, `cst-9102`, `cst-7074`, `cst-7076`, `cst-2211`, `cst-9212`, `cst-2532`, `cst-9542`, `cst-9662`, `cst-2870`, `cst-5114`, `sigma-h6908`, `cst-9252`, `cst-5678` | 確認したSource／Isotype欄等に宿主のみが記され、アイソタイプを確定できなかったため。 |

## 未採用の候補

- **Sigma-Aldrich HPA026434**：米国・日本の公式商品URLを取得できず、公式検索でもKIF1B製品として現行販売・仕様を確認できなかったため未採用。販売終了とは断定していません。
- **Thermo Fisher PA5-105724**：公式の商品ページ・注文ページを取得できず、現行KIF1Bカタログでも同番号を確認できなかったため未採用。別番号・別製品の仕様は流用していません。

- **Matrigel、PEI MAX**：今回確認できたメーカー定義の範囲で、メーカー・正式な番号を公式資料と結び付けて採用するまでの確認を完了できませんでした。別メーカーに誤って帰属させていません。Aのメーカー定義を維持する指示に従い、新規メーカー追加は行っていません。
- 同定が割れた番号、旧番号から仕様を推定する必要がある候補、公式資料にたどれなかった候補は追加していません。未採用候補に仮idを割り当てていません。
