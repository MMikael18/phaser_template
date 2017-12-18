export default class Level extends Phaser.State {

    create() 
    {

        this.physics.startSystem(Phaser.Physics.ARCADE)
        
        // Add back ground
        this.add.sprite(0, 0, 'sky')

        // Group of ledges
        this.platforms = this.add.group()
        this.platforms.enableBody = true    //  We will enable physics

        // Ground
        let ground = this.platforms.create(0, this.world.height - 64, 'ground')
            ground.scale.setTo(2, 2)       //  Scale it to fit
            ground.body.immovable = true

        // Ledges
        let ledge = this.platforms.create(400, 400, 'ground')
            ledge.body.immovable = true
            // other
            ledge = this.platforms.create(-150, 250, 'ground')    
            ledge.body.immovable = true

        // Player
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude')
        this.game.physics.arcade.enable(this.player)

        this.player.body.bounce.y = 0.05
        this.player.body.gravity.y = 300
        this.player.body.collideWorldBounds = true

        // Animations
        this.player.animations.add('left', [0, 1, 2, 3], 10, true)
        this.player.animations.add('right', [5, 6, 7, 8], 10, true)

        // Controlls
        this.cursors = this.game.input.keyboard.createCursorKeys()
    }

    update() {
        let hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms)

        this.player.body.velocity.x = 0
    
        if (this.cursors.left.isDown) //  Move to the left
        {
            this.player.body.velocity.x = -150
            this.player.animations.play('left')
        }
        else if (this.cursors.right.isDown) //  Move to the right
        {
            this.player.body.velocity.x = 150
            this.player.animations.play('right')
        }
        else //  Stand still
        {
            this.player.animations.stop()
            this.player.frame = 4
        }
    
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform)
        {
            this.player.body.velocity.y = -350
        }


    }

}