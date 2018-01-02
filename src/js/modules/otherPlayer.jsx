
export default class otherPlayer extends Phaser.Sprite {

    constructor({ game, x, y, asset }) 
    {
        super(game, x, y, asset)
        this.game = game

        // physics
        //this.game.physics.arcade.enable(this)

        // settings
        //this.body.bounce.y = 0.05
        //this.body.gravity.y = 300
        //this.body.collideWorldBounds = true

        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)        
    }

    update() 
    {   

    }

}