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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SearchModel.js":
/*!****************************!*\
  !*** ./src/SearchModel.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Creating a search model to effectively store data entered by\n * users. Also helper methods to do tasks like generating url,\n * population of history etc.\n * \n * Accepts: para[Obj.] with properties query, site, inurl,\n * intitle, filetype[null], strictSearch[false], safeOn[false]. \n */\n\nvar Search = function () {\n    function Search(para) {\n        _classCallCheck(this, Search);\n\n        this.query = para[\"query\"];\n        this.site = para[\"site\"] || '';\n        this.inurl = para[\"inurl\"] || '';\n        this.intitle = para[\"intitle\"] || '';\n        this.filetype = para[\"filetype\"] || 'Null';\n        this.strictSearch = para[\"strict\"] || false;\n        this.safeOn = para[\"safe\"] || false;\n        this.url = this.createURL();\n    }\n\n    /**\n     * Create an object containing the preference passed by\n     * the user, this will be used to populate search entry\n     * in search entry list.\n     */\n\n\n    _createClass(Search, [{\n        key: \"produceSearchInfo\",\n        value: function produceSearchInfo() {\n            return {\n                \"query\": this.query,\n                \"site\": this.site,\n                \"inurl\": this.inurl,\n                \"intitle\": this.intitle,\n                \"filetype\": this.filetype,\n                \"strictSearch\": this.strictSearch,\n                \"safeOn\": this.safeOn\n            };\n        }\n\n        /**\n         * CREATE TEMPLATE URL\n         * Description: This function returns a template url for search.\n         * It takes an object argument that containes property like query,\n         * site, inurl, intitle, filetype and so on.\n         * \n         * I've used if conditional to check if users have indeed provided\n         * those values. Please assist if there is any cleaner way to do it.\n         */\n\n    }, {\n        key: \"createURL\",\n        value: function createURL() {\n            var para = this.produceSearchInfo();\n\n            // Check if `strict` search is checked\n            if (para[\"strictSearch\"]) {\n                para[\"query\"] = '\"' + para[\"query\"] + '\"';\n            }\n\n            // Enforce safe search searching if safe is on\n            if (para[\"safeOn\"]) {\n                para[\"query\"] = '!safeon ' + para[\"query\"];\n            }\n\n            // URL template only with search query\n            var url = \"https://duckduckgo.com/?q=\" + encodeURIComponent(para[\"query\"]);\n\n            // Adding site preference if passed by user\n            if (para[\"site\"]) {\n                url += \"+site:\" + para[\"site\"];\n            }\n\n            // Adding inurl preference if passed by user\n            if (para[\"inurl\"]) {\n                url += \"+inurl:\" + para[\"inurl\"];\n            }\n\n            // Adding intitle preference if passed by user\n            if (para[\"intitle\"]) {\n                url += \"+inurl:\" + para[\"intitle\"];\n            }\n\n            // Adding filetype preference if passed by user\n            if (para[\"filetype\"] != 'Null') {\n                url += \"+filetype:\" + para[\"filetype\"];\n            }\n\n            return url;\n        }\n    }]);\n\n    return Search;\n}();\n\nmodule.exports = Search;\n\n//# sourceURL=webpack:///./src/SearchModel.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Created by Amrit Pandey, Twitter: @amritpandeyy\n * Licensed under MIT\n * Search Providers Used:\n *      DuckDuckGo [https://duck.co/help/results/syntax]\n */\n\n// Search object model import\nvar Search = __webpack_require__(/*! ./SearchModel */ \"./src/SearchModel.js\");\n\n/**\n * Fill Search history with already saved localdata or,\n * create a new entry. The name of local variable to \n * store search history is `historyData`.\n */\nif (!localStorage.getItem('historyData')) {\n    var historyData = [];\n} else {\n    var historyData = JSON.parse(localStorage.getItem('historyData'));\n}\n\n/**\n * Store all the elements in an object, containg their name\n * as property and DOM objects as their values.\n * It is easy to keep track of all the elements in one object,\n * hence I've created a method that produces an object containing\n * them. To add new DOM object, just add its ID to elementsID array.\n */\n\nvar elementID = [\"search_bar\", \"search_button\", \"site_bar\", \"inurl_bar\", \"intitle_bar\", \"filetype\", \"strict\", \"safe\", \"exclude_site_bar\", \"toggle_exclude_site\", \"exclude_term_bar\", \"toggle_exclude_term\", \"recent_search_list\"];\nvar elements = collectElements(elementID);\n\n// Fill search history list with old data.\npopulateHistory(historyData);\n\n// Exclude data are optional hence they needs to be enabled by users to use them.\n// These two lines, add listeners to their respective checkboxes.\ntoggleTextInput(elements[\"toggle_exclude_site\"], elements[\"exclude_site_bar\"]);\ntoggleTextInput(elements[\"toggle_exclude_term\"], elements[\"exclude_term_bar\"]);\n\n/**\n * Event Listener on `search` button.\n * This event will collect the data entered by the users\n * in the form and input fields and make an object and then\n * pass that object to the a function that will create a\n * template URL for duckduckgo.\n */\nelements[\"search_button\"].addEventListener('click', function (e) {\n\n    // Preventing search button to work if no query entered by user.\n    // WARNING: href value of search button may contain template URL of old searches.\n    if (!elements[\"search_bar\"].value) {\n        e.preventDefault();\n        return;\n    } else {\n\n        // Collect data/preferences from inputs and store in object named parameters.\n        /**\n         * parameters are:\n         * - query: query to search for\n         * - site: specific site to search for\n         * - inurl: terms appearing in the result's url\n         * - intitle: terms appearing in the result's title\n         * - filetype: of the search results, eg: pdf, docs etc.\n         */\n        var parameters = {\n            \"query\": elements[\"search_bar\"].value,\n            \"site\": elements[\"site_bar\"].value,\n            \"inurl\": elements[\"inurl_bar\"].value,\n            \"intitle\": elements[\"intitle_bar\"].value,\n            \"filetype\": elements[\"filetype\"].value,\n            \"strict\": elements[\"strict\"].checked,\n            \"safe\": elements[\"safe\"].checked\n\n            // Creating new search object based on `Search` model.\n        };var searchItem = new Search(parameters);\n\n        console.log(searchItem);\n\n        // Update search history data.\n        historyData.unshift(searchItem);\n        localStorage.setItem('historyData', JSON.stringify(historyData));\n\n        // Clear query field for next search.\n        elements[\"recent_search_list\"].textContent = '';\n\n        // Add entry to the search list.\n        populateHistory(historyData);\n\n        // Finally set href value of search button to the URL generated\n        // from the search object.\n        e.target.href = searchItem.createURL();\n\n        elements[\"search_bar\"].value = '';\n    }\n});\n\n/**\n * REFACTORING\n */\n\n// [Function] -- Returns DOM object with respectively passed ID.\nfunction getElement(id) {\n    return document.getElementById(id);\n};\n\n// [Function] -- Returns collect of DOM objects having IDs in `elementID` array. \nfunction collectElements(ID_collection) {\n    var elements = {};\n    elementID.forEach(function (ele) {\n        elements[ele] = getElement(ele);\n    });\n    return elements;\n};\n\n// [Function] -- Toggle exclude text fields on changing their respective checkboxes.\nfunction toggleTextInput(toggler, inputTarget) {\n    toggler.addEventListener('change', function (e) {\n        if (e.target.checked) {\n            inputTarget.disabled = false;\n        } else {\n            inputTarget.value = '';\n            inputTarget.disabled = true;\n        }\n    });\n};\n\n// [Function] -- Generate an HTML li element containing previous search info and appends\n// to the search history UL list.\nfunction populateHistory() {\n    var historyData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    historyData.forEach(function (search) {\n        var li = document.createElement(\"li\");\n        var a = document.createElement('a');\n        a.href = search.url;\n        a.textContent = search.query;\n        a.target = \"_blank\";\n        li.appendChild(a);\n        elements[\"recent_search_list\"].appendChild(li);\n    });\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });