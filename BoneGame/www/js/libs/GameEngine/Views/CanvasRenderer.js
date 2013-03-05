/**
 * @author Mamut
 */
define( function()
{
	function CanvasRenderer( canvasWidth, canvasHeight )
	{   
        this._container = $( '<div id="canvas_container"></div>' );
        this._canvas = $( '<canvas id="game_canvas" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>' );
	    this._children = [];
	    
        this._container.append( this._canvas );
        this._ctx = this._canvas[0].getContext( "2d" );
	}  
	
	CanvasRenderer.prototype.getContext = function()
	{
		return this._ctx;
	};
	
	CanvasRenderer.prototype.getView = function()
	{
		return this._canvas;
	};
	
    /**
     * HTML5 Canvas Adapter Functions
     */
	CanvasRenderer.prototype.clear = function()
	{
        this._ctx.clearRect( 0, 0, this._ctx.canvas.width, this._ctx.canvas.height );
	};
	
    CanvasRenderer.prototype.drawTexture = function( img, x, y, width, xScale, index )
    {	
    	var sx = width ? width * index : 0;
    	var sy = 0;
    	var sw = width || img.width;
    	var sh = img.height;
    	var dx = -sw / 2;
    	var dy = -sh / 2;
        
        this._ctx.translate( x - dx, y - dy );
        this._ctx.scale( xScale, 1 );  
    	this._ctx.drawImage( img, sx, sy, sw, sh, dx, dy, sw, sh );
        this._ctx.scale( 1 / xScale, 1 );
        this._ctx.translate( -x + dx, -y + dy );
    }; 
    
    CanvasRenderer.prototype.fillRect = function( x, y, w, h, color )
    {
        this._ctx.fillStyle = color;
        this._ctx.fillRect( x, y, w, h );
    };
    
    CanvasRenderer.prototype.fillBottomRect = function( h, offset, color )
    {
        this._ctx.fillStyle = color;
        this._ctx.fillRect( 0, this._ctx.canvas.height - h - offset, this._ctx.canvas.width, h );
    };
    
    return CanvasRenderer;
} );