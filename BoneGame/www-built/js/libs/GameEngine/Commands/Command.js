define([],function(){function e(e,t){this._receiver=e,this._action=t}return e.prototype.execute=function(){this._receiver[this._action]()},e})