/* Presentation-only localization: option values and financial model enums stay unchanged. */
const languageSources=new WeakMap(),languageAttributes=new WeakMap(),languageInputs=new WeakMap();
let interfaceLanguage=localStorage.getItem('chuyan-interface-language')==='en'?'en':'zh';
const languageToggle=document.createElement('button');languageToggle.id='languageToggle';languageToggle.dataset.languageControl='true';languageToggle.className='secondary';languageToggle.type='button';
document.querySelector('.header-right').prepend(languageToggle);
function localizedText(source){return interfaceLanguage==='en'?ChuyanLocale.english(source):source}
function applyInterfaceLanguage(){
 languageObserver.disconnect();
 try{
  document.documentElement.lang=interfaceLanguage==='en'?'en':'zh-CN';
  document.querySelectorAll('input[type=file]').forEach(input=>{if(input.dataset.languagePicker)return;input.dataset.languagePicker='1';const wrapper=document.createElement('label'),caption=document.createElement('span');wrapper.className='localized-file-picker secondary';caption.textContent='选择文件';input.before(wrapper);wrapper.append(caption,input);input.addEventListener('change',()=>{caption.textContent=input.files?.[0]?.name||'选择文件'})});
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
  while(node=walker.nextNode()){
   const parent=node.parentElement;
   if(!parent||['SCRIPT','STYLE','TEXTAREA'].includes(parent.tagName)||parent.closest('[data-language-control]'))continue;
   const previous=languageSources.get(node),source=previous&&node.nodeValue===previous.rendered?previous.source:node.nodeValue;
   if(parent.tagName==='OPTION'&&!parent.hasAttribute('value'))parent.value=parent.value;
   const rendered=localizedText(source);if(node.nodeValue!==rendered)node.nodeValue=rendered;
   languageSources.set(node,{source,rendered});
  }
  document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
   if(el.closest('[data-language-control]'))return;
   let attributes=languageAttributes.get(el)||{};
   for(const key of ['placeholder','title','aria-label'])if(el.hasAttribute(key)){
    const value=el.getAttribute(key),previous=attributes[key],source=previous&&previous.rendered===value?previous.source:value,rendered=localizedText(source);
    if(value!==rendered)el.setAttribute(key,rendered);attributes[key]={source,rendered};
   }
   languageAttributes.set(el,attributes);
  });
  // Translate known sample text without guessing a translation of private project data.
  document.querySelectorAll('input[type=text],input:not([type]),textarea').forEach(el=>{
   const prior=languageInputs.get(el),source=prior&&el.value===prior.rendered?prior.source:el.value;
   const candidate=localizedText(source),rendered=interfaceLanguage==='en'&&ChuyanLocale.hasChinese(candidate)?source:candidate;
   if(el.value!==rendered)el.value=rendered;languageInputs.set(el,{source,rendered});
  });
  const label=interfaceLanguage==='zh'?'English':'中文';if(languageToggle.textContent!==label)languageToggle.textContent=label;
  languageToggle.setAttribute('aria-label',interfaceLanguage==='en'?'Switch to Chinese':'切换为英文');
  document.title=interfaceLanguage==='en'?'Chuyan | Energy Storage Investment Modeling':'储研 · 储能投资测算';
 }finally{languageObserver.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder']})}
}
const languageObserver=new MutationObserver(applyInterfaceLanguage);
languageToggle.onclick=()=>{interfaceLanguage=interfaceLanguage==='zh'?'en':'zh';localStorage.setItem('chuyan-interface-language',interfaceLanguage);applyInterfaceLanguage();if(currentPage==='exports'){renderExports();applyInterfaceLanguage()}};
applyInterfaceLanguage();
// Restore untouched source values before existing form handlers read them.
// Changing the display language must never change saved financial assumptions.
function restoreLocalizedFormValues(event){
 if(event.type==='click'&&(!event.target.closest('button')||event.target.closest('[data-language-control]')))return;
 document.querySelectorAll('input[type=text],input:not([type]),textarea').forEach(el=>{
  const prior=languageInputs.get(el);
  if(prior&&el.value===prior.rendered&&prior.source!==prior.rendered){el.value=prior.source;languageInputs.set(el,{source:prior.source,rendered:prior.source})}
 });
 queueMicrotask(applyInterfaceLanguage);
}
for(const type of ['click','input','change'])document.addEventListener(type,restoreLocalizedFormValues,true);
