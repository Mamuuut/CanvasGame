/**
 * @author Mamut
 * Implements CommandInterface
 */
define( function()
{
	function Command( receiver, action )
	{
	    this._receiver = receiver;
	    this._action = action;
	};
	
	Command.prototype.execute = function()
	{
	    this._receiver[ this._action ]();   
	};
	
	return Command;
} );
