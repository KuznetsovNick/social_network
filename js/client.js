let users
let page = 1
let list_size = 10
let selected_user
function sendRequest(type, URL, data=null) {
    if(data){
        data = JSON.stringify(data)
    }

    return fetch(
        URL,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: type,
            body: data,
        })
}

function fill_table(){
    let list = $("#list").children()

    let len = list_size
    if(users.length - (page-1)*list_size < list_size){
        len = users.length - (page-1)*list_size
    }
    console.log(len)
    for(let i = 0; i < len; i++){
        list.eq(i).css("visibility", "visible")
        list.eq(i).text(`${users[(page-1)*list_size+i]["name"]}`)
    }

    for(let i = len; i < list_size; i++){
        list.eq(i).css("visibility", "hidden")
    }
}

function update_list(){
    sendRequest("POST", "/update")
        .then(res => res.json())
        .then(json => {
            page = 1
            users = JSON.parse(json)
            fill_table()
        })
}

function user_action(ind){
    ind--
    selected_user = ind
    let list = $("#list")
    let info = $("#user_action")
    info.offset({left: list.offset().left, top: list.offset().top})
    info.css("visibility", "visible")
    for(let i = 0; i < list_size; i++){
        list.children.eq(i).css("visibility", "hidden")
    }
}

function open_friends(){
    sendRequest("POST", "/list/update")
        .then(res => res.json())
        .then(json => {
            page = 1
            users = JSON.parse(json)
            fill_table()
        })
}

