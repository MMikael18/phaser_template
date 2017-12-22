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
            16, 
            'Connections: 0', 
            { 
                font: '13px Verdana',
                fill: 'white',
                align: 'center'
            })

        const socket = io()        
        socket.emit('connectCount', "client connecting")
 //       socket.emit('jaska', "client connecting")
        socket.on('connectCount', (msg) => {
            this.connect = msg
            console.log(msg)
        })

    }

    update() 
    {   
        this.connectText.text = 'connections: ' + this.connect
    }

}