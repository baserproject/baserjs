"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var qs = require("qs");
var BaserElement_1 = require("./BaserElement");
var arrayShuffle_1 = require("../fn/arrayShuffle");
var scriptLoad_1 = require("../fn/scriptLoad");
var PLAYER_URL = 'https://www.youtube.com/embed/';
var API_URL = 'https://www.youtube.com/player_api';
/**
 * YouTube要素
 *
 * @version 1.0.0
 * @since 0.0.7
 *
 */
var YouTube = (function (_super) {
    __extends(YouTube, _super);
    function YouTube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * ムービーのID
         *
         * @version 1.0.0
         * @since 0.0.7
         *
         */
        _this.movieId = [];
        /**
         * data-{*}-state属性のキー
         */
        _this.stateKeyName = 'youtube';
        /**
         * APIスクリプトがロード済みで YTオブジェクトが使用可能かどうか
         */
        _this._apiIsLoaded = false;
        return _this;
    }
    /**
     * YouTubeのサムネイル画像を取得する
     *
     * @version 0.10.0
     * @since 0.9.1
     *
     */
    YouTube.getPosterImage = function (movieId, highQuality) {
        if (highQuality === void 0) { highQuality = false; }
        var THUMB_URL = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
        var THUMB_FILE_NAME = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
        return "https:" + THUMB_URL + movieId + THUMB_FILE_NAME;
    };
    // /**
    //  * 再設定する
    //  *
    //  * @version 0.0.7
    //  * @since 0.0.7
    //  * @param options オプション
    //  *
    //  */
    // public reload (options?: YouTubeOption): void {
    // 	this._init(options);
    // }
    /**
     * ミュートする
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    YouTube.prototype.mute = function () {
        this.player.mute();
        this._isMuted = true;
        this.trigger('onmute', [this.player]);
    };
    /**
     * ミュートを解除する
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    YouTube.prototype.unMute = function () {
        this.player.unMute();
        this._isMuted = false;
        this.trigger('onunmute', [this.player]);
    };
    // /**
    //  * ミュートのオンオフを要素にアサインする
    //  *
    //  * TODO: 別のクラスにする
    //  *
    //  * @version 0.9.0
    //  * @since 0.5.0
    //  * @param $el アサインするDOM要素のjQueryオブジェクト
    //  * @param options オプション
    //  *
    //  */
    // public muteController (el: HTMLElement, options: {} /* YoutubeMuteControllerOptions */) {
    // 	// const $el: JQuery = $(el);
    // 	// const defaults: YoutubeMuteControllerOptions = {
    // 	// 	eventType: 'click',
    // 	// 	mutedClass: 'is-muted',
    // 	// 	unmutedClass: 'is-unmuted',
    // 	// 	baseClass: 'youtube-mute-ctrl',
    // 	// };
    // 	// const conf: YoutubeMuteControllerOptions = $.extend(defaults, options);
    // 	// BaserElement.addClassTo($el, conf.baseClass);
    // 	// const update: () => void = (): void => {
    // 	// 	if (this._isMuted) {
    // 	// 		BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
    // 	// 		BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
    // 	// 	} else {
    // 	// 		BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
    // 	// 		BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
    // 	// 	}
    // 	// };
    // 	// const bindCtrl: () => void = (): void => {
    // 	// 	$el.on(conf.eventType, (e: JQueryEventObject): any => {
    // 	// 		if (this._isMuted) {
    // 	// 			this.unMute();
    // 	// 		} else {
    // 	// 			this.mute();
    // 	// 		}
    // 	// 		update();
    // 	// 	});
    // 	// 	update();
    // 	// };
    // 	// this.on('onmute onunmute', (): void => {
    // 	// 	update();
    // 	// });
    // 	// if (this.isEmbeded) {
    // 	// 	bindCtrl();
    // 	// } else {
    // 	// 	this.on('embeded', (e: DispatchEvent, ytp: YT.Player): void => {
    // 	// 		this.off(e.type);
    // 	// 		bindCtrl();
    // 	// 	});
    // 	// }
    // }
    YouTube.prototype._create = function () {
        _super.prototype._create.call(this, {
            videoId: '',
            rel: false,
            autoplay: true,
            stopOnInactive: false,
            controls: false,
            loop: true,
            showinfo: false,
            mute: false,
            width: 400,
            height: 300,
            index: 0,
            poster: undefined,
            posterHighQuality: false,
            startSeconds: 0,
            suggestedQuality: 'default',
            shuffle: false,
            preEmbed: true,
        });
        this._init();
    };
    /**
     * 初期化
     *
     * use: jQuery
     *
     * TODO: 長いので分割
     *
     * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
     *
     * @version 1.0.0
     * @since 0.0.7
     * @param options オプション
     *
     */
    YouTube.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var movieIdList, param;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._apiIsLoaded = 'YT' in window;
                        if (!this._config.videoId) {
                            throw new TypeError("Invalid option \"videoId\".");
                        }
                        movieIdList = this._config.videoId.split(/\s*,\s*/);
                        if (this._config.shuffle) {
                            movieIdList = arrayShuffle_1.default(movieIdList);
                        }
                        param = {
                            autoplay: 0,
                            color: 'red',
                            controls: this._config.controls ? 1 : 0,
                            disablekb: 1,
                            enablejsapi: 1,
                            end: 0,
                            fs: 1,
                            // hl: undefined, // TODO: YouTubeOptionから操作可能にする
                            iv_load_policy: 3,
                            // list: ... // TODO: YouTubeOptionから操作可能にする
                            // listType: ... // TODO: YouTubeOptionから操作可能にする
                            loop: this._config.loop ? 1 : 0,
                            modestbranding: 1,
                            // origin: undefined // 指定しない
                            // playlist: ... // 別実装する
                            playsinline: 0,
                            rel: this._config.rel ? 1 : 0,
                            showinfo: this._config.showinfo ? 1 : 0,
                            start: 0,
                        };
                        this.movieId = movieIdList;
                        this._src = "" + PLAYER_URL + this.movieId[0] + "?" + qs.stringify(param);
                        this.playerDomId = this.id + "-player";
                        this.changeState('unavailable');
                        this._createPosterImage();
                        this._createPlayerFrame();
                        if (!!this._apiIsLoaded) return [3 /*break*/, 3];
                        return [4 /*yield*/, scriptLoad_1.default(API_URL)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._enableYTObject()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this._createPlayer()];
                    case 4:
                        _a.sent();
                        this._onEmbeded();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ポスターイメージの生成
     *
     * data-poster属性の中からポスター画像を生成する
     *
     * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
     * それ以外の場合は パスと見なして画像を参照する
     *
     * @version 1.0.0
     * @since 0.9.1
     * @param movieId 動画のID
     *
     */
    YouTube.prototype._createPosterImage = function () {
        var posterUrl = this._config.poster || YouTube.getPosterImage(this.movieId[0], this._config.posterHighQuality);
        this.el.style.backgroundImage = "url(\"" + encodeURI(posterUrl) + "\")";
    };
    /**
     * プレイヤーフレームを生成する
     *
     * @version 0.10.3
     * @since 0.9.1
     */
    YouTube.prototype._createPlayerFrame = function () {
        var iframe = document.createElement('iframe');
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.src = this._src;
        iframe.id = this.playerDomId;
        iframe.style.position = 'relative';
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        this._iframe = new BaserElement_1.default(iframe);
        this.detachChildren();
        this.el.appendChild(iframe);
    };
    /**
     * プレイヤーを生成する
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.8.0
     * @param playerID プレイヤーのDOM ID
     *
     */
    YouTube.prototype._createPlayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var player = new YT.Player(_this._iframe.el, {
                            videoId: _this.movieId[0],
                            events: {
                                onStateChange: _this._onStateChange.bind(_this),
                                onReady: function () {
                                    _this.player = player;
                                    player.playVideo();
                                    resolve();
                                },
                            },
                        });
                    })];
            });
        });
    };
    /**
     * enableYTObject
     */
    YouTube.prototype._enableYTObject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        window.onYouTubeIframeAPIReady = function () {
                            window.onYouTubeIframeAPIReady = undefined;
                            _this._apiIsLoaded = true;
                            resolve();
                        };
                    })];
            });
        });
    };
    /**
     *
     */
    YouTube.prototype._onStateChange = function (e) {
        switch (e.data) {
            case YT.PlayerState.UNSTARTED: {
                this.changeState('unstarted');
                this.trigger('unstarted', [this.player]);
                var listIndex = this.player.getPlaylistIndex();
                if (this.currentCueIndex !== listIndex) {
                    this.trigger('changecue', [this.player]);
                }
                this.currentCueIndex = listIndex;
                break;
            }
            case YT.PlayerState.BUFFERING: {
                this.changeState('buffering');
                this.trigger('buffering', [this.player]);
                break;
            }
            case YT.PlayerState.CUED: {
                this.changeState('cued');
                this.trigger('cued', [this.player]);
                break;
            }
            case YT.PlayerState.ENDED: {
                this.changeState('ended');
                this.trigger('ended', [this.player]);
                if (this.movieId.length > 1 && this._config.loop && this.currentCueIndex === this.movieId.length - 1) {
                    this.player.playVideoAt(0);
                }
                else if (this._config.loop) {
                    this.player.playVideo();
                }
                break;
            }
            case YT.PlayerState.PAUSED: {
                this.changeState('paused');
                this.trigger('paused', [this.player]);
                break;
            }
            case YT.PlayerState.PLAYING: {
                this.changeState('playing');
                this.trigger('playing', [this.player]);
                this.currentCueIndex = this.player.getPlaylistIndex();
                break;
            }
            default: {
                if ('console' in window) {
                    console.warn('YouTube Player state is unknown.');
                }
            }
        }
    };
    /**
     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
     *
     * @version 1.0.0
     * @since 0.8.0
     *
     */
    YouTube.prototype._onEmbeded = function () {
        var _this = this;
        this._isMuted = this.player.isMuted();
        if (this._config.mute) {
            this.mute();
        }
        if (this._config.stopOnInactive) {
            window.addEventListener('focusout', function () {
                _this.player.pauseVideo();
            });
            window.addEventListener('focusin', function () {
                _this.player.playVideo();
            });
        }
        // if (this.movieId.length >= 2) {
        // 	// TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
        // 	const _player: any = this.player;
        // 	if (this._config.autoplay) {
        // 		_player.loadPlaylist(this.movieId, this._config.index, this._config.startSeconds, this._config.suggestedQuality);
        // 	} else {
        // 		_player.cuePlaylist(this.movieId, this._config.index, this._config.startSeconds, this._config.suggestedQuality);
        // 	}
        // } else if (this._config.autoplay) {
        // 	this.player.playVideo();
        // }
        this.trigger('embeded', [this.player]);
    };
    YouTube.STATE_KEY_NAME = 'youtube';
    return YouTube;
}(BaserElement_1.default));
exports.default = YouTube;
