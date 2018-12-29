"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var logger_1 = require("./logger");
exports.clientErrorHandler = function (error, req, res, next) {
    if (error instanceof AppHttpError) {
        return res.status(error.httpCode).send({ error: error.message });
    }
    var correlationId = logger_1.logger.log('error', 'Express Middleware %s', error).correlationId;
    console.log('[logErrors]', error, correlationId);
    if (req.xhr) {
        res.status(500).send({ correlationId: correlationId });
    }
    else {
        next(correlationId);
    }
};
exports.errorHandler = function (correlationId, req, res, next) {
    res.status(500).send({ correlationId: correlationId });
    // res.status(500);
    // res.render('error', { error: err });
};
exports.async = function (fn) { return function (req, res, next) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return Promise.resolve(fn.apply(void 0, [req, res, next].concat(args)))["catch"](next);
}; };
exports.asyncAll = function (fns) { return fns.map(function (fn) { return exports.async(fn); }); };
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, AppError.prototype);
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var AppHttpError = /** @class */ (function (_super) {
    __extends(AppHttpError, _super);
    function AppHttpError(httpCode, message) {
        var _this = _super.call(this, message) || this;
        _this.httpCode = httpCode;
        Object.setPrototypeOf(_this, AppHttpError.prototype);
        return _this;
    }
    return AppHttpError;
}(AppError));
exports.AppHttpError = AppHttpError;
