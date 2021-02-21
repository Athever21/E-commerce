/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\r\nvar graphql_1 = __importDefault(__webpack_require__(/*! ./graphql */ \"./src/graphql/index.ts\"));\r\nvar morgan_1 = __importDefault(__webpack_require__(/*! morgan */ \"morgan\"));\r\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\r\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\r\nvar app = express_1.default();\r\nvar corsOpts = {\r\n    origin: process.env.CLIENT_URL,\r\n    credentials: true,\r\n    methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'HEAD']\r\n};\r\napp.use(morgan_1.default('dev'));\r\napp.use(express_1.default.json());\r\napp.use(express_1.default.urlencoded({ extended: false }));\r\napp.use(cors_1.default(corsOpts));\r\napp.get(\"/\", function (req, res, next) {\r\n    return res.json({\r\n        api: process.env.APP_NAME,\r\n        health: \"healthy\"\r\n    });\r\n});\r\ngraphql_1.default(app);\r\nexports.default = app;\r\n\n\n//# sourceURL=webpack://User-service/./src/app.ts?");

/***/ }),

/***/ "./src/clients/KnexClient.ts":
/*!***********************************!*\
  !*** ./src/clients/KnexClient.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.createConnection = void 0;\r\nvar knex_1 = __importDefault(__webpack_require__(/*! knex */ \"knex\"));\r\nvar createConnection = function () {\r\n    var _a = process.env, MYSQL_ROOT_PASSWORD = _a.MYSQL_ROOT_PASSWORD, MYSQL_DB = _a.MYSQL_DB, DB_SOCKET_CONNECTION_STRING = _a.DB_SOCKET_CONNECTION_STRING, NODE_ENV = \"development\";\r\n    var knex;\r\n    if (NODE_ENV === \"production\") {\r\n        knex = knex_1.default({\r\n            client: \"mysql\",\r\n            connection: {\r\n                user: \"root\",\r\n                password: MYSQL_ROOT_PASSWORD,\r\n                database: MYSQL_DB,\r\n                socketPath: DB_SOCKET_CONNECTION_STRING\r\n            }\r\n        });\r\n    }\r\n    else {\r\n        knex = knex_1.default({\r\n            client: \"mysql\",\r\n            connection: {\r\n                user: \"root\",\r\n                password: \"\",\r\n                database: \"users_test\"\r\n            }\r\n        });\r\n    }\r\n    return knex;\r\n};\r\nexports.createConnection = createConnection;\r\nvar KnexClient = /** @class */ (function () {\r\n    function KnexClient() {\r\n        if (!KnexClient.dbConnection) {\r\n            KnexClient.dbConnection = exports.createConnection();\r\n        }\r\n    }\r\n    KnexClient.prototype.getConnection = function () {\r\n        return KnexClient.dbConnection;\r\n    };\r\n    return KnexClient;\r\n}());\r\nexports.default = KnexClient;\r\n\n\n//# sourceURL=webpack://User-service/./src/clients/KnexClient.ts?");

/***/ }),

/***/ "./src/graphql/index.ts":
/*!******************************!*\
  !*** ./src/graphql/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\r\nvar schema_1 = __importDefault(__webpack_require__(/*! ./schema */ \"./src/graphql/schema.ts\"));\r\nvar resolvers_1 = __importDefault(__webpack_require__(/*! ./resolvers */ \"./src/graphql/resolvers/index.ts\"));\r\nvar index_1 = __webpack_require__(/*! ../grpc/index */ \"./src/grpc/index.ts\");\r\nvar useApolloMiddleware = function (app) {\r\n    var schema = apollo_server_express_1.makeExecutableSchema({\r\n        typeDefs: apollo_server_express_1.gql(schema_1.default),\r\n        resolvers: resolvers_1.default,\r\n    });\r\n    var apolloServer = new apollo_server_express_1.ApolloServer({\r\n        schema: schema,\r\n        context: function (_a) {\r\n            var req = _a.req;\r\n            var token = req.headers.authorization || \"\";\r\n            if (token) {\r\n                index_1.client.confirmToken({ token: token }, function (err, id) {\r\n                    if (err)\r\n                        throw new apollo_server_express_1.ApolloError(\"Internal server error\");\r\n                    if (id) {\r\n                        return { id: id };\r\n                    }\r\n                    else {\r\n                        throw new apollo_server_express_1.ApolloError(\"Invalid token\");\r\n                    }\r\n                });\r\n            }\r\n            return { id: null };\r\n        },\r\n    });\r\n    var cors = {\r\n        credentials: true,\r\n        origin: process.env.CLIENT_URL,\r\n        allowedHeaders: [\r\n            \"Content-Type\",\r\n            \"Authorization\",\r\n            \"x-csrf-token\",\r\n            \"x-utc-offset\",\r\n        ],\r\n    };\r\n    apolloServer.applyMiddleware({\r\n        path: \"/graphql\",\r\n        app: app,\r\n        cors: cors,\r\n    });\r\n};\r\nexports.default = useApolloMiddleware;\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/index.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/index.ts":
