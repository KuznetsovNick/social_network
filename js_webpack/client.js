let users
let page = 1
let list_size = 10
let selected_user = 1

window.users = users
window.page = page
window.list_size = list_size
window.selected_user = selected_user


function fill_table(){
    let list = $(".list").children()
    document.getElementsByClassName("list").item(0).start = (window.page-1)*window.list_size+1
    list.attr("start", 10)

    let len = window.list_size
    if(window.users.length - (window.page-1)*window.list_size < window.list_size){
        len = window.users.length - (window.page-1)*window.list_size
    }
    for(let i = 0; i < len; i++){
        list.eq(i).css("visibility", "visible")
        list.eq(i).text(`${window.users[(window.page-1)*window.list_size+i]["name"]}`)
    }

    for(let i = len; i < window.list_size; i++){
        list.eq(i).css("visibility", "hidden")
    }
}

window.fill_table = fill_table

function next_page(){
    if(Math.floor(window.users.length/(window.page*window.list_size)) > 0){
        window.page++
        fill_table()
    }
}
window.next_page = next_page
function prev_page(){
    if(window.page > 1){
        window.page--
        fill_table()
    }
}

window.prev_page = prev_page

function user_action(ind){
    ind--
    window.selected_user = window.users[(window.page-1)*window.list_size+ind]["id"]
    let list = $(".list")
    let info = $(".user_action")
    info.offset({left: list.offset().left, top: list.offset().top})
    info.css("visibility", "visible")
    list.css("display", "none")
    let user = window.users[(window.page-1)*window.list_size+ind]
    $("#name").val(user["name"])
    $("#email").val(user["email"])
    document.getElementById("bd").valueAsDate = new Date(user["bd"])
    $('input[name=role]').attr('checked',false);
    $('input[name=status]').attr('checked',false);
    $(`#${user["role"]}`).attr("checked", "checked")
    $(`#${user["status"]}`).attr("checked", "checked")

    $("#next").css("visibility", "hidden")
    $("#prev").css("visibility", "hidden")

    rotation(document.getElementsByClassName("user_action").item(0), -180, 0)
    opac(document.getElementsByClassName("user_action").item(0), 0, 1)
    opac(document.getElementsByClassName("list").item(0), 1, 0)
}
window.user_action = user_action

function close_info(){
    let list = $(".list")
    let info = $(".user_action")
    rotation(document.getElementsByClassName("user_action").item(0), 0, 180)
    opac(document.getElementsByClassName("user_action").item(0), 1, 0)
    setTimeout(() => {
        info.css("visibility", "hidden")
        list.css("display", "flex")
        opac(document.getElementsByClassName("list").item(0), 0, 1)
        $("#next").css("visibility", "visible")
        $("#prev").css("visibility", "visible")
    }, 500)
}

window.close_info = close_info

function back_to_list(){
    document.location.href = "/"
    $("#next").css("visibility", "visible")
    $("#prev").css("visibility", "visible")
}
window.back_to_list = back_to_list
function show_news(data){
    for(let i = 0; i < data.length; i++){
        $("<h3 />", { text: data[i]["name"] }).appendTo(".news");
        for(let j = 0; j < data[i]["posts"].length; j++){
            $("<p />", { text: data[i]["posts"][j] }).appendTo(".news");
        }
    }
}

window.show_news = show_news

function rotation(div, start, finish){
    div.animate([
        { transform: `rotateY(${start}deg)` },
        { transform: `rotateY(${finish}deg)` }
    ], {
        // sync options
        duration: 500,
        iterations: 1
    })
}
window.rotation = rotation

function opac(div, start, finish){
    div.animate([
        { opacity: `${start}` },
        { opacity: `${finish}` }
    ], {
        // sync options
        duration: 500,
        iterations: 1
    })
}
window.opac = opac
