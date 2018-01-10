import io from 'socket.io-client'

export default class Connection extends Phaser.Group  {

    constructor({ game, join, setclients, addnew, leave, playerMove }) 
    {
        super(game)
        this.game = game

        this.join = join
        this.setclients = setclients
        this.addnew = addnew
        this.leave = leave
        this.playerMove = playerMove

        // UI
        this.connectCount = 0
        this.connectText = this.game.add.text(
            this.game.camera.width - 150, 
            16, 'CC: 0', 
            { 
                font: '13px Verdana',
                fill: 'white',
                align: 'center'
            })
        this.connectText.fixedToCamera = true

        this.socket = io()
        this.socket.on('connect', () => {
            // when connection is created emit join-game
            let position = this.join(this.socket.id)
            this.socket.emit("join-game", {
                "x": position.x,
                "y": position.y
            })
        })

        this.socket.on('join-allplayers', (allPlayers) => {
            this.setclients(allPlayers,this.socket.id)
        })

        this.socket.on('join-newplayer', (player) => {
            this.addnew(player)
        })
        
        //
        this.socket.on('add-count', (count) => { 
            this.connectCount = count
        })

        this.socket.on('user-disconnect', (msg) => {
            this.leave(msg.id)
            this.connect = msg.count
        })

        // ------ GAME ACTIONS -------

        this.socket.on('player-move', (msg) => {            
            this.playerMove(msg)
        })
    }

    emitPlayerMove(position)
    {
        this.socket.emit("player-move", {
            "id": this.socket.id,
            "x": position.x,
            "y": position.y
        })
    }

    update()
    {
        this.connectText.text = this.playerName + ' CC: ' + this.connectCount
    }

}