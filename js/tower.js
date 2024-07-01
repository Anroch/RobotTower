class Tower extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, enemies,clock){
        super(scene,x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.damage = 5;
        this.nearEnemies = [];
        this.enemies = enemies;
        this.clock = clock;
        this.lastAttack;

    }

    //Adds nearby enemies to the nearEnemies list
    searchEnemy(){
        for (let i = 0; i < this.enemies.length; i++ ){
            if (Phaser.Math.Distance.Between(this.x, this.y, this.enemies[i].x, this.enemies[i].y) <= 100) {
                if(!this.nearEnemies.includes(this.enemies[i]) ){
                    this.nearEnemies.push(this.enemies[i]);
                    // console.log(this.nearEnemies);
                }
            }
            
        }
    }


    //Frees enemies from nearEnemies list
    freeEnemy(){
        if(this.nearEnemies.length>0){
            for(let i = 0; i < this.nearEnemies.length; i++){

                //Checks if enemy is active
                if(!this.nearEnemies[i].active){
                    this.nearEnemies.splice(i,1);
                }

                //checks if enemu is out of range
                if (Phaser.Math.Distance.Between(this.x, this.y, this.enemies[i].x, this.enemies[i].y) > 100) {
                    this.nearEnemies.splice(i,1);
                }
                
            }
            // console.log(this.nearEnemies);
        }

    }


    attack(){
        console.log(this.nearEnemies[0]);
        if(this.nearEnemies != null){
            if (this.nearEnemies.length > 0  ){
    
                this.nearEnemies[0].takeDamage(this.damage);
                console.log("enemy attacked: " + this.nearEnemies[0].id);
                console.log("enemy health: " + this.nearEnemies[0].health);
                // console.log(this.nearEnemies[0].health + " " + this.nearEnemies[0].id)
                
    
            }
        }

    }

}