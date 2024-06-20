class Dummy extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'dude');

        this.velocity = 100;
        this.currentNode = null;

        // https://stackoverflow.com/questions/55302007/how-add-physics-to-phaser-3-sprite
        scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }

    /**
     * Creates the animation keys for the dummy.
     * Uses Phaser's `dude.jpg` tutorial sprite.
     */
    static createAnimations(scene) {
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Moves the dummy to the x, y point.
     * @param {number} x
     * @param {number} y
     */
    goTowards(x, y) {
        var self = new Phaser.Math.Vector2(this.x, this.y);
        let dest = new Phaser.Math.Vector2(x, y);
        let r = dest.clone().subtract(self).normalize();

        this.setVelocity(this.velocity * r.x, this.velocity * r.y);

        if (r.x > 0) {
            this.anims.play('right', true);
        } else if (r.x < 0) {
            this.anims.play('left', true);
        }

        return self.distance(dest) < 5;
    }

    /**
     * Selects a point within the span of the node to go to.
     * @param {number} x
     * @param {number} y
     */
    getNodePoint(x, y) {
        this.npX = x + (Math.random() * PATH_NODE_RADIUS_RAND);
        this.npY = y + (Math.random() * PATH_NODE_RADIUS_RAND);
    }

    /**
     * Makes the dummy move towards the path nodes. Dummies stop when reaching the end.
     * @param {Phaser.Scene} scene
     */
    traversePath(scene) {
        if (!this.currentNode) {
            this.anims.play('turn', true);
            this.anims.stop();
            this.setVelocity(0, 0);
        } else {
            if (this.goTowards(this.npX, this.npY)) {
                if (this.currentNode.next) {
                    this.currentNode = scene.path[this.currentNode.next];
                    this.getNodePoint(this.currentNode.x, this.currentNode.y);
                } else {
                    this.currentNode = null;
                }
            }
        }
    }
}
