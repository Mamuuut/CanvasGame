/**
 * @author Mamut
 */
define( function()
{
	function LevelGroupView()
	{
	    this._children = [];
	}
	
	LevelGroupView.prototype.setLevelController = function( levelController )
	{
        this._levelController = levelController;  
	};
	
	LevelGroupView.prototype.add = function( child )
	{
	    //Interface.ensureImplements( child, MamutGameJs.Views.Interface.LevelView );
	    
	    this._children.push( child );
	    this._children.sort( function( a, b )
	    {
	        return a.getZIndex() < b.getZIndex();
	    } );
	};
	        
	LevelGroupView.prototype.remove = function( child )
	{
	    for( var i = 0, len = this._children.length; i < len; i++ )
	    {
	        if( this._children[i] === child )
	        {
	            this._children.splice( i, 1 );
	            break;   
	        }
	    }
	};
	        
	LevelGroupView.prototype.getChild = function( index )
	{
	    return this._children[index];
	};
	        
	LevelGroupView.prototype.getChildren = function()
	{
	    return this._children;
	};
	        
	LevelGroupView.prototype.onDraw = function( renderer )
	{
	    for( var i = 0, len = this._children.length; i < len; i++ )
	    {
	        this._children[i].onDraw( renderer );
	    }   
	};
	
	LevelGroupView.prototype.getZIndex = function()
	{
	    return 0;
	};
	
	return LevelGroupView;
} );