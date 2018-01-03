
export default class otherPlayer extends Phaser.Sprite {

    constructor({ game, x, y, asset, pid }) 
    {
        super(game, x, y, asset)
        this.game = game
        this.pid = pid

        // physics
        //this.game.physics.arcade.enable(this)

        // settings
        //this.body.bounce.y =  0.7 + Math.random() * 0.2
        //this.body.gravity.y = 300
        //this.body.collideWorldBounds = true

        this.alpha = 0.5

        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)        
    }

    update() 
    {   

    }

}