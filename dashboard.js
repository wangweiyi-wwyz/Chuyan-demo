let dashboardMode='equity';
function refreshDashboard(){
 document.querySelector('.demo').textContent='本机测算';
 const results=['pessimistic','base','optimistic'].map(calculateScenario);
 const errors=[...scenarioErrors(),...results.flatMap(r=>r.errors||[])];
 const notice=homeContent.querySelector('.notice');notice.textContent=errors.length?'参数待完善：'+[...new Set(errors)].join('；'):'已按当前参数重新测算 · 年度假设口径 · 金额单位：万元';
 document.getElementById('projectName').textContent=parameters.name;
 const stats=homeContent.querySelectorAll('.project-stats strong');stats[1].textContent=money(costData.capex.reduce((s,r)=>s+taxSplit(r.amount,r.vat,r.deduct).gross,0));stats[2].textContent=financeData.ratio.toFixed(1)+'%';
 stats[3].textContent=errors.length?'待校验':'校验通过';
 homeContent.querySelectorAll('.sample').forEach(x=>x.hidden=true);
 homeContent.querySelectorAll('.scenario-cards>div').forEach((el,i)=>{const metric=results[i][dashboardMode==='equity'?'equityMetric':'fullMetric'];el.querySelector('strong').textContent=!errors.length&&metric?.irr.value!=null?(metric.irr.value*100).toFixed(2)+'%':'—';el.querySelector('p').textContent=errors.length?'参数未通过校验':dashboardMode==='equity'?'项目资本金 IRR':'全投资税后 IRR'});
 const svg=homeContent.querySelector('.scenario svg');svg.setAttribute('aria-label','三情景累计净现金流');
 const series=results.map(r=>{let total=0;return (r[dashboardMode==='equity'?'equity':'full']||[]).map(f=>({date:Date.parse(f.date),value:total+=f.value}))});
 const all=series.flat();if(!errors.length&&all.length){const min=Math.min(0,...all.map(x=>x.value)),max=Math.max(1,...all.map(x=>x.value)),start=Math.min(...all.map(x=>x.date)),end=Math.max(...all.map(x=>x.date));svg.innerHTML=[0,.5,1].map(t=>`<text x="0" y="${25+t*125}" fill="#8b96a5" font-size="10">${Math.round(max-t*(max-min)).toLocaleString()}</text>`).join('')+series.map((rows,i)=>`<path d="${rows.map((r,j)=>(j?'L':'M')+(65+(r.date-start)/(end-start)*560).toFixed(1)+' '+(20+(max-r.value)/(max-min)*130).toFixed(1)).join('')}" fill="none" stroke="${['#a0aab6','#11998b','#6295d2'][i]}" stroke-width="2.5"/>`).join('')+'<text x="65" y="178" font-size="11">建设开始</text><text x="550" y="178" font-size="11">运营期末</text>'}else svg.innerHTML='';
 homeContent.querySelector('.legend .muted').textContent='按实际现金流日期累计';
 const footer=homeContent.querySelector('.project-footer');if(footer)footer.textContent='当前项目 · 本机保存 · '+(errors.length?'待完善参数':'三情景已计算');
}
const dashboardOpenPage=openPage;openPage=function(page){dashboardOpenPage(page);if(page==='home')refreshDashboard()};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{dashboardMode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('selected',x===b));refreshDashboard()});
refreshDashboard();
const originalDashboardRefresh=refreshDashboard;refreshDashboard=function(){originalDashboardRefresh();const checks=[validation(),validation(),costErrors(),allRevenueErrors(),allFinanceErrors(),scenarioErrors()];homeContent.querySelector('.step-count').textContent=checks.filter(x=>!x.length).length+' / 6';homeContent.querySelectorAll('.steps .step').forEach((el,i)=>{el.className='step '+(checks[i].length?'current':'done');el.querySelector('b').textContent=checks[i].length?i+1:'✓';let state=el.querySelector(':scope>span');if(!state){state=document.createElement('span');el.append(state)}state.textContent=checks[i].length?'待校验':'校验通过';el.style.cursor='pointer';el.onclick=()=>openPage(['project','technical','costs','revenue','finance','scenarios'][i])});homeContent.querySelector('.steps-note').textContent='校验通过表示参数可计算；请核实各项假设依据。';homeContent.querySelectorAll('.planned').forEach(el=>{el.textContent='前往导出 →';el.style.cursor='pointer';el.onclick=()=>openPage('exports')})};refreshDashboard();
