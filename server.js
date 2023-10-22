const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs');
const cors = require('cors')
const corsOptions = {
    'credentials': true,
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

app.use(cors(corsOptions))

const port = 8443;
httpsOptions = {
    key: fs.readFileSync('./certs/open.key', 'utf8'),
    cert: fs.readFileSync('./certs/privat.csr', 'utf8')
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
const path = require("path");

const file_upload = require("express-fileupload");
app.use(file_upload());

app.set("view engine", "pug")

const routes = require("./routes");
const {createServer} = require("https");
app.use(express.static(__dirname));
app.use("/", routes);

let server = createServer(httpsOptions, app)

let socket = require("socket.io")
let socket_io = socket(server, {
    cors: {
        origin: "*",
        methods: "*"
    }
})

require('events').EventEmitter.prototype._maxListeners = 150;
socket_io.on("connection", (socket) => {
    for(let i = 0; i < 30; i++){
        for(let j = 0; j < 30; j++){
            socket.on(`${i}-${j}`, (data) => {
                socket_io.sockets.emit(`${i}-${j}`, data)
                work_with_message(`${i}-${j}`, data)
            })
        }
    }

    for(let i = 0; i < 30; i++){
        socket.on(`${i}`, (data) => {
            socket_io.sockets.emit(`${i}`, data)
            work_with_news(data)
        })
    }
})

function work_with_message(chanel, data){
    let chats = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
    for(let i = 0; i < chats.length; i++){
        if(chanel == chats[i].chanel){
            chats[i].messages.push(data)
        }
    }
    fs.writeFileSync("messages.json", JSON.stringify(chats))
}

function work_with_news(data){
    let news = JSON.parse(fs.readFileSync('news.json', 'utf8'));
    for(let i = 0; i < news.length; i++){
        if(data.id == news[i]["id"]){
            news[i].posts.push(data.news)
        }
    }
    fs.writeFileSync("news.json", JSON.stringify(news))
}



server.listen(port);
console.log(`https://localhost:${port}`)
