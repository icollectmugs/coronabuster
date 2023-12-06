import Phaser from  "phaser";
import FallingObject from "../ui/FallingObject"
export default  class  CoronaBusterScene extends Phaser.Scene {
    constructor(){
        super('corona-buster-scene')
    }


    // METHOD  INIT
    init(){
        this.clouds = undefined;
        this.player = undefined;

        this.speed = 100;

        this.nav_left = false;
        this.nav_right = false;
        this.shoot = false;

        this.player = undefined;
        this.speed = 100;
        this.enemies = undefined;
        this.enemySpeed = 50;
        this.lasers = undefined;
        this.lastFired = 10;
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
        this.load.image('right-btn', 'images/right-btn.png')
        this.load.image('left-btn', 'images/left-btn.png')
        this.load.image('shoot', 'images/shoot-btn.png')

        this.load.spritesheet('laser','images/laser-bolts.png',{
            frameWidth: 16,
            frameHeight: 16,
        })
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
        
        this.player =  this.createPlayer()
        this.createButton()
        
        this.enemies = this.physics.add.group({
            classType: FallingObject,
            maxSize: 10,
            runChildUpdate: true
        })

        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: this.spawnEnemy,
            callbackScope:  this,
            loop: true
        })
    
    }



    // METHOD UPDATE
    update(time){
        this.clouds.children.iterate((child) => {
            // @ts-ignore
            child.setVelocityY(20);
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

    //METHOD CREATE BUTTONS
    createButton () {
        this.input.addPointer(3)

        let shoot =  this.add.image(320, 550, 'shoot')
            .setInteractive().setDepth(0.5).setAlpha(0.8)

        let nav_left = this.add.image(50, 550, 'left-btn')
            .setInteractive().setDepth(0.5).setAlpha(0.8)
            
        let  nav_right = this.add.image(nav_left.x +
        nav_left.displayWidth+20, 550, 'right-btn')  
            .setInteractive().setDepth(0.5).setAlpha(0.8)

        nav_left.on('pointerdown',  () => {
            this.nav_left  = true
        }, this)

        nav_left.on('pointerout',  ()  => {
            this.nav_left = false
        }, this)

        nav_right.on('pointerdown',  ()  => {
            this.nav_right = true
        }, this)

        nav_right.on('pointerout',  ()  => {
            this.nav_right = false
        }, this)

        shoot.on('pointerdown',  ()  => {
            this.shoot = true
        }, this)

        shoot.on('pointerout',  ()  => {
            this.shoot = false
        }, this)
    }

    // METHOD PLAYER
    createPlayer()  {
        const player = this.physics.add.sprite(200, 450, 'player')
        player.setCollideWorldBounds(true)
        //code collider world bounds here
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
            }),
        })
        this.anims.create({
            key: 'right',
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

