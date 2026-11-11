function versionDiff(current,historical,path=''){
 if(JSON.stringify(current)===JSON.stringify(historical))return [];
 if(current&&historical&&typeof current==='object'&&typeof historical==='object')return [...new Set([...Object.keys(current),...Object.keys(historical)])].flatMap(k=>versionDiff(current[k],historical[k],path?path+'.'+k:k));
 return [{path,current,historical}];
}
if(typeof module!=='undefined')module.exports={versionDiff};
