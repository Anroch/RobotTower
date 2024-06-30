/**
 * A map that associates enemy names with their respective class.
 */
const ENEMY_REGISTRY = {
    'dummy' : Dummy,
};

/**
 * A simple holder class for enemy pack data.
 * A pack is a group of enemies that sould spawn "together".
 * Waves consist of groups of packs.
 *
 * @param {string} name
 * @param {number} count
 * @param {number} beforeSpawnTime
 * @param {number} spawnInterval
 * @param {number} spawnNode
 */
class EnemyPack {
    constructor(name, count, startAt, delay, spawnNode = 0) {
        this.name = name;
        this.count = count;
        this.startAt = startAt;
        this.delay = delay;
        this.spawnNode = spawnNode;
    }
}

class WaveManager {
    constructor(waves) {
        this.waves = waves;
    }

    spawnPack(scene, pack) {
        scene.time.addEvent({
            startAt: pack.startAt,
            delay: pack.delay,
            repeat: pack.count - 1, // ojo con esto
            callback: this.spawnEnemy,
            args: [scene, pack.name, pack.spawnNode],
        });
    }

    spawnEnemy(scene, name, spawnNode) {
        let e = new ENEMY_REGISTRY[name](scene, scene.path[spawnNode].x, scene.path[spawnNode].y);
        e.currentNode = scene.path[spawnNode];
        scene.dummies.push(e);
    }
}
