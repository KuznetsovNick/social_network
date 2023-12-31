const path = require("path");
const fs = require("fs");

class Manager{
    fs = require("fs")
    users
    id
    selected_user = null
    constructor() {
        this.update_users()
        this.id = 0
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] >= this.id){
                this.id = this.users[i]["id"] + 1
            }
        }
    }

    update_users(){
        this.users = JSON.parse(this.fs.readFileSync('users.json', 'utf8'));
    }
    write_to_file(){
        this.fs.writeFileSync("users.json", JSON.stringify(this.users))
    }

    add_user(body){
        console.log(body)
        this.update_users()
        body["id"] = this.id
        body["role"] = "user"
        body["status"] = "active"
        body["img"] = false
        this.users.push(body)
        this.write_to_file()
        this.id++
        return({id: this.id-1})
    }

    delete_from_library(body){
        this.update_users()
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == body["id"]){
                this.users.splice(i, 1)
            }
        }
        this.write_to_file()
    }

    send_friends(user = this.selected_user){
        let friends_indexes
        let friends = []

        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == user){
                friends_indexes = this.users[i]["friends"]
            }
        }

        for(let i = 0; i < friends_indexes.length; i++){
            for(let j = 0; j < this.users.length; j++){
                if(this.users[j]["id"] == friends_indexes[i]){
                    friends.push(this.users[j])
                }
            }
        }

        return friends
    }

    send_library(){
        this.update_users()
        return this.users
    }

    send_news(user = this.selected_user){
        this.update_users()
        let friends_indexes
        let news = JSON.parse(this.fs.readFileSync('news.json', 'utf8'));
        let send_news = []

        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == user){
                friends_indexes = this.users[i]["friends"]
            }
        }

        for(let i=0; i< news.length; i++){
            if (news[i]["id"] == user){
                for(let j =0; j < this.users.length; j++){
                    if (news[i]["id"] == this.users[j]["id"]){
                        send_news.push({
                            id: this.users[j]["id"],
                            name: this.users[j]["name"],
                            posts: news[i]["posts"]
                        })
                    }
                }
            }
        }

        for(let i = 0; i < friends_indexes.length; i++){
            for(let j = 0; j < this.users.length; j++){
                if(this.users[j]["id"] == friends_indexes[i]){
                    for(let k=0; k < news.length; k++){
                        if(this.users[j]["id"] == news[k]["id"]) {
                            send_news.push({
                                id: this.users[j]["id"],
                                name: this.users[j]["name"],
                                posts: news[k]["posts"]
                            })
                        }
                    }
                }
            }
        }

        return send_news
    }

    add_new(user = this.selected_user){

    }

    select_user(body){
        this.selected_user = body["selected_user"]
    }

    change_user(body){
        this.update_users()
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == body["id"]){
                this.users[i]["name"] = body["name"]
                this.users[i]["email"] = body["email"]
                this.users[i]["bd"] = body["bd"]
                this.users[i]["role"] = body["role"]
                this.users[i]["status"] = body["status"]
            }
        }
        this.write_to_file()
    }

    send_user(body){
        this.update_users()
        let data = null
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == body.id){
                data = this.users[i]
            }
        }
        return data
    }

    send_image(body){
        this.update_users()
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == body.id){
                if(this.users[i]["img"]){
                    return path.join(__dirname + `/../img/${body.id}.png`)
                } else{
                    return path.join(__dirname + `/../img/default.png`)
                }
            }
        }
    }

    send_chat(body){
        let chats = JSON.parse(this.fs.readFileSync('messages.json', 'utf8'));
        let chat
        let found = false
        for(let i = 0; i < chats.length; i++){
            if(body.chanel == chats[i]["chanel"]){
                chat = chats[i]
                found = true
            }
        }
        if(!found){
            chat = {
                chanel: body.chanel,
                messages: []
            }
            chats.push(chat)
            this.fs.writeFileSync("messages.json", JSON.stringify(chats))
        }
        return chat
    }

    delete_img(body){
        this.update_users()
        for(let i = 0; i < this.users.length; i++){
            if(body.id == this.users[i]["id"]){
                this.users[i]["img"] = false
            }
        }
        this.write_to_file()
    }

}



module.exports = Manager