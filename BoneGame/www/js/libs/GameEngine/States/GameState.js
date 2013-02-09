/**
 * @author Mamut
 */
define( [
    "GameEngine/Events/StateEvents", 
	"GameEngine/Factories/ViewFactory", 
	"GameEngine/Factories/ModelFactory", 
	"GameEngine/States/State",
	"GameEngine/Inputs/KeyboardManager",
	"GameEngine/Commands/Command",
	"GameEngine/Controllers/LevelController",
	"GameEngine/Views/CanvasRenderer",
	"GameEngine/Views/PlayerView",
	"GameEngine/Models/LevelPhysicObject"
], function( StateEvents, ViewFactory, ModelFactory, State, KeyboardManager, Command, LevelController, CanvasRenderer, PlayerView, LevelPhysicObject )
{
	function GameState( config, container )
	{
    	State.call( this, config, container );
        this._modelFactory = new ModelFactory();
        this._viewFactory = new ViewFactory();
		this._canvasRenderer = undefined;
		this.createView();
		this._levelController = new LevelController( config, this._canvasRenderer );
	};
	
	extend( GameState, State );
	
	GameState.prototype.start = function()
	{   
	    GameState.superClass.start.call( this );
	    
	    this._levelController.onInitialize();
        this.initializeLevel();
	};
	
	GameState.prototype.update = function()
	{
	    GameState.superClass.update.call( this );
	    this._levelController.onDraw();
	};
	
	GameState.prototype.escape = function()
	{
	    this.dispatchEvent( StateEvents.SET_NEXT_STATE, { state: "startMenu" } );
	};
	
	GameState.prototype.createView = function()
	{
		this._canvasRenderer = new CanvasRenderer( this._config.size.width, this._config.size.height );
	    this._view = this._canvasRenderer.getView();
	};
	
	GameState.prototype.initializeLevel = function()
	{
	    var models = this._config.levelDef.models;
        for( var idx in models )
        {
            var def = models[ idx ];
            var model = this._modelFactory.createModel( def );
            this._levelController.addModel( model );
        }
        
	    var views = this._config.levelDef.views;
        for( var idx in views )
        {
            var def = views[ idx ];
            var view = this._viewFactory.createView( def );
            this._levelController.addView( view );
            if( view.setLevelController )
                view.setLevelController( this._levelController );
        }
	};
	
	GameState.prototype.initKeyboard = function() 
	{
	    var escapeCommand = new Command( this, "escape" );
	            
	    KeyboardManager.addCommand(
	        KeyboardManager.TYPES.keydown,
	        KeyboardManager.KEY_CODES.escape,
	        escapeCommand );
	};
	
	return GameState;
} );