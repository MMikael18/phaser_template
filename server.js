const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

let allClients = []

io.on('connection', (socket) => {

    // Count connections and keep track them
    //allClients.push(socket.id)

    socket.on('join-game', (msg) => {
        // add new client to array
        allClients.push({
            "id": socket.id,
            "x": msg.x,
            "y": msg.y
        })
         // emit allplayer array to new player only
         io.sockets.connected[socket.id].emit( 
            "join-allplayers",allClients
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
        io.emit('add-count', allClients.length)
    })

    socket.on('disconnect', () => {
        let i = allClients.indexOf(socket.id)
        allClients.splice(i, 1)
        io.emit('user-disconnect', {
            "id": socket.id,
            "count": allClients.length
        })
    })

})

http.listen(3000, () => {
  console.log('listening on *:3000')
})