/**
 * LevelObject
 * @author Mathieu Delaunay
 */

define( function()
{      

    /**
     * Constructor
     */
    var LevelObject = function( view, model )
    {
        /* Private */
        var _view = view;
        var _model = model;
    
        /* Public methods */
    
        /**
         * Update the view from the object model
         */   
        this.updateView = function()
        {
            _view.x = _model.position.x;
            _view.y = _model.position.y;
            _view.width = _model.size.x;
            _view.height = _model.size.y;
            _view.draw();
        };
    			
    	//registerEventListener(PhysicEvent.COLLIDE, onCollide);
    };		
    
    return LevelObject;
} );