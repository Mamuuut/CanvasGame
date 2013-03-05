/**
 * KillAction dispatch the DYING GameEvent if the target object must be killed
 * KillAction implements the Action interface:
 * - acceptsObject(sourceModel, targetModel)
 * - execute(sourceModel, targetModel)
 * @author Mamut
 */

 define( [
     "GameEngine/Events/ObjectEvents"
], function( ObjectEvents )
{
    /**
     * Constructor
     */
    var KillAction = function()
    {
    };
    
    /**
     * @param   sourceModel
     * @param   targetModel
     * @return true if the sourceModel predatorBits and targetModel preyBits fit togother
     */
    KillAction.prototype.acceptsObject = function( sourceModel, targetModel )
    {
        return sourceModel.isAlive && 0 != ( sourceModel.predatorBits & targetModel.preyBits );
    };
    
    /**
     * Kill the targetModel 
     * @param   sourceModel
     * @param   targetModel
     */
    KillAction.prototype.execute = function( sourceModel, targetModel )
    {
        targetModel.dispatchEvent( ObjectEvents.DYING );
    };
    
    return KillAction;
} );