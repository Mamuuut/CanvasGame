define([],function(){function t(){if(e!==null)throw new Error("Cannot instantiate more than one EventManager, use EventManager.getInstance()");this.initialize()}var e=null;return t.prototype={initialize:function(){this._eventListener={}},dispatchEvent:function(e,t,n){var r=this._eventListener[t];if(r){var i={type:t,data:n};for(var s in r){var o=r[s];o.object===e&&o.listener(i)}}},getEventListener:function(e,t,n){var r=this._eventListener[t];if(r)for(var i in r){var s=r[i];if(s.object===e&&s.listener==n)return n}},addEventListener:function(e,t,n){this.getEventListener(e,t,n)||(this._eventListener[t]=this._eventListener[t]||[],this._eventListener[t].push({object:e,listener:n}))},removeEventListener:function(e,t,n){var n=this.getEventListener(e,t,n);if(n){var r=this._eventListener[t].indexOf(n);this._eventListener[t].splice(r,1)}}},t.getInstance=function(){return e===null&&(e=new t),e},t.getInstance()})