/**
 * @author Mamut
 */
define( function()
{	
	var instance = null;
		
	function ImageLoader()
	{
        if( instance !== null )
        {
            throw new Error("Cannot instantiate more than one ImageLoader, use ImageLoader.getInstance()");
        } 
        
        this.initialize();
	}
		
	ImageLoader.prototype = {
		initialize: function()
		{
		    this._images = {};
		    this._nbLoadingImages = 0;
		    this._onImagesLoaded = undefined;
		},
		
   		loadImage: function( key, src )
		{
			var img = new Image();
			var that = this;
			img.onload = function()
			{
	        	that._images[ key ] = img;
	        	that._nbLoadingImages--;
	        	if( 0 == that._nbLoadingImages && "function" == typeof( that._onImagesLoaded ) )
	        	{
					that._onImagesLoaded();
	        	}
	        };
	        img.src = src;
		},
		    	
		loadImages: function( imageArray, onImagesLoaded )
		{
			this._onImagesLoaded = onImagesLoaded;
			for( index in imageArray )
			{
				var image = imageArray[ index ];
				this.loadImage( image.key, image.src );
				this._nbLoadingImages++;
			}	
		},
		
		getImage: function( key )
		{
			return this._images[ key ];
		}
	}
		
	ImageLoader.getInstance = function()
	{
		{
	        if( instance === null ){
	            instance = new ImageLoader();
	        }
	        return instance;
		}
	};
	
	return ImageLoader.getInstance();
} );