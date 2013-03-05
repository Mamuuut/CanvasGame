/**
 * @author Mamut
 */
define( [ 
    "GameEngine/Events/StateEvents"
], function( StateEvents )
{
	
	function StateManager()
	{
		this._currentState = undefined;
		this._states = {};
	}
		
	StateManager.prototype.addState = function( name, state )
	{
		this._states[ name ] = state;
		var that = this;
		state.addEventListener( StateEvents.SET_NEXT_STATE, 
		    function( event )
		    {
                that.setCurrentState( event.data.state )
		    } );	
	}

    StateManager.prototype.setCurrentState = function( name )
    {
    	if( this._currentState )
        	this._currentState.stop();
    	if( !this._states[ name ] )
    		throw new Error( "setCurrentState called with unknown state name " + name );
    	this._currentState = this._states[ name ];
        this._currentState.start();   
    };
    
    StateManager.prototype.update = function()
    {
        this._currentState.update();
    };
	
	return StateManager;
} );