/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autosize_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autosize_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__autosize_js__);




function init() {
    let userinput = wm_getUserInputHtml();
    let html = `<div class="wm-comment-header">
        </div>
        ${userinput}
        <div class="wm-seperator">
        </div>
        <div class="wm-comment-item">
        </div>`;
    let wm_comment = document.getElementById("wm_comment");
    wm_comment.innerHTML = html;
    let wm_inputs = wm_comment.querySelectorAll(".wm-input");
    for (let e of wm_inputs) {
        wm_init_input(e, true); // return the first wm_input element
    }
}

function wm_init_input(wm_input, isRoot) {
    let wm_textarea = wm_input.querySelector(".wm-content-textarea");
    let wm_commit = wm_input.querySelector(".wm-commit-btns");
    if (isRoot) {
        wm_commit.style.display = "none";
    }

    wm_textarea.onfocus = function () {
        if (wm_commit.style.display == "none") {
            wm_commit.style.display = "inline-block";
        }
    };

    if (wm_wement != undefined && wm_wement != null) {
        wm_input.querySelector(".wm-user-headimage").src = wm_wement.user.headimage;
    }

    let wm_cancel_comment_btn = wm_input.querySelector(".wm-cancel-comment-btn");
    wm_cancel_comment_btn.onclick = function () {
        if (isRoot) {
            wm_commit.style.display = "none";
        } else {
            wm_input.parentNode.parentNode.removeChild(wm_input.parentNode);
        }
    };
    wm_input.querySelector(".wm-add-comment-btn").onclick = function (e) {
        wm_log("commit btn clicked");
        wm_addComment(e);
    };

    __WEBPACK_IMPORTED_MODULE_1__autosize_js__(wm_textarea);
}

function wm_getUserInputHtml() {
    return `<div class="wm-input">
            <div class="wm-user">
                <img class="wm-user-headimage" src="wm_default_headimage.jpg">
            </div>
            <div class="wm-textarea">
                   <textarea class="wm-content-textarea" rows="1" placeholder="写下你的评论..."></textarea>     
                   <div class="wm-commit-btns">
                        <button class="wm-cancel-comment-btn" type="button">取消</button>
                        <button class="wm-add-comment-btn" type="button">提交</button>
                   </div>
            </div>
        </div>`;
}

let wm_debug = true;
let wm_wement;
let wm_appid;

init();
wm_run();

function wm_run() {
    let hash = window.location.hash;
    if (hash != undefined && hash != "") {
        hash = hash.substring(1, hash.length);
        localStorage.setItem("wm-token", hash);
        location.replace(location.pathname + location.search);
        return;
    }

    let wm_token = localStorage.getItem("wm-token");

    wm_log(wm_token);

    if (typeof wement == "undefined" || typeof wement.appid == "undefined" || wement.appid == "") {
        wm_appid = undefined;
    } else {
        wm_appid = wement.appid;
    }

    if (wm_appid != undefined) {
        // check token
        if (wm_token) {
            wm_log("i got token, it is " + wm_token);
            wm_getWementInfo();
        } else {
            wm_log("no token yet, request it");
            wm_requestAuth();
        }
    } else {
        alert("请设置wement.io的appid");
    }
}

/**
 * 请求授权
 */
function wm_requestAuth() {
    let path = document.location.origin + document.location.pathname;
    wm_log(path);
    __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* http */].get(`/login/github/` + encodeURIComponent(path)).then(authurl => {
        window.location.href = authurl;
    });
}

/**
 * 获取用户信息
 */
function wm_getWementInfo() {
    __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* http */].post("/wementinfo", { "appid": wm_appid, "domain": document.location.host }).then(data => {
        if (data) {
            wm_setWementInfo(data);
        }
        wm_log(data);
    });
}

function wm_log(msg) {
    if (wm_debug) {
        console.log(msg);
    }
}

/**
 * 设置用户的信息
 * @param data
 */
