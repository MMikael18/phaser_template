import io from 'socket.io-client'

export default class Connection extends Phaser.Group  {

    constructor({ game, setclients, addnew, leave }) 
    {
        super(game)
        this.game = game
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
            console.log(this.socket.id)
            // when connection is created emit join-game
            this.socket.emit("join-game", {
                "x": 15,
                "y": 15
            })
        })

        this.socket.on('join-allplayers', (clients) => {
            //console.log("allplayers")
            //console.log(clients) 
            this.setclients(clients)
        })

        this.socket.on('join-newplayer', (msg) => {
            //console.log("newplayer")
            //console.log(msg) 
            this.addnew(msg)
        })
        
        //
        this.socket.on('add-count', (msg) => { 
            this.connectCount = msg
        })

        this.socket.on('user-disconnect', (msg) => {
            //console.log("disconnect")
            //console.log(msg.id)
            this.leave(msg)
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