/**
 * @author Mamut
 */
define( [
	"GameEngine/Factories/ModelFactory",
    "GameEngine/Helpers/ImageLoader", 
	"GameEngine/Views/PlayerView",
	"GameEngine/Views/ColorRect",
    "GameEngine/Views/Sprite",
    "GameEngine/Views/RandomSprite",
	"GameEngine/Views/FrameAnimation",
	"GameEngine/Views/ScrollView"
], function( ModelFactory, ImageLoader, PlayerView, ColorRect, Sprite, RandomSprite, FrameAnimation, ScrollView )
{
	ViewFactory = function()
	{
		this._modelFactory = new ModelFactory();
	}
	
	ViewFactory.prototype.createView = function( def )
	{
		switch( def.viewClass )
		{
			case "PlayerView" :
				var model = this._modelFactory.createModel( def );
				return new PlayerView( def, model );
			case "ColorRect" :
				var model = this._modelFactory.createModel( def );
				return new ColorRect( def, model );
            case "Sprite" :
                var model = this._modelFactory.createModel( def );
                return new Sprite( ImageLoader.getImage( def.src ), model );
            case "RandomSprite" :
                var model = this._modelFactory.createModel( def );
                return new RandomSprite( def, model );
            case "FrameAnimation" :
                var model = this._modelFactory.createModel( def );
                return new FrameAnimation( def, model );
			case "ScrollView" :
				return new ScrollView( def, this );
			default:
				throw new Error( "View class " + def.viewClass + " is not supported." );
		}	
	}
	
	return ViewFactory;
} );