function wm_setWementInfo(data) {
    if (data.code == -1) {
        // unauth
        wm_requestAuth();
    } else if (data.code == 0) {
        wm_log("success");
        wm_wement = data;
        document.querySelector(".wm-user-headimage").src = wm_wement.user.headimage;
        wm_getComments();
    } else {
        wm_log(data.message);
    }
}

/**
 * 添加一条评论
 */
function wm_addComment(e) {
    if (wm_wement) {
        let dom_editor = e.target.parentNode.parentNode.querySelector(".wm-content-textarea");
        let content = dom_editor.value;
        let which = e.target.parentNode.parentNode.parentNode.parentNode;
        let id = null;
        if (which.className == "feedback") {
            id = which.parentNode.parentNode.id;
        }
        if (content.trim() == "") {
            alert("评论内容不能为空");
            return;
        }
        __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* http */].post("/comment/add", {
            "websiteId": wm_getWebsiteId(),
            "domain": document.location.host,
            "postUrl": document.location.href,
            "content": content,
            "parent": id
        }).then(res => {
            if (res.code == 0) {
                wm_log("add comment success");
                dom_editor.value = "";
                __WEBPACK_IMPORTED_MODULE_1__autosize_js__["update"](dom_editor);
                wm_ui_addcomment(document.getElementById("wm_comment"), res);
            } else {
                wm_log("add comment failed, case:" + res);
            }
        });
    } else {
        log("you are not login yet.");
    }
}

/**
 * 删除一条评论
 */
window.wm_delComment = function (e, id) {
    let confirm = window.confirm("确定要删除这条评论吗？");
    if (confirm) {
        __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* http */].post("/comment/delete", {
            "id": id
        }).then(res => {
            if (res.code == 0) {
                let dom_comment = document.getElementById("wm_comment");
                if (dom_comment) {
                    dom_comment.removeChild(document.getElementById(id));
                }
                wm_log("delete comment success");
            } else {
                wm_log("delete comment failed, case: " + res);
            }
        });
    } else {}
};

/**
 * 回复
 * @param e
 * @param id
 */
window.wm_feedback = function (e, id) {
    let wm_comment_content = e.parentNode.parentNode.parentNode.parentNode;
    let feedback = wm_comment_content.querySelector(".feedback");
    if (feedback == null) {
        let feedback = document.createElement("div");
        feedback.className = "feedback";
        feedback.innerHTML = wm_getUserInputHtml();
        wm_comment_content.appendChild(feedback);
        wm_init_input(wm_comment_content.querySelector(".wm-input"));
    }
};

/**
 * 获取当前页面评论列表
 */
function wm_getComments() {
    if (wm_wement) {
        __WEBPACK_IMPORTED_MODULE_0__utils_js__["a" /* http */].post("/comments/list", {
            "websiteId": wm_getWebsiteId(),
            "postUrl": document.location.href
        }).then(res => {
            if (res.code == 0) {
                let dom_comment = document.getElementById("wm_comment");
                for (let comment of res.comments) {
                    wm_ui_addcomment(dom_comment, comment);
                }
                wm_log("get comments success");
            } else {
                wm_log("get comments failed, case:" + res);
            }
        });
    }
}

/**
 * 添加一条评论
 * @param e
 * @param comment
 */
