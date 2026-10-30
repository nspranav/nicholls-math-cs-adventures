'use strict';
const MathAdventure={
 height:(x,h,k)=>-k/(h*h)*(x-h)*(x-h)+k,
 landing:h=>2*h,
 launchResult(h,k,level){const end=2*h;if(level.obstacle&&end>=level.obstacle.x&&this.height(level.obstacle.x,h,k)<=level.obstacle.height+.15)return 'obstacle';return Math.abs(end-level.target)<.3?'success':'miss';},
 reflectY:([x,y])=>[-x,y],translate:([x,y],[dx,dy])=>[x+dx,y+dy]
};
if(typeof module!=='undefined')module.exports=MathAdventure;
