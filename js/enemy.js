class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} sprite
     * @param {string} enemyName
     * @param {Array} list 
     * @param {number} id
     * @param {PathNode} currentNode
     * @param {number} velocity
     */
    constructor(scene, x, y, sprite, enemyName, list, id, currentNode = null, velocity = 100, health = 10) {
        super(scene, x, y, sprite);
        this.name = enemyName;
        this.currentNode = currentNode;
        this.velocity = velocity;
        this.list = list;
        this.id = id;
        this.health = health;
        this.isTakingDamage = false;
        

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

    takeDamage(damage){
        this.health = this.health - damage;
    }

    deactivate(){
        if (this.health <= 0){
            console.log("enemy: " +this.id + " is dead")
            this.active = false;
        }
    }
    
    die(){
        this.removeFromList(this.list)
        this.destroy();
    }

    removeFromList(lista){
        var index = lista.map(function(x) {return x.id;}).indexOf(this.id)
        lista.splice(index,1);
        // console.log(index+ " : " + this.id);
        // const removed = this.list.splice(index,1);
        // console.log(removed)
        // console.log(this.list)
    }

}
