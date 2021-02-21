/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/devBundle.ts":
/*!*****************************!*\
  !*** ./server/devBundle.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var webpack_1 = __importDefault(__webpack_require__(/*! webpack */ "webpack"));
var webpack_dev_middleware_1 = __importDefault(__webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(__webpack_require__(/*! webpack-hot-middleware */ "webpack-hot-middleware"));
var webpack_client_1 = __importDefault(__webpack_require__(/*! ../webpack.client */ "./webpack.client.js"));
exports.default = (function (app) {
    if (true) {
        var compiler = webpack_1.default(webpack_client_1.default);
        var middleware = webpack_dev_middleware_1.default(compiler, {
            publicPath: webpack_client_1.default.output.publicPath
        });
        app.use(middleware);
        app.use(webpack_hot_middleware_1.default(compiler));
    }
});


/***/ }),

/***/ "./server/index.ts":
/*!*************************!*\
  !*** ./server/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
__webpack_require__(/*! dotenv */ "dotenv").config();
var template_1 = __importDefault(__webpack_require__(/*! ../template */ "./template.ts"));
var devBundle_1 = __importDefault(__webpack_require__(/*! ./devBundle */ "./server/devBundle.ts"));
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var app = express_1.default();
devBundle_1.default(app);
app.use("/build", express_1.default.static(path_1.default.join(process.cwd(), "build")));
app.get("*", function (req, res) {
    return res.send(template_1.default());
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("Server listening at port " + port); });


/***/ }),

/***/ "./template.ts":
/*!*********************!*\
  !*** ./template.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = (function () { return ("\n  <!DOCTYPE HTML>\n  <html lang=\"eng\">\n    <head>\n      <meta charset=\"utf-8\">\n      <title>E-commerce</title>\n    </head>\n    <body>\n      <div id=\"root\"></div>\n      <script src=\"/build/dist.js\"></script>\n    </body>\n  </html>\n"); });


/***/ }),

/***/ "./webpack.client.js":
/*!***************************!*\
  !*** ./webpack.client.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const webpack = __webpack_require__(/*! webpack */ "webpack");
const path = __webpack_require__(/*! path */ "path");
const cwd = process.cwd();

module.exports = {
  name: "browser",
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(cwd, "client", "index.tsx"),
  ],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist.js",
    publicPath: "/build/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: __webpack_require__(/*! sass */ "sass"),
              sassOptions: {
                fiber: __webpack_require__(/*! fibers */ "fibers"),
              },
            },
          },
        ],
      }
    ],
  },
  optimization: {
    emitOnErrors: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};


/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "fibers":
/*!*************************!*\
  !*** external "fibers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("fibers");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "sass":
/*!***********************!*\
  !*** external "sass" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("sass");;

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack");;

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-dev-middleware");;

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-hot-middleware");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map