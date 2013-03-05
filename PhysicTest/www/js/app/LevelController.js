/**
 * LevelController
 * @author Mathieu Delaunay
 */

define( [
    "app/ObjectView",
    "app/LevelObject",
    "PhysicEngine/Controller/PhysicController",
    "PhysicEngine/Models/Vector2D",
    "PhysicEngine/Models/ObjectModel",
    "PhysicEngine/Models/QuadTree",
    "PhysicEngine/Events/EventTargetMixin",
    "PhysicEngine/Events/PhysicEvents"
], function( ObjectView, LevelObject, PhysicController, Vector2D, ObjectModel, QuadTree, EventTargetMixin, PhysicEvents )
{  
    /* Private static const */
    var BOX_SIZE = 20;
        
    /**
     * Constructor
     */
    var LevelController = function( context ) 
    {
        var levelController = this;
        
        /* Private attributes */
        var _nbFrameLeft = undefined;
        var _callback = undefined;
        var _context = context;
        var _physicController = new PhysicController( context );
        var _levelObjects = [];
        var _collideEventCount = 0;
        var _intersectEventCount = 0;

        /* Public attributes */
    	this.pause = true;
    	
        /**
         * Dispatch the EVENT_COUNT_UPDATE event
         */
        var dispatchCountEvent = function( event )
        {
            levelController.dispatchEvent( LevelController.EVENT_COUNT_UPDATE, 
                {
                    collide: _collideEventCount,
                    intersect: _intersectEventCount
                } );
        }
    
        /**
         * COLLIDE event listener
         */
        var onCollide = function( event )
        {
            _collideEventCount++;
            dispatchCountEvent();
        }
    
        /**
         * INTERSECT event listener
         */
        var onIntersect = function( event )
        {
            _intersectEventCount++;
            dispatchCountEvent();
        }
    
        /**
         * Clear PhysicEngine objects and reset event counts
         */
        this.clearLevel = function() 
        {
            _physicController.clearObjects();
            _levelObjects = [];
            _collideEventCount = 0;
            _intersectEventCount = 0;
            dispatchCountEvent();
        };
        
        /**
         * Add random objects
         * @param nbObjects The number of objects to add
         */
        this.addRandomObjects = function( nbObjects ) 
        {
            _physicController.clearObjects();
            PhysicController.GRAVITY = new Vector2D( 0, 0 );
            ObjectModel.AIR_FRICTION = 1;
            ObjectModel.CONTACT_FRICTION = new Vector2D( 1, 1 );
            QuadTree.MAX_OBJECTS_PER_QUAD = 10;
            for( var i = 0; i < nbObjects; i++ ) 
            {
                this.addRandomObject();
            }
        };
        
        /**
         * Add a random object
         */
        this.addRandomObject = function() 
        {
            var objectView = new ObjectView( _context );
            objectView.color = '#' + ( Math.random() * 0xFFFFFF<<0 ).toString( 16 );
            
            var x = Math.round( Math.random() * ( _context.canvas.width - BOX_SIZE ) );
            var y = Math.round( Math.random() * ( _context.canvas.height - BOX_SIZE ) );
            var width = BOX_SIZE;
            var height = BOX_SIZE;
            var objectModel = new ObjectModel( x, y, width, height );
            var velocity = new Vector2D( ( Math.random() * 10 ) - 5, ( Math.random() * 10 ) - 5 );
            objectModel.velocity = velocity;
            objectModel.collideBits = 1;
            objectModel.mass = 1;
                    
            this.addObject( objectView, objectModel );
        };
        
        /**
         * Initialize the XCollision test
         */
        this.testXCollisions = function() 
        {
            _physicController.clearObjects();
            PhysicController.GRAVITY = new Vector2D(0,0);
            ObjectModel.AIR_FRICTION = 1;
            ObjectModel.CONTACT_FRICTION = new Vector2D(1, 1);
            QuadTree.MAX_OBJECTS_PER_QUAD = 5;
            
            this.addCollidingObject( 20, 20, new Vector2D( 20, 20 ), new Vector2D( 4, 0 ), "#FF0000" );
            this.addCollidingObject( 20, 20, new Vector2D( 40, 41 ), new Vector2D( 6, 0 ), "#FFFF00" );
            this.addCollidingObject( 20, 20, new Vector2D( 220, 30 ), new Vector2D( 0, 0 ), "#00FF00" );
            this.addCollidingObject( 20, 20, new Vector2D( 320, 20 ), new Vector2D( -12, 0 ), "#00FFFF" );
             
            this.addCollidingObject( 20, 20, new Vector2D( 20, 120 ), new Vector2D( 0, 0 ), "#000000", Number.MAX_VALUE );
            this.addCollidingObject( 20, 20, new Vector2D( 120, 120 ), new Vector2D( 4, 0 ), "#FFFF00",2 );
            this.addCollidingObject( 20, 20, new Vector2D( 220, 120 ), new Vector2D( 0, 0 ), "#00FF00" );
            this.addCollidingObject( 20, 20, new Vector2D( 320, 120 ), new Vector2D( -4, 0 ), "#00FFFF" );
            this.addCollidingObject( 20, 20, new Vector2D( 420, 120 ), new Vector2D( -20, 0 ), "#0000FF", 2 );
            
        };
        
        /**
         * Initialize the Gravity test
         */
        this.testGravity = function() 
        {
            _physicController.clearObjects();
            PhysicController.GRAVITY = new Vector2D(0,3);
            ObjectModel.AIR_FRICTION = 0.95;
            QuadTree.MAX_OBJECTS_PER_QUAD = 5;
            
            this.addCollidingObject( 800, 20, new Vector2D( 0, 300 ), new Vector2D( 0, 0 ), "#000000", Number.MAX_VALUE, 3 );
            this.addCollidingObject( 20, 20, new Vector2D( 40, 20 ), new Vector2D( 0, 0 ), "#FF0000", 1, 1 );
            this.addCollidingObject( 20, 20, new Vector2D( 40, 160 ), new Vector2D( 0, -20 ), "#FFFF00", 1, 1 );
            this.addCollidingObject( 20, 20, new Vector2D( 80, 160 ), new Vector2D( 20, -20 ), "#00FF00", 1, 1 );
        };
        
        /**
         * Create an object model and view and add it
         * @param width
         * @param height
         * @param position
         * @param velocity
         * @param color
         * @param mass
         * @param collideBits
         */
        this.addCollidingObject = function( width, height, position, velocity, color, mass, collideBits ) 
        {
            var objectView = new ObjectView( _context );
            objectView.color = color;
            
            var objectModel = new ObjectModel( position.x, position.y, width, height );
            objectModel.velocity = velocity;
            objectModel.mass = mass || 1;
            objectModel.collideBits = collideBits || 1;
            
            return this.addObject( objectView, objectModel );
        };
        
        /**
         * Add an object
         * @param objectView
         * @param objectModel 
         */
        this.addObject = function( objectView, objectModel ) 
        {
            var levelObject = new LevelObject( objectView, objectModel );
            objectModel.addEventListener( PhysicEvents.COLLIDE, onCollide );
            objectModel.addEventListener( PhysicEvents.INTERSECT, onIntersect );
            _levelObjects.push( levelObject );
            _physicController.addObject( objectModel );
            return levelObject;
        };
        
        /**
         * Compute the physic engine next frame
         */
        this.nextFrame = function() 
        {
            if( undefined !== _nbFrameLeft )
            {
                _nbFrameLeft--;
                if( 0 == _nbFrameLeft )
                {
                    this.pause = true;
                    _nbFrameLeft = undefined;
                    if( _callback )
                    {
                        _callback();
                        _callback = undefined;
                    }
                }
            }
        
            _physicController.updatePhysic();
            
            _context.clearRect( 0, 0, _context.canvas.width, _context.canvas.height );
            this.drawQuadTrees();
            $.each( _levelObjects, function() 
            {
                this.updateView();
            } );
        };
        
        /**
         * Update the level
         */
        this.updateLevel = function()
        {
            if( !this.pause ) 
            {
                this.nextFrame();
            } 
        };
        
        /**
         * Compute the nbFrames next frames
         * @param nbFrames The number of frames to compute
         * @param callback optional callback to call when the nbFrames have been computed
         */
        this.playNextFrames = function( nbFrames, callback )
        {
            _nbFrameLeft = nbFrames;
            this.pause = false;
            _callback = callback;
        };
        
        /**
         * Draw the QuadTree rectangles
         */
        this.drawQuadTrees = function()
        {   
            var quadTrees = _physicController.getQuadTrees();
            var quadTree;
            for( var i = 0, quadTreesLen = quadTrees.length; quadTree = quadTrees[i], i < quadTreesLen; i++ ) 
            {
                _context.strokeStyle = "#ff0000";
                _context.strokeRect( 
                    quadTree.rect.position.x, 
                    quadTree.rect.position.y,
                    quadTree.rect.size.x,
                    quadTree.rect.size.y );
                if( 0 != quadTree.objects.length )
                {
                    _context.fillStyle = "#ff0000";
                    _context.textBaseline = "top";
                    _context.fillText( quadTree.objects.length, quadTree.rect.position.x + 8, quadTree.rect.position.y + 8 );
                }
            }
        }
    
    	this.clearLevel();
    	
    	// Call updateLevel method at 30 fps
    	setInterval( function()
    	{
    	    levelController.updateLevel();
    	}, 1000 / 30);
    };
    
    // Public static const
    LevelController.EVENT_COUNT_UPDATE = "eventCountUpdate"
    
    augment( LevelController, EventTargetMixin );
    
    return LevelController;
} );