import config from '../utils/config'

export default class otherPlayer extends Phaser.Sprite {

    constructor({ game, x, y, asset, pid }) 
    {
        super(game, x, y, asset)
        this.game = game
        this.pid = pid

        this.tx = x
        this.ty = y

        this.scale.setTo(config.scale);

        // physics
        this.game.physics.arcade.enable(this)
        this.game.stage.disableVisibilityChange = true
        // this.animations.updateIfVisible = false

        this.alpha = 0.5

        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true) 
        this.anim = 5
    }

    fire(call){
        if(call && typeof call === "function"){
            call()
        }
    }

    moveTo(tx,ty){
        this.tx = tx
        this.ty = ty
    }

    update() 
    {
        
        if(this.anim > 0) 
            this.anim -= 1

        let animRun = false

        if(this.anim == 0)
        {
            this.animations.stop()
            this.frame = 4
        }

        if (this.x > this.tx) //  Move to the left
        {
            this.animations.play('left')
            this.anim = 4
            animRun = true
        }
        else if (this.x < this.tx) //  Move to the right
        {
            this.animations.play('right')
            this.anim = 4
            animRun = true
        }

        if(!animRun && this.ty > this.y){
             this.animations.play('right')
             this.anim = 4
        }else if(!animRun && this.ty < this.y){
            this.animations.play('left')
             this.anim = 4
        }
        

        this.x = this.tx
        this.y = this.ty

    }

}