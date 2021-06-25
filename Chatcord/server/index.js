const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const moment = require('moment');

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { Chat } = require("./models/Chat");
const { auth } = require("./middleware/auth");

app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/channels', require('./routes/channels'));


const multer = require("multer");
const fs = require("fs");
const { json } = require("body-parser");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
})
 
var upload = multer({ storage: storage }).single("file")

app.post("/api/chat/uploadfiles", auth ,(req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ success: false, err })
    }
    return res.json({ success: true, url: res.req.file.path });
  })
});

io.on("connection", socket => {
  socket.join("General");

  socket.on('joinRoom', ({user, room}) =>{
    socket.join(room)

    socket.to(msg.channel).broadcast.emit("Output Chat Message", formatMessage(Chatbot, `${user.name} has joined the chat`));
    socket.emit('Output Chat Message', formatMessage(Chatbot, `Welcome to ${room}!`));

    io.to(room).emit('roomUsers', {
      room: room,
      users: getRoomUsers(room)
    });
  })
  
  socket.on("Input Chat Message", msg => {
    connect.then(db => {
      try {
          let chat = new Chat({ message: msg.chatMessage, sender:msg.userId, type: msg.type, channel: msg.channel })

          chat.save((err, doc) => {
            console.log(doc)
            if(err) return res.json({ success: false, err })

            Chat.find({ "_id": doc._id })
            .populate("sender")
            .populate("channel")
            .exec((err, doc)=> {

                return io.to(msg.channel).emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
    })
   })

   socket.on("Input Private Message", msg =>{
    io.to(msg.receiverId).emit("Output Chat Message", formatMessage(msg.userId, msg.chatMessage))
   })

   socket.on('disconnect', ({user, room}) => {
    if (user) {
      io.to(room).emit(
        'Output Chat Message',
        formatMessage(`${user.name} has left the chat`)
      );

      io.to(room).emit('roomUsers', {
        room: room,
        users: getRoomUsers(room)
      });
    }
  });
})


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});

function formatMessage(name, text) {
  return json({
    message:text,
    sende:{name: name,
      image:"http://gravatar.com/avatar/1610987122?d=identicon"},
    time: moment().format('h:mm a')
  }) 
}