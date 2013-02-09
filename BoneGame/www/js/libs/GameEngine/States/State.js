/**
 * @author Mamut
 */
define( [
    "PhysicEngine/Events/EventTargetMixin",
    "GameEngine/Inputs/KeyboardManager"
], function( EventTargetMixin, KeyboardManager )
{	
	function State( config, container )
	{
	    this._config = config;
	    this._container = container;
	    this._view = undefined;
	    this.createView();
	};
	
	State.prototype.start = function()
	{
	    this._container.append( this._view );
	    this.initKeyboard();
	};
	
	State.prototype.update = function()
	{
	    KeyboardManager.update();   
	};
	
	State.prototype.stop = function()
	{
	    this._view.detach();
	    KeyboardManager.clearCommands();   
	};
	
	State.prototype.createView = function() {};
	
	State.prototype.initKeyboard = function() {};
	
	augment( State, EventTargetMixin );
	
	return State;
} );