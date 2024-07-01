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
        [560, 60],
        [400, 190],
        [220, 220],
        [145, 290],
        [170, 380],
        [250, 405],
        [330, 380],
        [500, 395],
        [580, 450],
        [605, 565],
    ]),
};

var game = new Phaser.Game(config);
