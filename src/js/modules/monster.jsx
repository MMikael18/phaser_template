import config from '../utils/config'

export default class Monster extends Phaser.Sprite {

    constructor({ game, asset }) 
    {
        super(game, 0, 0, asset)
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

}