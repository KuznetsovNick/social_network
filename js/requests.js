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

function open_friends(){
    sendRequest("POST", "/select_user", {selected_user: selected_user})
    document.location.href = "/friends"
}


function update_list(){
    sendRequest("GET", "/update")
        .then(res => res.json())
        .then(json => {
            page = 1
            users = json
            fill_table()
        })
}

function update_friends(){
    sendRequest("GET", "/update_friends")
        .then(res => res.json())
        .then(json => {
            page = 1
            users = json
            fill_table()
        })
}

function save_changes(){
    let data = {
        id: selected_user,
        name: $("#name").val(),
        bd: $("#bd").val(),
        email: $("#email").val(),
        role: $("input[name=role]:checked").val(),
        status: $("input[name=status]:checked").val(),
    }
    sendRequest("POST", "/save_changes", data)
        .then(res => res.json())
        .then(json => {
            users = json
            fill_table()
        })
    close_info()
}


function open_news(){
    sendRequest("POST", "/select_user", {selected_user: selected_user})
    document.location.href = "/news_page"
}

function get_news(){
    sendRequest("POST", "/send_news")
        .then(res => res.json())
        .then(json => show_news(json))
}