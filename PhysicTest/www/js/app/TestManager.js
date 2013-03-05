/**
 * TestManager
 * @author Mathieu Delaunay
 */

define( [
    "app/LevelController"
], function( LevelController )
{   
    /**
     * Constructor
     * @param testContainer The container where to add the physic test interface
     */
    var TestManager = function( testContainer )
    {
        //Create the canvas renderer
        var canvasContainer = $( '<div id="canvas_container"></div>' );
        testContainer.append( canvasContainer );
        var canvas = $( '<canvas id="testCanvas" width="800" height="600"></canvas>' );
        
        // Check if the canvas 2d context is supported 
        if ( !canvas[0].getContext || !canvas[0].getContext('2d'))
        {
            var notSupportedLink = $( "<div class='canvas-support-msg'><a href='http://caniuse.com/#search=canvas' target='_blank'>The Canvas is not supported by your browser.</a></div>" )
            canvasContainer.append( notSupportedLink );
            return;
        }
        else
        {
            canvasContainer.append( canvas );
        }
    
        // Private
        var _context = canvas[0].getContext( "2d" );
        var _levelController = new LevelController( _context );
        var _nbRandomObjects = 100;
    
        // Create the different physic tests radio buttons
        var radioContainer = $( '<div id="radio_container"></div>' );
        var gravityTestRadio = $( '<input id="gravity_test" type="radio" name="test" value="gravity"/>Gravity Test</br>' );
        var xCollisionTestRadio = $( '<input id="x_collision_test" type="radio" name="test" value="collisions"/>X Collision Test</br>' ); 
        var randomObjectsTestRadio = $( '<input id="random_objects_test" type="radio" name="test" value="random"/>Random Objects Test</br>' ); 
        radioContainer.append( gravityTestRadio );
        radioContainer.append( xCollisionTestRadio );
        radioContainer.append( randomObjectsTestRadio );
        testContainer.append( radioContainer );  
    
        // Create the physic engine control buttons
        var buttonContainer = $( '<div id="button_container"></div>' );
        var nextButton = $( '<div id="next" class="button-icon"></div>' );
        var pauseButton = $( '<div id="pause" class="button-icon"></div>' );
        var playButton = $( '<div id="play" class="button-icon"></div>' );
        var resetButton = $( '<div id="reset" class="button-icon"></div>' );
        buttonContainer.append( resetButton );
        buttonContainer.append( nextButton );
        buttonContainer.append( pauseButton );
        buttonContainer.append( playButton );
        testContainer.append( buttonContainer );
    
        // Create event count viewer
        var eventCountContainer = $( '<div id="event_count_container"></div>' );
        var collideCount = $( '<p>Collide <span id="collide_count">0</span></p>' );
        var intersectCount = $( '<p>Intersect <span id="intersect_count">0</span></p>' );
        eventCountContainer.append( collideCount );
        eventCountContainer.append( intersectCount );
        testContainer.append( eventCountContainer );
    
        /**
         * Gravity test
         */
        var testGravity = function()
        {
            pause();
            clearLevel();
            _levelController.testGravity();
            nextFrame();
        };
    
        /**
         * X axis collisions test
         */
        var testXCollisions = function()
        {
            pause();
            clearLevel();
            _levelController.testXCollisions();
            nextFrame();
        };
    
        /**
         * Random objects collision test
         */
        var testRandomObjects = function()
        {
            pause();
            clearLevel();
            _levelController.addRandomObjects( _nbRandomObjects );
            nextFrame();
        };
    
        /**
         * Start the physic engine test
         */
        var play = function()
        {
            _levelController.playNextFrames( 300 );
        };
    
        /**
         * Pause the physic engine test
         */
        var pause = function()
        {
            _levelController.pause = true;
        };
    
        /**
         * Compute the physic engine next frame
         */
        var nextFrame = function()
        {
            _levelController.nextFrame();
        };
    
        /**
         * Clear the level objects
         */
        var clearLevel = function()
        {
            _levelController.clearLevel();
        };
    
        /**
         * Reset the current physic engine test
         */
        var resetLevel = function()
        {
            $( 'input[name=test]:checked' ).click();
        };
        
        /**
         * Update event counts
         */
        var updateEventCounts = function( event )
        {
            var collideEventCount = event.data.collide;
            var intersectEventCount = event.data.intersect;
            $( '#collide_count' ).html( collideEventCount );
            $( '#intersect_count' ).html( intersectEventCount );
        }
        
        // Set event listeners
        pauseButton.click( pause );
        playButton.click( play );
        nextButton.click( nextFrame );
        resetButton.click( resetLevel );
        gravityTestRadio.click( testGravity );
        xCollisionTestRadio.click( testXCollisions );
        randomObjectsTestRadio.click( testRandomObjects );
        _levelController.addEventListener( LevelController.EVENT_COUNT_UPDATE, updateEventCounts );
                
        // Set the default physic engine test
        gravityTestRadio.click();
    };
    
    return TestManager;
} );