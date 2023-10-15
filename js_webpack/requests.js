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

window.sendRequest = sendRequest

function open_friends(){
    window.sendRequest("POST", "/select_user", {selected_user: selected_user})
    document.location.href = "/friends"
}
window.open_friends = open_friends


function update_list(){
    window.sendRequest("POST", "/update")
        .then(res => res.json())
        .then(json => {
            page = 1
            users = JSON.parse(json)
            window.fill_table()
        })
}
window.update_list = update_list


function save_changes(){
    console.log()
    console.log()
    let data = {
        id: selected_user,
        name: $("#name").val(),
        bd: $("#bd").val(),
        email: $("#email").val(),
        role: $("input[name=role]:checked").val(),
        status: $("input[name=status]:checked").val(),
    }
    window.sendRequest("POST", "/save_changes", data)
        .then(res => res.json())
        .then(json => {
            alert("Redacted successfully")
            users = JSON.parse(json)
            window.fill_table()
        })
}
window.save_changes = save_changes

function open_news(){
    window.sendRequest("POST", "/select_user", {selected_user: selected_user})
    document.location.href = "/news_page"
}
window.open_news = open_news

function get_news(){
    window.sendRequest("GET", "/send_news")
        .then(res => res.json())
        .then(json => show_news(JSON.parse(json)))
}
window.get_news = get_news