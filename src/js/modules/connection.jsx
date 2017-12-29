import io from 'socket.io-client'

export default class Connection extends Phaser.Group {

    constructor({ game }) 
    {
        super(game)
        this.game = game

        // UI
        this.connect= 0
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
            this.socket.emit("join-game", {
                "x": 15,
                "y": 15
            })
        })

        this.socket.on('join-newplayer', (msg) => {
            console.log("newplayer")
            console.log(msg) 
        })
        
        this.socket.on('join-allplayers', (msg) => {
            console.log("allplayers")
            console.log(msg) 
        })

        //
        this.socket.on('add-count', (msg) => { 
            this.connect = msg
        })

        this.socket.on('user-disconnect', (msg) => {
            console.log("disconnect")
            console.log(msg.id)
            this.connect = msg.count
        })

    }

    emitPlayerMove()
    {
        console.log('jaska')
    }

    update() 
    {   
        this.connectText.text = this.playerName + ' CC: ' + this.connect
    }

}