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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var targetElements = new WeakMap(); // tslint:disable-line:no-any
var Sequencer = (function () {
    /**
     * 要素ごとに何かしらの逐次処理を実行させるクラス
     *
     * 第2引数に数値を与えると **ステップ間の経過時間** と解釈され、
     * `Sequencer.animationFrameProgression(duration)` を指定したことと同義になる。
     *
     * @param elements 逐次処理をする対象の要素リスト
     * @param stepDurationOrProgression ステップ間の経過時間 もしくは ステップ間の進捗処理
     * @param init 初期処理
     */
    function Sequencer(elements, stepDurationOrProgression, init) {
        this.isRepeat = false;
        this._currentStepIndex = 0;
        this._state = 'before-create';
        this._standBy = false;
        this._progressRate = 0;
        this._available = false;
        this._stopper = Symbol('seaquence-stopper');
        targetElements.set(this, elements);
        if (typeof stepDurationOrProgression === 'number') {
            this._sequenceProgression = Sequencer.animationFrameProgression(stepDurationOrProgression);
        }
        else {
            this._sequenceProgression = stepDurationOrProgression;
        }
        this._create(init);
    }
    Sequencer.delay = function (delayTime, context) {
        return new Promise(function (resolve) {
            setTimeout(function () { return resolve(context); }, delayTime);
        });
    };
    Sequencer.animationFrameProgression = function (duration) {
        var startTimestamp;
        return function (rate, index) {
            // STOP -> STARTに対応していない
            return new Promise(function (resolve) {
                if (rate === 0) {
                    // initialize startTimestamp
                    startTimestamp = Date.now();
                }
                requestAnimationFrame(function () { return resolve((Date.now() - startTimestamp) / duration); });
            });
        };
    };
    Object.defineProperty(Sequencer.prototype, "elements", {
        /**
         * シーケンス処理をする対象の要素リスト
         */
        get: function () {
            return targetElements.get(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * シーケンス処理を開始する
     *
     * @chainable
     */
    Sequencer.prototype.start = function () {
        if (this._state === 'before-create') {
            this._standBy = true;
        }
        else {
            this._available = true;
            this._seq();
        }
        return this;
    };
    /**
     *
     */
    Sequencer.prototype.stop = function () {
        this._available = false;
        return this;
    };
    /**
     * 処理をはじめに開始する要素番号を指定する
     *
     * @chainable
     */
    Sequencer.prototype.setStartIndex = function (index) {
        // TODO: validation
        this._currentStepIndex = index;
        return this;
    };
    /**
     * 繰り返し処理をするかどうか指定する
     *
     * @chainable
     * @param repeat 繰り返す
     */
    Sequencer.prototype.repeat = function (repeat) {
        this.isRepeat = repeat;
        return this;
    };
    /**
     * 開始前のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onBeforeStart = function (handler) {
        this._onBeforeStartHandler = handler.bind(this);
        return this;
    };
    /**
     * 開始時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onStart = function (handler) {
        this._onStartHandler = handler.bind(this);
        return this;
    };
    /**
     * 処理中のイベント
     *
     * requestAnimationFrameのタイミングで発火する
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onProgress = function (handler) {
        this._onProgressHandler = handler.bind(this);
        return this;
    };
    /**
     * 1つのシーケンスステップが終わった時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onBeforeStepEnd = function (handler) {
        this._onBeforeStepEndHandler = handler.bind(this);
        return this;
    };
    /**
     * 次のシーケンスに移る直前のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onBeforeContinue = function (handler) {
        this._onBeforeContinueHandler = handler.bind(this);
        return this;
    };
    /**
     * 次のシーケンスに移った時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onContinue = function (handler) {
        this._onContinueHandler = handler.bind(this);
        return this;
    };
    /**
     * 終了時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onFinish = function (handler) {
        this._onFinishHandler = handler.bind(this);
        return this;
    };
    /**
     * 停止時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    Sequencer.prototype.onStopped = function (handler) {
        this._onStoppedHandler = handler.bind(this);
        return this;
    };
    Sequencer.prototype._create = function (init) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._init(init)];
                    case 1:
                        _a.sent();
                        this._state = 'stop';
                        if (!this._standBy) return [3 /*break*/, 3];
                        this._standBy = false;
                        this._available = true;
                        return [4 /*yield*/, this._seq()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._init = function (init) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!init) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, init.call(this, this._getEventObject())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._seq = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rejectReason_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this._beforeStart()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._start()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._step()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this._stepEnd()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        rejectReason_1 = _a.sent();
                        if (this._stopper === rejectReason_1) {
                            this._onStoppedHandler.call(this);
                            return [2 /*return*/];
                        }
                        else {
                            throw rejectReason_1;
                        }
                        return [3 /*break*/, 6];
                    case 6:
                        if (!this._uncontinuable()) return [3 /*break*/, 7];
                        this._finish();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this._continue()];
                    case 8:
                        _a.sent();
                        this._seq();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'before-start';
                        if (!this._onBeforeStartHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onBeforeStartHandler(this._getEventObject())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'started';
                        if (!this._onStartHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onStartHandler(this._getEventObject())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._step = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'progress';
                        if (this._progressRate >= 1) {
                            this._progressRate = 0;
                        }
                        _a.label = 1;
                    case 1: return [4 /*yield*/, this._progress()];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        ; // tslint:disable-line:curly
                        return [3 /*break*/, 1];
                    case 3:
                        if (!this._onBeforeStepEndHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onBeforeStepEndHandler(this._getEventObject())];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._progress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        return [4 /*yield*/, this._sequenceProgression(this._progressRate, this._currentStepIndex)];
                    case 1:
                        rate = _a.sent();
                        this._progressRate = Math.min(rate, 1);
                        if (this._onProgressHandler) {
                            this._onProgressHandler(this._getEventObject());
                        }
                        if (this._progressRate < 1) {
                            return [2 /*return*/, Promise.resolve(true)];
                        }
                        return [2 /*return*/, Promise.resolve(false)];
                }
            });
        });
    };
    Sequencer.prototype._stepEnd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._available) {
                    return [2 /*return*/, Promise.reject(this._stopper)];
                }
                this._state = 'step-end';
                return [2 /*return*/];
            });
        });
    };
    Sequencer.prototype._continue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var elements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        elements = this.elements;
                        if (!this._onBeforeContinueHandler) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._onBeforeContinueHandler(this._getEventObject())];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!this._available) {
                            return [2 /*return*/, Promise.reject(this._stopper)];
                        }
                        this._state = 'continue';
                        this._currentStepIndex += 1;
                        if (elements.length <= this._currentStepIndex) {
                            this._currentStepIndex = 0;
                        }
                        if (!this._onContinueHandler) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this._onContinueHandler(this._getEventObject())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sequencer.prototype._finish = function () {
        this._state = 'stop';
        if (this._onFinishHandler) {
            this._onFinishHandler(this._getEventObject());
        }
    };
    Sequencer.prototype._getEventObject = function () {
        var elements = this.elements;
        return {
            current: elements[this._currentStepIndex],
            prev: elements[this._currentStepIndex - 1] || elements[elements.length - 1] || null,
            next: elements[this._currentStepIndex + 1] || elements[0] || null,
            index: this._currentStepIndex,
            list: elements,
            rate: this._progressRate,
            state: this._state,
        };
    };
    Sequencer.prototype._uncontinuable = function () {
        return this.elements.length - 1 <= this._currentStepIndex && !this.isRepeat;
    };
    return Sequencer;
}());
exports.default = Sequencer;
