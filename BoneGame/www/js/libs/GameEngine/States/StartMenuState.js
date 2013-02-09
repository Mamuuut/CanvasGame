/**
 * @author Mamut
 */
define( [ 
	"GameEngine/Inputs/KeyboardManager",
	"GameEngine/States/State",
	"GameEngine/Commands/Command",
    "GameEngine/Events/StateEvents"
], function( KeyboardManager, State, Command, StateEvents )
{
	function StartMenuState( config, container )
	{
	    State.call( this, config, container );
	};
	
	extend( StartMenuState, State );
	
	StartMenuState.prototype.start = function()
	{
	    StartMenuState.superClass.start.call( this );
	};
	
	StartMenuState.prototype.startGame = function()
	{
	    this.dispatchEvent( StateEvents.SET_NEXT_STATE, { state: "game" } );
	};
	
	StartMenuState.prototype.createView = function()
	{
	    var startButton = $( '<div class="button">Start</div>' );
	    var that = this;
	    startButton.click( function() {
	        that.startGame();
	    } );
	    
	    var view = $( '<div class="start-menu-view"></div>' )
	        .append( startButton );
	    
	    this._view = view; 
	};
	
	StartMenuState.prototype.initKeyboard = function() 
	{
	    var startGameCommand = new Command( this, "startGame" );
	            
	    KeyboardManager.addCommand(
	        KeyboardManager.TYPES.keydown,
	        KeyboardManager.KEY_CODES.enter,
	        startGameCommand );
	};
	
	return StartMenuState;
} );