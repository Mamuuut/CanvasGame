/**
 * ObjectView
 * @author Mathieu Delaunay
 */

define( function()
{   
    /**
     * Constructor
     * @param context The Canvas 2D context
     */
    var ObjectView = function( context )
    {
        /* Private */
        _context = context;
    
        /* Public */
        this.x = 0;
        this.y = 0;
    
        this.width = 20;
        this.height = 20;
    
        this.color = "#000000";
    
        /**
         * Draw a rectangle on the Canvas 
         */
        this.draw = function()
        {
            _context.fillStyle = this.color;
            _context.fillRect( this.x, this.y, this.width, this.height );
        };
    };
    
    return ObjectView;
} );
