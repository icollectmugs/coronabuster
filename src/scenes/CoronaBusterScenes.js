import Phaser from  "phaser";
export default  class  CoronaBusterScene extends Phaser.Scene {
    constructor(){
        super('corona-buster-scene')
    }


    // METHOD  INIT
    init(){
        this.clouds = undefined
        this.player = undefined;

        this.speed = 100
        this.nav_left = undefined
        this.nav_right = undefined
    }


    // METHOD PRELOAD
    preload(){
        this.load.spritesheet('player', 'images/ship.png', {

            frameWidth: 66,
            frameHeight: 66
            
            })
        this.load.image('background', 'images/bg_layer1.png')
        //load the cloud image
        this.load.image('cloud', 'images/cloud.png')
    }
        

    // METHOD CREATE
    create(){
        const gameWidth = this.scale.width*0.5;
        const gameHeight = this.scale.height*0.5;
        this.add.image(gameWidth, gameHeight, 'background')

    // Create Moving CLouds
    this.clouds = this.physics.add.group({
        key: 'cloud',
        repeat: 10,
    })
    Phaser.Actions.RandomRectangle(
        this.clouds.getChildren(),
        this.physics.world.bounds
        )    
    
    }



    // METHOD UPDATE
    update(time){
        this.clouds.children.iterate((child) => {
            // @ts-ignore
            child.SetVelocityY(20);
            // @ts-ignore
            if(child.y > this.scale.height){
                // @ts-ignore
                child.x = Phaser.Math.Between(10,400)
                // @ts-ignore
                child.y = 0
            }
        })
        this.player = this.createPlayer()  
    }

    // METHOD PLAYER
    createPlayer()  {
        const player = this.physics.add.sprite(200, 450, 'player')
        player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'turn',
            frames: [ {
                key: 'player',frame: 0
            }],
        })
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player',{
                start: 1,end: 2
            })
        })
        return player
    }

    // METHOD PLAYER MOVEMENT
    movePlayer(player, time)  {
        if (this.nav_left ){
            this.player.setVelocityX(this.speed * -1)

            this.player.anims.play('left', true)
            this.player.setFlipX(false)
        } else if (this.nav_right) {
            this.player.setVelocityX(this.speed)
            this.player.anims.play('right', true)
            this.player.setFlipX(true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
        }
    }
}

