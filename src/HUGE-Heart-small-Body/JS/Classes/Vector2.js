// Copyright Matthew James, 2021
class Vector2{constructor(t,s){this.x=t,this.y=s}toString(){return this.x+", "+this.y}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}add(t){this.x+=t.x,this.y+=t.y}sub(t){this.x-=t.x,this.y-=t.y}mult(t){this.x*=t.x,this.y*=t.y}div(t){this.x/=t.x,this.y/=t.y}dist(t){return Math.sqrt(Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2))}dot(t){return this.x*t.x+this.y*t.y}mag(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y);return[this.x/t,this.y/t]}array(){return[this.x,this.y]}static dist(t,s){return Math.sqrt(Math.pow(s.x-t.x,2)+Math.pow(s.y-t.y,2))}static dot(t,s){return t.x*s.x+t.y*s.y}static array(t){return[t.x,t.y]}static Zero(){return new Vector2(0,0)}}