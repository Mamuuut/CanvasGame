/**
 * @author Mamut
 */
define( function()
{
	function ColorRect( def, model )
	{ 
	    //Interface.ensureImplements( model, MamutGameJs.Models.Interface.LevelObject );
	    
	    this._color = def.color;
	    this._model = model;
	        
	    /**
	     * 
	     */
	    this.getModel = function()
	    {
	    	return this._model;
	    }
	};
       
	/**
	 * LevelView Interface
	 */
	ColorRect.prototype.add = function( child ) {};
	ColorRect.prototype.remove = function( child ) {};
	ColorRect.prototype.getChild = function( index ) {};
	ColorRect.prototype.getZIndex = function() { return 0; };
	
	ColorRect.prototype.onDraw = function( renderer )
	{   
	    renderer.fillRect( this._model.position.x, this._model.position.y, this._model.size.x, this._model.size.y, this._color );
	};
	
	return ColorRect
});

