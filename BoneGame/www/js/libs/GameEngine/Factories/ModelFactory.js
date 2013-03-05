/**
 * @author Mamut
 */
define( [
	"GameEngine/Models/LevelObject",
	"GameEngine/Models/LevelPhysicObject",
    "GameEngine/Models/KillerObject"
], function( LevelObject, LevelPhysicObject, KillerObject )
{
	ModelFactory = function() {};
	
	ModelFactory.prototype.createModel = function( def )
	{
		switch( def.modelClass )
		{
			case "LevelObject" :
				var model = new LevelObject( def.x, def.y, def.width, def.height );
				return model;
			case "LevelPhysicObject" :
				var model = new LevelPhysicObject( def.x, def.y, def.width, def.height );
				model.mass = def.mass;
				model.collideBits = def.collideBits;
				return model;
            case "KillerObject" :
                var model = new KillerObject( def.x, def.y, def.width, def.height );
                model.mass = def.mass;
                model.collideBits = def.collideBits;
                return model;
			default :
				throw new Error( "Model class " + def.modelClass + " is not supported." );
		}
	};
	
	return ModelFactory;
} );