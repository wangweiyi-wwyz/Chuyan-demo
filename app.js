const dialog=document.getElementById('dialog');
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.style.display='block';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.style.display='none',3200)}
document.getElementById('newProject').onclick=()=>dialog.showModal();
document.getElementById('cancel').onclick=()=>dialog.close();
document.getElementById('projectForm').onsubmit=e=>{e.preventDefault();const name=document.getElementById('nameInput').value.trim();if(!name)return;localStorage.setItem('storage-project-name',name);document.getElementById('projectName').textContent=name;dialog.close();toast('项目名称已保存在本机。参数页将在下一步搭建。')};
const saved=localStorage.getItem('storage-project-name');if(saved)document.getElementById('projectName').textContent=saved;
document.querySelectorAll('nav button:not(.active)').forEach(button=>button.onclick=()=>toast('此模块将在后续步骤搭建，当前请先确认首页设计。'));
document.getElementById('projectDetail').onclick=()=>toast('当前为项目首页原型，完整项目配置将在下一步搭建。');
document.querySelectorAll('[data-mode]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-mode]').forEach(b=>b.classList.remove('selected'));button.classList.add('selected');const values=button.dataset.mode==='equity'?['6.82','11.36','15.74']:['5.10','7.85','10.62'];['low','base','high'].forEach((id,i)=>document.getElementById(id).innerHTML=values[i]+'<small>%</small>');toast('已切换评价口径。数值和曲线均为演示，不是计算结果。')});
