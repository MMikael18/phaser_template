
export default class otherPlayer extends Phaser.Sprite {

    constructor({ game, x, y, asset, pid }) 
    {
        super(game, x, y, asset)
        this.game = game
        this.pid = pid

        this.tx = x
        this.ty = y

        // physics
        // this.game.physics.arcade.enable(this)
        this.game.stage.disableVisibilityChange = true

        // this.animations.updateIfVisible = false

        // settings
        //this.body.bounce.y =  0.7 + Math.random() * 0.2
        //this.body.gravity.y = 300
        //this.body.collideWorldBounds = true

        this.alpha = 0.5

        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true) 
        this.anim = 5

    }

    setTarget(tx,ty){
        this.tx = tx
        this.ty = ty
    }

    update() 
    {
        if(this.anim > 0) this.anim -= 1

        if(this.anim == 0)
        {
            this.animations.stop()
            this.frame = 4
        }

        if (this.x > this.tx) //  Move to the left
        {
            this.animations.play('left')
            this.anim = 4
        }
        else if (this.x < this.tx) //  Move to the right
        {
            this.animations.play('right')
            this.anim = 4
        }
        this.x = this.tx
        this.y = this.ty

        // if(this.x != this.tx && this.y != this.tx)
        // {
        //     //this.game.physics.arcade.moveToXY(this, this.tx, this.ty, 300, 0)
        //     //this.body.velocity.x = 0
        //     //this.body.velocity.y = 0
        // }
        
        /*
        if (this.body.velocity.x < 0) //  Move to the left
        {
            this.animations.play('left')
        }
        else if (this.body.velocity.x > 0) //  Move to the right
        {
            this.animations.play('right')
        }
        else //  Stand still
        {
            this.animations.stop()
            this.frame = 4
        }
        */

    }

}