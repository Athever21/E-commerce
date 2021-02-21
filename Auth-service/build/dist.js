/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/grpc/index.ts":
/*!***************************!*\
  !*** ./src/grpc/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.grpcServer = exports.client = void 0;\r\nvar grpc_1 = __importDefault(__webpack_require__(/*! grpc */ \"grpc\"));\r\nvar proto_loader_1 = __webpack_require__(/*! @grpc/proto-loader */ \"@grpc/proto-loader\");\r\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\r\nvar prtotoPath = path_1.default.join(process.cwd(), \"src\", \"grpc\", \"auth.proto\");\r\nvar packageDef = proto_loader_1.loadSync(prtotoPath, {\r\n    keepCase: true,\r\n    longs: String,\r\n    enums: String,\r\n    defaults: true,\r\n    oneofs: true,\r\n});\r\nvar confirmProto = grpc_1.default.loadPackageDefinition(packageDef).Confirm;\r\nvar accessProto = grpc_1.default.loadPackageDefinition(packageDef).AccessToken;\r\nvar confirmToken = function (call, cb) {\r\n    var token = call.request.token;\r\n    try {\r\n        var id = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);\r\n        cb(null, { id: id });\r\n    }\r\n    catch (_a) {\r\n        cb(null, { id: \"\" });\r\n    }\r\n};\r\nexports.client = new confirmProto(\":3005\", grpc_1.default.credentials.createInsecure());\r\nvar grpcServer = function () {\r\n    var server = new grpc_1.default.Server();\r\n    server.addService(accessProto.service, { confirmToken: confirmToken });\r\n    try {\r\n        server.bindAsync(\":3004\", grpc_1.default.ServerCredentials.createInsecure(), function () {\r\n            server.start();\r\n            console.log(\"Server running at http://127.0.0.1:3004\");\r\n        });\r\n    }\r\n    catch (err) {\r\n        console.log(err);\r\n    }\r\n    // process.on(\"beforeExit\", () => server.tryShutdown(() => console.log(\"Grpc server closed\")));\r\n};\r\nexports.grpcServer = grpcServer;\r\n\n\n//# sourceURL=webpack://Auth-service/./src/grpc/index.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.server = exports.app = void 0;\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\nvar cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ \"cookie-parser\"));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar errorHandler_1 = __importDefault(__webpack_require__(/*! ./util/errorHandler */ \"./src/util/errorHandler.ts\"));\r\nvar morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\r\nvar grpc_1 = __webpack_require__(/*! ./grpc */ \"./src/grpc/index.ts\");\r\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\r\nvar auth_1 = __importDefault(__webpack_require__(/*! ./routes/auth */ \"./src/routes/auth.ts\"));\r\nexports.app = express_1.default();\r\nvar corsOpts = {\r\n    origin: process.env.CLIENT_APP,\r\n    credentials: true,\r\n    methods: [\"GET\", \"OPTIONS\", \"POST\", \"PUT\", \"HEAD\"],\r\n};\r\nexports.app.use(morgan_1.default(\"dev\"));\r\nexports.app.use(cors_1.default(corsOpts));\r\nexports.app.use(cookie_parser_1.default());\r\nexports.app.use(express_1.default.json());\r\nexports.app.get(\"/\", function (req, res) {\r\n    return res.json({\r\n        api_name: process.env.SERVICE_NAME,\r\n        status: \"healthy\",\r\n    });\r\n});\r\nexports.app.use(\"/auth\", auth_1.default);\r\nexports.app.use(errorHandler_1.default);\r\nvar port = process.env.PORT || 3002;\r\nexports.server = exports.app.listen(port);\r\nexports.server.on(\"listening\", function () { return console.log(\"Server listening at port \" + port); });\r\ngrpc_1.grpcServer();\r\n\n\n//# sourceURL=webpack://Auth-service/./src/index.ts?");

/***/ }),

/***/ "./src/routes/auth.ts":
/*!****************************!*\
  !*** ./src/routes/auth.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar express_1 = __webpack_require__(/*! express */ \"express\");\r\nvar autoCatch_1 = __importDefault(__webpack_require__(/*! ../util/autoCatch */ \"./src/util/autoCatch.ts\"));\r\nvar login_1 = __webpack_require__(/*! ../services/login */ \"./src/services/login.ts\");\r\nvar router = express_1.Router();\r\nrouter\r\n    .route(\"/login\")\r\n    .post(autoCatch_1.default(login_1.login));\r\nrouter\r\n    .route(\"/refresh\")\r\n    .post(autoCatch_1.default(login_1.refreshToken));\r\nrouter\r\n    .route(\"/logout\")\r\n    .post(autoCatch_1.default(login_1.logout));\r\nrouter\r\n    .route(\"/check\")\r\n    .post(autoCatch_1.default(login_1.check));\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack://Auth-service/./src/routes/auth.ts?");

/***/ }),