/*!****************************************!*\
  !*** ./src/graphql/resolvers/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar importAll = function (r, obj) {\r\n    r.keys().forEach(function (file) {\r\n        var queryName = file.replace(/\\.\\//, \"\").replace(/\\.[jt]s/, \"\");\r\n        var queryFunc = r(file).default;\r\n        obj[queryName] = queryFunc;\r\n    });\r\n};\r\nvar re = undefined;\r\nvar exportedFunctions = {\r\n    Query: {},\r\n    Mutation: {},\r\n};\r\nimportAll(__webpack_require__(\"./src/graphql/resolvers/queries sync \\\\.ts$\"), exportedFunctions.Query);\r\nimportAll(__webpack_require__(\"./src/graphql/resolvers/mutations sync \\\\.ts$\"), exportedFunctions.Mutation);\r\nexports.default = exportedFunctions;\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/index.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/mutations/changeUser.ts":
/*!*******************************************************!*\
  !*** ./src/graphql/resolvers/mutations/changeUser.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar KnexClient_1 = __webpack_require__(/*! ../../../clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nvar argon2_1 = __importDefault(__webpack_require__(/*! argon2 */ \"argon2\"));\r\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\r\nexports.default = (function (_, _a, context) {\r\n    var username = _a.username, email = _a.email, password = _a.password;\r\n    return __awaiter(void 0, void 0, void 0, function () {\r\n        var update, _b, knex, res, user;\r\n        return __generator(this, function (_c) {\r\n            switch (_c.label) {\r\n                case 0:\r\n                    if (username)\r\n                        update.username = username;\r\n                    if (email)\r\n                        update.email = email;\r\n                    if (!password) return [3 /*break*/, 2];\r\n                    _b = update;\r\n                    return [4 /*yield*/, argon2_1.default.hash(password)];\r\n                case 1:\r\n                    _b.password = _c.sent();\r\n                    _c.label = 2;\r\n                case 2:\r\n                    if (!context.id)\r\n                        throw new apollo_server_express_1.ApolloError(\"Invalid token\");\r\n                    knex = KnexClient_1.createConnection();\r\n                    return [4 /*yield*/, knex(\"users\")\r\n                            .where(\"id\", context.id)\r\n                            .update(__assign({}, update))];\r\n                case 3:\r\n                    res = _c.sent();\r\n                    console.log(res);\r\n                    return [4 /*yield*/, knex(\"users\").select(\"id\", \"username\", \"email\", \"img\").where(\"id\", context.id)];\r\n                case 4:\r\n                    user = _c.sent();\r\n                    return [2 /*return*/, user[0]];\r\n            }\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/mutations/changeUser.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/mutations/createUser.ts":
