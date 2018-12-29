"use strict";
exports.__esModule = true;
var winston_1 = require("winston");
var path = require("path");
var uuid = require("node-uuid");
var fs = require("fs");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf, prettyPrint = winston_1.format.prettyPrint, splat = winston_1.format.splat, json = winston_1.format.json;
var logDirectory = path.resolve(__dirname, './logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
['errors', 'combined'].forEach(function (d) {
    var t = path.join(logDirectory, d);
    if (!fs.existsSync(t)) {
        fs.mkdirSync(t);
    }
});
var id = uuid.v4();
var errorFilename = path.join(logDirectory, 'errors', "error-" + id + ".log");
var combinedFilename = path.join(logDirectory, 'combined', "combined-" + id + ".log");
var logger = winston_1.createLogger({
    level: 'info',
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new winston_1.transports.File({
            filename: errorFilename,
            level: 'error'
        }),
        new winston_1.transports.File({
            filename: combinedFilename
        })
    ]
});
exports.logger = logger;
var originalLog = logger.__proto__.log;
logger.__proto__.log = function (level, msg, meta) {
    var correlationId = uuid.v4();
    return Object.assign({ correlationId: correlationId }, originalLog.apply(logger, [level, msg, meta, { correlationId: correlationId }]));
};
logger.log('info', 'App Started.');
