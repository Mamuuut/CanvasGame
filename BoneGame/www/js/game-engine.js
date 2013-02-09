/**
 * @author Mamut
 */
requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        app: '../app'
    }
});
require( ["physic-engine"] );
