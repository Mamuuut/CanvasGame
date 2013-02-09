define(["PhysicEngine/Models/Vector2D","PhysicEngine/Models/Rect","PhysicEngine/Models/Collision"],function(e,t,n){var r={checkOverriding:function(e,t,n,r){return!(n.x>=e.x+t.x||n.x+r.x<=e.x||n.y>=e.y+t.y||n.y+r.y<=e.y)},checkContacts:function(t,n){if(t.hasMaxMass()&&n.hasMaxMass())return;if(n.position.x>t.position.x+t.size.x||n.position.x+n.size.x<t.position.x||n.position.y>t.position.y+t.size.y||n.position.y+n.size.y<t.position.y)return;var i=r.getAxisProj(e.X_AXIS,t,n),s=r.getAxisProj(e.Y_AXIS,t,n);i<s?r.checkAxisContact(e.X_AXIS,t,n):r.checkAxisContact(e.Y_AXIS,t,n)},getCollision:function(t,i){if(t.hasMaxMass()&&i.hasMaxMass())return null;var s=r.getLeftTopObject(e.X_AXIS,t,i),o=r.getRightBottomObject(e.X_AXIS,t,i),u=r.getCollisionTime(e.X_AXIS,s,o),a=r.getLeftTopObject(e.Y_AXIS,t,i),f=r.getRightBottomObject(e.Y_AXIS,t,i),l=r.getCollisionTime(e.Y_AXIS,a,f);if(0<=u&&1>=u&&0<=l&&1>=l)return u<=l?new n(s,o,e.X_AXIS,u):new n(a,f,e.Y_AXIS,l);if(0<=u&&1>=u){var c=a.getTimePosition(u).y+a.size.y,h=f.getTimePosition(u).y;if(c>=h&&s.velocity.x>o.velocity.x)return new n(s,o,e.X_AXIS,u)}else if(0<=l&&1>=l){var p=s.getTimePosition(l).x+s.size.x,d=o.getTimePosition(l).x;if(p>=d&&a.velocity.y>f.velocity.y)return new n(a,f,e.Y_AXIS,l)}return null},getCollisionTime:function(e,t,n){return(t.position[e]+t.size[e]-n.position[e])/(n.velocity[e]-t.velocity[e])},getMinTimeCollisionFromObjects:function(e){var t=undefined;for(var n=0;n<e.length;n++)for(var i=n+1;i<e.length;i++)e[n].collidesWith(e[i])&&(r.checkContacts(e[n],e[i]),t=r.getMinTimeCollision(t,r.getCollision(e[n],e[i])));return t},getMinTimeCollision:function(e,t){var n=r.isValidCollision(e),i=r.isValidCollision(t);if(!n&&i)return t;if(n&&!i)return e;if(n&&i)return e.getTime()<t.getTime()?e:t},isValidCollision:function(e){return undefined!=e&&e.getTime()>=0&&e.getTime()<=1},checkAxisContact:function(e,n,i){var s=r.getLeftTopObject(e,n,i),o=r.getRightBottomObject(e,n,i);s.velocity[e]>=o.velocity[e]&&(s.contacts.addContact(o,e,t.AXIS_MAX),o.contacts.addContact(s,e,t.AXIS_MIN))},getAxisProj:function(e,t,n){var r=Math.max(t.getLeftTop(e),n.getLeftTop(e)),i=Math.min(t.getRightBottom(e),n.getRightBottom(e));return i-r},getLeftTopObject:function(e,t,n){return t.getRightBottom(e)<=n.getLeftTop(e)?t:n},getRightBottomObject:function(e,t,n){return t.getRightBottom(e)<=n.getLeftTop(e)?n:t}};return r})