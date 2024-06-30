/**
 * A map that associates enemy names with their respective class.
 */
const ENEMY_REGISTRY = {
    'dummy' : Dummy,
};

/**
 * A simple holder class for enemy pack data.
 * A pack is a group of enemies that sould spawn "together".
 */
class EnemyPack {
    /**
     * @param {string} name
     * @param {number} count
     * @param {number} startAt
     * @param {number} spawnInterval
     * @param {number} spawnNodeIndex
     */
    constructor(name, count, startAt, delay, spawnNodeIndex = 0) {
        this.name = name;
        this.count = count;
        this.startAt = startAt;
        this.delay = delay;
        this.spawnNodeIndex = spawnNodeIndex;
    }
}

/**
 * Holder class for wave data.
 * Waves are groups of packs.
 */
class EnemyWave {
    /**
     * @param {Array<EnemyPack>} enemyPacks
     */
    constructor(enemyPacks) {
        this.enemyPacks = enemyPacks;
    }
}

/**
 * Just a wave manager, spawns enemies.
 */
class WaveManager {
    /**
     * @param {Array<EnemyWave>} waves
     */
    constructor(waves) {
        this.waves = waves;
    }

    /**
     * Advances to the next wave. Returns true when no more waves are available.
     *
     * @return {bool}
     */
    nextWave() {
        return this.waves.shift() == undefined;
    }

    /**
     * Spawns current wave.
     *
     * @param {Phaser.Scene} scene
     */
    spawnCurrentWave(scene) {
        this.waves[0].enemyPacks.forEach((pack) => {
            this.spawnPack(scene, pack);
        });
    }

    /**
     * Triggers the spawning event of the enemies in a pack.
     *
     * @param {Phaser.Scene} scene
     * @param {EnemyPack} pack
     */
    spawnPack(scene, pack) {
        scene.time.addEvent({
            startAt: pack.startAt, // how does this work?
            delay: pack.delay,
            repeat: pack.count - 1, // seems to be "how many times to repeat after initial execution"
            callback: this.spawnEnemy,
            args: [scene, pack.name, pack.spawnNodeIndex],
        });
    }

    /**
     * Spawns a new enemy, maybe this should be a method of Map?
     *
     * @param {Phaser.Scene} scene
     * @param {string} name
     * @param {number} spawnNodeIndex
     */
    spawnEnemy(scene, name, spawnNodeIndex) {
        let e = new ENEMY_REGISTRY[name](
            scene,
            scene.path[spawnNodeIndex].x,
            scene.path[spawnNodeIndex].y
        );
        e.currentNode = scene.path[spawnNodeIndex];
        scene.dummies.push(e);
    }
}
