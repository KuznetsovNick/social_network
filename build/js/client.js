"use strict";

var users;
var page = 1;
var list_size = 10;
var selected_user = 1;
function fill_table() {
  var list = $(".list").children();
  document.getElementsByClassName("list").item(0).start = (page - 1) * list_size + 1;
  list.attr("start", 10);
  var len = list_size;
  if (users.length - (page - 1) * list_size < list_size) {
    len = users.length - (page - 1) * list_size;
  }
  for (var i = 0; i < len; i++) {
    list.eq(i).css("visibility", "visible");
    list.eq(i).text("".concat(users[(page - 1) * list_size + i]["name"]));
  }
  for (var _i = len; _i < list_size; _i++) {
    list.eq(_i).css("visibility", "hidden");
  }
}
function next_page() {
  if (Math.floor(users.length / (page * list_size)) > 0) {
    page++;
    fill_table();
  }
}
function prev_page() {
  if (page > 1) {
    page--;
    fill_table();
  }
}
function user_action(ind) {
  ind--;
  selected_user = users[(page - 1) * list_size + ind]["id"];
  $("#img").attr("src", "./img/".concat(selected_user, ".png"));
  var list = $(".list");
  var info = $(".user_action");
  info.offset({
    left: list.offset().left,
    top: list.offset().top
  });
  info.css("visibility", "visible");
  list.css("display", "none");
  var user = users[(page - 1) * list_size + ind];
  $("#name").val(user["name"]);
  $("#email").val(user["email"]);
  document.getElementById("bd").valueAsDate = new Date(user["bd"]);
  $('input[name=role]').attr('checked', false);
  $('input[name=status]').attr('checked', false);
  $("#".concat(user["role"])).attr("checked", "checked");
  $("#".concat(user["status"])).attr("checked", "checked");
  $("#next").css("visibility", "hidden");
  $("#prev").css("visibility", "hidden");
  rotation(document.getElementsByClassName("user_action").item(0), -180, 0);
  opac(document.getElementsByClassName("user_action").item(0), 0, 1);
  opac(document.getElementsByClassName("list").item(0), 1, 0);
}
function close_info() {
  var list = $(".list");
  var info = $(".user_action");
  rotation(document.getElementsByClassName("user_action").item(0), 0, 180);
  opac(document.getElementsByClassName("user_action").item(0), 1, 0);
  setTimeout(function () {
    info.css("visibility", "hidden");
    list.css("display", "flex");
    opac(document.getElementsByClassName("list").item(0), 0, 1);
    $("#next").css("visibility", "visible");
    $("#prev").css("visibility", "visible");
  }, 500);
}
function back_to_list() {
  document.location.href = "/";
  $("#next").css("visibility", "visible");
  $("#prev").css("visibility", "visible");
}
function show_news(data) {
  for (var i = 0; i < data.length; i++) {
    $("<h3 />", {
      text: data[i]["name"]
    }).appendTo(".news");
    for (var j = 0; j < data[i]["posts"].length; j++) {
      $("<p />", {
        text: data[i]["posts"][j]
      }).appendTo(".news");
    }
  }
}
function rotation(div, start, finish) {
  div.animate([{
    transform: "rotateY(".concat(start, "deg)")
  }, {
    transform: "rotateY(".concat(finish, "deg)")
  }], {
    // sync options
    duration: 500,
    iterations: 1
  });
}
function opac(div, start, finish) {
  div.animate([{
    opacity: "".concat(start)
  }, {
    opacity: "".concat(finish)
  }], {
    // sync options
    duration: 500,
    iterations: 1
  });
}