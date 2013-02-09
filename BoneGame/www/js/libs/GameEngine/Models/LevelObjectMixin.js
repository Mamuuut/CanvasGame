/**
 * @author Mamut
 */
define( function()
{
	LevelObjectMixin = function() {};   
	
	LevelObjectMixin.prototype = 
	{
		supportPhysic: false,
		
	    getX: function()
	    {
	        return this.position.x;
	    },
	    
	    getY: function()
	    {
	        return this.position.y;
	    },
	    
	    setX: function( x )
	    {
	        this.position.x = x;
	    },
	    
	    setY: function( y )
	    {
	        this.position.y = y;
	    },
	    
	    getWidth: function()
	    {
	        return this.size.x;
	    },
	    
	    getHeight: function()
	    {
	        return this.size.y;
	    },
	    
	    getXScale: function()
	    {
	        return this._xScale || 1;
	    },
	    
	    setXScale: function( xScale )
	    {
	        this._xScale = xScale;
	    }
	};
	
	return LevelObjectMixin;
} );