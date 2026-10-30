'use strict';
(function(){
const p=new URLSearchParams(location.search);let mode=p.get('mode');if(mode!=='solo'&&mode!=='pair'){try{mode=sessionStorage.getItem('adventureMode');}catch{}}if(mode!=='solo'&&mode!=='pair')mode='solo';try{sessionStorage.setItem('adventureMode',mode);}catch{}
const file=location.pathname.split('/').pop(),isMenu=file==='games.html';
const guidance={
 'bayou.html':{solo:'Plan a route, add your commands, then run and debug your program.',pair:'Planner: chart the route. Pilot: add and run the commands. Compare the result and swap roles next mission.'},
 'cyber.html':{solo:'Read each case, select the clues, and make your call. Review the explanation before continuing.',pair:'Planner: read the case aloud and suggest clues. Pilot: select the evidence and make your agreed call. Swap roles next case.'},
 'launch.html':{solo:'Predict the landing point, adjust the curve, and launch. Use each result to improve your next attempt.',pair:'Planner: predict the path and suggest adjustments. Pilot: change the controls and launch. Swap roles next mission.'},
 'quest.html':{solo:'Read the clue, choose coordinates, and search. Check x first, then y if you need another try.',pair:'Planner: read the clue and explain the coordinates. Pilot: plot the point and search. Swap roles after each cache.'},
 'games.html':{solo:'Choose any game and play at your own pace. Hints and retries are always welcome.',pair:'Share one computer. One person plans, the other operates the controls. Swap roles after each mission, case, or cache.'}
};
const main=document.querySelector('main');if(main){const box=document.createElement('aside');box.className='mode-banner';box.setAttribute('aria-label','Your play mode');const content=document.createElement('div'),b=document.createElement('b'),text=document.createElement('p'),link=document.createElement('a');b.textContent=mode==='pair'?'Playing as a pair · Planner + Pilot':'Playing alone · Your pace, your adventure';text.textContent=(guidance[file]||guidance['games.html'])[mode];content.append(b,text);link.href=`index.html?step=mode&mode=${mode}`;link.textContent='Change play mode';box.append(content,link);main.prepend(box);}
// Keep the chosen mode in ordinary links as well as tab-local session state.
document.querySelectorAll('a[href]').forEach(a=>{const raw=a.getAttribute('href');if(/^(bayou|cyber|launch|quest|games)\.html$/.test(raw))a.href=`${raw}?mode=${mode}`;});
if(mode==='solo'){
 const changes={
 'launch.html':['.mathintro','Deliver supplies to the boat. Shape the curve, predict where it lands, then launch. Adjust your approach and try again.'],
 'quest.html':['.mathintro','Find three hidden supply caches on each map. Read each clue, predict the location, then plot and search.']};
 if(changes[file]){const [selector,text]=changes[file],node=document.querySelector(selector);if(node)node.textContent=text;}
 if(file==='cyber.html'){const intro=document.querySelector('#clues')?.previousElementSibling;if(intro)intro.textContent='Select the details you think matter, then make your call. Think about why each clue matters.';}
 if(file==='bayou.html'){const h=document.querySelector('.footer h3');if(h)h.textContent='01 / Plan your route';const para=document.querySelector('.footer p');if(para)para.textContent='Trace the route, predict the turns, then add the commands. You can change your program after each run.';}
 if(isMenu){const foot=document.querySelector('.foot');if(foot)foot.innerHTML='<div><b>Your adventure, your pace.</b><p>Start anywhere. Make a prediction, test it, and see what you discover.</p></div><div><b>No experience needed.</b><p>Hints and retries help you learn as you play.</p></div><div><b>Ready for the next visitors?</b><p>Use Next family in any game to return to the welcome screen.</p></div>';}
}
const familyIds=new Set(['family','reset','newfamily','newquest','again']);document.addEventListener('click',e=>{const button=e.target.closest('button');if(button&&familyIds.has(button.id)){e.preventDefault();e.stopImmediatePropagation();try{sessionStorage.removeItem('adventureMode');}catch{}location.href='index.html';}},true);
})();
