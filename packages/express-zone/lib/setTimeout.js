"use strict";
exports.__esModule = true;
function setTimeoutInExpress(fn, ms, next) {
    if (!next)
        throw new Error('you must implement next function');
    setTimeout(function () {
        try {
            fn();
        }
        catch (e) {
            next(e);
        }
    }, ms);
}
exports.setTimeout = setTimeoutInExpress;
