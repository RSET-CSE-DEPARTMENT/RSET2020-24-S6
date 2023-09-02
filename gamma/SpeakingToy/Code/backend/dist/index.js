"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
var socket_io_1 = require("socket.io");
var dotenv = __importStar(require("dotenv"));
var dialogflow_1 = require("./dialogflow");
var speech_1 = require("./speech");
var translate_1 = require("./translate");
var path = __importStar(require("path"));
var http = __importStar(require("http"));
var express_1 = __importDefault(require("express"));
var sourceMapSupport = __importStar(require("source-map-support"));
var fs = __importStar(require("fs"));
var ss = require('socket.io-stream');
dotenv.config();
sourceMapSupport.install();
var App = exports.App = (function () {
    function App() {
        this.createApp();
        this.createServer();
        this.sockets();
        this.listen();
        this.baseLang = process.env.LANGUAGE_CODE || '';
    }
    App.prototype.createApp = function () {
        this.app = (0, express_1.default)();
        this.app.set('trust proxy', true);
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use('/', express_1.default.static(path.join(__dirname, './dist/public')));
    };
    App.prototype.createServer = function () {
        this.server = http.createServer(this.app);
    };
    App.prototype.sockets = function () {
        this.io = new socket_io_1.Server(this.server);
    };
    App.prototype.listen = function () {
        var _this = this;
        var me = this;
        this.server.listen(App.PORT, function () {
            console.log('Running server on port: %s', App.PORT);
        });
        this.io.on('connect', function (client) {
            var me = _this;
            me.socketClient = client;
            console.log("Client connected [id=".concat(client.id, "]"));
            client.emit('server_setup', "Server connected [id=".concat(client.id, "]"));
            ss(client).on('stream-speech', function (stream, data) {
                return __awaiter(this, void 0, void 0, function () {
                    var filename, targetLang;
                    return __generator(this, function (_a) {
                        filename = path.basename(data.name);
                        targetLang = data.language;
                        stream.pipe(fs.createWriteStream(filename));
                        speech_1.speech.speechStreamToText(stream, targetLang, function (transcribeObj) {
                            return __awaiter(this, void 0, void 0, function () {
                                var response, intentMatch, intentResponse;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            me.socketClient.emit('transcript', transcribeObj.transcript);
                                            response = transcribeObj.transcript;
                                            if (!(targetLang != me.baseLang)) return [3, 2];
                                            return [4, translate_1.translate.translate(transcribeObj.transcript, me.baseLang)];
                                        case 1:
                                            response = _a.sent();
                                            response = response.translatedText;
                                            _a.label = 2;
                                        case 2: return [4, dialogflow_1.dialogflow.detectIntent(response)];
                                        case 3:
                                            intentMatch = _a.sent();
                                            intentResponse = intentMatch.FULFILLMENT_TEXT;
                                            if (!(targetLang != me.baseLang)) return [3, 5];
                                            return [4, translate_1.translate.translate(intentMatch.FULFILLMENT_TEXT, targetLang)];
                                        case 4:
                                            intentResponse = _a.sent();
                                            intentResponse = intentResponse.translatedText;
                                            intentMatch.TRANSLATED_FULFILLMENT = intentResponse;
                                            me.socketClient.emit('results', intentMatch);
                                            return [3, 6];
                                        case 5:
                                            intentMatch.TRANSLATED_FULFILLMENT = intentMatch.FULFILLMENT_TEXT;
                                            me.socketClient.emit('results', intentMatch);
                                            _a.label = 6;
                                        case 6:
                                            speech_1.speech.textToSpeech(intentResponse, targetLang).then(function (audio) {
                                                me.socketClient.emit('audio', audio);
                                            }).catch(function (e) { console.log(e); });
                                            return [2];
                                    }
                                });
                            });
                        });
                        return [2];
                    });
                });
            });
        });
    };
    App.PORT = parseInt(process.env.PORT || '8080');
    return App;
}());
exports.app = new App();
