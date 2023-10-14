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
    sendRequest("POST", "/update")
        .then(res => res.json())
        .then(json => {
            page = 1
            users = JSON.parse(json)
            fill_table()
        })
}

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
    sendRequest("POST", "/save_changes", data)
        .then(res => {
            alert("Redacted successfully")
        })
}
