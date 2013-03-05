/**
 * @author Mamut
 * Sprite implements LevelView Interface
 */
define( function()
{
	
	function Sprite( img, model )
	{ 
	    //Interface.ensureImplements( model, MamutGameJs.Models.Interface.LevelObject );
	    
	    this._spriteIdx = 0;
	    this._img = img;
	    this._model = model;
	        
	    /**
	     * 
	     */
	    this.getSpriteIdx = function()
	    {
	        return this._spriteIdx;
	    }
	    
	    this.setSpriteIdx = function( idx )
	    {
	    	this._spriteIdx = idx;
	    }
	    
	    this.getModel = function()
	    {
	    	return this._model;
	    }
	};
       
	/**
	 * LevelView Interface
	 */
	Sprite.prototype.add = function( child ) {};
	Sprite.prototype.remove = function( child ) {};
	Sprite.prototype.getChild = function( index ) {};
	Sprite.prototype.getZIndex = function() { return 0; };
	
	Sprite.prototype.onDraw = function( renderer )
	{   
	    renderer.drawTexture( 
	        this._img,
	        this._model.getX(),
	        this._model.getY(),
	        this._model.getWidth(),
	        this._model.getXScale(),
	        this._spriteIdx );
	};
	
	return Sprite
});

