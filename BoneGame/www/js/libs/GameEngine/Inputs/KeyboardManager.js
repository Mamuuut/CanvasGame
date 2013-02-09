/**
 * @author Mamut
 */
define( function()
{   
    var instance = null;
        
    function KeyboardManager()
    {
        if( instance !== null )
        {
            throw new Error("Cannot instantiate more than one KeyboardManager, use KeyboardManager.getInstance()");
        } 
        
        this.initialize();
    }
        
    KeyboardManager.prototype = {
        initialize: function()
        {
            this._keydown = {};
            this._keyup = {};
            this._keyCommands = [];
            
            this.KEY_CODES = {
                enter: 13,
                escape: 27,
                left: 37,
                up: 38,
                right: 39
            };
            
            this.TYPES = {
                keydown: 0,
                keydownRepeat: 1,
                keyup: 2,
            };
            
            var that = this;
            $( document ).keydown( function( event ) 
            {
                var keyCode = event.which;
                if( !that._keydown[ keyCode ] )
                    that._keydown[ keyCode ] = 0;
            } );
            
            $( document ).keyup( function( event ) 
            {
                var keyCode = event.which;
                that._keyup[ keyCode ] = true;
                delete that._keydown[ keyCode ];
            } ); 
        },
        
        addCommand: function( type, key, command )
        {
            //Interface.ensureImplements( command, MamutGameJs.Commands.Interface.Command );
            var keyCommand = {
                type: type,
                key: key,
                command: command
            };
            this._keyCommands.push( keyCommand );
        },
        
        clearCommands: function()
        {
            this._keyCommands = [];
        },
        
        update: function()
        {
            var idx
            for( idx in this._keydown )
            {
                this._keydown[ idx ]++;
            }
            
            for( idx in this._keyCommands )
            {
                var keyCommand = this._keyCommands[ idx ];
                if( keyCommand && this.checkCommand( keyCommand ) )
                    keyCommand.command.execute();
                    
            }
            this._keyup = [];
        },
      
        checkCommand: function( command )
        { 
            var keyCode = command.key;
            switch( command.type )
            {
                case this.TYPES.keydown:
                    return 1 == this._keydown[ keyCode ];
                case this.TYPES.keydownRepeat:
                    return null != this._keydown[ keyCode ];
                case this.TYPES.keyup:
                    return true == this._keyup[ keyCode ];
                default:
                    return false;
            };
    
            return false    
        }
    };
      
    KeyboardManager.getInstance = function()
    {
        {
            if( instance === null ){
                instance = new KeyboardManager();
            }
            return instance;
        }
    };
    
    return KeyboardManager.getInstance();
} );