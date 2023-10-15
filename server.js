const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs');

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

server.listen(port);
console.log(`https://localhost:${port}`)
