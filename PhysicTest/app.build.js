({
    appDir: 'www',
    baseUrl: 'js/libs',
    paths: {
        app: '../app'
    },
    dir: 'www-built',
    modules: [
        {
            name: '../physic-engine',
            include: [
            	'PhysicEngine/Controller/PhysicController',
            	'PhysicEngine/Models/ObjectModel'
            ]
        },

        {
            name: '../physic-test',
            include: ['app/main'],
            exclude: ['../physic-engine']
        }
    ]
})
