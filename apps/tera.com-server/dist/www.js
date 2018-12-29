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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./bin/www.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! compression */ "compression");
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express-session */ "express-session");
/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! helmet */ "helmet");
/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var method_override__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! method-override */ "method-override");
/* harmony import */ var method_override__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(method_override__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! express-zone */ "express-zone");
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(express_zone__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes */ "./routes/index.ts");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! auth-node */ "auth-node");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(auth_node__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_11__);












passport__WEBPACK_IMPORTED_MODULE_11___default.a.use(auth_node__WEBPACK_IMPORTED_MODULE_10__["facebookStrategy"]);
passport__WEBPACK_IMPORTED_MODULE_11___default.a.use(auth_node__WEBPACK_IMPORTED_MODULE_10__["twitterStrategy"]);
passport__WEBPACK_IMPORTED_MODULE_11___default.a.use(auth_node__WEBPACK_IMPORTED_MODULE_10__["linkedinStrategy"]);
passport__WEBPACK_IMPORTED_MODULE_11___default.a.use(auth_node__WEBPACK_IMPORTED_MODULE_10__["googleStrategy"]);
const app = express__WEBPACK_IMPORTED_MODULE_3___default()();
app.use(Object(body_parser__WEBPACK_IMPORTED_MODULE_0__["json"])());
app.use(Object(body_parser__WEBPACK_IMPORTED_MODULE_0__["urlencoded"])({
  extended: true
}));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());
app.use(compression__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(method_override__WEBPACK_IMPORTED_MODULE_6___default()());
app.use(helmet__WEBPACK_IMPORTED_MODULE_5___default()());
app.use(express_session__WEBPACK_IMPORTED_MODULE_4___default()({
  secret: 'SECRET'
}));
app.use(passport__WEBPACK_IMPORTED_MODULE_11___default.a.initialize());
app.use(passport__WEBPACK_IMPORTED_MODULE_11___default.a.session());
app.use(_routes__WEBPACK_IMPORTED_MODULE_9__["routes"]);
app.use(express__WEBPACK_IMPORTED_MODULE_3___default.a.static(path__WEBPACK_IMPORTED_MODULE_7___default.a.resolve(__dirname, './public')));
app.get('*', (req, res) => {
  res.sendFile(path__WEBPACK_IMPORTED_MODULE_7___default.a.resolve(__dirname, './public/index.html'));
});
app.use(express_zone__WEBPACK_IMPORTED_MODULE_8__["clientErrorHandler"]);
app.use(express_zone__WEBPACK_IMPORTED_MODULE_8__["errorHandler"]);
/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./bin/env.ts":
/*!********************!*\
  !*** ./bin/env.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express-zone */ "express-zone");
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express_zone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);


process.on('uncaughtException', error => {
  console.error({
    error
  });

  try {
    const _logger$log = express_zone__WEBPACK_IMPORTED_MODULE_0__["logger"].log('error', 'Uncaught Exception %s', error),
          correlationId = _logger$log.correlationId;

    console.error('[uncaughtException correlationId]: ', correlationId);

    if (!isTrustedError(error)) {
      process.nextTick(() => process.exit());
    }
  } catch (e) {
    console.log(`*** \n[uncaughtException catch e] ${e}\n[uncaughtException error] ${error} \n ***`);
    process.nextTick(() => process.exit(1));
  }
});
let path = '.env';

if (process.env.DEBUG_ENV && process.env.DEBUG_ENV.length > 0 && process.env.DEBUG_ENV.toLocaleLowerCase() !== 'development') {
  path = `.${process.env.DEBUG_ENV}.env`;
}

dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.config({
  path
});

function isTrustedError(error) {
  return error.isOperational;
}

/***/ }),

/***/ "./bin/www.ts":
/*!********************!*\
  !*** ./bin/www.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ "./bin/env.ts");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! auth-node */ "auth-node");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(auth_node__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-zone */ "express-zone");
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_zone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./app.ts");





const PORT = process.env.PORT || 3000;

async function createServer() {
  auth_node__WEBPACK_IMPORTED_MODULE_1__["db"].connection.once('open', async () => {
    express_zone__WEBPACK_IMPORTED_MODULE_2__["logger"].log('Connection database has been established successfully.'); // await db.connection.db.dropDatabase();

    const server = http__WEBPACK_IMPORTED_MODULE_3___default.a.createServer(_app__WEBPACK_IMPORTED_MODULE_4__["default"]);
    server.listen(PORT, () => {
      express_zone__WEBPACK_IMPORTED_MODULE_2__["logger"].log(`app listening on port ${PORT}!`);
    });
  });
  await auth_node__WEBPACK_IMPORTED_MODULE_1__["db"].connect();
}

createServer();

/***/ }),

/***/ "./routes/api/index.ts":
/*!*****************************!*\
  !*** ./routes/api/index.ts ***!
  \*****************************/
/*! exports provided: api */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return router; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _v1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v1 */ "./routes/api/v1/index.ts");


