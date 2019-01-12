const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000
 
var messages = []

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
    console.log(`Request Made! ${messages.length}`)
})

app.get('/messages', (req, res) => {
    res.send(messages)
    console.log("Messages Served.")
})

app.post('/send', (req, res) => {
    messages.push(req.body.text)
    console.log("Message Pushed.")
    res.end()
})

io.on('connection', (socket) => {
    console.log("Socket Connection Made.")
    socket.on('message', () => {
        io.sockets.emit('message')
    })
})

io.on('disconnect', (socket) => {
    console.log("Socket disconnected.")
})


http.listen(port, () => console.log(`Listening on port ${port}.`))