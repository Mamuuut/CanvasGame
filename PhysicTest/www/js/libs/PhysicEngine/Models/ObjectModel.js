/**
 * ObjectModel
 * @author Mathieu Delaunay
 */

define( [
    "PhysicEngine/Models/Vector2D",
    "PhysicEngine/Models/Rect",
    "PhysicEngine/Models/Contacts",
    "PhysicEngine/Events/EventTargetMixin",
    "PhysicEngine/Events/PhysicEvents",
    "PhysicEngine/Helpers/CollisionHelper",
    "PhysicEngine/Controller/PhysicController"
], function( Vector2D, Rect, Contacts, EventTargetMixin, PhysicEvents, CollisionHelper, PhysicController )
{ 
    /**
     * Constructor
     */
    var ObjectModel = function( x, y, width, height )
    {
        // Initialize super class
        Rect.call( this, x, y, width, height );
    
        // Private 
        var _forces = null;
    
        var instance = this;
        
        /**
         * Clamp the velocity according to the MAX_VELOCITY value
         * @param velocity
         */
        function clampVelocity( velocity )
        {
            velocity.x = Math.max( -ObjectModel.MAX_VELOCITY.x, Math.min( ObjectModel.MAX_VELOCITY.x, velocity.x ) );
            velocity.y = Math.max( -ObjectModel.MAX_VELOCITY.y, Math.min( ObjectModel.MAX_VELOCITY.y, velocity.y ) );
        }
    
        /**
         * @param axis
         * @return The object friction with other objects in contact with it
         */
        function getFriction( axis )
        {
            if( -1 != instance.objectFriction )
            {
                return instance.objectFriction;
            }
            return instance.contacts.hasContact( axis ) ? ObjectModel.CONTACT_FRICTION[axis] : ObjectModel.AIR_FRICTION;
        }
    
        // Public 
        this.nextPosition = new Vector2D( x, y );
        this.velocity = new Vector2D();
        this.mass = 1;
        this.contacts = new Contacts();
        this.objectFriction = -1;
        this.collideBits = 0;
        this.parentQuads = [];
    
        // Priviledge methods
        
        /**
         * Update the current position with the intermediate frame time ratio 
         * @param frameTime
         */
        this.updateTimePosition = function( frameTime )
        {
            clampVelocity( this.velocity );
            this.position = this.getTimePosition( frameTime );
        };
    
        /**
         * Update the next position with the intermediate frame time ratio 
         * @param frameTime
         */
        this.updateTimeNextPosition = function( frameTime )
        {
            clampVelocity( this.velocity );
            this.nextPosition = this.getTimePosition( 1 - frameTime );
        };

        /**
         * Update velocity from forces 
         */
        this.updateForces = function()
        {
            if( !this.hasMaxMass() )
            {
            	var force;
            	var velocity = this.velocity;
            	for( var i = 0, len = _forces.length; force = _forces[i], i < len; i++ ) {
            		velocity.x += force.x;
                    velocity.y += force.y;
    			}
    
                velocity.x *= getFriction( Vector2D.Y_AXIS );
                velocity.y *= getFriction( Vector2D.X_AXIS );
            }
        };
        
        /**
         * Clear forces and add the gravity
         */
        this.resetForces = function()
        {
            _forces = new Array();
            this.addForce( PhysicController.GRAVITY );
        };
    
        /**
         * Add a new force
         */
        this.addForce = function( force )
        {
            _forces.push( force );
        };
    
        this.resetForces();
    };
    
    // Set Inheritance
    extend( ObjectModel, Rect );
    
    // Public static
    ObjectModel.MAX_VELOCITY = new Vector2D( 40, 40 );
    ObjectModel.CONTACT_FRICTION = new Vector2D( 0.5, 0.9 );
    ObjectModel.AIR_FRICTION = 0.95;
    
    // Non priviledge methods
    
    /**
     * Update current position from precalculated next position
     */
    ObjectModel.prototype.updatePosition = function()
    {
    	this.position.x = this.nextPosition.x;
        this.position.y = this.nextPosition.y;
    };
    
    /**
     * Check object intersection with other objects
     * @param objects An Array of objects
     */
    ObjectModel.prototype.checkObjectIntersections = function( objects )
    {
        var object;
    	var checkOverriding = CollisionHelper.checkOverriding;
    	var position = this.position;
    	var size = this.size;
        for( var i = 0, len = objects.length; object = objects[i], i < len; i++ ) {
            if( this != object && checkOverriding( position, size, object.position, object.size ) )
            {
                this.dispatchEvent( PhysicEvents.INTERSECT, { object: object } );
            }
    	}
    };
    
    /**
     * Check if the object can collide with another one according to its collideBits
     * @param object
     */
    ObjectModel.prototype.collidesWith = function( object )
    {
        var result = ( this.collideBits & object.collideBits );
        return 0 != result;
    };
    
    /* Contacts */
   
    /**
     * Clear object contacts
     */
    ObjectModel.prototype.clearContacts = function()
    {
        this.contacts.clear();
    };
    
    /**
     * Return object contacts on the axis and position.
     * @param axis      x or y
     * @param position  leftTop or rightBottom
     * @return An array of objects
     */
    ObjectModel.prototype.getContactObjects = function( axis, position )
    {
        var objects = new Array();
        objects.push( this );
        var contactObjects = this.contacts.getObjects( axis, position );
        if( 0 != contactObjects.length )
        {
        	var object;
    	    for( var i = 0, len = contactObjects.length; object = contactObjects[i], i < len; i++ ) {
                objects = objects.concat( object.getContactObjects( axis, position ) );
    		}
        }
        return objects;
    };
    
    /* Time Position */
   
    /**
     * Get the interpolated object position between current and next frame
     * @param   frameTime The ratio time frome 0 to 1.
     *          0 corresponds to current frame and 1 to the next frame
     * @return A position as a Vector2D
     */
    ObjectModel.prototype.getTimePosition = function( frameTime )
    {
        return new Vector2D( Math.round( this.position.x + frameTime * this.velocity.x ), Math.round( this.position.y + frameTime * this.velocity.y ) );
    };
    
    /**
     * Check if we are using the infinte mass approximation.
     * @return true if the object mass is equal to Number.MAX_VALUE
     */
    ObjectModel.prototype.hasMaxMass = function()
    {
        return Number.MAX_VALUE == this.mass;
    };
    
    augment( ObjectModel, EventTargetMixin );
    
    return ObjectModel;
} );