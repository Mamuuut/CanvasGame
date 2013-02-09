({
    appDir: 'www',
    baseUrl: 'js/libs',
    paths: {
        app: '../app'
    },
    dir: 'www-built',
    modules: [
        {
            name: '../game-engine',
            include: [
            	'GameEngine/GameEngine'
            ]
        },

        {
            name: '../bone',
            include: ['app/main'],
            exclude: ['../game-engine']
        }
    ]
})
