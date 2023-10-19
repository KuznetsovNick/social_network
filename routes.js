const express = require("express");
const router = express.Router();
const pug = require("pug")
const path = require('path')

let dir = "./build"
//let dir = "./dist"

let Manager = require(`${"./build"}/js/manager.js`);
let manager = new Manager();

router.get("/", (req, res, next) => {
    manager.selected_user = null
    res.sendFile(path.join(__dirname, `${dir}/html/index.html`))
});

router.get("/update", (req, res) => {
    res.json(manager.send_library())
})

router.post("/get_friends", (req, res) => {
    res.json(manager.send_friends(req.body.id))
})

router.post("/save_changes", (req, res) => {
    manager.change_user(req.body)
    res.json(manager.send_library())
})

router.get("/friends", (req, res) => {
    if(manager.selected_user) {
        res.sendFile(path.join(__dirname, `${dir}/html/friends.html`))
    } else{
        res.redirect("/")
    }
})

router.post("/select_user", (req, res) => {
    manager.select_user(req.body)
    res.end()
})

router.post("/get_user", (req, res) => {
    res.json(manager.send_user(req.body))
})

router.get("/news_page", (req, res) => {
    if(manager.selected_user) {
        res.sendFile(path.join(__dirname, `${dir}/html/news.html`))
    } else{
        res.redirect("/")
    }
})

router.get("/send_news", (req, res) => {
    res.json(manager.send_news())
})

router.get("*", (req, res)=>{
    res.status(404);
    res.end("Page not found");
});

module.exports = router;