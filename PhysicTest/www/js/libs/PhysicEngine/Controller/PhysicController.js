/**
 * PhysicController
 * @author Mathieu Delaunay
 */

define( [
    "PhysicEngine/Models/Vector2D",
    "PhysicEngine/Models/QuadTree"
], function( Vector2D, QuadTree )
{ 
    /**
     * Constructor
     */
    var PhysicController = function( context, gravity )
    {
        // Private
        var _nbCompute;
        var _objects = new Array();
        var _context = context;
        var _quadTree = new QuadTree( 0, 0, _context.canvas.width, _context.canvas.height );
    
        /** 
         * Update collisions
         */
        function updateCollisions()
        {
            clearContacts();
            var minTimeCollision = _quadTree.getMinTimeCollision();
            if( null != minTimeCollision )
            {
                _nbCompute++;
                minTimeCollision.Collide();
                
                var objects = minTimeCollision.getObjects()
                var object;
                for( var i = 0, len = objects.length; object = objects[i], i < len; i++ ) {
    				_quadTree.update( object );
    			}
    
                updateCollisions();
            }
        }
    
        /**
         * Clear objects contacts
         */
        function clearContacts()
        { 
            var object;
            for( var i = 0, len = _objects.length; object = _objects[i], i < len; i++ ) {
                object.clearContacts();
    		}
        }
        
        // Priviledge methods
        
        /**
         * Add an object to the physic engine
         * @param object
         */
        this.addObject = function( object )
        {
            _objects.push( object );
            _quadTree.insert( object );
        };
    
        /**
         * Remove an object from the physic engine
         * @param object
         */
        this.removeObject = function( object )
        {
            var index = _objects.indexOf( object );
            _objects.splice( index, 1 );
            _quadTree.remove( object );
        };
    
        /**
         * Remove all objects
         */
        this.clearObjects = function()
        {
            _quadTree.clear();
            _objects = new Array();
        };
    
        /**
         * Compute a new frame
         */
        this.updatePhysic = function()
        {
            _nbCompute = 0;
               
           _quadTree.clear();
            var object;
            for( var i = 0, len = _objects.length; object = _objects[i], i < len; i++ ) {
                object.updateForces();
                object.resetForces();
                object.updateTimeNextPosition( 0 );
                object.parentQuads = new Array();
                _quadTree.insert( object );
    		}
    
            updateCollisions();
    
    		var object;
            var hasPositionChanged;
            for( var i = 0, len = _objects.length; object = _objects[i], i < len; i++ ) {
                object.updatePosition();
                object.checkObjectIntersections( _objects );
    		}
        };
        
        /**
         * @return the all QuadTree children including the current instance in an Array
         */
        this.getQuadTrees = function()
        {
            return _quadTree.getQuadTrees();
        }

        this.clearObjects();
        PhysicController.GRAVITY = null != gravity ? gravity : new Vector2D( 0, 3 );
    };
    
    PhysicController.GRAVITY = new Vector2D();
    
    return PhysicController;
} );