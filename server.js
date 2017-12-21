const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html') // __dirname + 
})
//console.log(__dirname);


let allClients = []

io.on('connection', (socket) => {
    
    // Count connections and keep track them
    allClients.push(socket)    
    socket.on('connectCount', (msg) => {
        io.emit('connectCount', allClients.length)
    })
    
    socket.on('disconnect', function() {
        let i = allClients.indexOf(socket)
        allClients.splice(i, 1)
        io.emit('connectCount', allClients.length)
    })

})


http.listen(3000, function(){
  console.log('listening on *:3000')
})