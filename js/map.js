const PATH_NODE_RADIUS = 30;
const PATH_NODE_RADIUS_RAND = 20;

class PathNode {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} next
     */
    constructor(x, y, next) {
        this.x = x;
        this.y = y;
        this.next = next;
    }
}

class Map extends Phaser.Scene {
    /**
     * @param {Array<[number, number, number | undefined]>} path points that compose the path
     * @param {Array<EnemyWave>} waves enemy waves
     */
    constructor(path, waves) {
        super();

        this.path = [];
        for (let i = 0; i < path.length; ++i) {
            let index = (path[i].length === 3) ? path[i][2] : ((i !== path.length - 1) ? i + 1 : null);
            this.path.push(new PathNode(path[i][0], path[i][1], index));
        }

        this.wm = new WaveManager(waves);
    }

    preload() {
        this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('road','../assets/road.png');
        this.load.image('tower','../assets/tower.png');
    }

    create() {
        this.add.image(400, 300, 'road');
        Dummy.createAnimations(this);
        this.dummies = [];

        this.wm.spawnCurrentWave(this);
        this.wm.nextWave();

        const graphics = this.add.graphics({
            lineStyle: {
                width: 2,
                color: 0xff00ff
            },
        });

        this.path.forEach((node) => {
            // https://github.com/phaserjs/examples/blob/master/public/src/geom/circle/area.js
            graphics.strokeCircle(node.x, node.y, PATH_NODE_RADIUS);
        });

        this.tower = new Tower(this, 250,300, 'tower', this.dummies);

        this.attackTimer = this.time.addEvent({
            callback: this.tower.attack,
            callbackScope: this.tower,
            delay: 1000,
            loop: true
        });

        graphics.strokeCircle(this.tower.x,this.tower.y, 150);
    }

    update() {
        this.dummies.forEach((dummy) => {
            dummy.traversePath(this);
            dummy.deactivate();
        });
        
        this.tower.searchEnemy();
        this.tower.freeEnemy();

        this.dummies.forEach((dummy) => {
            if(!dummy.active){
                dummy.die();
            }
        });
    }

}
