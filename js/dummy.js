class Dummy extends BaseEnemy {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y, list, id) {
        super(scene, x, y, 'dude', 'dummy',list, id);
 
    }

    /**
     * Creates the animation keys for the dummy.
     * Uses Phaser's `dude.jpg` tutorial sprite.
     */
    static createAnimations(scene) {
        scene.anims.create({
            key: 'dummy-left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'dummy-turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'dummy-right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
}
