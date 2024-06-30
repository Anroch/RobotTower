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
 * @param {number} spawnNodeIndex
 */
class EnemyPack {
    constructor(name, count, startAt, delay, spawnNodeIndex = 0) {
        this.name = name;
        this.count = count;
        this.startAt = startAt;
        this.delay = delay;
        this.spawnNodeIndex = spawnNodeIndex;
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
            args: [scene, pack.name, pack.spawnNodeIndex],
        });
    }

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
