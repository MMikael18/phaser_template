
import Connection from '../modules/connection'

export default class Level extends Phaser.State {

    init(test) 
    {   
        this.score = 0
        this.scoreText
    }

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
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'player')
        this.game.physics.arcade.enable(this.player)

        this.player.body.bounce.y = 0.05
        this.player.body.gravity.y = 300
        this.player.body.collideWorldBounds = true

        // Animations
        this.player.animations.add('left', [0, 1, 2, 3], 10, true)
        this.player.animations.add('right', [5, 6, 7, 8], 10, true)

        // Controlls
        this.cursors = this.game.input.keyboard.createCursorKeys()

        // Stars
        this.stars = this.game.add.group()
        this.stars.enableBody = true
    
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            let star = this.stars.create(i * 70, 0, 'star')
                //  Let gravity do its thing
                star.body.gravity.y = 60
                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.2
        }        

        // UI
        this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

        // socket io connector
        this.connect = new Connection({
            game: this.game            
        })
    }

    update() 
    {
        // collide to starts
        this.game.physics.arcade.collide(this.stars, this.platforms)
        this.game.physics.arcade.overlap(this.player, this.stars, this._collectStar, null, this)
        
        // collide to player
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

    // Removes the star from the screen
    _collectStar (player, star) 
    {        
        star.kill()
        this.score += 10
        this.scoreText.text = 'Score: ' + this.score
    }

}
//console.log(`${Level}`)