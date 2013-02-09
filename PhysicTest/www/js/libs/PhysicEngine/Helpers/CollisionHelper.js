/**
 * QuadTree
 * @author Mathieu Delaunay
 */

define( [
    "PhysicEngine/Models/Vector2D",
    "PhysicEngine/Models/Rect",
    "PhysicEngine/Models/Collision"
], function( Vector2D, Rect, Collision )
{   
    // Static methods
    var CollisionHelper = {
    	/* Overriding */
    	checkOverriding: function( positionA, sizeA, positionB, sizeB )
    	{
    	    return !(positionB.x >= ( positionA.x + sizeA.x ) || 
               ( positionB.x + sizeB.x ) <= positionA.x || 
               positionB.y >= ( positionA.y + sizeA.y ) ||
               ( positionB.y + sizeB.y ) <= positionA.y );
    	},
    	
    	/* Contacts */
    	checkContacts: function( objectA, objectB )
    	{
    	    
    		if (objectA.hasMaxMass() && objectB.hasMaxMass())
    		{
    			return;
    		}
    		
    		if( (objectB.position.x > ( objectA.position.x + objectA.size.x ) || 
               ( objectB.position.x + objectB.size.x ) < objectA.position.x || 
               objectB.position.y > ( objectA.position.y + objectA.size.y ) ||
               ( objectB.position.y + objectB.size.y ) < objectA.position.y ) )
           {
               return;   
           }
    		
    		var xProj = CollisionHelper.getAxisProj(Vector2D.X_AXIS, objectA, objectB);
    		var yProj = CollisionHelper.getAxisProj(Vector2D.Y_AXIS, objectA, objectB);
    
            if (xProj < yProj)
            {
                CollisionHelper.checkAxisContact(Vector2D.X_AXIS, objectA, objectB);
            }
            else
            {
                CollisionHelper.checkAxisContact( Vector2D.Y_AXIS, objectA, objectB );
            }
    	},
    	
    	/* Collisions */
    	getCollision: function( objectA, objectB )
    	{
    		if( objectA.hasMaxMass() && objectB.hasMaxMass() )
    		{
    			return null;
    		}
    		
    		var leftObject = CollisionHelper.getLeftTopObject( Vector2D.X_AXIS, objectA, objectB );
    		var rightObject = CollisionHelper.getRightBottomObject( Vector2D.X_AXIS, objectA, objectB );
    		var xCollisionTime = CollisionHelper.getCollisionTime( Vector2D.X_AXIS, leftObject, rightObject );
    		
    		var topObject = CollisionHelper.getLeftTopObject( Vector2D.Y_AXIS, objectA, objectB );
    		var bottomObject = CollisionHelper.getRightBottomObject( Vector2D.Y_AXIS, objectA, objectB );
    		var yCollisionTime = CollisionHelper.getCollisionTime( Vector2D.Y_AXIS, topObject, bottomObject );
    		
    		if( 0 <= xCollisionTime && 1 >= xCollisionTime && 0 <= yCollisionTime && 1 >= yCollisionTime )
    		{
    			if ( xCollisionTime <= yCollisionTime )
    			{
    				return new Collision( leftObject, rightObject, Vector2D.X_AXIS, xCollisionTime );
    			}
    			else
    			{
    				return new Collision( topObject, bottomObject, Vector2D.Y_AXIS, yCollisionTime );
    			}
    		}
    		else if ( 0 <= xCollisionTime && 1 >= xCollisionTime )
    		{
    			var topObjectBottom = topObject.getTimePosition( xCollisionTime ).y + topObject.size.y;
    			var bottomObjectTop = bottomObject.getTimePosition( xCollisionTime ).y;
    			if ( topObjectBottom >= bottomObjectTop && leftObject.velocity.x > rightObject.velocity.x )
    			{
    				return new Collision( leftObject, rightObject, Vector2D.X_AXIS, xCollisionTime );
    			}
    		}
    		else if (0 <= yCollisionTime && 1 >= yCollisionTime)
    		{
    			var leftObjectRight = leftObject.getTimePosition(yCollisionTime).x + leftObject.size.x;
    			var rightObjectleft = rightObject.getTimePosition(yCollisionTime).x;
    			if (leftObjectRight >= rightObjectleft && topObject.velocity.y > bottomObject.velocity.y)
    			{
    				return new Collision(topObject, bottomObject, Vector2D.Y_AXIS, yCollisionTime);
    			}
    		}
    		return null;
    	},
    	
    	getCollisionTime: function(axis, objectA, objectB)
    	{
    		return (objectA.position[axis] + objectA.size[axis] - objectB.position[axis]) / (objectB.velocity[axis] - objectA.velocity[axis]);
    	},
    	
    	getMinTimeCollisionFromObjects: function( objects )
    	{
    		var minTimeCollision = undefined;
    		for( var i = 0; i < objects.length; i++ )
    		{
    			for( var j = i + 1; j < objects.length; j++ )
    	        {
    	            if( objects[i].collidesWith( objects[j] ) )
    	            {
    	                CollisionHelper.checkContacts( objects[i], objects[j] );
    	                minTimeCollision = CollisionHelper.getMinTimeCollision( minTimeCollision, CollisionHelper.getCollision( objects[i], objects[j] ) );
    	            }
    	        }
       		}
       		return minTimeCollision;
    	},
    	
    	getMinTimeCollision: function( collisionA, collisionB )
    	{
    		var isCollisionAValid = CollisionHelper.isValidCollision( collisionA );
    		var isCollisionBValid = CollisionHelper.isValidCollision( collisionB );  
    		if( !isCollisionAValid && isCollisionBValid )
    		{
    			return collisionB;
    		}
    		if( isCollisionAValid && !isCollisionBValid )
    		{
    			return collisionA;
    		}
    		if( isCollisionAValid && isCollisionBValid )
    		{
    			return collisionA.getTime() < collisionB.getTime() ? collisionA : collisionB;
    		}
    	},
    	
    	isValidCollision: function( collision )
    	{
    		return undefined != collision && collision.getTime() >= 0 && collision.getTime() <= 1;
    	},
    	
    	/* Contact */
    	checkAxisContact: function(axis, objectA, objectB)
    	{
    		var leftTopObject = CollisionHelper.getLeftTopObject(axis, objectA, objectB);
    		var rightBottomObject = CollisionHelper.getRightBottomObject(axis, objectA, objectB);
    		
    		if (leftTopObject.velocity[axis] >= rightBottomObject.velocity[axis])
    		{
    			leftTopObject.contacts.addContact(rightBottomObject, axis, Rect.AXIS_MAX);
    			rightBottomObject.contacts.addContact(leftTopObject, axis, Rect.AXIS_MIN);
    		}
    	},
    	
    	/* Orthogonal projection */
    	getAxisProj: function(axis, objectA, objectB)
    	{
    		var leftTop = Math.max( objectA.getLeftTop( axis ), objectB.getLeftTop( axis ) );
    		var rightBottom = Math.min( objectA.getRightBottom( axis ), objectB.getRightBottom( axis ));
    		return rightBottom - leftTop;
    	},
    	
    		
    	/* Object order */
    	getLeftTopObject: function(axis, objectA, objectB)
    	{
    		if( objectA.getRightBottom( axis ) <= objectB.getLeftTop( axis ) )
    		{
    			return objectA;
    		}
    		return objectB;
    	},
    	
    	getRightBottomObject: function(axis, objectA, objectB)
    	{
    		if( objectA.getRightBottom( axis ) <= objectB.getLeftTop( axis ) )
    		{
    			return objectB;
    		}
    		return objectA;
    	},
    };
    
    return CollisionHelper;
} );
	