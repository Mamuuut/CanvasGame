/**
 * @author Mamut
 */

define( [], function()
{	
	var instance = null;
		
	function EventManager()
	{
        if( instance !== null )
        {
            throw new Error("Cannot instantiate more than one EventManager, use EventManager.getInstance()");
        } 
        
        this.initialize();
	}
		
	EventManager.prototype = {
		initialize: function()
		{
			this._eventListener = {};
		},
			
		dispatchEvent: function( object, eventType, data )
		{
			var listeners = this._eventListener[ eventType ]
			if( listeners )
			{
				var event = {
					type: eventType,
					data: data
				}
				for( var idx in listeners )
				{
					var eventListener = listeners[ idx ]
					if( eventListener.object === object )
						eventListener.listener( event )
				}
			}	
		},
			
		getEventListener: function( object, eventType, listener )
		{
			var listeners = this._eventListener[ eventType ]
			if( listeners )
			{
				for( var idx in listeners )
				{
					var eventListener = listeners[ idx ]
					if( eventListener.object === object && eventListener.listener == listener )
						return listener
				}
			}	
		},
		
		addEventListener: function( object, eventType, listener )
		{
			if( !this.getEventListener( object, eventType, listener ) )
			{
				this._eventListener[ eventType ] = this._eventListener[ eventType ] || [];
				this._eventListener[ eventType ].push( { object: object, listener: listener } )
			}	
		},
		
		removeEventListener: function( object, eventType, listener )
		{
			var listener = this.getEventListener( object, eventType, listener );
			if( listener )
			{
				var idx = this._eventListener[ eventType ].indexOf( listener );
				this._eventListener[ eventType ].splice( idx, 1 );
			}
		}
	}
		
	EventManager.getInstance = function()
	{
		{
	        if( instance === null ){
	            instance = new EventManager();
	        }
	        return instance;
		}
	};
	
	return EventManager.getInstance();
} );

