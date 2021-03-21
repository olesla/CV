"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var util_1 = require("util");
var path_1 = require("path");
var puppeteer_1 = require("puppeteer");
var handlebars_1 = require("handlebars");
var jsonData = require('./../data.json');
var readFile = util_1["default"].promisify(fs_1["default"].readFile);
var styles = ['./style.css'];
var scripts = [
    './node_modules/@fortawesome/fontawesome-free/js/brands.min.js',
    './node_modules/@fortawesome/fontawesome-free/js/solid.min.js',
    './node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js',
];
var data = jsonData;
function generatePdf() {
    return __awaiter(this, void 0, void 0, function () {
        var imgData, content, template, html, browser, page, _i, styles_1, style, _a, scripts_1, script, scriptFile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, readFile(path_1["default"].resolve('./profile.jpg'))];
                case 1:
                    imgData = _b.sent();
                    data.img = imgData.toString('base64');
                    return [4 /*yield*/, readFile(path_1["default"].resolve('./template.html'), 'utf8')];
                case 2:
                    content = _b.sent();
                    template = handlebars_1["default"].compile(content);
                    html = template(data);
                    return [4 /*yield*/, puppeteer_1["default"].launch()];
                case 3:
                    browser = _b.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 4:
                    page = _b.sent();
                    return [4 /*yield*/, page.setContent(html)];
                case 5:
                    _b.sent();
                    _i = 0, styles_1 = styles;
                    _b.label = 6;
                case 6:
                    if (!(_i < styles_1.length)) return [3 /*break*/, 9];
                    style = styles_1[_i];
                    return [4 /*yield*/, page.addStyleTag({ path: style })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    _a = 0, scripts_1 = scripts;
                    _b.label = 10;
                case 10:
                    if (!(_a < scripts_1.length)) return [3 /*break*/, 14];
                    script = scripts_1[_a];
                    return [4 /*yield*/, readFile(path_1["default"].resolve(script), 'utf8')];
                case 11:
                    scriptFile = _b.sent();
                    return [4 /*yield*/, page.addScriptTag({ content: scriptFile })];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13:
                    _a++;
                    return [3 /*break*/, 10];
                case 14: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, page.pdf({ path: 'cv.pdf', format: 'a4', printBackground: true })];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, browser.close()];
                case 17:
                    _b.sent();
                    console.info('PDF generated');
                    return [2 /*return*/];
            }
        });
    });
}
generatePdf();
