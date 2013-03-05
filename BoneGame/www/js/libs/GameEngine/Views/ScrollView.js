/**
 * @author Mamut
 */
define( [
	"GameEngine/Factories/ViewFactory",
	"GameEngine/Helpers/ImageLoader", 
	"GameEngine/Views/Sprite",
    "GameEngine/Views/LevelGroupView",
	"GameEngine/Models/LevelObject"
], function( ViewFactory, ImageLoader, Sprite, LevelGroupView, LevelObject )
{
	function ScrollView( def, viewFactory )
	{
	    LevelGroupView.call( this );
	    
		this._viewFactory = viewFactory;
		this._def = def;
		this._width = def.screenWidth;
	    this._minDelay = def.viewDef.width / def.speed;
	    this._delay = 0;
	    this._sequenceIdx = 0;
	};
	
	extend( ScrollView, LevelGroupView );
	        
	/**
	 * check if the element is gone outside the renderer
	 */
	ScrollView.prototype.isViewOut = function( view )
	{
		var model = view.getModel();
	    return model.getX() + model.getWidth() < 0;
	};
	    
	/**
	 * Check min delay plus random delay to add a new element 
	 */
	ScrollView.prototype.addView = function( width )
	{
	    if( 0 == this._delay )
	    {
	        this._def.viewDef.x = this._width;
	    	var view = this._viewFactory.createView( this._def.viewDef );
	    	view.getModel().velocity.x = -this._def.speed;
		    this._levelController._physicController.addObject( view.getModel() );	
			this.add( view )
	
	        var delay = this._minDelay;
            if( this._def.maxDelay )
                delay = Math.floor( Math.random() * this._def.maxDelay )
            else if( this._def.sequence )
            {
                delay = this._def.sequence[this._sequenceIdx];
                this._sequenceIdx = (this._sequenceIdx + 1) % this._def.sequence.length;
            }
            this._delay = this._minDelay + delay;
	    }
	    else
	        this._delay--;
	};
	    
	/**
	 * Remove element from scrolling sequence
	 */
	ScrollView.prototype.removeView = function( view )
	{
	    this.remove( view );
	};
	
	ScrollView.prototype.onDraw = function( renderer )
	{   
	    this.addView( this._width );
	    
	    for( var idx in this.getChildren() )
	    {
	        var view = this.getChild( idx );
	        if( this.isViewOut( view ) )
	            this.removeView( view );  
	    };
	    
	    ScrollView.superClass.onDraw.call( this, renderer );
	};
	
	return ScrollView;
});