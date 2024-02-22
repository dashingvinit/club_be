const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const {Server} = require('socket.io'); // Import the socket.io library
const http = require('http');
const PORT = process.env.PORT || 5000;
require('./db/db'); 
const clubRouter = require('./Router/Club/club'); // Assuming these are Express routers
const adminRouter = require('./Router/Admin/Admin');
const djRouter = require('./Router/DJ/DJ');
const djPortal = require('./Router/DJ/DJPortal') 
const otpRouter = require('./Router/Otp/Otp');
const paymentRouter = require('./Router/Payments/PaymentRouter')
const userRouter = require('./Router/User/User')
const waitPayRouter = require('./Router/Payments/PaymentWaiting')
const clubPay = require('./Router/Payments/ClubPay')
const feedRouter = require('./Router/Admin/Feed')
let app = express();
app.use(express.json());
app.use(cors());
// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Enable CORS for all routes
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Mount the routers
app.use('/club', clubRouter);
app.use('/admin', adminRouter);
app.use('/otpservices', adminRouter);
app.use('/dj',djRouter);
app.use('/djportal',djPortal);
app.use('/otp',otpRouter);
app.use('/pay',paymentRouter);
app.use('/user',userRouter);
app.use('/user',userRouter);
app.use('/waitpay',waitPayRouter);

//our db payment routers 
app.use('/clubpay',clubPay);
app.use('/feed',feedRouter);


// const server = http.createServer(app);

// // Initialize socket.io
// const io = new Server({
//   cors: {
//     origin: "http://localhost:5000"
//   }
// });

// WebSocket server event handling
// io.on('connection', (socket) => {
//   console.log('WebSocket client connected');

//   // Handle WebSocket messages from clients
//   socket.on('message', (message) => {
//     console.log(`Received WebSocket message: ${message}`);

//     // Broadcast the message to all connected clients
//     io.emit('message', message);
//   });

//   // Handle WebSocket disconnect event
//   socket.on('disconnect', () => {
//     console.log('WebSocket client disconnected');
//   });
// });
app.get('/',(req,res)=>{
  res.send('Hello to ClubNights_DEVS')
})
app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`);
});
