/**
 * @author Mamut
 * RandomSprite inherits from Sprite
 * RandomSprite implements LevelGroupView
 */
define( [
    "GameEngine/Helpers/ImageLoader",
    "GameEngine/Views/Sprite"
], function( ImageLoader, Sprite )
{
    function RandomSprite( def, model )
    {       
        def.img = ImageLoader.getImage( def.src );
        var nbTextures = def.img.width / def.width;
        
        Sprite.call( this, def.img, model ); 
            
        var spriteIdx = Math.floor( Math.random() * nbTextures );
        this.setSpriteIdx( spriteIdx );
    }
        
    extend( RandomSprite, Sprite );
    
    return RandomSprite;
} );
