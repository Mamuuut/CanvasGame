/**
 * @author Mamut
 */
define( [ 
	"PhysicEngine/Events/EventManager"
], function( EventManager )
{
	function EventTargetMixin() {};   
	
	EventTargetMixin.prototype = 
	{
		dispatchEvent: function( eventType, data )
		{
			EventManager.dispatchEvent( this, eventType, data );
		},
		
		addEventListener: function( eventType, listener )
		{
			EventManager.addEventListener( this, eventType, listener );
		},
		
		removeEventListener: function( eventType, listener )
		{
			EventManager.removeEventListener( this, eventType, listener );
		},		
	};
	
	return EventTargetMixin;
} );