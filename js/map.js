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
     * @param {Array<[number, number]> | Array<[number, number, number]>} path points that compose the path
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
    }

    create() {
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

    }

    update() {
        this.dummies.forEach((dummy) => {
            dummy.traversePath(this);
        });
    }
}
