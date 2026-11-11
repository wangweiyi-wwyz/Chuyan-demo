(function(root){
 const dictionary=typeof module!=='undefined'&&module.exports?require('./locale-dictionary.js'):root.ChuyanEnglishDictionary;
 const keys=Object.keys(dictionary).sort((a,b)=>b.length-a.length);
 const pattern=new RegExp(keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
 let overrides={},overridePattern=null;
 function setOverrides(values={}){
  overrides={};overridePattern=null;for(const [source,value]of Object.entries(values)){
   if(!hasChinese(source)||!hasChinese(english(source))||typeof value!=='string'||!value.trim()||hasChinese(value))throw Error('Custom export translations must contain English text.');
   overrides[source]=value.trim();
  }
  const custom=Object.keys(overrides).sort((a,b)=>b.length-a.length);
  overridePattern=custom.length?new RegExp(custom.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g'):null;
 }
 function english(value){
  if(typeof value!=='string')return value;
  if(overridePattern)value=value.replace(overridePattern,k=>overrides[k]);
  if(Object.hasOwn(dictionary,value))return dictionary[value];
  return value.replace(/移除投资第(\d+)项/g,'Remove investment item $1').replace(/移除费用第(\d+)项/g,'Remove expense item $1').replace(/第(\d+)项/g,'Item $1').replace(/(?:运营)?第\s*(\d+)\s*年/g,'Year $1').replace(/第\s*(\d+)\s*个?月/g,'Month $1').replace(pattern,k=>' '+dictionary[k]+' ')
   .replace(/[，、]/g,', ').replace(/。/g,'. ').replace(/；/g,'; ').replace(/：/g,': ').replace(/（/g,' (').replace(/）/g,')').replace(/【/g,'[').replace(/】/g,']').replace(/[“”]/g,'"').replace(/ {2,}/g,' ').replace(/ +([,.;:!?])/g,'$1').trim();
 }
 function hasChinese(value){return /[\u3400-\u9fff]/.test(String(value))}
 function assertEnglish(value,path='text'){if(hasChinese(value))throw new Error('Enter English custom project names, asset names, sources and notes before exporting. Field: '+path);return value}
 const api={english,hasChinese,assertEnglish,dictionary,setOverrides};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ChuyanLocale=api;
})(globalThis);
