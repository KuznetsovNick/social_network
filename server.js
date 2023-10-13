const express = require('express');
const bodyParser = require('body-parser')
const server = express()

server.use(express.urlencoded({extended: true}));
server.use(express.json());
const path = require("path");

const file_upload = require("express-fileupload");
server.use(file_upload());

server.set("view engine", "pug")
const jq = require("jQuery")

const port = 3000

const routes = require("./routes");
server.use(express.static(__dirname));
server.use("/", routes);

server.listen(port);
console.log(`http://localhost:${port}`)
