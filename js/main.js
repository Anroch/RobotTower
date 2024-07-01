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
    scene: new Map(
        [
            [[100, 100], 1],
            [[100, 200], 2],
            [[150, 350], 3],
            [[160, 500], 4],
            [[300, 400], 5],
            [[400, 300], 6],
            [[300, 200], 7],
            [[600, 80], null],
        ],
        [
            new EnemyWave([
                new EnemyPack('dummy', 5, 0, 1500),
                new EnemyPack('dummy', 5, 0, 300),
            ]),
            new EnemyWave([
                new EnemyPack('dummy', 5, 0, 100),
            ]),
        ]
    ),
};

var game = new Phaser.Game(config);