/*!*******************************************************!*\
  !*** ./src/graphql/resolvers/mutations/createUser.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar argon2_1 = __importDefault(__webpack_require__(/*! argon2 */ \"argon2\"));\r\nvar KnexClient_1 = __webpack_require__(/*! ../../../clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\r\nvar validator_1 = __importDefault(__webpack_require__(/*! validator */ \"validator\"));\r\nexports.default = (function (_, _a) {\r\n    var user = _a.user;\r\n    return __awaiter(void 0, void 0, void 0, function () {\r\n        var username, email, password, knex, res, err_1;\r\n        return __generator(this, function (_b) {\r\n            switch (_b.label) {\r\n                case 0:\r\n                    username = user.username, email = user.email;\r\n                    return [4 /*yield*/, argon2_1.default.hash(user.password)];\r\n                case 1:\r\n                    password = _b.sent();\r\n                    knex = KnexClient_1.createConnection();\r\n                    if (!validator_1.default.isEmail(email)) {\r\n                        console.log(\"invalid email\");\r\n                        throw new apollo_server_express_1.ApolloError(\"Email is not valid\");\r\n                    }\r\n                    if (username.length > 16) {\r\n                        throw new apollo_server_express_1.ApolloError(\"Username too long\");\r\n                    }\r\n                    _b.label = 2;\r\n                case 2:\r\n                    _b.trys.push([2, 4, , 5]);\r\n                    return [4 /*yield*/, knex(\"users\").insert({ username: username, password: password, email: email })];\r\n                case 3:\r\n                    res = _b.sent();\r\n                    console.log(res);\r\n                    return [3 /*break*/, 5];\r\n                case 4:\r\n                    err_1 = _b.sent();\r\n                    console.log(err_1);\r\n                    return [3 /*break*/, 5];\r\n                case 5: return [2 /*return*/, \"Succeed\"];\r\n            }\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/mutations/createUser.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/mutations/deleteUser.ts":
/*!*******************************************************!*\
  !*** ./src/graphql/resolvers/mutations/deleteUser.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar KnexClient_1 = __webpack_require__(/*! ../../../clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nexports.default = (function (_, __, context) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var knex;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                if (!context.id) return [3 /*break*/, 2];\r\n                knex = KnexClient_1.createConnection();\r\n                return [4 /*yield*/, knex(\"users\").where(\"id\", context.id).delete()];\r\n            case 1:\r\n                _a.sent();\r\n                _a.label = 2;\r\n            case 2: return [2 /*return*/, \"deleted\"];\r\n        }\r\n    });\r\n}); });\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/mutations/deleteUser.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/queries/getUser.ts":
/*!**************************************************!*\
  !*** ./src/graphql/resolvers/queries/getUser.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar KnexClient_1 = __webpack_require__(/*! ../../../clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\r\nexports.default = (function (_, _a) {\r\n    var id = _a.id, username = _a.username;\r\n    return __awaiter(void 0, void 0, void 0, function () {\r\n        var knex, res;\r\n        return __generator(this, function (_b) {\r\n            switch (_b.label) {\r\n                case 0:\r\n                    knex = KnexClient_1.createConnection();\r\n                    return [4 /*yield*/, knex(\"users\")\r\n                            .select(\"id\", \"username\", \"email\", \"img\")\r\n                            .where({ id: id ? id : \"\" })\r\n                            .orWhere({ username: username ? username : \"\" })];\r\n                case 1:\r\n                    res = _b.sent();\r\n                    if (res.length === 0) {\r\n                        throw new apollo_server_express_1.ApolloError(\"User not found\");\r\n                    }\r\n                    return [2 /*return*/, res[0]];\r\n            }\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/queries/getUser.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/queries/getUsers.ts":
/*!***************************************************!*\
  !*** ./src/graphql/resolvers/queries/getUsers.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar KnexClient_1 = __webpack_require__(/*! ../../../clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nvar apollo_server_express_1 = __webpack_require__(/*! apollo-server-express */ \"apollo-server-express\");\r\nexports.default = (function (_, _a) {\r\n    var page = _a.page;\r\n    return __awaiter(void 0, void 0, void 0, function () {\r\n        var p, perPage, knex, res;\r\n        return __generator(this, function (_b) {\r\n            switch (_b.label) {\r\n                case 0:\r\n                    p = page ? page : 0;\r\n                    perPage = 20;\r\n                    knex = KnexClient_1.createConnection();\r\n                    return [4 /*yield*/, knex(\"users\")\r\n                            .select(\"id\", \"username\", \"email\", \"img\")\r\n                            .offset(p * perPage)\r\n                            .limit(perPage)];\r\n                case 1:\r\n                    res = _b.sent();\r\n                    if (res.length === 0) {\r\n                        throw new apollo_server_express_1.ApolloError(\"User not found\");\r\n                    }\r\n                    return [2 /*return*/, res];\r\n            }\r\n        });\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/queries/getUsers.ts?");

/***/ }),

