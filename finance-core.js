/* Pure debt calculation; amounts: RMB 10,000, rates: percent. */
function calculateDebt({investment,ratio,rate,years,payments,method}){
 const principal=investment*ratio/100,monthlyRate=rate/1200,n=years*12;let balance=0;const construction=[];
 payments.forEach((share,i)=>{const opening=balance,draw=principal*share/100,interest=(opening+draw/2)*monthlyRate;balance+=draw;construction.push({month:i+1,opening,draw,interest,repayment:0,closing:balance})});
 const constructionInterest=construction.reduce((s,r)=>s+r.interest,0);const payment=monthlyRate===0?principal/n:principal*monthlyRate/(-Math.expm1(-n*Math.log1p(monthlyRate)));const annual=[];
 for(let i=0;i<n;i++){const year=Math.floor(i/12);if(!annual[year])annual.push({year:year+1,opening:balance,interest:0,repayment:0,closing:0});const interest=balance*monthlyRate;const repay=i===n-1?balance:Math.min(balance,method==='等额本金'?principal/n:payment-interest);balance=Math.max(0,balance-repay);annual[year].interest+=interest;annual[year].repayment+=repay;annual[year].closing=balance}
 return {principal,construction,constructionInterest,annual,totalInterest:constructionInterest+annual.reduce((s,r)=>s+r.interest,0),initialEquity:investment-principal+constructionInterest,check:principal-annual.reduce((s,r)=>s+r.repayment,0)-balance};
}
if(typeof module!=='undefined')module.exports={calculateDebt};