function wm_ui_addcomment(e, comment) {
    wm_log(comment);
    let content = comment.content;
    let dom_comment_item = document.createElement("div");
    dom_comment_item.className = "wm-comment-item";
    dom_comment_item.id = comment.id;

    // 添加头像
    let dom_comment_user = document.createElement("div");
    dom_comment_user.className = "wm-user";
    dom_comment_user.innerHTML = `<a href="${comment.homepage}" target="_blank"><img class="wm-user-headimage" src="${comment.headimage}"></a>`;

    // 添加评论内容
    let dom_comment_content = document.createElement("div");
    dom_comment_content.className = "wm-comment-content";

    let feedback;
    if (wm_wement.user.id == comment.userid) {
        feedback = `<a href="javascript:void(0)" onclick="wm_feedback(this, '${comment.id}')">回复</a>`;
    } else {
        feedback = `<a href="javascript:void(0)" onclick="wm_delComment(this, '${comment.id}')">删除</a>`;
    }
    let homepagehost = "";
    if (comment.homepage && comment.homepagehost != "") {
        homepagehost = `<a href='${comment.homepage}' target="_blank">${comment.homepagehost}</a>`;
    }
    dom_comment_content.innerHTML = `<div class="wm-user-name">
                             cmlanche ${homepagehost}
                        </div>
                        <div class="wm-comment-user-content">
                            <p>${content}</p>
                            <div class="wm-comment-user-content-bottom">
                                <time>${comment.createdtime}</time>
                                <span>
                                    ${feedback}
                                </span>
                                <span class="wm-comment-user-content-bottom-sup"></span>
                            </div>
                        </div>`;

    dom_comment_item.appendChild(dom_comment_user);
    dom_comment_item.appendChild(dom_comment_content);

    e.appendChild(dom_comment_item);
}

