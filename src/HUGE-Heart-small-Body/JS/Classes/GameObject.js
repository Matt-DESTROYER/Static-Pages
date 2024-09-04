// Copyright Matthew James, 2021
class GameObject{constructor(t,s,e,h,i=function(){},o=function(){},r=!1){this.x=t,this.y=s,this.mesh=e,"string"==typeof h?(this.colour=h,this.render=function(){this.readyMesh(),this.mesh.rotate(this.rotation),this.mesh.render(this.colour),this.mesh.rotate(-this.rotation),this.resetMesh()}):this.render=h,this.rotation=0,this.layer=1,this.enabled=!0,this.start=i,this.update=o,this.collides=r}readyMesh(){this.mesh.move(this.x,this.y)}resetMesh(){this.mesh.move(-this.x,-this.y)}collision(t){this.readyMesh(),this.mesh.rotate(this.rotation);let s=this.mesh.collision(t);return this.mesh.rotate(-this.rotation),this.resetMesh(),s}changeX(t){this.x+=t,this.collides&&(t/=Math.abs(t),scenes[currentScene].gameObjects.forEach(s=>{if(s!==this&&s.collides){if(s.readyMesh(),s.mesh.rotate(s.rotation),this.collision(s.mesh))for(0===t&&(this.readyMesh(),this.mesh.rotate(this.rotation),t=this.mesh.midPoint().x>s.mesh.midPoint().x?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(s.mesh);)this.x-=t;s.mesh.rotate(-s.rotation),s.resetMesh()}}))}changeY(t){this.y+=t,this.collides&&(t/=Math.abs(t),scenes[currentScene].gameObjects.forEach(s=>{if(s!==this&&s.collides){if(s.readyMesh(),s.mesh.rotate(s.rotation),this.collision(s.mesh))for(0===t&&(this.readyMesh(),this.mesh.rotate(this.rotation),t=this.mesh.midPoint().y>s.mesh.midPoint().y?1:-1,this.mesh.rotate(-this.rotation),this.resetMesh());this.collision(s.mesh);)this.y-=t;s.mesh.rotate(-s.rotation),s.resetMesh()}}))}}