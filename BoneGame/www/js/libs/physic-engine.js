function extend(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.superClass=t.prototype,t.prototype.constructor==Object.prototype.constructor&&(t.prototype.constructor=t)}function augment(e,t){if(arguments[2])for(var n=2,r=arguments.length;n<r;n++)e.prototype[arguments[n]]=t.prototype[arguments[n]];else for(methodName in t.prototype)e.prototype[methodName]||(e.prototype[methodName]=t.prototype[methodName])}var Interface=function(e,t){if(arguments.length!=2)throw new Error("Interface constructor called with "+arguments.length+" arguments, but expected exactly 2.");this.name=e,this.methods=[];for(var n=0,r=t.length;n<r;n++){if(typeof t[n]!="string")throw new Error("Interace constructor expecets method names to be passed in a string.");this.methods.push(t[n])}};Interface.ensureImplements=function(e){if(arguments.length<2)throw new Error("Function Interface.ensureImplements called with"+arguments.length+"arguments, but expected at least 2.");for(var t=1,n=arguments.length;t<n;t++){var r=arguments[t];if(r.constructor!==Interface)throw new Error("Function Interface.ensureImplements expects argumentstwo and above to be Instances of Interface.");for(var i=0,s=r.methods.length;i<s;i++){var o=r.methods[i];if(!e[o]||typeof e[o]!="function")throw new Error("Function Interface.ensureImplements: objectsdoes not implement the "+r.name+" interface. Method "+o+" was not found.")}}},Array.indexOf||(Array.prototype.indexOf=function(e){for(var t=0;t<this.length;t++)if(this[t]==e)return t;return-1}),define("utils",function(){}),requirejs.config({baseUrl:"js/libs",paths:{app:"../app"}}),require(["utils"]),define("../physic-engine",function(){}),define("PhysicEngine/Models/Vector2D",[],function(){var e=function(e,t){this.x=e||0,this.y=t||0};return e.prototype.fromString=function(e){if(null!=string){var t=string.split(";");2==t.length&&(x=parseFloat(t[0]),y=parseFloat(t[1]))}},e.X_AXIS="x",e.Y_AXIS="y",e}),define("PhysicEngine/Models/Rect",["PhysicEngine/Models/Vector2D"],function(e){var t=function(t,n,r,i){this.size=new e(r,i),this.position=new e(t,n)};return t.prototype.getLeftTop=function(e){return this.position[e]},t.prototype.getRightBottom=function(e){return this.position[e]+this.size[e]},t.AXIS_MIN="axis_min",t.AXIS_MAX="axis_max",t}),define("PhysicEngine/Events/PhysicEvents",{COLLIDE:"collide",INTERSECT:"intersect"}),define("PhysicEngine/Models/Collision",["PhysicEngine/Models/Rect","PhysicEngine/Events/PhysicEvents"],function(e,t){var n=function(n,r,i,s){function o(){var t=n.getContactObjects(i,e.AXIS_MIN),s=r.getContactObjects(i,e.AXIS_MAX);return t.concat(s)}function u(){return Math.round(f()/a())}function a(){var e=0,t=o(),n;for(var r=0,i=t.length;n=t[r],r<i;r++){if(n.hasMaxMass())return 1;e+=n.mass}return e}function f(){var e=0,t=o(),n;for(var r=0,s=t.length;n=t[r],r<s;r++){if(n.hasMaxMass())return n.velocity[i];e+=n.mass*n.velocity[i]}return e}var s=s,i=i,n=n,r=r;this.Collide=function(){var e=u(),a=o(),f;for(var l=0,c=a.length;f=a[l],l<c;l++)f.updateTimePosition(s),f.velocity[i]=e,f.updateTimeNextPosition(s);n.dispatchEvent(t.COLLIDE,r),r.dispatchEvent(t.COLLIDE,n)},this.getTime=function(){return s},this.getObjects=function(){return o()}};return n}),define("PhysicEngine/Helpers/CollisionHelper",["PhysicEngine/Models/Vector2D","PhysicEngine/Models/Rect","PhysicEngine/Models/Collision"],function(e,t,n){var r={checkOverriding:function(e,t,n,r){return!(n.x>=e.x+t.x||n.x+r.x<=e.x||n.y>=e.y+t.y||n.y+r.y<=e.y)},checkContacts:function(t,n){if(t.hasMaxMass()&&n.hasMaxMass())return;if(n.position.x>t.position.x+t.size.x||n.position.x+n.size.x<t.position.x||n.position.y>t.position.y+t.size.y||n.position.y+n.size.y<t.position.y)return;var i=r.getAxisProj(e.X_AXIS,t,n),s=r.getAxisProj(e.Y_AXIS,t,n);i<s?r.checkAxisContact(e.X_AXIS,t,n):r.checkAxisContact(e.Y_AXIS,t,n)},getCollision:function(t,i){if(t.hasMaxMass()&&i.hasMaxMass())return null;var s=r.getLeftTopObject(e.X_AXIS,t,i),o=r.getRightBottomObject(e.X_AXIS,t,i),u=r.getCollisionTime(e.X_AXIS,s,o),a=r.getLeftTopObject(e.Y_AXIS,t,i),f=r.getRightBottomObject(e.Y_AXIS,t,i),l=r.getCollisionTime(e.Y_AXIS,a,f);if(0<=u&&1>=u&&0<=l&&1>=l)return u<=l?new n(s,o,e.X_AXIS,u):new n(a,f,e.Y_AXIS,l);if(0<=u&&1>=u){var c=a.getTimePosition(u).y+a.size.y,h=f.getTimePosition(u).y;if(c>=h&&s.velocity.x>o.velocity.x)return new n(s,o,e.X_AXIS,u)}else if(0<=l&&1>=l){var p=s.getTimePosition(l).x+s.size.x,d=o.getTimePosition(l).x;if(p>=d&&a.velocity.y>f.velocity.y)return new n(a,f,e.Y_AXIS,l)}return null},getCollisionTime:function(e,t,n){return(t.position[e]+t.size[e]-n.position[e])/(n.velocity[e]-t.velocity[e])},getMinTimeCollisionFromObjects:function(e){var t=undefined;for(var n=0;n<e.length;n++)for(var i=n+1;i<e.length;i++)e[n].collidesWith(e[i])&&(r.checkContacts(e[n],e[i]),t=r.getMinTimeCollision(t,r.getCollision(e[n],e[i])));return t},getMinTimeCollision:function(e,t){var n=r.isValidCollision(e),i=r.isValidCollision(t);if(!n&&i)return t;if(n&&!i)return e;if(n&&i)return e.getTime()<t.getTime()?e:t},isValidCollision:function(e){return undefined!=e&&e.getTime()>=0&&e.getTime()<=1},checkAxisContact:function(e,n,i){var s=r.getLeftTopObject(e,n,i),o=r.getRightBottomObject(e,n,i);s.velocity[e]>=o.velocity[e]&&(s.contacts.addContact(o,e,t.AXIS_MAX),o.contacts.addContact(s,e,t.AXIS_MIN))},getAxisProj:function(e,t,n){var r=Math.max(t.getLeftTop(e),n.getLeftTop(e)),i=Math.min(t.getRightBottom(e),n.getRightBottom(e));return i-r},getLeftTopObject:function(e,t,n){return t.getRightBottom(e)<=n.getLeftTop(e)?t:n},getRightBottomObject:function(e,t,n){return t.getRightBottom(e)<=n.getLeftTop(e)?n:t}};return r}),define("PhysicEngine/Models/QuadTree",["PhysicEngine/Models/Rect","PhysicEngine/Helpers/CollisionHelper"],function(e,t){var n=function(t,n,r,i){this.rect=new e(t,n,r,i),this.objects=[],this.isLeaf=!0,this.minTimeCollision=undefined,this.isUpToDate=!1,this.childs=[]};return n.MAX_OBJECTS_PER_QUAD=10,n.prototype={subdivide:function(){var e=Math.floor(this.rect.size.x/2),r=Math.floor(this.rect.size.y/2),i=this.rect.position.x,s=this.rect.position.y;this.childs.push(new n(i,s,e,r)),this.childs.push(new n(i+e,s,e,r)),this.childs.push(new n(i,s+r,e,r)),this.childs.push(new n(i+e,s+r,e,r));var o=this.objects,u=this.childs,a,f,l=t.checkOverriding;for(var c=0,h=o.length;a=o[c],c<h;c++){var p=a.position,d=a.size;for(var v=0,m=u.length;f=u[v],v<m;v++)l(f.rect.position,f.rect.size,p,d)&&f.insert(a)}this.objects=[],this.isLeaf=!1},insert:function(e){this.isUpToDate=!1;if(this.isLeaf===!0)this.objects.push(e),e.parentQuads.push(this),this.objects.length>n.MAX_OBJECTS_PER_QUAD&&this.subdivide();else{var r=t.checkOverriding,i=this.childs,s,o=e.position,u=e.nextPosition,a=e.size;for(var f=0,l=i.length;s=i[f],f<l;f++)(r(s.rect.position,s.rect.size,o,a)||r(s.rect.position,s.rect.size,u,a))&&s.insert(e)}},remove:function(e){this.isUpToDate=!1;var t=e.parentQuads,n;for(var r=0,i=t.length;n=t[r],r<i;r++){var s=n.objects.indexOf(e);n.objects.splice(s,1)}e.parentQuads=[]},clear:function(){this.isLeaf=!0,this.isUpToDate=!1,this.objects=new Array,this.childs=new Array},update:function(e){this.remove(e),this.insert(e)},getMinTimeCollision:function(){if(this.isUpToDate)return this.minTimeCollision;this.minTimeCollision=undefined;if(this.isLeaf===!0)return this.minTimeCollision=t.getMinTimeCollisionFromObjects(this.objects),this.minTimeCollision;var e=this.childs,n,r;for(var i=0,s=e.length;n=e[i],i<s;i++)r=t.getMinTimeCollision(r,n.getMinTimeCollision());return this.minTimeCollision=r,this.isUpToDate=!0,this.minTimeCollision},getQuadTrees:function(){if(this.isLeaf)return[this];var e=new Array,t=this.childs,n;for(var r=0,i=t.length;n=t[r],r<i;r++)e=e.concat(n.getQuadTrees());return e}},n}),define("PhysicEngine/Controller/PhysicController",["PhysicEngine/Models/Vector2D","PhysicEngine/Models/QuadTree"],function(e,t){var n=function(r,i){function f(){l();var e=a.getMinTimeCollision();if(null!=e){s++,e.Collide();var t=e.getObjects(),n;for(var r=0,i=t.length;n=t[r],r<i;r++)a.update(n);f()}}function l(){var e;for(var t=0,n=o.length;e=o[t],t<n;t++)e.clearContacts()}var s,o=new Array,u=r,a=new t(0,0,u.canvas.width,u.canvas.height);this.addObject=function(e){o.push(e),a.insert(e)},this.removeObject=function(e){var t=o.indexOf(e);o.splice(t,1),a.remove(e)},this.clearObjects=function(){a.clear(),o=new Array},this.updatePhysic=function(){s=0,a.clear();var e;for(var t=0,n=o.length;e=o[t],t<n;t++)e.updateForces(),e.resetForces(),e.updateTimeNextPosition(0),e.parentQuads=new Array,a.insert(e);f();var e,r;for(var t=0,n=o.length;e=o[t],t<n;t++)e.updatePosition(),e.checkObjectIntersections(o)},this.getQuadTrees=function(){return a.getQuadTrees()},this.clearObjects(),n.GRAVITY=null!=i?i:new e(0,3)};return n.GRAVITY=new e,n}),define("PhysicEngine/Models/AxisContacts",[],function(){return AxisContacts=function(){this.axis_min=new Array,this.axis_max=new Array},AxisContacts.prototype.addContact=function(e,t){this[t].push(e)},AxisContacts}),define("PhysicEngine/Models/Contacts",["PhysicEngine/Models/AxisContacts"],function(e){var t=function(){this.x=null,this.y=null,this.clear()};return t.prototype.addContact=function(e,t,n){return this.getObjects(t,n).push(e)},t.prototype.hasContact=function(e){return 0!=this[e].axis_min.length||0!=this[e].axis_max.length},t.prototype.getObjects=function(e,t){return this.getAxisContacts(e)[t]},t.prototype.getAxisContacts=function(e){return this[e]},t.prototype.clear=function(){this.x=new e,this.y=new e},t}),define("PhysicEngine/Events/EventManager",[],function(){function t(){if(e!==null)throw new Error("Cannot instantiate more than one EventManager, use EventManager.getInstance()");this.initialize()}var e=null;return t.prototype={initialize:function(){this._eventListener={}},dispatchEvent:function(e,t,n){var r=this._eventListener[t];if(r){var i={type:t,data:n};for(var s in r){var o=r[s];o.object===e&&o.listener(i)}}},getEventListener:function(e,t,n){var r=this._eventListener[t];if(r)for(var i in r){var s=r[i];if(s.object===e&&s.listener==n)return n}},addEventListener:function(e,t,n){this.getEventListener(e,t,n)||(this._eventListener[t]=this._eventListener[t]||[],this._eventListener[t].push({object:e,listener:n}))},removeEventListener:function(e,t,n){var n=this.getEventListener(e,t,n);if(n){var r=this._eventListener[t].indexOf(n);this._eventListener[t].splice(r,1)}}},t.getInstance=function(){return e===null&&(e=new t),e},t.getInstance()}),define("PhysicEngine/Events/EventTargetMixin",["PhysicEngine/Events/EventManager"],function(e){function t(){}return t.prototype={dispatchEvent:function(t,n){e.dispatchEvent(this,t,n)},addEventListener:function(t,n){e.addEventListener(this,t,n)},removeEventListener:function(t,n){e.removeEventListener(this,t,n)}},t}),define("PhysicEngine/Models/ObjectModel",["PhysicEngine/Models/Vector2D","PhysicEngine/Models/Rect","PhysicEngine/Models/Contacts","PhysicEngine/Events/EventTargetMixin","PhysicEngine/Events/PhysicEvents","PhysicEngine/Helpers/CollisionHelper","PhysicEngine/Controller/PhysicController"],function(e,t,n,r,i,s,o){var u=function(r,i,s,a){function c(e){e.x=Math.max(-u.MAX_VELOCITY.x,Math.min(u.MAX_VELOCITY.x,e.x)),e.y=Math.max(-u.MAX_VELOCITY.y,Math.min(u.MAX_VELOCITY.y,e.y))}function h(e){return-1!=l.objectFriction?l.objectFriction:l.contacts.hasContact(e)?u.CONTACT_FRICTION[e]:u.AIR_FRICTION}t.call(this,r,i,s,a);var f=null,l=this;this.nextPosition=new e(r,i),this.velocity=new e,this.mass=1,this.contacts=new n,this.objectFriction=-1,this.collideBits=0,this.parentQuads=[],this.updateTimePosition=function(e){c(this.velocity),this.position=this.getTimePosition(e)},this.updateTimeNextPosition=function(e){c(this.velocity),this.nextPosition=this.getTimePosition(1-e)},this.updateForces=function(){if(!this.hasMaxMass()){var t,n=this.velocity;for(var r=0,i=f.length;t=f[r],r<i;r++)n.x+=t.x,n.y+=t.y;n.x*=h(e.Y_AXIS),n.y*=h(e.X_AXIS)}},this.resetForces=function(){f=new Array,this.addForce(o.GRAVITY)},this.addForce=function(e){f.push(e)},this.resetForces()};return extend(u,t),u.MAX_VELOCITY=new e(40,40),u.CONTACT_FRICTION=new e(.5,.9),u.AIR_FRICTION=.95,u.prototype.updatePosition=function(){this.position.x=this.nextPosition.x,this.position.y=this.nextPosition.y},u.prototype.checkObjectIntersections=function(e){var t,n=s.checkOverriding,r=this.position,o=this.size;for(var u=0,a=e.length;t=e[u],u<a;u++)this!=t&&n(r,o,t.position,t.size)&&this.dispatchEvent(i.INTERSECT,{object:t})},u.prototype.collidesWith=function(e){var t=this.collideBits&e.collideBits;return 0!=t},u.prototype.clearContacts=function(){this.contacts.clear()},u.prototype.getContactObjects=function(e,t){var n=new Array;n.push(this);var r=this.contacts.getObjects(e,t);if(0!=r.length){var i;for(var s=0,o=r.length;i=r[s],s<o;s++)n=n.concat(i.getContactObjects(e,t))}return n},u.prototype.getTimePosition=function(t){return new e(Math.round(this.position.x+t*this.velocity.x),Math.round(this.position.y+t*this.velocity.y))},u.prototype.hasMaxMass=function(){return Number.MAX_VALUE==this.mass},augment(u,r),u})