/***/ "./src/graphql/schema.ts":
/*!*******************************!*\
  !*** ./src/graphql/schema.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.default = \"\\n  input UserInput {\\n    username: String!,\\n    email: String!,\\n    password: String!,\\n  }\\n\\n  input ChangeUser {\\n    username: String,\\n    email: String,\\n    password: String,\\n  }\\n\\n  type User {\\n    id: String!\\n    username: String!,\\n    email: String!,\\n    img: String\\n  }\\n\\n  type Query {\\n    getUser(id: String,username: String): User!\\n    getUsers(page: Int) : [User]!\\n  }\\n\\n  type Mutation {\\n    createUser(user: UserInput!): String! \\n    changeUser(user: ChangeUser!): User!\\n    deleteUser: String!\\n  }\\n\";\r\n\n\n//# sourceURL=webpack://User-service/./src/graphql/schema.ts?");

/***/ }),

/***/ "./src/grpc/confirmLogin.ts":
/*!**********************************!*\
  !*** ./src/grpc/confirmLogin.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.checkLogin = exports.confirmLogin = void 0;\r\nvar KnexClient_1 = __webpack_require__(/*! ../clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nvar argon2_1 = __importDefault(__webpack_require__(/*! argon2 */ \"argon2\"));\r\nvar confirmLogin = function (call, cb) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var knex, _a, login, password, res, _b;\r\n    return __generator(this, function (_c) {\r\n        switch (_c.label) {\r\n            case 0:\r\n                knex = KnexClient_1.createConnection();\r\n                _a = call.request, login = _a.login, password = _a.password;\r\n                console.log(call.request);\r\n                return [4 /*yield*/, knex(\"users\")\r\n                        .select(\"id\", \"password\", \"username\", \"email\")\r\n                        .where(\"username\", login)\r\n                        .orWhere(\"email\", login)];\r\n            case 1:\r\n                res = _c.sent();\r\n                console.log(res);\r\n                _b = res.length === 0;\r\n                if (_b) return [3 /*break*/, 3];\r\n                return [4 /*yield*/, argon2_1.default.verify(res[0].password, password)];\r\n            case 2:\r\n                _b = !(_c.sent());\r\n                _c.label = 3;\r\n            case 3:\r\n                if (_b) {\r\n                    cb(null, { id: \"\", flag: false });\r\n                }\r\n                cb(null, { id: res[0].id, flag: true });\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nexports.confirmLogin = confirmLogin;\r\nvar checkLogin = function (call, cb) { return __awaiter(void 0, void 0, void 0, function () {\r\n    var knex, res;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                knex = KnexClient_1.createConnection();\r\n                return [4 /*yield*/, knex(\"users\")\r\n                        .select(\"id\", \"username\", \"email\", \"img\")\r\n                        .where(\"id\", call.request.id)];\r\n            case 1:\r\n                res = _a.sent();\r\n                console.log(res[0]);\r\n                cb(null, { u: __assign({}, res[0]) });\r\n                return [2 /*return*/];\r\n        }\r\n    });\r\n}); };\r\nexports.checkLogin = checkLogin;\r\n\n\n//# sourceURL=webpack://User-service/./src/grpc/confirmLogin.ts?");

/***/ }),

