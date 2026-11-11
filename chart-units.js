function ensureChartUnits(){
 const add=(container,text)=>{if(!container||container.querySelector(':scope>.chart-unit-label'))return;const label=document.createElement('div');label.className='chart-unit-label';label.textContent=text;container.prepend(label)};
 document.querySelectorAll('.decision-chart').forEach(chart=>{add(chart,'纵轴：金额（万元）  ·  横轴：运营年份（年）');chart.querySelectorAll('svg title').forEach(t=>{if(!/(万元|CNY 10k)$/.test(t.textContent))t.textContent+=' 万元'})});
 document.querySelectorAll('.cash-chart').forEach(chart=>add(chart,'纵轴：累计净现金流（万元）  ·  横轴：模型现金流日期'));
 document.querySelectorAll('.scenario svg').forEach(svg=>{const parent=svg.parentElement;if(!parent.querySelector('.home-chart-units')){const note=document.createElement('div');note.className='chart-unit-label home-chart-units';note.textContent='纵轴：累计净现金流（万元） · 横轴：建设至运营期末';svg.before(note)}});
 document.querySelectorAll('.fade-bars').forEach(chart=>add(chart,'容量保持率（%） · 运营年份（年）'));
 document.querySelectorAll('.sensitivity-row').forEach(row=>{row.querySelectorAll('small').forEach(text=>{if(!/(约束不可行|Infeasible)/.test(text.textContent)&&!/(万元|CNY 10k)$/.test(text.textContent))text.textContent+=' 万元'})});
}
new MutationObserver(ensureChartUnits).observe(document.querySelector('main'),{childList:true,subtree:true});ensureChartUnits();
