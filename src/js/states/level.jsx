
import Connection from '../modules/connection'
import Player from '../modules/player'
import OtherPlayer from '../modules/otherPlayer'

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
        this.player = new Player({
            game: this.game,
            x: 32  * (Math.random() * 10) + 1, 
            y: this.game.world.height - 150,
            asset: 'player'
        })
        this.game.stage.addChild(this.player)

        // Stars
        // this.stars = this.game.add.group()
        // this.stars.enableBody = true
    
        // //  Here we'll create 12 of them evenly spaced apart
        // for (var i = 0; i < 12; i++)
        // {   //  Create a star inside of the 'stars' group
        //     let star = this.stars.create(i * 70, 0, 'star')
        //         star.body.gravity.y = 60
        //         //star.body.bounce.y = 0.7 + Math.random() * 0.2
        //         star.body.bounce.y = 0.7
        // }        

        // UI
        this.scoreText = this.game.add.text(16, 16, 'score: 0', 
                            { fontSize: '32px', fill: '#000' })



        // otherPlayer
        this.otherplayers = this.game.add.group()
        this.game.stage.addChild(this.otherplayers)

        // socket io connector
        this.connect = new Connection({
            game: this.game,
            join: (pid) => {
                console.log("join " + pid)
                return (({ x, y }) => ({ x, y }))(this.player)
            },
            setclients: (allPlayers, sid) =>{
                //console.log("clients")
                console.log(allPlayers)
                for (let player of allPlayers)
                {
                    //console.log(player.id + " x " + sid)
                    if(player.id != sid)
                    {
                        this._addNewPlayer(player.x, player.y, player.id)  
                    }
                }
                
            },
            addnew: (player) => {
                console.log("add new player " + player.id)                
                this._addNewPlayer(player.x, player.y, player.id)
                console.log(this.otherplayers.children)
            },
            leave: (pid) => {
                console.log("player leaves " + pid)
                //console.log(this.otherplayers.children)
                let remove                
                for (let item of this.otherplayers.children)
                {
                    //console.log(item.pid + " = "+ pid)
                    if(item.pid == pid){
                        console.log("player leaves find " + pid)                            
                        //remove = item
                        this.otherplayers.remove(item)
                    }
                }
                
            },
            
        })

        /*
        for (var i = 0; i < 3; i++)
        {
            this._addNewPlayer(i * 32, this.game.world.height - 150)        
        }
        this.game.stage.addChild(this.otherplayers)
        
        */

    }

    _addNewPlayer(x,y,id)
    {
        let oP = new OtherPlayer({
            game: this.game,
            x: x, 
            y: y,
            asset: 'player',
            pid: id
        })        
        this.otherplayers.add(oP)
    }



    update() 
    {

        // collide to starts
        //this.game.physics.arcade.collide(this.stars, this.platforms)
        this.game.physics.arcade.overlap(this.player, this.stars, this._collectStar, null, this)
        
        // collide to player
        this.game.physics.arcade.collide(this.player, this.platforms)

        // io
        if(typeof this.lastVelocity !== 'undefined' && this.variable !== null){
            let nowVelocity = this.player.body.velocity.x + this.player.body.velocity.y
            if(nowVelocity != this.lastVelocity)
            {
                //this.connect.emitPlayerMove()
            }
        }
        this.lastVelocity = this.player.body.velocity.x + this.player.body.velocity.y
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
