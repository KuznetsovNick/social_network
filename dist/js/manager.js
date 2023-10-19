var global;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/manager.js":
/*!***********************!*\
  !*** ./js/manager.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Manager = /*#__PURE__*/function () {
  function Manager() {
    _classCallCheck(this, Manager);
    _defineProperty(this, "fs", __webpack_require__(/*! fs */ "fs"));
    _defineProperty(this, "users", void 0);
    _defineProperty(this, "id", void 0);
    _defineProperty(this, "selected_user", null);
    this.update_users();
    this.id = 0;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i]["id"] >= this.id) {
        this.id = this.users[i]["id"] + 1;
      }
    }
  }
  _createClass(Manager, [{
    key: "update_users",
    value: function update_users() {
      this.users = JSON.parse(this.fs.readFileSync('users.json', 'utf8'));
    }
  }, {
    key: "write_to_file",
    value: function write_to_file() {
      this.fs.writeFileSync("users.json", JSON.stringify(this.users));
    }
  }, {
    key: "add_to_library",
    value: function add_to_library(body) {
      this.update_users();
      body["id"] = this.id;
      body["owner"] = null;
      body["returnDate"] = null;
      this.users.push(body);
      this.write_to_file();
      this.id++;
    }
  }, {
    key: "delete_from_library",
    value: function delete_from_library(body) {
      this.update_users();
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i]["id"] == body["id"]) {
          this.users.splice(i, 1);
        }
      }
      this.write_to_file();
    }
  }, {
    key: "send_library",
    value: function send_library() {
      this.update_users();
      if (!this.selected_user) {
        return JSON.stringify(this.users);
      } else {
        var friends_indexes;
        var friends = [];
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i]["id"] == this.selected_user) {
            friends_indexes = this.users[i]["friends"];
          }
        }
        for (var _i = 0; _i < friends_indexes.length; _i++) {
          for (var j = 0; j < this.users.length; j++) {
            if (this.users[j]["id"] == friends_indexes[_i]) {
              friends.push(this.users[j]);
            }
          }
        }
        return JSON.stringify(friends);
      }
    }
  }, {
    key: "send_news",
    value: function send_news() {
      this.update_users();
      var friends_indexes;
      var news = JSON.parse(this.fs.readFileSync('news.json', 'utf8'));
      var send_news = [];
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i]["id"] == this.selected_user) {
          friends_indexes = this.users[i]["friends"];
        }
      }
      for (var _i2 = 0; _i2 < friends_indexes.length; _i2++) {
        for (var j = 0; j < this.users.length; j++) {
          if (this.users[j]["id"] == friends_indexes[_i2]) {
            for (var k = 0; k < news.length; k++) {
              if (this.users[j]["id"] == news[k]["id"]) {
                send_news.push({
                  name: this.users[j]["name"],
                  posts: news[k]["posts"]
                });
              }
            }
          }
        }
      }
      return JSON.stringify(send_news);
    }
  }, {
    key: "select_user",
    value: function select_user(body) {
      this.selected_user = body["selected_user"];
    }
  }, {
    key: "change_user",
    value: function change_user(body) {
      this.update_users();
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i]["id"] == body["id"]) {
          this.users[i]["name"] = body["name"];
          this.users[i]["email"] = body["email"];
          this.users[i]["bd"] = body["bd"];
          this.users[i]["role"] = body["role"];
          this.users[i]["status"] = body["status"];
        }
      }
      this.write_to_file();
    }
  }]);
  return Manager;
}();
module.exports = Manager;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./js/manager.js");
/******/ 	global = __webpack_exports__;
/******/ 	
/******/ })()
;