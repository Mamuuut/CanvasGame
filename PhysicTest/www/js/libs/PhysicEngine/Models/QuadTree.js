/**
 * QuadTree
 * @author Mathieu Delaunay
 */

define( [
    "PhysicEngine/Models/Rect",
    "PhysicEngine/Helpers/CollisionHelper"
], function( Rect, CollisionHelper )
{   
    /**
     * Constructor
     * @param x
     * @param y
     * @param width
     * @param height
     */
    var QuadTree = function( x, y, width, height )
    {
        this.rect = new Rect( x, y, width, height );
        this.objects = [];
        this.isLeaf = true;
        this.minTimeCollision = undefined;
        this.isUpToDate = false;
        this.childs = [];
    };
    
    // Static
    QuadTree.MAX_OBJECTS_PER_QUAD = 10;
    
    // Public methods
    QuadTree.prototype = {
    
        /**
         * Subdivide the QuadTree into four children
         */
        subdivide: function()
        {
            var halfWidth = Math.floor( this.rect.size.x / 2.0 );
            var halfHeight = Math.floor( this.rect.size.y / 2.0 );
            var x = this.rect.position.x;
            var y = this.rect.position.y;
            this.childs.push( new QuadTree( x, y, halfWidth, halfHeight ) );
            this.childs.push( new QuadTree( x + halfWidth, y, halfWidth, halfHeight ) );
            this.childs.push( new QuadTree( x, y + halfHeight, halfWidth, halfHeight ) );
            this.childs.push( new QuadTree( x + halfWidth, y + halfHeight, halfWidth, halfHeight ) );
    
            var objects = this.objects;
            var childs = this.childs;
        	var object;
        	var child;
        	var checkOverriding = CollisionHelper.checkOverriding;
    		for( var i = 0, objectsLen = objects.length; object = objects[i], i < objectsLen; i++ ) {
    		    var position = object.position;
    		    var size = object.size;
    			for( var j = 0, childsLen = childs.length; child = childs[j], j < childsLen; j++ ) {
                    if( checkOverriding( child.rect.position, child.rect.size, position, size ) )
                        child.insert( object );
    			}
    		}
    
            this.objects = [];
    
            this.isLeaf = false;
        },
    
        /**
         * Insert a new object in the QuadTree
         * @param object
         */
        insert: function( object )
        {
            this.isUpToDate = false;
            
            if( this.isLeaf === true )
            {
                this.objects.push( object );
                object.parentQuads.push( this );
                if( this.objects.length > QuadTree.MAX_OBJECTS_PER_QUAD )
                {
                    this.subdivide();
                }
            }
            else
            {
                var checkOverriding = CollisionHelper.checkOverriding;
            	var childs = this.childs;
    			var child;
    			var position = object.position;
                var nextPosition = object.nextPosition;
    			var size = object.size;
    			for( var i = 0, childsLen = childs.length; child = childs[i], i < childsLen; i++ )
    			{
    	            if( checkOverriding( child.rect.position, child.rect.size, position, size ) 
    	               || checkOverriding( child.rect.position, child.rect.size, nextPosition, size ) )
    	            {
                        child.insert( object );   
    	            }
                }
            }
        },
        
        /**
         * Remove an object from the QuadTree
         */
        remove: function( object )
        {
            this.isUpToDate = false;
            
            var parentQuads = object.parentQuads;
            var parentQuad;
            for( var i = 0, len = parentQuads.length; parentQuad = parentQuads[i], i < len; i++ )
            {
                var index = parentQuad.objects.indexOf( object );
                parentQuad.objects.splice( index, 1 );
            };
            object.parentQuads = [];
        },
        
        /**
         * Clear QuadTree objects
         */
        clear: function() 
        {
            this.isLeaf = true;
            this.isUpToDate = false;
            this.objects = new Array();
            this.childs = new Array();
        },
    
        /**
         * Update an object in the QuadTree
         */
        update: function( object )
        {
            this.remove( object );
            this.insert( object );
        },
    
        /**
         * @return The first valid collision between 2 objects in the QuadTree
         */
        getMinTimeCollision: function()
        {
        	if( this.isUpToDate )
        	{
        		return this.minTimeCollision;
        	}
        	
        	this.minTimeCollision = undefined;
            if( this.isLeaf === true )
            {
            	this.minTimeCollision = CollisionHelper.getMinTimeCollisionFromObjects( this.objects );
    			return this.minTimeCollision;
            }
            else
            {
    	        var childs = this.childs;
    			var child;
    			var minTimeCollision;
    			for( var i = 0, childsLen = childs.length; child = childs[i], i < childsLen; i++ ) 
    			{
                    minTimeCollision = CollisionHelper.getMinTimeCollision( minTimeCollision, child.getMinTimeCollision() );
                }
                this.minTimeCollision = minTimeCollision;
            }
            
            this.isUpToDate = true;
            
            return this.minTimeCollision;
        },
        
        /**
         * @return the all QuadTree children including the current instance in an Array
         */
        getQuadTrees: function()
        {
            if ( this.isLeaf )
            {
                return [this];
            } 
            else 
            {
                var quadTreesArray = new Array();
                var childs = this.childs;
                var child;
                for( var i = 0, childsLen = childs.length; child = childs[i], i < childsLen; i++ )
                {
                    quadTreesArray = quadTreesArray.concat( child.getQuadTrees() );
                }
                return quadTreesArray;
            }
        }
        
    };
    
    return QuadTree;
} );