const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.all('/', (req, res) => {
  console.log('in /api');
  res.json({
    ok: true
  });
});
router.use('/v1', _v1__WEBPACK_IMPORTED_MODULE_1__["v1"]);


/***/ }),

/***/ "./routes/api/v1/activity/index.ts":
/*!*****************************************!*\
  !*** ./routes/api/v1/activity/index.ts ***!
  \*****************************************/
/*! exports provided: activity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activity", function() { return router; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
 // import { activitiesMetadata } from '@libs/tera-activities';

const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.get('/', (req, res, next) => {// console.log('activitiesMetadata', activitiesMetadata);
  // res.json(activitiesMetadata['single-photo']);
});


/***/ }),

/***/ "./routes/api/v1/index.ts":
/*!********************************!*\
  !*** ./routes/api/v1/index.ts ***!
  \********************************/
/*! exports provided: v1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return router; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _activity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./activity */ "./routes/api/v1/activity/index.ts");
/* harmony import */ var _secure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./secure */ "./routes/api/v1/secure/index.ts");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users */ "./routes/api/v1/users/index.ts");




const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.use('/users', _users__WEBPACK_IMPORTED_MODULE_3__["users"]);
router.use('/activity', _activity__WEBPACK_IMPORTED_MODULE_1__["activity"]);
router.use('/secure', _secure__WEBPACK_IMPORTED_MODULE_2__["secure"]);


/***/ }),

/***/ "./routes/api/v1/secure/index.ts":
/*!***************************************!*\
  !*** ./routes/api/v1/secure/index.ts ***!
  \***************************************/
/*! exports provided: secure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secure", function() { return router; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! auth-node */ "auth-node");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(auth_node__WEBPACK_IMPORTED_MODULE_1__);


const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.all('/', auth_node__WEBPACK_IMPORTED_MODULE_1__["authenticate"], (req, res, next) => {
  const user = req.user;
  res.json({
    msg: 'this is secure data',
    user: user.toJSON()
  });
});


/***/ }),

/***/ "./routes/api/v1/users/index.ts":
/*!**************************************!*\
  !*** ./routes/api/v1/users/index.ts ***!
  \**************************************/
/*! exports provided: users */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "users", function() { return router; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! auth-node */ "auth-node");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(auth_node__WEBPACK_IMPORTED_MODULE_1__);


const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
router.post('/', auth_node__WEBPACK_IMPORTED_MODULE_1__["register"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.post('/login', auth_node__WEBPACK_IMPORTED_MODULE_1__["login"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.post('/verify', auth_node__WEBPACK_IMPORTED_MODULE_1__["verifyAccount"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.post('/notify-verify', auth_node__WEBPACK_IMPORTED_MODULE_1__["sendVerifyNotification"], (req, res, next) => {
  res.sendStatus(200);
});
router.post('/recover-account', auth_node__WEBPACK_IMPORTED_MODULE_1__["recoverAccount"], (req, res, next) => {
  res.sendStatus(200);
});
router.post('/verify-password', auth_node__WEBPACK_IMPORTED_MODULE_1__["verifyPassword"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.post('/password', auth_node__WEBPACK_IMPORTED_MODULE_1__["changePassword"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.post('/refresh', auth_node__WEBPACK_IMPORTED_MODULE_1__["refreshToken"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.post('/social', auth_node__WEBPACK_IMPORTED_MODULE_1__["disconnectFromSocial"], (req, res, next) => {
  const user = req.user;
  res.json(user.toJSON());
});
router.get('/auth/:social', (req, res, next) => {
  console.log('in auth');
  res.json({
    auth: true
  });
});
router.get('/auth/:social/return', (req, res, next) => {
  console.log('in auth return');
  res.json({
    auth: true
  });
});


/***/ }),

/***/ "./routes/auth/index.ts":
/*!******************************!*\
  !*** ./routes/auth/index.ts ***!
  \******************************/
/*! exports provided: auth, testA, testB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testA", function() { return testA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testB", function() { return testB; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passport */ "passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express_conditional_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express-conditional-middleware */ "express-conditional-middleware");
/* harmony import */ var express_conditional_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express_conditional_middleware__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var randomstring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! randomstring */ "randomstring");
/* harmony import */ var randomstring__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(randomstring__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! auth-node */ "auth-node");
/* harmony import */ var auth_node__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(auth_node__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express-zone */ "express-zone");
/* harmony import */ var express_zone__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express_zone__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);







const registerWithSocial = combineMiddleware([...Object(express_zone__WEBPACK_IMPORTED_MODULE_5__["asyncAll"])([Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["createUser"])(req => req.body), Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["sendWelcomeEmail"])({
  getUser: req => req.user
}), Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["updateUserFromSocial"])({
  getUser: req => req.user,
  getSocialResponse: req => req.social
}), Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["token"])()])]);
const loginWithSocial = combineMiddleware([...Object(express_zone__WEBPACK_IMPORTED_MODULE_5__["asyncAll"])([Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["authenticateUser"])(req => req.body), Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["updateUserFromSocial"])({
  getUser: req => req.user,
  getSocialResponse: req => req.social
}), Object(auth_node__WEBPACK_IMPORTED_MODULE_4__["token"])()])]);
const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
const options = {
  facebook: {
    session: false,
    scope: ['email'],
    authType: 'rerequest'
  }
};
router.get('/:social', (req, res, next) => Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])(req.params.social, options[req.params.social])(req, res, next));
router.get('/:social/callback', (req, res, next) => Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])(req.params.social, async (err, strategyResponse) => {
  console.log('in here');
  console.log({
    err,
    strategyResponse
  });
  req.social = strategyResponse;
  const email = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["get"])(req, 'social.profile.emails[0].value');
  const name = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["get"])(req, 'social.profile.displayName');
  const password = randomstring__WEBPACK_IMPORTED_MODULE_3__["generate"](8);

  if (!email) {
    res.end('SOCIAL_EMAIL_MISSING');
    return;
  }

  const user = await auth_node__WEBPACK_IMPORTED_MODULE_4__["User"].findOne({
    email
  });
  req.body = user ? {
    password: user.password,
    email: user.email
  } : {
    email,
    name,
    password
  };
  req.userExist = !!user;
  next();
})(req, res, next), express_conditional_middleware__WEBPACK_IMPORTED_MODULE_2___default()((req, res, next) => !req.userExist, registerWithSocial, loginWithSocial), (req, res, next) => {
  console.log('after all');
  const user = req.user;
  res.json(user.toJSON());
});