/***/ "./src/grpc/index.ts":
/*!***************************!*\
  !*** ./src/grpc/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.main = exports.client = void 0;\r\nvar grpc_1 = __importDefault(__webpack_require__(/*! grpc */ \"grpc\"));\r\nvar proto_loader_1 = __webpack_require__(/*! @grpc/proto-loader */ \"@grpc/proto-loader\");\r\nvar path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\r\nvar confirmLogin_1 = __webpack_require__(/*! ./confirmLogin */ \"./src/grpc/confirmLogin.ts\");\r\nvar protoPath = path_1.default.join(process.cwd(), \"src\", \"grpc\", \"auth.proto\");\r\nvar packageDef = proto_loader_1.loadSync(protoPath, {\r\n    keepCase: true,\r\n    longs: String,\r\n    enums: String,\r\n    defaults: true,\r\n    oneofs: true,\r\n});\r\nvar confirmProto = grpc_1.default.loadPackageDefinition(packageDef).Confirm;\r\nvar accessProto = grpc_1.default.loadPackageDefinition(packageDef).AccessToken;\r\nexports.client = new accessProto(\"localhost:3004\", grpc_1.default.credentials.createInsecure());\r\nvar main = function () {\r\n    var server = new grpc_1.default.Server();\r\n    server.addService(confirmProto.service, { confirmLogin: confirmLogin_1.confirmLogin, checkLogin: confirmLogin_1.checkLogin });\r\n    server.bindAsync(\":3005\", grpc_1.default.ServerCredentials.createInsecure(), function () {\r\n        server.start();\r\n        console.log(\"Server running at http://127.0.0.1:3005\");\r\n    });\r\n};\r\nexports.main = main;\r\n\n\n//# sourceURL=webpack://User-service/./src/grpc/index.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar app_1 = __importDefault(__webpack_require__(/*! ./app */ \"./src/app.ts\"));\r\nvar http_1 = __importDefault(__webpack_require__(/*! http */ \"http\"));\r\nvar KnexClient_1 = __webpack_require__(/*! ./clients/KnexClient */ \"./src/clients/KnexClient.ts\");\r\nvar grpc_1 = __webpack_require__(/*! ./grpc */ \"./src/grpc/index.ts\");\r\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\r\nvar server = http_1.default.createServer(app_1.default);\r\nvar normalizePort = function (val) {\r\n    if (typeof val === \"string\") {\r\n        var port_1 = parseInt(val, 10);\r\n        return port_1;\r\n    }\r\n    else if (val >= 0) {\r\n        return val;\r\n    }\r\n    throw new Error(\"Failed to normalize port\");\r\n};\r\nvar onListening = function () {\r\n    var addr = server.address();\r\n    var bind = typeof addr === \"string\" ? \"pipe \" + addr : \"port \" + (addr === null || addr === void 0 ? void 0 : addr.port);\r\n    console.log(\"Listening on \" + bind);\r\n};\r\nvar port = normalizePort(\"4000\");\r\napp_1.default.set(\"port\", port);\r\nvar onError = function (error) {\r\n    console.log(error);\r\n    if (error.syscall !== \"listen\") {\r\n        throw error;\r\n    }\r\n    var bind = typeof port === \"string\" ? \"Pipe \" + port : \"Port \" + port;\r\n    switch (error.code) {\r\n        case \"EACCES\":\r\n            console.error(bind + \"requires elevated privileges\");\r\n            process.exit(1);\r\n        case \"EADDRINUSE\":\r\n            console.error(bind + \"is already in use\");\r\n            process.exit(1);\r\n        default:\r\n            throw error;\r\n    }\r\n};\r\nvar knex = KnexClient_1.createConnection();\r\nknex.raw(\"select 1+1 as result\").catch(function (err) { return console.log(err); });\r\nserver.listen(port);\r\nserver.on(\"error\", onError);\r\nserver.on(\"listening\", onListening);\r\ngrpc_1.main();\r\n\n\n//# sourceURL=webpack://User-service/./src/server.ts?");

/***/ }),

/***/ "./src/graphql/resolvers/mutations sync \\.ts$":
/*!******************************************************************!*\
  !*** ./src/graphql/resolvers/mutations/ sync nonrecursive \.ts$ ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./changeUser.ts\": \"./src/graphql/resolvers/mutations/changeUser.ts\",\n\t\"./createUser.ts\": \"./src/graphql/resolvers/mutations/createUser.ts\",\n\t\"./deleteUser.ts\": \"./src/graphql/resolvers/mutations/deleteUser.ts\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/graphql/resolvers/mutations sync \\\\.ts$\";\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/mutations/_sync_nonrecursive_\\.ts$?");

/***/ }),

/***/ "./src/graphql/resolvers/queries sync \\.ts$":
/*!****************************************************************!*\
  !*** ./src/graphql/resolvers/queries/ sync nonrecursive \.ts$ ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./getUser.ts\": \"./src/graphql/resolvers/queries/getUser.ts\",\n\t\"./getUsers.ts\": \"./src/graphql/resolvers/queries/getUsers.ts\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/graphql/resolvers/queries sync \\\\.ts$\";\n\n//# sourceURL=webpack://User-service/./src/graphql/resolvers/queries/_sync_nonrecursive_\\.ts$?");

/***/ }),

/***/ "@grpc/proto-loader":
/*!*************************************!*\
  !*** external "@grpc/proto-loader" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@grpc/proto-loader");;

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("apollo-server-express");;

/***/ }),

/***/ "argon2":
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("argon2");;

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");;

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

/***/ "grpc":
/*!***********************!*\
  !*** external "grpc" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("grpc");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("knex");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "validator":
/*!****************************!*\
  !*** external "validator" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("validator");;

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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;