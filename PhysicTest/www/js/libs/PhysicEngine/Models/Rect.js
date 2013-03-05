/**
 * Rect
 * @author Mathieu Delaunay
 */

define( [
    "PhysicEngine/Models/Vector2D"
], function( Vector2D )
{   
    /**
     * Constructor
     * @param x
     * @param y
     * @param width
     * @param height
     */
    var Rect = function( x, y, width, height )
    {
    	this.size = new Vector2D( width, height );
    	this.position = new Vector2D( x, y );
    };
    
    /**
     * @param axis
     * @return the left or top coordinate
     */
    Rect.prototype.getLeftTop = function( axis )
    {
    	return this.position[ axis ];
    };
    
    /**
     * @param axis
     * @return the right or bottom coordinate
     */
    Rect.prototype.getRightBottom = function( axis )
    {
    	return this.position[ axis ] + this.size[ axis ];
    };
    
    // Static
    Rect.AXIS_MIN = "axis_min"; // Left or Top
    Rect.AXIS_MAX = "axis_max"; // Right or Bottom
    
    return Rect;
} );