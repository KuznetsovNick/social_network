"use strict";

function sendRequest(type, URL) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (data) {
    data = JSON.stringify(data);
  }
  return fetch(URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: type,
    body: data
  });
}
function open_friends() {
  sendRequest("POST", "/select_user", {
    selected_user: selected_user
  });
  document.location.href = "/friends";
}
function update_list() {
  sendRequest("GET", "/update").then(function (res) {
    return res.json();
  }).then(function (json) {
    page = 1;
    users = json;
    fill_table();
  });
}
function update_friends() {
  sendRequest("GET", "/update_friends").then(function (res) {
    return res.json();
  }).then(function (json) {
    page = 1;
    users = json;
    fill_table();
  });
}
function save_changes() {
  var data = {
    id: selected_user,
    name: $("#name").val(),
    bd: $("#bd").val(),
    email: $("#email").val(),
    role: $("input[name=role]:checked").val(),
    status: $("input[name=status]:checked").val()
  };
  sendRequest("POST", "/save_changes", data).then(function (res) {
    return res.json();
  }).then(function (json) {
    users = json;
    fill_table();
  });
  close_info();
}
function open_news() {
  sendRequest("POST", "/select_user", {
    selected_user: selected_user
  });
  document.location.href = "/news_page";
}
function get_news() {
  sendRequest("GET", "/send_news").then(function (res) {
    return res.json();
  }).then(function (json) {
    return show_news(json);
  });
}