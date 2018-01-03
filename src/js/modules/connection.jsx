import io from 'socket.io-client'

export default class Connection extends Phaser.Group  {

    constructor({ game, join, setclients, addnew, leave }) 
    {
        super(game)
        this.game = game

        this.join = join
        this.setclients = setclients
        this.addnew = addnew
        this.leave = leave

        // UI
        this.connectCount = 0
        this.connectText = this.game.add.text(
            this.game.world.width - 150, 
            16, 'CC: 0', 
            { 
                font: '13px Verdana',
                fill: 'white',
                align: 'center'
            })

        this.socket = io()
        this.socket.on('connect', () => {
            //console.log(this.socket.id)
            //this.id = this.socket.id
            // when connection is created emit join-game
            let position = this.join(this.socket.id)
            this.socket.emit("join-game", {
                "x": position.x,
                "y": position.y
            })
            //console.log()
        })

        this.socket.on('join-allplayers', (allPlayers) => {
            //console.log("allplayers")
            //console.log(clients) 
            this.setclients(allPlayers,this.socket.id)
        })

        this.socket.on('join-newplayer', (player) => {
            //console.log("newplayer")
            //console.log(msg) 
            this.addnew(player)
        })
        
        //
        this.socket.on('add-count', (count) => { 
            this.connectCount = count
        })

        this.socket.on('user-disconnect', (msg) => {
            //console.log("disconnect")
            //console.log(msg.id)
            this.leave(msg.id)
            this.connect = msg.count
        })

    }

    emitPlayerMove()
    {
        console.log('jaska')
    }

    update() 
    {   
        //console.log('update')
        this.connectText.text = this.playerName + ' CC: ' + this.connectCount
    }

}