import config from '../utils/config'

export default class Monster extends Phaser.Sprite {

    constructor({ game, x, y, asset }) 
    {
        super(game, x, y, asset)
        this.game = game
        
        this.scale.setTo(config.scale)
        this.anchor.set(0.5)
        // physics
        this.game.physics.arcade.enable(this)        
        // settings        
        this.checkWorldBounds = false
        this.outOfBoundsKill = true
        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)
    }

    update() 
    {   
        if(this.x > 0){
            this.checkWorldBounds = true
        }

        this.body.velocity.x = 50
        this.animations.play('left')
    }

}