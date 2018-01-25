import config from '../utils/config'

export default class Player extends Phaser.Sprite {

    constructor({ game, x, y, asset }) 
    {
        super(game, x, y, asset)
        this.game = game
        
        this.scale.setTo(config.scale)
        this.anchor.set(0.5)
        // physics
        this.game.physics.arcade.enable(this)        
        // settings        
        this.body.collideWorldBounds = true
        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)

        // Controlls
        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.wasd = {
            up:    this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down:  this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left:  this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        }

        this.lookDirection = "LEFT"
    }


    update() 
    {   

        this.body.velocity.x = 0
        this.body.velocity.y = 0
    
        if (this.cursors.left.isDown|| this.wasd.left.isDown) 
        {
            this.body.velocity.x = -250
            this.animations.play('left')
            this.lookDirection = "LEFT"
        }
        else if (this.cursors.right.isDown|| this.wasd.right.isDown) 
        {
            this.body.velocity.x = 250
            this.animations.play('right')
            this.lookDirection = "RIGHT"
        }
        
        if (this.cursors.up.isDown || this.wasd.up.isDown){
            this.body.velocity.y = -250
        }
        else if (this.cursors.down.isDown || this.wasd.down.isDown){
            this.body.velocity.y = 250
        }

        if(this.lookDirection == "RIGHT"){
            this.animations.play('right')
        }else if(this.lookDirection == "LEFT"){
            this.animations.play('left')
        }
        
        if(this.body.velocity.x == 0 && this.body.velocity.y == 0) //  Stand still
        {
            this.animations.stop()
            //this.frame = 4
            
            this.x = parseInt(this.x)
            this.y = parseInt(this.y)
        }
  
    }

    fire(call){
        if (this.game.input.activePointer.isDown)
            call(this)
    }

    moving(call){        
        if(!this.body.velocity.isZero())
            call(this)
    }

}