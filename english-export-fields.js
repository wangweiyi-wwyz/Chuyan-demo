let englishExportOverrides=JSON.parse(localStorage.getItem('chuyan-english-export-text')||'{}');
function missingEnglishExportText(){
 const found=new Map();function walk(value,path){if(typeof value==='string'&&ChuyanLocale.hasChinese(ChuyanLocale.english(value)))found.set(value,path);else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>walk(v,path?path+'.'+k:k))}
 walk({parameters,costData,revenueData,financeData,scenarioData},'');return [...found].map(([source,path])=>({source,path}));
}
function collectEnglishExportOverrides(){
 if(document.documentElement.lang!=='en')return {};
 for(const {source,path}of missingEnglishExportText())if(!englishExportOverrides[source]?.trim()||ChuyanLocale.hasChinese(englishExportOverrides[source]))throw Error('Enter English export text for '+path+' in the English export text section.');
 return Object.fromEntries(missingEnglishExportText().map(({source})=>[source,englishExportOverrides[source].trim()]));
}
const renderBeforeEnglishFields=renderExports;
renderExports=function(){
 renderBeforeEnglishFields();if(document.documentElement.lang!=='en')return;
 const missing=missingEnglishExportText();if(!missing.length)return;
 const section=document.createElement('section');section.className='form-card english-export-text';
 section.innerHTML='<h2>English export text</h2><p>Provide English names and notes for the exported models and report. Original project data stays unchanged.</p>'+missing.map(({source,path},i)=>`<label class="field"><span>${esc(path)}</span><small>Original project text: ${esc(source)}</small><input type="text" data-export-translation="${i}" value="${esc(englishExportOverrides[source]||'')}" placeholder="Enter English text" required></label>`).join('');
 exportView.querySelector('.export-cards').before(section);
 section.querySelectorAll('[data-export-translation]').forEach(input=>input.oninput=()=>{englishExportOverrides[missing[+input.dataset.exportTranslation].source]=input.value;localStorage.setItem('chuyan-english-export-text',JSON.stringify(englishExportOverrides));const links=exportView.querySelector('.export-downloads');if(links)links.hidden=true});
};
