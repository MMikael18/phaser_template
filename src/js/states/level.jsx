
import gen from 'random-seed'
import config from '../utils/config'

import Connection  from '../modules/connection'
import Player      from '../modules/player'
import OtherPlayer from '../modules/otherPlayer'

import Monster      from '../modules/monster'

import Bullets     from '../modules/bullets'

export default class Level extends Phaser.State {

    init(test) 
    {   
        this.score = 0
        this.scoreText

        this.gameWidth = 1920 * 2
        this.gameHeight = 1080
    }


    createGround(){
        var seed = 'My Secret String Value'
        var rand = gen.create(seed)

        let size = 32 * config.scale
        let vert = parseInt(this.gameWidth / size)
        let hort = parseInt(this.gameHeight / size)

        for (let x = 0; x < vert; x++) { 
            let xp = parseInt(x) * size
            for (let y = 0; y < hort; y++) {
                let x = this.add.sprite(xp, y * size, 'ground')
                x.scale.setTo(config.scale);

                let r = Math.floor(rand(10));
                x.frame = r > 3 ? 3 : r;
            }
        }
    }

    create()
    {
        // Create world
        this.createGround()   
        this.world.setBounds(0, 0, this.gameWidth, this.gameHeight)
        

        // create monster TEST
        
        this.monster = new Monster({
            game: this.game,
            x: this.gameWidth / 2, 
            y: this.gameHeight / 2,
            asset: 'monster'
        })
        this.add.existing(this.monster) 

        // Bullets pool
        this.bullets = new Bullets({
            game: this.game
        })
        
        // Player
        this.player = new Player({
            game: this.game,
            x: this.gameWidth / 2, 
            y: this.gameHeight / 2,
            asset: 'player'
        })
        this.add.existing(this.player)    
        this.camera.follow(this.player)
        
        // OtherPlayer
        this.otherplayers = this.game.add.group()
        this.add.existing(this.otherplayers)

        // Socket io connector
        this.connect = new Connection({
            game: this.game,
            join: (pid) => {
                return (({ x, y }) => ({ x, y }))(this.player)
            },
            setclients: (allPlayers, sid) =>{
                for (let player of allPlayers)
                {
                    if(player.id != sid)
                    {
                        this._addNewPlayer(player.x, player.y, player.id)  
                    }
                }
                
            },
            addnew: (player) => {             
                this._addNewPlayer(player.x, player.y, player.id)
            },
            leave: (pid) => {
                let remove                
                for (let item of this.otherplayers.children)
                {
                    if(item.pid == pid){                           
                        this.otherplayers.remove(item)
                        break
                    }
                }
                
            },
            playerMove:(player) => {
                for (let item of this.otherplayers.children)
                {
                    if(item.pid == player.id) {
                        item.moveTo(player.x,player.y)
                        break
                    }
                }
            },    
        })
        
    }

    update() 
    {

        // collide to starts
        //this.game.physics.arcade.collide(this.stars, this.platforms)
        //this.game.physics.arcade.overlap(this.player, this.stars, this._collectStar, null, this)
        
        // collide to player
        //this.game.physics.arcade.collide(this.player, this.platforms)
        this.player.fire((e) => {
            if(e.lookDirection == "RIGHT"){
                this.bullets.addToWold(e.x, e.y, 500, 0)
            }else{
                this.bullets.addToWold(e.x, e.y, -500, 0)
            }            
        })
        

        this.player.moving((e) => {
            let position = (({ x, y }) => ({ x, y }))(e)
            this.connect.emitPlayerMove(position)
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

    // Removes the star from the screen
    _collectStar (player, star) 
    {        
        star.kill()
        this.score += 10
        this.scoreText.text = 'Score: ' + this.score
    }

    render() {
        //this.game.debug.inputInfo(350, 32);
        //this.game.debug.spriteInfo(this.player, 350, 32);
        //this.game.debug.cameraInfo(this.stage.game.camera, 32, 32)
        this.game.debug.spriteCoords(this.player, 32,  Number(this.game.camera.height) - 150)

        // let zone = this.game.camera.deadzone;
        // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
        // this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    }
    
    
}


// UI
// this.scoreText = this.game.add.text(16, 16, 'score: 0', 
//                     { fontSize: '32px', fill: '#000' })
// this.scoreText.fixedToCamera = true