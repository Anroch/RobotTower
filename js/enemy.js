class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} sprite
     * @param {string} enemyName
     * @param {PathNode} currentNode
     * @param {number} velocity
     */
    constructor(scene, x, y, sprite, enemyName, currentNode = null, velocity = 100) {
        super(scene, x, y, sprite);

        this.name = enemyName;
        this.currentNode = currentNode;
        this.velocity = velocity;

        // npX/Y are the exact x, y values the enemy is going for
        this.npX = x;
        this.npY = y;

        scene.physics.add.existing(this);
        scene.add.existing(this);
    }

    /**
     * Creates the enemy's animations.
     * Animation keys are composed of the name of the enemy and the movement, i.e. `{this.name}-left`.
     * @param {Phaser.Scene} scene
     */
    static createAnimations(scene) {
        throw {name : "NotImplementedError", message : "Every enemy has its own animations"};
    }

    /**
     * Moves the enemy to the x, y point.
     * @param {number} x
     * @param {number} y
     */
    goTowards(x, y) {
        var self = new Phaser.Math.Vector2(this.x, this.y);
        let dest = new Phaser.Math.Vector2(x, y);
        let r = dest.clone().subtract(self).normalize();

        this.setVelocity(this.velocity * r.x, this.velocity * r.y);

        if (r.x > 0) {
            this.anims.play(`${this.name}-right`, true);
        } else if (r.x < 0) {
            this.anims.play(`${this.name}-left`, true);
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
        this.npY = y + (Math.random() * PATH_NODE_RADIUS_RAND) - PATH_NODE_RADIUS_RAND;
    }

    /**
     * Makes the enemy move towards the path nodes. Enemies stop when reaching the end.
     * @param {Phaser.Scene} scene
     */
    traversePath(scene) {
        if (!this.currentNode) {
            this.anims.play(`${this.name}-turn`, true);
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
