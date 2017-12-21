import io from 'socket.io-client'

export default class Connection extends Phaser.Group {


    constructor({ game }) {
        super(game)
        this.game = game

//      const socket = io()
//      socket.emit('chat message', "client")        

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

            //this.add(this.connectText)


        const socket = io()
        
        socket.emit('connectCount', "client 1")        
        socket.on('connectCount', (msg) => {
            this.connect = msg
            console.log(msg)
        })
        
    }

    update() 
    {   
        //console.log(this.connectText.text)
        //this.connect += 1        
        this.connectText.text = 'connections: ' + this.connect
    }

}
;