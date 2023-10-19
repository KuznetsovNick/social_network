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

    add_to_library(body){
        this.update_users()
        body["id"] = this.id
        body["owner"] = null
        body["returnDate"] = null
        this.users.push(body)
        this.write_to_file()
        this.id++
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

    send_news(){
        this.update_users()
        let friends_indexes
        let news = JSON.parse(this.fs.readFileSync('news.json', 'utf8'));
        let send_news = []

        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]["id"] == this.selected_user){
                friends_indexes = this.users[i]["friends"]
            }
        }

        for(let i = 0; i < friends_indexes.length; i++){
            for(let j = 0; j < this.users.length; j++){
                if(this.users[j]["id"] == friends_indexes[i]){
                    for(let k=0; k < news.length; k++){
                        if(this.users[j]["id"] == news[k]["id"]) {
                            send_news.push({
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
}



module.exports = Manager