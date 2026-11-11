function importExtraErrors(p,f,c){
 const errors=[];
 for(const [key,value] of Object.entries(p))if(typeof value==='number'&&(!Number.isFinite(value)||value<0))errors.push('项目参数 '+key+' 须为有效非负数');
 for(const key of ['socMin','socMax','chargeEff','dischargeEff','availability','firstFade','laterFade'])if(p[key]>100)errors.push(key+' 不得超过100%');
 if(p.chargeEff<=0||p.dischargeEff<=0)errors.push('充放电效率必须大于0');
 if(!p.name.trim()||!p.source.trim())errors.push('项目名称和假设来源不能为空');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(p.start)||!Number.isFinite(Date.parse(p.start))||new Date(p.start).toISOString().slice(0,10)!==p.start)errors.push('建设开始日期无效');
 if(!['等额本金','等额本息'].includes(f.method))errors.push('还款方式须为等额本金或等额本息');
 if(c.payment.length!==p.months)errors.push('建设期付款比例条数须与建设月数一致');
 return errors;
}
if(typeof module!=='undefined')module.exports={importExtraErrors};
