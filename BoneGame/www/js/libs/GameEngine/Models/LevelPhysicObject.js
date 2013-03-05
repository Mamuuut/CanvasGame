/**
 * @author Mamut
 * LevelPhysicObject
 * A level object that supports physics
 */
define( [ 
    "PhysicEngine/Models/Vector2D",
    "PhysicEngine/Models/ObjectModel",
    "PhysicEngine/Events/PhysicEvents",
	"GameEngine/Models/LevelObjectMixin"
], function( Vector2D, ObjectModel, PhysicEvents, LevelObjectMixin )
{
    /**
     * Constructor
     * @param x
     * @param y
     * @param width
     * @param height
     */
	function LevelPhysicObject( x, y, width, height )
	{
	    ObjectModel.call( this, x, y, width, height );
	    
	    // Private members
	    var _actions = new Array();
        
        // Private methods
        var instance = this;
        
        /**
         * INTERSECT event listener.
         * @param event
         */
        var onIntersect = function( event )
        {
            var action;
            for( var i = 0, len = _actions.length; action = _actions[i], i < len; i++ )
            {
                if ( action.acceptsObject( instance, event.data.object ) )
                {
                    action.execute( instance, event.data.object );
                }
            }
        }
        
        // Public attributes
        this.preyBits = 0;
        this.predatorBits = 0;
        this.isAlive = true;
        		
		// Priviledge methods
		
		/**
		 * Add a new action
		 * @param action
		 */
		this.addAction = function( action )
		{
		    _actions.push( action );
		};
		
        this.supportPhysic = true;
		this.addEventListener( PhysicEvents.INTERSECT, onIntersect );
	};
	
	extend( LevelPhysicObject, ObjectModel );
	augment( LevelPhysicObject, LevelObjectMixin );

	return LevelPhysicObject;
} );