const express = require("express");
const router = express.Router();
const pug = require("pug")
const path = require('path')

let Manager = require('./js/manager.js');
let manager = new Manager();

router.get("/", (req, res, next) => {
    manager.selected_user = null
    res.sendFile(path.join(__dirname, "./build/html/index.html"))
});

router.post("/update", (req, res) => {
    res.json(manager.send_library())
})

router.post("/save_changes", (req, res) => {
    manager.change_user(req.body)
    res.end()
})

router.get("/friends", (req, res) => {
    if(manager.selected_user) {
        res.sendFile(path.join(__dirname, "./build/html/friends.html"))
    } else{
        res.redirect("/")
    }
})

router.post("/get_friends", (req, res) => {
    res.json(manager.send_library())
})

router.post("/select_user", (req, res) => {
    manager.select_user(req.body)
    res.end()
})

router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});

module.exports = router;