/***/ "./src/services/login.ts":
/*!*******************************!*\
  !*** ./src/services/login.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.logout = exports.check = exports.refreshToken = exports.login = void 0;\r\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\r\nvar Error_1 = __importDefault(__webpack_require__(/*! ../util/Error */ \"./src/util/Error.ts\"));\r\nvar index_1 = __webpack_require__(/*! ../grpc/index */ \"./src/grpc/index.ts\");\r\nvar login = function (req, res, next) {\r\n    var password = req.body.password;\r\n    console.log(req.body);\r\n    if (!req.body.login || !password) {\r\n        throw new Error_1.default(400, \"Missing username or password\");\r\n    }\r\n    return index_1.client.confirmLogin({ login: req.body.login, password: password }, function (err, data) {\r\n        console.log(err);\r\n        if (err)\r\n            return next(new Error_1.default(500, err.message));\r\n        if (!data.flag) {\r\n            return next(new Error_1.default(400, \"Invalid username or password\"));\r\n        }\r\n        var refreshToken = jsonwebtoken_1.default.sign({\r\n            id: data.id,\r\n        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: \"1d\" });\r\n        res.cookie(\"refreshToken\", refreshToken, {\r\n            maxAge: 1000 * 60 * 60 * 24,\r\n            httpOnly: true\r\n            // secure: true\r\n        });\r\n        var accessToken = jsonwebtoken_1.default.sign({\r\n            id: data.id,\r\n        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: \"1h\" });\r\n        return res.json({ token: accessToken });\r\n    });\r\n};\r\nexports.login = login;\r\nvar refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var tokenData, accessToken;\r\n    return __generator(this, function (_a) {\r\n        if (!req.cookies.refreshToken) {\r\n            throw new Error_1.default(401, \"Unauthorized\");\r\n        }\r\n        try {\r\n            tokenData = jsonwebtoken_1.default.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);\r\n            if (tokenData.id) {\r\n                accessToken = jsonwebtoken_1.default.sign({\r\n                    id: tokenData.id,\r\n                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: \"1h\" });\r\n                return [2 /*return*/, res.json({ token: accessToken })];\r\n            }\r\n        }\r\n        catch (_b) {\r\n            throw new Error_1.default(403, \"Forbidden\");\r\n        }\r\n        return [2 /*return*/];\r\n    });\r\n}); };\r\nexports.refreshToken = refreshToken;\r\nvar check = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var token, id;\r\n    return __generator(this, function (_a) {\r\n        token = req.cookies.refreshToken || \"\";\r\n        if (token) {\r\n            id = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET).id;\r\n            return [2 /*return*/, index_1.client.checkLogin({ id: id }, function (err, data) {\r\n                    console.log(\"err\", err);\r\n                    if (err)\r\n                        throw new Error_1.default(500, \"Internal server error\");\r\n                    var accessToken = jsonwebtoken_1.default.sign({\r\n                        id: data.u.id,\r\n                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: \"1h\" });\r\n                    console.log(\"data\", data);\r\n                    return res.json({ user: __assign(__assign({}, data.u), { accessToken: accessToken }) });\r\n                })];\r\n        }\r\n        return [2 /*return*/, res.json({ user: false })];\r\n    });\r\n}); };\r\nexports.check = check;\r\nvar logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        res.clearCookie(\"refreshToken\");\r\n        return [2 /*return*/, res.send(\"logged out\")];\r\n    });\r\n}); };\r\nexports.logout = logout;\r\n\n\n//# sourceURL=webpack://Auth-service/./src/services/login.ts?");

/***/ }),

/***/ "./src/util/Error.ts":
/*!***************************!*\
  !*** ./src/util/Error.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar CustomError = /** @class */ (function (_super) {\r\n    __extends(CustomError, _super);\r\n    function CustomError(code, message) {\r\n        var _this = _super.call(this, message) || this;\r\n        _this.code = code;\r\n        return _this;\r\n    }\r\n    return CustomError;\r\n}(Error));\r\nexports.default = CustomError;\r\n\n\n//# sourceURL=webpack://Auth-service/./src/util/Error.ts?");

/***/ }),

/***/ "./src/util/autoCatch.ts":
/*!*******************************!*\
  !*** ./src/util/autoCatch.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.default = (function (f) {\r\n    return function (req, res, next) {\r\n        Promise.resolve(f(req, res, next)).catch(next);\r\n    };\r\n});\r\n\n\n//# sourceURL=webpack://Auth-service/./src/util/autoCatch.ts?");

/***/ }),

/***/ "./src/util/errorHandler.ts":
/*!**********************************!*\
  !*** ./src/util/errorHandler.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.default = (function (err, req, res, next) {\r\n    return res\r\n        .status(err.code)\r\n        .json({ error: err.message });\r\n});\r\n\n\n//# sourceURL=webpack://Auth-service/./src/util/errorHandler.ts?");

/***/ }),

/***/ "@grpc/proto-loader":
/*!*************************************!*\
  !*** external "@grpc/proto-loader" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@grpc/proto-loader");;

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "grpc":
/*!***********************!*\
  !*** external "grpc" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("grpc");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;