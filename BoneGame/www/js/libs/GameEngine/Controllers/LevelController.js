/**
 * @author Mamut
 */
define( [ 
    "PhysicEngine/Models/Vector2D",
    "PhysicEngine/Controller/PhysicController",
	"GameEngine/Views/LevelGroupView",
	"GameEngine/Models/LevelPhysicObject"
], function( Vector2D, PhysicController, LevelGroupView, LevelPhysicObject )
{
	LevelController = function( gameConfig, canvas )
	{
	    this._levelView = undefined;
	    this._scrollController = undefined;
		this._physicController = undefined;
	    
	    this._canvas = canvas;
	    this._gameConfig = gameConfig;
    }
    
    LevelController.prototype.onInitialize = function()
    {
        this._levelView = new LevelGroupView();
        this._physicController = new PhysicController( this._canvas.getContext(), new Vector2D( -0.5, 3 ) );
    };
    
    LevelController.prototype.addModel = function( model )
    {
    	if( model.supportPhysic )
        	this._physicController.addObject( model );
    };
    
    LevelController.prototype.addView = function( view )
    {
    	if( view.getModel && view.getModel().supportPhysic )
        	this._physicController.addObject( view.getModel() );
        this._levelView.add( view ); 
    };
    
	LevelController.prototype.onDraw = function()
	{
		this._canvas.clear();
		this._physicController.updatePhysic();
        this._levelView.onDraw( this._canvas );
	};

    return LevelController;
} );