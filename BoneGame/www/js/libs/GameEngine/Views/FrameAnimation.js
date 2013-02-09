/**
 * @author Mamut
 * FrameAnimation inherits from Sprite
 * FrameAnimation implements LevelGroupView
 */
define( [
	"GameEngine/Helpers/ImageLoader",
	"GameEngine/Views/Sprite"
], function( ImageLoader, Sprite )
{
	function FrameAnimation( def, model )
	{ 
	    this._nbFrames = 0;
	    this._currentFrames = 0;
	        
        def.img = ImageLoader.getImage( def.src );
        Sprite.call( this, def.img, model );
	           
        this.updateTextureIndex = function()
        {
            this._currentFrames++;
            if( this._currentFrames >= def.frameDuration )
            {
                var frameIndex = this.getSpriteIdx();
                frameIndex = ( frameIndex + 1 ) % this._nbFrames;
                this._currentFrames = 0;
                this.setSpriteIdx( frameIndex );
            }
        };  
        
        this._nbFrames = def.img.width / def.width;
    }
	    
	extend( FrameAnimation, Sprite );
	        
	FrameAnimation.prototype.onDraw = function( renderer )
	{   
	    this.updateTextureIndex();
	    FrameAnimation.superClass.onDraw.call( this, renderer );
	};
	
	return FrameAnimation;
} );
