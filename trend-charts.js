const barChartBase=decisionBars;decisionBars=function(rows,series){const max=Math.max(1,...rows.flatMap(r=>series.map(s=>Math.abs(s.value(r))))),slot=650/rows.length;const lines=series.map((s,j)=>'<polyline points="'+rows.map((r,i)=>(55+i*slot+j*slot/series.length+Math.max(2,slot/series.length-2)/2)+','+(110-s.value(r)/max*75)).join(' ')+'" fill="none" stroke="'+s.color+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'+rows.map((r,i)=>'<circle cx="'+(55+i*slot+j*slot/series.length+Math.max(2,slot/series.length-2)/2)+'" cy="'+(110-s.value(r)/max*75)+'" r="2.8" fill="white" stroke="'+s.color+'" stroke-width="1.5"><title>第'+r.year+'年 '+s.name+'：'+s.value(r).toFixed(2)+'</title></circle>').join('')).join('');return barChartBase(rows,series).replace('</svg>',lines+'</svg>').replace('</div><div class="legend">','</div><p class="trend-note">折线连接各年实际值，与柱形共用刻度；不作平滑或预测。</p><div class="legend">')};
const costTrendPreview=updateCostPreview;updateCostPreview=function(){costTrendPreview();if(costErrors().length)return;const chart=document.getElementById('costChart');if(chart){chart.classList.add('trend-upgrade');chart.innerHTML=decisionBars(annualCosts(),[{name:'固定运营支出',color:'#008f83',value:r=>r.gross},{name:'更新投资',color:'#537cad',value:r=>r.renewal}])}};
const revenueTrendPreview=updateRevenuePreview;updateRevenuePreview=function(){revenueTrendPreview();if(allRevenueErrors().length)return;const chart=document.getElementById('revenueChart');if(chart){chart.classList.add('trend-upgrade');const rows=revenueYears();chart.innerHTML=decisionBars(rows,[{name:'含税营业收入',color:'#008f83',value:r=>r.grossRevenue},{name:'购电及交易费',color:'#537cad',value:r=>r.buyGross+r.feeGross}]).replace('</svg></div>','</svg>'+signedRevenueBars(rows)+netRevenueOnlyChart(rows)+revenueSingleSeriesChart(rows,'revenue')+revenueSingleSeriesChart(rows,'cost')+'</div>').replace(/<div class="legend">[\s\S]*?<\/div>/,revenueSeriesLegend());applyRevenueSeriesView()}};
const financeTrendPreview=updateFinancePreview;updateFinancePreview=function(){financeTrendPreview();if(allFinanceErrors().length)return;const chart=document.getElementById('debtChart');if(chart){chart.classList.add('trend-upgrade');const rows=financeDebt().annual,series=[{name:'偿还本金',color:'#008f83',value:r=>r.repayment},{name:'支付利息',color:'#537cad',value:r=>r.interest}];chart.innerHTML=decisionBars(rows,series).replace('</svg></div>','</svg>'+stackedDebtBars(rows,series)+'</div>')}};
function naturalTrendPath(points){if(!points.length)return '';if(points.length===1)return 'M'+points[0].join(',');const slopes=points.slice(1).map((p,i)=>(p[1]-points[i][1])/(p[0]-points[i][0]));const tangent=points.map((p,i)=>{if(i===0)return slopes[0];if(i===points.length-1)return slopes.at(-1);return slopes[i-1]*slopes[i]<=0?0:2*slopes[i-1]*slopes[i]/(slopes[i-1]+slopes[i])});let d='M'+points[0].join(',');for(let i=0;i<points.length-1;i++){const a=points[i],b=points[i+1],step=(b[0]-a[0])/3;d+=' C'+(a[0]+step)+','+(a[1]+step*tangent[i])+' '+(b[0]-step)+','+(b[1]-step*tangent[i+1])+' '+b.join(',')}return d}
decisionBars=function(rows,series){const max=Math.max(1,...rows.flatMap(r=>series.map(s=>Math.abs(s.value(r))))),slot=650/rows.length;const lines=series.map((s,j)=>{const points=rows.map((r,i)=>[55+i*slot+j*slot/series.length+Math.max(2,slot/series.length-2)/2,110-s.value(r)/max*75]);return '<path class="natural-trend" d="'+naturalTrendPath(points)+'" fill="none" stroke="'+s.color+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>'+points.map((p,i)=>'<circle class="trend-hit" cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+s.color+'" stroke="white" stroke-width="1.5"><title>第'+rows[i].year+'年 '+s.name+'：'+s.value(rows[i]).toFixed(2)+'</title></circle>').join('')}).join('');return barChartBase(rows,series).replace('</svg>',lines+'</svg>').replace('</div><div class="legend">','</div><p class="trend-note">曲线经过年度测算值；平滑仅用于视觉连接，不代表年内预测。</p><div class="legend">')};
function stackedDebtBars(rows,series){
 const totals=rows.map(row=>series.reduce((total,s)=>total+s.value(row),0)),max=Math.max(1,...totals),slot=650/rows.length;
 return '<svg class="debt-stack-bars" viewBox="0 0 720 230" role="img" aria-label="年度数据比较">'+[-1,0,1].map(t=>'<line x1="50" x2="710" y1="'+(110-t*75)+'" y2="'+(110-t*75)+'" stroke="#e3e9ef"/><text x="0" y="'+(114-t*75)+'" font-size="10" fill="#718096">'+Math.round(t*max).toLocaleString()+'</text>').join('')+rows.map((row,i)=>{let cumulative=0;return series.map(s=>{const value=s.value(row),height=value/max*75;cumulative+=value;return '<rect x="'+(55+i*slot+slot*.12)+'" y="'+(110-cumulative/max*75)+'" width="'+Math.max(2,slot*.72)+'" height="'+height+'" fill="'+s.color+'"><title>第'+row.year+'年 · '+s.name+'：'+value.toFixed(2)+'</title></rect>'}).join('')}).join('')+'</svg>';
}
function signedRevenueBars(rows){
 const max=Math.max(1,...rows.flatMap(r=>[Math.abs(r.grossRevenue),Math.abs(r.buyGross+r.feeGross),Math.abs(r.grossRevenue-r.buyGross-r.feeGross)])),slot=650/rows.length;
 const axis=[-1,0,1].map(t=>'<line x1="50" x2="710" y1="'+(110-t*75)+'" y2="'+(110-t*75)+'" stroke="'+(t===0?'#7d98a9':'#e3e9ef')+'"/><text x="0" y="'+(114-t*75)+'" font-size="10" fill="#718096">'+Math.round(t*max).toLocaleString()+'</text>').join('');
 return '<svg class="revenue-signed-bars" viewBox="0 0 720 230" role="img" aria-label="年度数据比较">'+axis+rows.map((row,i)=>{
  const income=row.grossRevenue,cost=row.buyGross+row.feeGross,net=income-cost,x=55+i*slot+slot*.14,width=Math.max(2,slot*.68),netY=110-net/max*75;
  const bars=[[income,'含税营业收入','#008f83'],[-cost,'购电及交易费','#537cad']].map(([value,name,color])=>'<rect x="'+x+'" y="'+(value>=0?110-value/max*75:110)+'" width="'+width+'" height="'+(Math.abs(value)/max*75)+'" fill="'+color+'"><title>第'+row.year+'年 · '+name+'：'+value.toFixed(2)+'</title></rect>').join('');
  return bars;
 }).join('')+'</svg>';
}
function netRevenueOnlyChart(rows){
 return revenueSingleSeriesChart(rows,'net');
}
function revenueSeriesLegend(){
 return '<div class="legend revenue-series-legend">'+[['net','净收益（收入−购电及交易费）','#e5b66f'],['revenue','含税营业收入','#008f83'],['cost','购电及交易费','#537cad']].map(([view,label,color])=>'<button type="button" data-revenue-series="'+view+'" aria-pressed="false"><i class="dot" style="background:'+color+'"></i><span>'+label+'</span></button>').join('')+'</div>';
}
let revenueSeriesView='combined';
function applyRevenueSeriesView(){
 const chart=document.getElementById('revenueChart');if(!chart)return;
 chart.dataset.revenueView=revenueSeriesView;
 chart.querySelectorAll('[data-revenue-series]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.revenueSeries===revenueSeriesView||(revenueSeriesView==='combined'&&button.dataset.revenueSeries!=='net')));button.classList.toggle('series-muted',!(button.dataset.revenueSeries===revenueSeriesView||(revenueSeriesView==='combined'&&button.dataset.revenueSeries!=='net')))});
 chart.querySelectorAll('.bar-value-callout').forEach(label=>label.remove());
 applyChartDisplay();
}
document.addEventListener('click',event=>{const button=event.target.closest('#revenueChart [data-revenue-series]');if(!button)return;revenueSeriesView=button.dataset.revenueSeries===revenueSeriesView?'combined':button.dataset.revenueSeries;applyRevenueSeriesView()});

function revenueSingleSeriesChart(rows,view){
 const series={net:{name:'净收益',color:'#e5b66f',value:r=>r.grossRevenue-r.buyGross-r.feeGross},revenue:{name:'含税营业收入',color:'#008f83',value:r=>r.grossRevenue},cost:{name:'购电及交易费',color:'#537cad',value:r=>-(r.buyGross+r.feeGross)}}[view];
 return decisionBars(rows,[series]).match(/<svg[\s\S]*?<\/svg>/)[0].replace('<svg ','<svg class="revenue-'+view+'-only" data-year-count="'+rows.length+'" ');
}
