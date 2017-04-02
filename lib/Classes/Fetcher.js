"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var ExceptionTracker_1 = require("./ExceptionTracker");
var Timer_1 = require("./Timer");
var MAX_RETRY_REQUEST = 5;
var RETRING_DELAY_DURATION = 2000;
/**
 * JSON Fetcher
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 */
var Fetcher = (function () {
    /**
     * WebAPIを取得するクラス
     *
     * 取得しつつ詳細なエラートラッキングをする
     */
    function Fetcher() {
        this._retryCounter = 0;
        this._cache = {};
        //
    }
    /**
     * リクエストを投げてAPIデータを取得する
     *
     * @param requestUri WebAPIのエンドポイントURI
     * @param option fetch関数と同じオプション
     * @param errorHandler API独自のエラー処理
     * @param cache キャッシュの利用
     */
    Fetcher.prototype.request = function (requestUri, option, errorHandler, cache) {
        if (cache === void 0) { cache = true; }
        return __awaiter(this, void 0, void 0, function () {
            var networkError, responce, result, willRetry, willWait, handleResult, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // log
                        if ('console' in window) {
                            console.info("Request to " + requestUri);
                        }
                        // キャッシュの確認
                        if (cache && this._cache[requestUri] != null) {
                            console.info("use cache " + requestUri);
                            return [2 /*return*/, Promise.resolve(this._cache[requestUri])];
                        }
                        networkError = new Error();
                        networkError.name = ExceptionTracker_1.default.ERROR_NAME_NETWORK_ERROR;
                        return [4 /*yield*/, fetch(requestUri, option)];
                    case 1:
                        responce = _a.sent();
                        // ⏳ awaiting...
                        // レスポンスの確認 fetchは異常ステータスでもPromise::rejectされない
                        if (!responce.ok) {
                            // エラーオブジェクトに整形したメッセージを入れる まだ投げない
                            networkError.message = (option.method || 'get').toUpperCase() + " " + requestUri + " " + responce.status + " " + responce.statusText;
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, , 10]);
                        return [4 /*yield*/, responce.json()];
                    case 3:
                        result = _a.sent();
                        willRetry = false;
                        willWait = false;
                        // API独自のエラーハンドリングがある場合はここで処理をする
                        if (errorHandler) {
                            handleResult = errorHandler(result, this._retryCounter, this.isOverRetryCount.bind(this));
                            // 結果を反映する
                            networkError.name = handleResult.errorName;
                            networkError.message += handleResult.errorMessage;
                            willRetry = handleResult.willRetry;
                            willWait = handleResult.willWait;
                        }
                        if (!willRetry) return [3 /*break*/, 7];
                        // 例外を投げると処理が中断するので、エラートラッカーにエラー通知して処理を続行する
                        ExceptionTracker_1.default.catch(networkError);
                        if (!willWait) return [3 /*break*/, 5];
                        // 待機フラグがある場合 指定秒待機
                        return [4 /*yield*/, Timer_1.default.delay(RETRING_DELAY_DURATION)()];
                    case 4:
                        // 待機フラグがある場合 指定秒待機
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        // ⏳ awaiting... かもしれない
                        // カウンターを増やしてリトライする
                        this._retryCounter++;
                        return [4 /*yield*/, this.request(requestUri, option, errorHandler)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        if (networkError.message) {
                            // メッセージがエラーオブジェクトに入っていれば例外を投げる 👉 ②へ
                            throw networkError;
                        }
                        _a.label = 8;
                    case 8:
                        // エラーが何もなければ成功
                        // リトライ中であればカウンターをリセットして結果を返却
                        this._retryCounter = 0;
                        // キャッシュする
                        this._cache[requestUri] = result;
                        return [2 /*return*/, result];
                    case 9:
                        e_1 = _a.sent();
                        // 最終的な例外時もカウンターをリセットする
                        this._retryCounter = 0;
                        if (e_1 instanceof SyntaxError) {
                            /**
                             * ①
                             * JSONのパースエラー（SyntaxError）
                             * ネットワークエラーにエラーメッセージを追加させるかたちで例外を投げる
                             */
                            networkError.message += " --> " + e_1;
                            return [2 /*return*/, Promise.reject(networkError)];
                        }
                        else {
                            /**
                             * ②
                             * 上記のtryスコープでスタックしてきたエラーオブジェクト
                             * そのまま例外を投げる
                             */
                            return [2 /*return*/, Promise.reject(e_1)];
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Fetcher.prototype.isOverRetryCount = function () {
        return MAX_RETRY_REQUEST <= this._retryCounter;
    };
    return Fetcher;
}());
exports.default = Fetcher;
