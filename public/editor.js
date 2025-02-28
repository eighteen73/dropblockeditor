/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/editor.js":
/*!********************************!*\
  !*** ./resources/js/editor.js ***!
  \********************************/
/***/ (() => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
window.dropblockeditor = function (config) {
  return {
    iframe: null,
    dropList: null,
    insert: false,
    device: 'desktop',
    lastTopPos: 0,
    cursorPos: 0,
    currentDragItem: null,
    insertBeforeClasses: ['after:opacity-100', 'after:top-0', 'after:h-[5px]'],
    insertAfterClasses: ['after:opacity-100', 'after:bottom-0', 'after:h-[5px]'],
    init: function init() {
      var _this = this;
      this.iframe = document.getElementById("frame");
      this.dropList = document.querySelector("[drop-list]");
      document.addEventListener('keydown', function (e) {
        return _this.undo(e, _this);
      });
      document.addEventListener('keydown', function (e) {
        return _this.redo(e, _this);
      });
      this.initListeners();
      this.iframe.addEventListener("load", function () {
        _this.initListeners();
        _this.iframe.contentWindow.scrollTo(0, _this.lastTopPos);
      });
    },
    initListeners: function initListeners() {
      var _this2 = this;
      var root = this.iframe.contentWindow.document;
      root.addEventListener('keydown', function (e) {
        return _this2.undo(e, _this2);
      });
      root.addEventListener('keydown', function (e) {
        return _this2.redo(e, _this2);
      });
      this.dropList.querySelectorAll('[drag-item]').forEach(function (el) {
        el.addEventListener("dragstart", function (e) {
          e.target.setAttribute('inserting', true);
        });
        el.addEventListener('dragend', function (e) {
          e.target.removeAttribute('inserting');
        });
        el.addEventListener('dragover', function (e) {
          return e.preventDefault();
        });
      });
      root.querySelectorAll('[drop-placeholder]').forEach(function (el) {
        el.addEventListener('dragover', function (e) {
          return e.preventDefault();
        });
        el.addEventListener('dragenter', function (e) {
          e.preventDefault();
          e.target.classList.add('bg-gray-200/50', 'animate-pulse');
        });
        el.addEventListener('dragleave', function (e) {
          e.preventDefault();
          e.target.classList.remove('bg-gray-200/50', 'animate-pulse');
        });
        el.addEventListener('drop', function (e) {
          e.preventDefault;
          if (!e.target.closest('[drop-placeholder]')) {
            return;
          }
          var insertingEl = document.querySelector('[inserting]');
          if (insertingEl != null) {
            _this2.component().call('insertBlock', insertingEl.dataset.block, 0);
            insertingEl.removeAttribute('inserting');
            insertingEl = false;
            return;
          }
        });
      });
      root.querySelectorAll('[drag-item]').forEach(function (el) {
        el.addEventListener('click', function (e) {
          root.querySelectorAll('[drag-item]').forEach(function (preview) {
            return preview.classList.remove('block-active');
          });
          var clickedBlock = e.target.closest('[drag-item]');
          clickedBlock.classList.add('block-active');
          Livewire.dispatch('blockEditComponentSelected', {
            blockId: e.target.closest('[drag-item]').dataset.block
          });
        }, false);
        el.addEventListener('dragstart', function (e) {
          e.target.setAttribute('dragging', true);
          _this2.currentDragItem = el;
        });
        el.addEventListener('dragover', function (e) {
          e.preventDefault();
          var dragitem = e.target.closest('[drag-item]');
          if (_this2.currentDragItem === dragitem) {
            return;
          }
          var placement = _this2.beforeOrAfterEl(e, dragitem);
          var isPreviousSibling = _this2.currentDragItem != null ? _this2.currentDragItem.previousElementSibling : false;
          var isNextSibling = _this2.currentDragItem != null ? _this2.currentDragItem.nextElementSibling : false;
          if (dragitem != isNextSibling && placement === 'before') {
            var _dragitem$classList, _dragitem$classList2;
            (_dragitem$classList = dragitem.classList).remove.apply(_dragitem$classList, _toConsumableArray(_this2.insertAfterClasses));
            (_dragitem$classList2 = dragitem.classList).add.apply(_dragitem$classList2, _toConsumableArray(_this2.insertBeforeClasses));
          } else if (dragitem != isPreviousSibling && placement === 'after') {
            var _dragitem$classList3, _dragitem$classList4;
            (_dragitem$classList3 = dragitem.classList).remove.apply(_dragitem$classList3, _toConsumableArray(_this2.insertBeforeClasses));
            (_dragitem$classList4 = dragitem.classList).add.apply(_dragitem$classList4, _toConsumableArray(_this2.insertAfterClasses));
          } else {
            var _dragitem$classList5;
            (_dragitem$classList5 = dragitem.classList).remove.apply(_dragitem$classList5, _toConsumableArray(_this2.insertBeforeClasses).concat(_toConsumableArray(_this2.insertAfterClasses)));
          }
        });
        el.addEventListener('dragend', function (e) {
          e.target.removeAttribute('dragging');
          _this2.currentDragItem = null;
        });
        el.addEventListener('dragenter', function (e) {
          if (e.target.hasAttribute('drag-item')) {
            e.target.setAttribute('is-target', true);
          }
        });
        el.addEventListener('dragleave', function (e) {
          e.preventDefault;
          if (e.target.hasAttribute('is-target')) {
            var _e$target$classList;
            (_e$target$classList = e.target.classList).remove.apply(_e$target$classList, _toConsumableArray(_this2.insertAfterClasses).concat(_toConsumableArray(_this2.insertBeforeClasses)));
          }
        });
        el.addEventListener('drop', function (e) {
          e.preventDefault;
          var draggingEl = root.querySelector('[dragging]');
          var insertingEl = document.querySelector('[inserting]');
          if (!e.target.closest('[drag-item]')) {
            return;
          }
          if (e.target.hasAttribute('drag-item')) {
            var _e$target$classList2;
            (_e$target$classList2 = e.target.classList).remove.apply(_e$target$classList2, _toConsumableArray(_this2.insertAfterClasses).concat(_toConsumableArray(_this2.insertBeforeClasses)));
          }
          _this2.lastTopPos = root.documentElement.scrollTop;
          var placement = _this2.beforeOrAfterEl(e, e.target.closest('[drag-item]'));
          if (insertingEl != null) {
            _this2.component().call('insertBlock', insertingEl.dataset.block, e.target.closest('[drag-item]').dataset.block, placement);
            insertingEl.removeAttribute('inserting');
            insertingEl = false;
            return;
          }
          if (placement === 'after') {
            e.target.closest('[drag-item]').after(draggingEl);
          } else {
            e.target.closest('[drag-item]').before(draggingEl);
          }
          var orderIds = Array.from(root.querySelectorAll('[drag-item]')).map(function (itemEl) {
            return itemEl.dataset.block;
          });
          _this2.component().call('reorder', orderIds);
        });
      });
    },
    isBefore: function isBefore(container, target, current) {
      var targetFound = false;
      var currentFound = false;
      var before = false;
      container.querySelectorAll('[drag-item]').forEach(function (el) {
        if (before) {
          return;
        }
        targetFound = targetFound ? true : el == target;
        currentFound = currentFound ? true : el == current;
        if (targetFound === false && currentFound === true) {
          before = true;
          return;
        }
      });
      return before;
    },
    beforeOrAfterEl: function beforeOrAfterEl(e, el) {
      var bounding = el.getBoundingClientRect();
      var upperHalfStart = bounding.y;
      var upperHalfEnd = upperHalfStart + bounding.height / 2;
      var bottomHalfStart = upperHalfEnd;
      var bottomHalfEnd = bottomHalfStart + bounding.height / 2;
      var isTopHalf = e.clientY >= upperHalfStart && e.clientY <= upperHalfEnd;
      var isBottomHalf = e.clientY >= bottomHalfStart && e.clientY <= bottomHalfEnd;
      if (isTopHalf) {
        return 'before';
      } else if (isBottomHalf) {
        return 'after';
      }
      return false;
    },
    component: function component() {
      return Livewire.find(frame.closest('[wire\\:id]').getAttribute('wire:id'));
    },
    undo: function undo(e, editor) {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
          window.history.forward();
        }
        editor.component().call('undo');
      }
    },
    redo: function redo(e, editor) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
          window.history.forward();
        }
        editor.component().call('redo');
      }
    }
  };
};

/***/ }),

/***/ "./resources/css/editor.css":
/*!**********************************!*\
  !*** ./resources/css/editor.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/editor": 0,
/******/ 			"public/editor": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/editor"], () => (__webpack_require__("./resources/js/editor.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/editor"], () => (__webpack_require__("./resources/css/editor.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;