/**
 * KillerObject is a LevelPhysicObject with a KillAction
 * @author Mamut
 */
define( [ 
    "GameEngine/Models/LevelPhysicObject",
    "GameEngine/Actions/KillAction"
], function( LevelPhysicObject, KillAction )
{
    function KillerObject( x, y, width, height )
    {
        LevelPhysicObject.call( this, x, y, width, height );
        
        // Can kill object with preyBits equal to 1
        this.predatorBits = 1;
        this.addAction( new KillAction() );
    };
    
    extend( KillerObject, LevelPhysicObject );

    return KillerObject;
} );