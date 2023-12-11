import Phaser from 'phaser'
export default  class FallingObject extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture,  config) {
        super  (scene, x, y,  texture)  
        this.scene = scene
        this.speed = config.speed 
        this.rotationVal = config.rotation  
    }


    spawn(positionX) {
        this.setPosition(positionX, -10)
        this.setActive(true)
        this.setVisible(true)
    }


    die() {
        this.destroy()
    }

    update(time)  {
        this.setVelocityY(this.speed)
        this.rotation  += this.rotationVal

        const gameHeight = this.scene.scale.height 
        if (this.y > gameHeight +5)
            this.die()
    }

    // spawnEnemy() {
    //     const config = {
    //         speed: 30,
    //         rotation: 0.1
    //     }
    //     // @ts-ignore
    //     // const  enemy = this.enemies.get(0, 0, 'enemy', config)
    //     // const positionX = Phaser.Math.Between(50, 350)
    //     // if (enemy) {
    //     //     enemy.spawn(positionX)
    //     // }
    // }
}