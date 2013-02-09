/**
 * @author Mamut
 */
require( [ 
    "GameEngine/Inputs/KeyboardManager",
    "GameEngine/GameEngine"
], function( KeyboardManager, GameEngine )
{
    $( function()
    {
        var playerCommands = [
            {
                action: "moveRight",
                keyType: KeyboardManager.TYPES.keydownRepeat,
                keyCode: KeyboardManager.KEY_CODES.right
            },
            {
                action: "moveLeft",
                keyType: KeyboardManager.TYPES.keydownRepeat,
                keyCode: KeyboardManager.KEY_CODES.left
            },
            {
                action: "jump",
                keyType: KeyboardManager.TYPES.keydown,
                keyCode: KeyboardManager.KEY_CODES.up
            }
            
        ];
        
        var screenSize = {
            width: 800,
            height: 600
        };
        
        var boneGameConfig = {
            size: screenSize,
    
            frameRate: 1000 / 30,
    
            loadingState: {
                src: "img/bone_intro.gif",
                duration: 1000
            },
    
            levelImg: [
                { key: "pinocchio", src: "img/player_run.gif" },
                { key: "grass", src: "img/ground/grass.gif" }
            ],
            
            levelDef: {
                models: [
                    {
                        modelClass: "LevelPhysicObject",
                        x: 0,
                        y: 540,
                        width: screenSize.width,
                        height: 10,
                        mass: Number.MAX_VALUE,
                        collideBits: 7
                    },
                    {
                        modelClass: "LevelPhysicObject",
                        x: screenSize.width - 10,
                        y: 0,
                        width: 10,
                        height: screenSize.height,
                        mass: Number.MAX_VALUE,
                        collideBits: 1
                    }
                ], 
                views: [
                    {
                        viewClass: "ColorRect",
                        modelClass: "KillerObject",
                        x: 0,
                        y: 0,
                        width: 20,
                        height: screenSize.height,
                        mass: Number.MAX_VALUE
                    },
                    {
                        viewClass: "ColorRect",
                        modelClass: "LevelObject",
                        width: screenSize.width,
                        height: 80,
                        x: 0,
                        y: screenSize.height - 80,
                        color: "#00ff00"
                    },
                    {
                        viewClass: "ColorRect",
                        modelClass: "LevelObject",
                        width: screenSize.width,
                        height: 2,
                        x: 0,
                        y: screenSize.height - 80 - 2,
                        color: "#00ac20"
                    },
                    {
                        viewClass: "ScrollView",
                        screenWidth: screenSize.width,
                        speed: 4,
                        maxDelay: 100,
                        viewDef: {
                            viewClass: "RandomSprite",
                            modelClass: "LevelPhysicObject",
                            width: 40,
                            height: 10,
                            mass: Number.MAX_VALUE,
                            y: 510,
                            src: "grass"
                        }
                    },
                    {
                        viewClass: "ScrollView",
                        screenWidth: screenSize.width,
                        speed: 8,
                        sequence: [100, 50, 200, 50],
                        viewDef: {
                            viewClass: "ColorRect",
                            modelClass: "LevelPhysicObject",
                            width: 40,
                            height: 40,
                            collideBits: 2,
                            mass: Number.MAX_VALUE,
                            y: 500,
                            color: "#ffff00"
                        }
                    },
                    {
                        viewClass: "ScrollView",
                        screenWidth: screenSize.width,
                        speed: 2,
                        sequence: [50, 100],
                        viewDef: {
                            viewClass: "ColorRect",
                            modelClass: "LevelPhysicObject",
                            width: 80,
                            height: 80,
                            collideBits: 4,
                            mass: Number.MAX_VALUE,
                            y: 460,
                            color: "#ff0000"
                        }
                    },
                    {
                        viewClass: "PlayerView",
                        modelClass: "LevelPhysicObject",
                        frameDuration: 2,
                        width: 28,
                        height: 40,
                        x: 200,
                        y: 400,
                        collideBits: 7,
                        src: "pinocchio",
                        commands: playerCommands
                    }
                ]
            }
        };
    
        new GameEngine( $( '#game_container' ), boneGameConfig );
    } );
} )