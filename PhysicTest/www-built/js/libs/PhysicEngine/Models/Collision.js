define(["PhysicEngine/Models/Rect","PhysicEngine/Events/PhysicEvents"],function(e,t){var n=function(n,r,i,s){function o(){var t=n.getContactObjects(i,e.AXIS_MIN),s=r.getContactObjects(i,e.AXIS_MAX);return t.concat(s)}function u(){return Math.round(f()/a())}function a(){var e=0,t=o(),n;for(var r=0,i=t.length;n=t[r],r<i;r++){if(n.hasMaxMass())return 1;e+=n.mass}return e}function f(){var e=0,t=o(),n;for(var r=0,s=t.length;n=t[r],r<s;r++){if(n.hasMaxMass())return n.velocity[i];e+=n.mass*n.velocity[i]}return e}var s=s,i=i,n=n,r=r;this.Collide=function(){var e=u(),a=o(),f;for(var l=0,c=a.length;f=a[l],l<c;l++)f.updateTimePosition(s),f.velocity[i]=e,f.updateTimeNextPosition(s);n.dispatchEvent(t.COLLIDE,r),r.dispatchEvent(t.COLLIDE,n)},this.getTime=function(){return s},this.getObjects=function(){return o()}};return n})