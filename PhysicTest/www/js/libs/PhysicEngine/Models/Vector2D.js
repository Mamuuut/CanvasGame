/**
 * Vector2D
 * @author Mathieu Delaunay
 */

define( function()
{   
    var Vector2D = function( x, y ) {
    	this.x = x || 0;
    	this.y = y || 0;
    };
    
    Vector2D.prototype.fromString = function( str ) {
    	if(null != string) {
    		var vector = string.split(';');
    		if(2 == vector.length) {
    			x = parseFloat(vector[0]);
    			y = parseFloat(vector[1]);
    		}
    	}
    };
    
    Vector2D.X_AXIS = "x";
    Vector2D.Y_AXIS = "y";
    
    return Vector2D;
} );
