
export default class Player extends Phaser.Sprite {

    constructor({ game, x, y, asset }) 
    {
        super(game, x, y, asset)
        this.game = game
        
        // physics
        this.game.physics.arcade.enable(this)        

        // settings
        //this.body.bounce.y = 0.05
        //this.body.gravity.y = 300
        this.body.collideWorldBounds = true

        // Animations
        this.animations.add('left', [0, 1, 2, 3], 10, true)
        this.animations.add('right', [5, 6, 7, 8], 10, true)

        // Controlls
        this.cursors = this.game.input.keyboard.createCursorKeys()   
    }


    update() 
    {   

        this.body.velocity.x = 0
        this.body.velocity.y = 0
    
        if (this.cursors.left.isDown) //  Move to the left
        {
            this.body.velocity.x = -250
            this.animations.play('left')
        }
        else if (this.cursors.right.isDown) //  Move to the right
        {
            this.body.velocity.x = 250
            this.animations.play('right')
        }
        
        if (this.cursors.up.isDown){
            this.body.velocity.y = -250
        }
        else if (this.cursors.down.isDown){
            this.body.velocity.y = 250
        }
        

        if(this.body.velocity.x == 0 && this.body.velocity.y == 0) //  Stand still
        {
            this.animations.stop()
            this.frame = 4
        }

    }

}