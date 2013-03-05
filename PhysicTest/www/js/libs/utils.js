/**
 * Javascript Pro Design Patterns helpers
 * - extend() for inheritance
 * - augment() for mixin classes
 * - Interface Singleton for interfaces
 */
function extend( subClass, superClass )
{
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    
    subClass.superClass = superClass.prototype;
    if( superClass.prototype.constructor == Object.prototype.constructor )
    {
        superClass.prototype.constructor = superClass;
    }
}

function augment( receivingClass, givingClass ) {
    if( arguments[2] ) 
    { // Only give certain methods.
        for( var i = 2, len = arguments.length; i < len; i++ ) 
        {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    } 
    else 
    { // Give all methods.
        for( methodName in givingClass.prototype )
        { 
            if( !receivingClass.prototype[methodName] )
            {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}

var Interface = function( name, methods ) 
{
    if( arguments.length != 2 )
    {
        throw new Error( "Interface constructor called with " + arguments.length + 
            " arguments, but expected exactly 2." );
    }  
    
    this.name = name;
    this.methods = [];
    for( var i = 0, len = methods.length; i < len; i++ )
    {
        if( typeof methods[i] !== 'string' )
        {
            throw new Error( "Interace constructor expecets method names to be passed in a string." );
        }
        this.methods.push( methods[i] );
    }
};

Interface.ensureImplements = function( object )
{
    if( arguments.length < 2 )
    {
        throw new Error( "Function Interface.ensureImplements called with" +
            arguments.length + "arguments, but expected at least 2." );
    } 
    
    for( var i = 1, len = arguments.length; i < len; i++ )
    {
        var interfaceClass = arguments[i];
        if( interfaceClass.constructor !== Interface )
        {
            throw new Error( "Function Interface.ensureImplements expects arguments"
                + "two and above to be Instances of Interface." )
        }
        
        for( var j = 0, methodsLen = interfaceClass.methods.length; j < methodsLen; j++ )
        {
            var method = interfaceClass.methods[j];
            if( !object[method] || typeof object[method] !== 'function' )
            {
                throw new Error( "Function Interface.ensureImplements: objects"
                    + "does not implement the " + interfaceClass.name
                    + " interface. Method " + method + " was not found." );
            }
        }
    }
}

/**
 * IE indexOf support for IE 8 and previous versions
 */
if( !Array.indexOf )
{
    Array.prototype.indexOf = function( obj ){
        for( var i=0; i<this.length; i++ ){
            if( this[i]==obj ){
                return i;
            }
        }
        return -1;
    }
}