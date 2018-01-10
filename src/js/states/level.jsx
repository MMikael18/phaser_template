
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

        this.add.tileSprite(0, 0, 1500, 1500, 'ground')
        this.world.setBounds(0, 0, 1500, 1500)
        
        this.physics.startSystem(Phaser.Physics.P2JS)
        
        // Player
        //console.log(this.game)
        //console.log(this)
        this.player = new Player({
            game: this.game,
            x: 700, 
            y: 400,
            asset: 'player'
        })
        this.add.existing(this.player)    
        this.camera.follow(this.player)
        
        // UI
        // this.scoreText = this.game.add.text(16, 16, 'score: 0', 
        //                     { fontSize: '32px', fill: '#000' })
        // this.scoreText.fixedToCamera = true


        
        // otherPlayer
        this.otherplayers = this.game.add.group()
        this.add.existing(this.otherplayers)

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
                //console.log("player leaves " + pid)
                //console.log(this.otherplayers.children)
                let remove                
                for (let item of this.otherplayers.children)
                {
                    //console.log(item.pid + " = "+ pid)
                    if(item.pid == pid){
                       // console.log("player leaves find " + pid)                            
                        this.otherplayers.remove(item)
                        break
                    }
                }
                
            },
            playerMove:(player) => {
                for (let item of this.otherplayers.children)
                {
                    if(item.pid == player.id) {
                        item.setTarget(player.x,player.y)
                        break                
                    }
                }
            },    
        })
        
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
        //this.game.physics.arcade.overlap(this.player, this.stars, this._collectStar, null, this)
        
        // collide to player
        //this.game.physics.arcade.collide(this.player, this.platforms)

        let position = (({ x, y }) => ({ x, y }))(this.player)
        this.connect.emitPlayerMove(position)

        // io
        /*
        if(typeof this.lastVelocity !== 'undefined' && this.variable !== null){
            let nowVelocity = this.player.body.velocity.x + this.player.body.velocity.y
            if(nowVelocity != this.lastVelocity)
            {
                
            }
        }
        this.lastVelocity = this.player.body.velocity.x + this.player.body.velocity.y
        */
    }

    render() {
        //this.game.debug.inputInfo(350, 32);
        //this.game.debug.spriteInfo(this.player, 350, 32);
        //this.game.debug.cameraInfo(this.stage.game.camera, 32, 32)
        //this.game.debug.spriteCoords(this.player, 32, 500)
        
        // let zone = this.game.camera.deadzone;

        // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
        // this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    }

    // Removes the star from the screen
    _collectStar (player, star) 
    {        
        star.kill()
        this.score += 10
        this.scoreText.text = 'Score: ' + this.score
    }

}