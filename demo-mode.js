normalisePayments();
// Public demo: browser-local calculations only. No external file-service calls.
importButton.remove();
importDialog.remove();
generateExports=async function(){toast('此演示版不提供文件导出服务。')};
renderExports=function(){exportView.innerHTML='<div class="page-title"><div><div class="eyebrow">CHUYAN / PUBLIC DEMO</div><h1>演示版说明</h1></div></div><section class="form-card"><h2>在线演示</h2><p>参数测算、三情景分析、图表及财务明细可正常体验。</p><p>演示版仅供体验，数据保存在当前浏览器，不会上传服务器。</p><p>Excel、Word导出及Excel参数导入暂未开放。</p><p>演示版支持中文与英文，以及日间与夜间皮肤切换。</p></section>'};
const demoRefreshDashboard=refreshDashboard;
refreshDashboard=function(){demoRefreshDashboard();document.querySelector('.demo').textContent='在线演示'};
refreshDashboard();
const demoBanner=document.createElement('div');demoBanner.className='notice demo-banner';demoBanner.style.margin='12px 24px';demoBanner.textContent='演示版仅供体验，数据保存在当前浏览器，不会上传服务器。';document.querySelector('header').after(demoBanner);
homeContent.querySelector('.deliverables').innerHTML='<div><span class="file-icon">▦</span><div><h3>在线演示</h3><p>参数测算、三情景分析、图表及财务明细可正常体验。</p></div></div><div><span class="file-icon word">▤</span><div><h3>演示版说明</h3><p>Excel、Word导出及Excel参数导入暂未开放。</p></div></div>';
helpButton.onclick=function(){openPage('exports')};

