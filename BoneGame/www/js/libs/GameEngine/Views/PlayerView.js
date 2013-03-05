/**
 * PlayerView
 * @author Mamut
 */
define( [
    "PhysicEngine/Models/Vector2D",
    "GameEngine/Inputs/KeyboardManager",
    "GameEngine/Commands/Command", 
	"GameEngine/Views/FrameAnimation",
	"GameEngine/Events/ObjectEvents"
], function( Vector2D, KeyboardManager, Command, FrameAnimation, ObjectEvents )
{
    /**
     * Constructor
     * @param def
     * @param model
     */
	function PlayerView( def, model )
	{   
        FrameAnimation.call( this, def, model );
        this.initCommands( def );
        
        var onDying = function( event )
        {
            console.log( "ARGHHHHH!" );
            model.isAlive = false;
        };
        
        model.addEventListener( ObjectEvents.DYING, onDying );
        model.preyBits = 1;
	}
	
	extend( PlayerView, FrameAnimation );
	
    PlayerView.prototype.moveRight = function()
    {
        this._model.addForce( new Vector2D( 2, 0 ) );  
    };
    
    PlayerView.prototype.moveLeft = function()
    {
        this._model.addForce( new Vector2D( -2, 0 ) );
    };
    
    PlayerView.prototype.jump = function()
    {
        this._model.addForce( new Vector2D( 0, -30 ) );
    };
    
    PlayerView.prototype.initCommands = function( def )
    {
        for( var idx in def.commands )
        {
            var command = def.commands[ idx ];
            KeyboardManager.addCommand(
                command.keyType,
                command.keyCode,
                new Command( this, command.action )
            );
        }
	}
	
	return PlayerView;
} );