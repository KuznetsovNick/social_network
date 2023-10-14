let users
let page = 1
let list_size = 10
let selected_user = 1


function fill_table(){
    let list = $(".list").children()
    document.getElementsByClassName("list").item(0).start = (page-1)*list_size+1
    list.attr("start", 10)

    let len = list_size
    if(users.length - (page-1)*list_size < list_size){
        len = users.length - (page-1)*list_size
    }
    for(let i = 0; i < len; i++){
        list.eq(i).css("visibility", "visible")
        list.eq(i).text(`${users[(page-1)*list_size+i]["name"]}`)
    }

    for(let i = len; i < list_size; i++){
        list.eq(i).css("visibility", "hidden")
    }
}

function next_page(){
    if(Math.floor(users.length/(page*list_size)) > 0){
        page++
        fill_table()
    }
}

function prev_page(){
    if(page > 1){
        page--
        fill_table()
    }
}

function user_action(ind){
    ind--
    selected_user = users[(page-1)*list_size+ind]["id"]
    let list = $(".list")
    let info = $(".user_action")
    info.offset({left: list.offset().left, top: list.offset().top})
    info.css("visibility", "visible")
    list.css("display", "none")
    let user = users[(page-1)*list_size+ind]
    $("#name").val(user["name"])
    $("#email").val(user["email"])
    document.getElementById("bd").valueAsDate = new Date(user["bd"])
    $('input[name=role]').attr('checked',false);
    $('input[name=status]').attr('checked',false);
    $(`#${user["role"]}`).attr("checked", "checked")
    $(`#${user["status"]}`).attr("checked", "checked")
}

function close_info(){
    let list = $(".list")
    let info = $(".user_action")
    info.css("visibility", "hidden")
    list.css("display", "flex")
}

function back_to_list(){
    document.location.href = "/"
}

