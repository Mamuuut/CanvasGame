define(["GameEngine/Events/ObjectEvents"],function(e){var t=function(){};return t.prototype.acceptsObject=function(e,t){return e.isAlive&&0!=(e.predatorBits&t.preyBits)},t.prototype.execute=function(t,n){n.dispatchEvent(e.DYING)},t})