/**
 * @author Mamut
 */
 
 define( [
	"GameEngine/States/StateManager", 
	"GameEngine/States/LoadingState", 
	"GameEngine/States/StartMenuState", 
	"GameEngine/States/GameState" 
], function( StateManager, LoadingState, StartMenuState, GameState )
{
	function GameEngine( container, gameConfig )
	{
	    this._stateManager = new StateManager();
	    
        var loadingState = new LoadingState( gameConfig, container );
        var startMenuState = new StartMenuState( gameConfig, container );
        var gameState = new GameState( gameConfig, container );
    	
    	this._stateManager.addState( "loading", loadingState );
    	this._stateManager.addState( "startMenu", startMenuState );
    	this._stateManager.addState( "game", gameState );
    	
    	this._stateManager.setCurrentState( "loading" );
		
		var stateManager = this._stateManager;
		setInterval( function()
	    {
	        stateManager.update();
	    }, gameConfig.frameRate );
    }
    
	return GameEngine;
} );