function wm_getWebsiteId() {
    return wm_wement.website.id;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getTargetContainer */
const isString = s => toString.call(s) === '[object String]';
/* unused harmony export isString */


function getTargetContainer(container) {
  let targetContainer;
  if (container instanceof Element) {
    targetContainer = container;
  } else if (isString(container)) {
    targetContainer = document.getElementById(container);
  } else {
    targetContainer = document.createElement('div');
  }

  return targetContainer;
}

const Query = {
  parse(search = window.location.search) {
    if (!search) return {};
    const queryString = search[0] === '?' ? search.substring(1) : search;
    const query = {};
    queryString.split('&').forEach(queryStr => {
      const [key, value] = queryStr.split('=');
      if (key) query[key] = value;
    });
    return query;
  },
  stringify(query, prefix = '?') {
    const queryString = Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');
    return queryString ? prefix + queryString : '';
  }
};
/* unused harmony export Query */


function ajaxFactory(method) {
  let product = false;
  let baseurl;
  if (product) {
    baseurl = "http://119.23.204.101";
  } else {
    baseurl = "http://localhost:9000";
  }
  return function (apiPath, data = {}, base = baseurl) {
    console.log(apiPath);
    const req = new XMLHttpRequest();
    const token = localStorage.getItem("wm-token");

    let url = `${base}${apiPath}`;
    let body = null;
    if (method === 'GET' || method === 'DELETE') {
      url += Query.stringify(data);
    }

    const p = new Promise((resolve, reject) => {
      req.addEventListener('load', () => {
        const contentType = req.getResponseHeader('content-type');
        const res = req.responseText;
        if (!/json/.test(contentType)) {
          resolve(res);
          return;
        }
        const data = JSON.parse(res);
        if (data) {
          resolve(data);
        }
      });
      req.addEventListener('error', error => reject(error));
    });
    req.open(method, url, true);

    if (token) {
      req.setRequestHeader('Authorization', `${token}`);
    }
    if (method !== 'GET' && method !== 'DELETE') {
      body = JSON.stringify(data);
      req.setRequestHeader('Content-Type', 'application/json');
    }

    req.send(body);
    return p;
  };
}

const http = {
  get: ajaxFactory('GET'),
  post: ajaxFactory('POST'),
  delete: ajaxFactory('DELETE'),
  put: ajaxFactory('PUT')
};
/* harmony export (immutable) */ __webpack_exports__["a"] = http;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Autosize 4.0.0
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	var map = typeof Map === "function" ? new Map() : function () {
		var keys = [];
		var values = [];

		return {
			has: function has(key) {
				return keys.indexOf(key) > -1;
			},
			get: function get(key) {
				return values[keys.indexOf(key)];
			},
			set: function set(key, value) {
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					values.push(value);
				}
			},
			'delete': function _delete(key) {
				var index = keys.indexOf(key);
				if (index > -1) {
					keys.splice(index, 1);
					values.splice(index, 1);
				}
			}
		};
	}();

	var createEvent = function createEvent(name) {
		return new Event(name, { bubbles: true });
	};
	try {
		new Event('test');
	} catch (e) {
		// IE does not support `new Event()`
		createEvent = function (name) {
			var evt = document.createEvent('Event');
			evt.initEvent(name, true, false);
			return evt;
		};
	}

	function assign(ta) {
		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;

		var heightOffset = null;
		var clientWidth = ta.clientWidth;
		var cachedHeight = null;

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}
			// Fix when a textarea is not on document body and heightOffset is Not a Number
			if (isNaN(heightOffset)) {
				heightOffset = 0;
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			ta.style.overflowY = value;
		}

		function getParentOverflows(el) {
			var arr = [];

			while (el && el.parentNode && el.parentNode instanceof Element) {
				if (el.parentNode.scrollTop) {
					arr.push({
						node: el.parentNode,
						scrollTop: el.parentNode.scrollTop
					});
				}
				el = el.parentNode;
			}

			return arr;
		}

		function resize() {
			var originalHeight = ta.style.height;
			var overflows = getParentOverflows(ta);
			var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)

			ta.style.height = '';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// used to check if an update is actually necessary on window.resize
			clientWidth = ta.clientWidth;

			// prevents scroll-position jumping
			overflows.forEach(function (el) {
				el.node.scrollTop = el.scrollTop;
			});

			if (docTop) {
				document.documentElement.scrollTop = docTop;
			}
		}

		function update() {
			resize();

			var styleHeight = Math.round(parseFloat(ta.style.height));
			var computed = window.getComputedStyle(ta, null);

			// Using offsetHeight as a replacement for computed.height in IE, because IE does not account use of border-box
			var actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(computed.height)) : ta.offsetHeight;

			// The actual height not matching the style height (set via the resize method) indicates that
			// the max-height has been exceeded, in which case the overflow should be allowed.
			if (actualHeight !== styleHeight) {
				if (computed.overflowY === 'hidden') {
					changeOverflow('scroll');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			} else {
				// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
				if (computed.overflowY !== 'hidden') {
					changeOverflow('hidden');
					resize();
					actualHeight = computed.boxSizing === 'content-box' ? Math.round(parseFloat(window.getComputedStyle(ta, null).height)) : ta.offsetHeight;
				}
			}

			if (cachedHeight !== actualHeight) {
				cachedHeight = actualHeight;
				var evt = createEvent('autosize:resized');
				try {
					ta.dispatchEvent(evt);
				} catch (err) {
					// Firefox will throw an error on dispatchEvent for a detached element
					// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
				}
			}
		}

		var pageResize = function pageResize() {
			if (ta.clientWidth !== clientWidth) {
				update();
			}
		};

		var destroy = function (style) {
			window.removeEventListener('resize', pageResize, false);
			ta.removeEventListener('input', update, false);
			ta.removeEventListener('keyup', update, false);
			ta.removeEventListener('autosize:destroy', destroy, false);
			ta.removeEventListener('autosize:update', update, false);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});

			map['delete'](ta);
		}.bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap
		});

		ta.addEventListener('autosize:destroy', destroy, false);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update, false);
		}

		window.addEventListener('resize', pageResize, false);
		ta.addEventListener('input', update, false);
		ta.addEventListener('autosize:update', update, false);
		ta.style.overflowX = 'hidden';
		ta.style.wordWrap = 'break-word';

		map.set(ta, {
			destroy: destroy,
			update: update
		});

		init();
	}

	function destroy(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.destroy();
		}
	}

	function update(ta) {
		var methods = map.get(ta);
		if (methods) {
			methods.update();
		}
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
});

/***/ })
/******/ ]);