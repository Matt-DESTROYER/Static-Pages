// Copyright Matthew James, 2021
class Line{constructor(i,t){this.point1=i,this.point2=t,this.x1=i.x,this.y1=i.y,this.x2=t.x,this.y2=t.y}pointOnLine(i){let t=(this.y2-this.y1)/(this.x2-this.x1),s=this.y1-t*this.x1;return i.y===t*i.x+s}pointInLine(i){return this.x1<this.x2?this.y1<this.y2?this.pointOnLine(i)&&i.x>=this.x1&&i.x<=this.x2&&i.y>=this.y1&&i.y<=this.y2:this.pointOnLine(i)&&i.x>=this.x1&&i.x<=this.x2&&i.y>=this.y2&&i.y<=this.y1:this.y1<this.y2?this.pointOnLine(i)&&i.x>=this.x2&&i.x<=this.x1&&i.y>=this.y1&&i.y<=this.y2:this.pointOnLine(i)&&i.x>=this.x2&&i.x<=this.x1&&i.y>=this.y2&&i.y<=this.y1}intersects(i){if(this.pointInLine(i.point1)||this.pointInLine(i.point2))return!0;let t=(this.x2-this.x1)*(i.y2-i.y1)-(i.x2-i.x1)*(this.y2-this.y1);if(0===t)return!1;let s=((i.y2-i.y1)*(i.x2-this.x1)+(i.x1-i.x2)*(i.y2-this.y1))/t,h=((this.y1-this.y2)*(i.x2-this.x1)+(this.x2-this.x1)*(i.y2-this.y1))/t;return s>0&&s<1&&h>0&&h<1}}