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
    allClients.push(socket)    
    socket.on('connectCount', (msg) => {
        io.emit('connectCount', allClients.length)
    })

/*
    socket.on('jaska', (msg) => {
        console.log("jaska")
    })
*/

    socket.on('disconnect', () => {
        let i = allClients.indexOf(socket)
        allClients.splice(i, 1)
        io.emit('connectCount', allClients.length)
    })

})

http.listen(3000, () => {
  console.log('listening on *:3000')
})