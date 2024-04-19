const express = require('express')
const app = express()
const port = 4000 
const http =  require('http')
const {Server} =  require("socket.io")
const cors = require('cors')


app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = http.createServer(app)


const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`Socket connection established on ${socket.id}`)

    socket.on("send_message", (data)=>{
        console.log(data);
        socket.broadcast.emit("recieve",data)
    })
})


server.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})   

