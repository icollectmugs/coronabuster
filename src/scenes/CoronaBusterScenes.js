import Phaser from  "phaser";
export default  class  CoronaBusterScene extends Phaser.Scene {
    constructor(){
        super('corona-buster-scene')
    }


    // METHOD  INIT
    init(){
        this.clouds = undefined
    }


    // METHOD PRELOAD
    preload(){
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
    }
}

