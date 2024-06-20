var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update
    // },
    scene: new Map([
        [100, 100],
        [100, 200],
        [150, 350],
        [160, 500],
        [300, 400],
        [400, 300],
        [300, 200],
        [600, 80],
    ]),
};

var game = new Phaser.Game(config);
