const express = require("express");
const router = express.Router();
const pug = require("pug")
const path = require('path')

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./build/html/index.html"))
    //res.send(pug.compileFile("start.pug", null)())
    //res.sendFile(path.join(__dirname, "book.html"))
});

router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});

module.exports = router;