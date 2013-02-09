/**
 * PhysicTest main
 * @author Mathieu Delaunay
 */

require( [
    "app/TestManager"
], function( TestManager )
{ 
    new TestManager( $( '#physic_test_container' ) );
} );