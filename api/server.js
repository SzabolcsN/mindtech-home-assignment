const express = require("express")
const app = express()
const connectDb = require("./db/connection")
const cors = require("cors")
const { createServer } = require("node:http")
// const { Server } = require("socket.io")

const server = createServer(app);
// const io = new Server(server)

// configure server
const PORT = 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use routes
require("./routes")(app)

// io.on('connection', (socket) => {
//   console.log('a user connected');
// })

// run the api and connect to the DB
server.listen(PORT, function() {
  console.log(`Listening on ${PORT}`)

  connectDb()
    .then(() => {
      console.log("MongoDb connected")
    })
    .catch(err => {
      console.log("Can't connect to the database:", err)
      process.exit()
    })
})