function combineMiddleware(mids) {
  return mids.reduce((a, b) => {
    return (req, res, next) => {
      a(req, res, err => {
        if (err) {
          return next(err);
        }

        b(req, res, next);
      });
    };
  });
}

router.get('/twitter', (req, res, next) => {
  Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])('twitter')(req, res, next);
});
router.get('/twitter/return', (req, res, next) => {
  Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])('twitter', (err, strategyResponse) => {
    if (err) {
      throw err;
    }

    const accessToken = strategyResponse.accessToken,
          refreshToken = strategyResponse.refreshToken,
          payload = strategyResponse.payload;
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    const message = {
      accessToken,
      payload,
      refreshToken,
      message: 'twitterLogin'
    };
    res.write(`
    <script>
       window.opener.postMessage(${JSON.stringify(message)}, "*");
       window.close();
    </script>`);
    res.end();
  })(req, res, next);
});
router.get('/linkedin', (req, res, next) => {
  Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])('linkedin', {
    scope: ['r_basicprofile', 'r_emailaddress']
  })(req, res, next);
});
router.get('/linkedin/return', (req, res, next) => {
  Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])('linkedin', (err, strategyResponse) => {
    if (err) {
      throw err;
    }

    const accessToken = strategyResponse.accessToken,
          refreshToken = strategyResponse.refreshToken,
          payload = strategyResponse.payload;
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    const message = {
      payload,
      accessToken,
      refreshToken,
      message: 'linkedinLogin'
    };
    res.write(`
    <script>
       window.opener.postMessage(${JSON.stringify(message)}, "*");
       window.close();
    </script>`);
    res.end();
  })(req, res, next);
});
router.get('/google', (req, res, next) => {
  Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])('google', {
    scope: ['profile', 'email']
  })(req, res, next);
});
router.get('/google/return', (req, res, next) => {
  Object(passport__WEBPACK_IMPORTED_MODULE_1__["authenticate"])('google', (err, strategyResponse) => {
    if (err) {
      throw err;
    }

    const accessToken = strategyResponse.accessToken,
          refreshToken = strategyResponse.refreshToken,
          payload = strategyResponse.payload;
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    const message = {
      payload,
      accessToken,
      refreshToken,
      message: 'googleLogin'
    };
    res.write(`
    <script>
       window.opener.postMessage(${JSON.stringify(message)}, "*");
       window.close();
    </script>`);
    res.end();
  })(req, res, next);
});

function testA(getAttributes) {
  return async (req, res, next) => {
    console.log('in test a');
    next();
  };
}
function testB(getAttributes) {
  return async (req, res, next) => {
    console.log('in test B');
    next();
  };
}

/***/ }),

/***/ "./routes/index.ts":
/*!*************************!*\
  !*** ./routes/index.ts ***!
  \*************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return router; });
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ "./routes/api/index.ts");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth */ "./routes/auth/index.ts");




const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.use('/api', cors__WEBPACK_IMPORTED_MODULE_0___default()(), _api__WEBPACK_IMPORTED_MODULE_2__["api"]);
router.use('/auth', _auth__WEBPACK_IMPORTED_MODULE_3__["auth"]);


/***/ }),

/***/ "auth-node":
/*!****************************!*\
  !*** external "auth-node" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("auth-node");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-conditional-middleware":
/*!*************************************************!*\
  !*** external "express-conditional-middleware" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-conditional-middleware");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),

/***/ "express-zone":
/*!*******************************!*\
  !*** external "express-zone" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-zone");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "randomstring":
/*!*******************************!*\
  !*** external "randomstring" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ })

/******/ });
//# sourceMappingURL=www.js.map