
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

// connectDB();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/claim-game").then(db=>{
    console.log("mongodb connected successful")
}).catch(e=>{
    console.log("not connected",e)
})


const userRoutes = require('./routes/userRoutes')(io);
app.use('/api', userRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
