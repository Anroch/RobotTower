const PATH_NODE_RADIUS = 30;
const PATH_NODE_RADIUS_RAND = 20;

class PathNode {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}

class Map extends Phaser.Scene {
    /**
     * @param {Array<[number, number]>} path points that compose the path
     * @param {Array<EnemyWave>} waves enemy waves
     */
    constructor(path, waves) {
        super();

        this.path = [];
        for (let i = 0; i < path.length; ++i) {
            this.path.push(new PathNode(path[i][0], path[i][1]));

            if (i > 0) {
                this.path[i - 1].next = i;
            }
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
