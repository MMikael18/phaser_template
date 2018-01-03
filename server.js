const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

let allPlayers = []

io.on('connection', (socket) => {

    // Count connections and keep track them
    //allClients.push(socket.id)

    socket.on('disconnect', () => {
        
        let item = allPlayers.find((a) => {
            return a.id == socket.id
        })
        let i = allPlayers.indexOf(item)
        allPlayers.splice(i, 1)
        io.emit('user-disconnect', {
            "id": socket.id,
            "count": allPlayers.length
        })
    })

    socket.on('join-game', (msg) => {        
        // add new client to array
        allPlayers.push({
            "id": socket.id,
            "x": msg.x,
            "y": msg.y
        })

        // emit allplayer array to new player only
        io.sockets.connected[socket.id].emit( 
            "join-allplayers", allPlayers
        )

        // emit a new player to other cliends
        socket.broadcast.emit( 
            'join-newplayer', {
                "id": socket.id,
                "x": msg.x,
                "y": msg.y
            }
        )
        
        // emit client numper to all clients
        io.emit('add-count', allPlayers.length)

    })



})

http.listen(3000, () => {
  console.log('listening on *:3000')
})