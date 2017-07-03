"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UtilArray = require('./UtilArray');
var BaserElement = require('./BaserElement');
var Browser = require('./Browser');
/**
 * YouTube要素
 *
 * TODO: YouTubeのURLパラメータのinterfaceをつくる
 *
 * @version 0.10.0
 * @since 0.0.7
 *
 */
var YouTube = (function (_super) {
    __extends(YouTube, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.7
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function YouTube(el, options) {
        _super.call(this, el);
        /**
         * プレイヤーが有効になっているかどうか
         *
         * @version 0.5.0
         * @since 0.5.0
         *
         */
        this.isEmbeded = false;
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        // IE6・7は反映させない
        if (!el.querySelector) {
            return;
        }
        if (this._init(options)) {
            YouTube.movies.push(this);
            this.$el.addClass(YouTube.className);
            this.$el.data(YouTube.className, this);
        }
    }
    /**
     * YouTubeのiframeのソースURIを生成する
     *
     * @version 0.9.1
     * @since 0.9.1
     */
    YouTube.getURI = function (movieId, param) {
        var paramQuery = $.param(param);
        return "" + Browser.apiScheme + YouTube.PLAYER_URL + movieId + "?" + paramQuery;
    };
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
        return "" + Browser.apiScheme + THUMB_URL + movieId + THUMB_FILE_NAME;
    };
    /**
     * 再設定する
     *
     * @version 0.0.7
     * @since 0.0.7
     * @param options オプション
     *
     */
    YouTube.prototype.reload = function (options) {
        this._init(options);
    };
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
    /**
     * ミュートのオンオフを要素にアサインする
     *
     * TODO: 別のクラスにする
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.5.0
     * @param $el アサインするDOM要素のjQueryオブジェクト
     * @param options オプション
     *
     */
    YouTube.prototype.muteController = function (el, options) {
        var _this = this;
        var $el = $(el);
        var defaults = {
            eventType: 'click',
            mutedClass: 'is-muted',
            unmutedClass: 'is-unmuted',
            baseClass: 'youtube-mute-ctrl',
        };
        var conf = $.extend(defaults, options);
        BaserElement.addClassTo($el, conf.baseClass);
        var update = function () {
            if (_this._isMuted) {
                BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
                BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
            }
            else {
                BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
                BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
            }
        };
        var bindCtrl = function () {
            $el.on(conf.eventType, function (e) {
                if (_this._isMuted) {
                    _this.unMute();
                }
                else {
                    _this.mute();
                }
                update();
            });
            update();
        };
        this.on('onmute onunmute', function () {
            update();
        });
        if (this.isEmbeded) {
            bindCtrl();
        }
        else {
            this.on('embeded', function (e, ytp) {
                _this.off(e.type);
                bindCtrl();
            });
        }
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
     * @version 0.10.3
     * @since 0.0.7
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options オプション
     * @return 初期化が成功したかどうか
     *
     */
    YouTube.prototype._init = function (options) {
        this.movieOption = this.mergeOptions({
            rel: false,
            autoplay: true,
            stopOnInactive: false,
            controls: false,
            loop: true,
            showinfo: false,
            mute: false,
            id: '',
            width: 400,
            height: 300,
            index: 0,
            poster: null,
            posterHighQuality: false,
            startSeconds: 0,
            suggestedQuality: 'default',
            shuffle: false,
            preEmbed: true,
        }, options);
        if (Browser.spec.ua.iOS) {
            this.movieOption.autoplay = false;
            this.movieOption.preEmbed = true;
        }
        var movieIdList = this.movieOption.id.split(/\s*,\s*/);
        if (this.movieOption.shuffle) {
            movieIdList = UtilArray.shuffle(movieIdList);
        }
        var movieId = movieIdList[this.movieOption.index];
        var param = {
            version: 3,
            rel: this.movieOption.rel ? 1 : 0,
            autoplay: 0,
            controls: this.movieOption.controls ? 1 : 0,
            disablekb: 1,
            iv_load_policy: 3,
            loop: this.movieOption.loop ? 1 : 0,
            modestbranding: 1,
            showinfo: this.movieOption.showinfo ? 1 : 0,
            wmode: 'transparent',
            enablejsapi: 1,
        };
        this.src = YouTube.getURI(movieId, param);
        this.movieId = movieIdList;
        this.playerDomId = this.id + '-Player';
        if (this.movieOption.poster !== null && !this.movieOption.autoplay) {
            this._createPosterImage(movieId);
        }
        else {
            this._createPlayerFrame();
            this._loadYouTubeAPI();
        }
        return true;
    };
    /**
     * ポスターイメージの生成
     *
     * use: JQuery
     *
     * data-poster属性の中からポスター画像を生成する
     *
     * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
     * data-posterの値が `/^@contents?$/i` にマッチする場合、要素の中身をそのまま使う
     * それ以外の場合は パスと見なして画像を参照する
     *
     * @version 0.10.2
     * @since 0.9.1
     * @param movieId 動画のID
     *
     */
    YouTube.prototype._createPosterImage = function (movieId) {
        var _this = this;
        var $posterContainer = $('<div class="-bc-element -bc-youtube-pseudo-poster-element" />');
        if (this.movieOption.width) {
            $posterContainer.width(this.movieOption.width);
        }
        if (this.movieOption.height) {
            $posterContainer.height(this.movieOption.height);
        }
        $posterContainer.css({
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: Browser.spec.ua.iOS ? 'none' : 'all',
            cursor: 'pointer',
        });
        if (/^@contents?$/i.test(this.movieOption.poster)) {
            var $children = this.$el.children().detach();
            if (this.movieOption.preEmbed) {
                this._createPlayerFrame();
                this._loadYouTubeAPI();
            }
            $posterContainer.append($children);
            $posterContainer.appendTo(this.$el);
        }
        else {
            if (this.movieOption.poster === '') {
                this.movieOption.poster = YouTube.getPosterImage(movieId, this.movieOption.posterHighQuality);
            }
            if (this.movieOption.preEmbed) {
                this.$el.empty();
                this._createPlayerFrame();
                this._loadYouTubeAPI();
            }
            else {
                $posterContainer.css({
                    position: 'relative',
                });
            }
            $posterContainer.appendTo(this.$el);
            if (this.movieOption.width) {
                $posterContainer.width(this.movieOption.width);
            }
            if (this.movieOption.height) {
                $posterContainer.height(this.movieOption.height);
            }
            $posterContainer.css({
                backgroundImage: "url(\"" + this.movieOption.poster + "\")",
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundColor: '#000',
            });
        }
        if (this.movieOption.preEmbed) {
            $posterContainer.on('click', function () {
                if (_this.player) {
                    $posterContainer.off('click');
                    _this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
                    _this.player.playVideo();
                }
            });
        }
        else {
            $posterContainer.css({
                pointerEvents: 'all',
            });
            if (/^@contents?$/i.test(this.movieOption.poster)) {
                var $children = this.$el.children().detach();
                $posterContainer.append($children);
                $posterContainer.appendTo(this.$el);
            }
            $posterContainer.on('click', function () {
                _this.movieOption.autoplay = true;
                _this._createPlayerFrame();
                _this._loadYouTubeAPI();
            });
        }
        this._$posterContainer = $posterContainer;
    };
    /**
     * プレイヤーフレームを生成する
     *
     * @version 0.10.3
     * @since 0.9.1
     */
    YouTube.prototype._createPlayerFrame = function () {
        var $frame = $('<iframe class="-bc-youtube-player-frame-element" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
        $frame.prop({
            src: this.src,
            id: this.playerDomId,
        });
        $frame.css({
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '100%',
        });
        $frame.prependTo(this.$el);
        if (this.movieOption.width) {
            $frame.width(this.movieOption.width);
            $frame.data('width', this.movieOption.width);
        }
        if (this.movieOption.height) {
            $frame.height(this.movieOption.height);
            $frame.data('height', this.movieOption.height);
        }
        this._$frame = $frame;
    };
    /**
     * YouTube APIをロードする
     *
     * @version 0.10.2
     * @since 0.9.1
     */
    YouTube.prototype._loadYouTubeAPI = function () {
        var _this = this;
        if (!('YT' in window && YT.Player)) {
            $.getScript("" + Browser.apiScheme + YouTube.API_URL);
        }
        var intervalTimer = setInterval(function () {
            if (!_this.player && 'YT' in window && YT.Player) {
                _this._createPlayer(_this.playerDomId);
            }
            if (_this.player && _this.player.pauseVideo && _this.player.playVideo) {
                clearInterval(intervalTimer);
                _this._onEmbeded();
            }
        }, 300);
    };
    /**
     * プレイヤーを生成する
     *
     * use: jQuery
     *
     * @version 0.10.3
     * @since 0.8.0
     * @param playerID プレイヤーのDOM ID
     *
     */
    YouTube.prototype._createPlayer = function (playerID) {
        var _this = this;
        this.player = new YT.Player(playerID, {
            events: {
                onStateChange: function (e) {
                    switch (e.data) {
                        case -1:
                            {
                                _this.trigger('unstarted', [_this.player]);
                                var listIndex = _this.player.getPlaylistIndex();
                                if (_this.currentCueIndex !== listIndex) {
                                    _this.trigger('changecue', [_this.player]);
                                }
                                _this.currentCueIndex = listIndex;
                            }
                            break;
                        case YT.PlayerState.BUFFERING:
                            {
                                if (_this._$posterContainer) {
                                    _this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
                                }
                                _this.trigger('buffering', [_this.player]);
                            }
                            break;
                        case YT.PlayerState.CUED:
                            {
                                _this.trigger('cued', [_this.player]);
                            }
                            break;
                        case YT.PlayerState.ENDED:
                            {
                                _this.trigger('ended', [_this.player]);
                                if (_this.movieId.length > 1 && _this.movieOption.loop && _this.currentCueIndex === _this.movieId.length - 1) {
                                    _this.player.playVideoAt(0);
                                }
                                else if (_this.movieOption.loop) {
                                    _this.player.playVideo();
                                }
                            }
                            break;
                        case YT.PlayerState.PAUSED:
                            {
                                _this.trigger('paused', [_this.player]);
                            }
                            break;
                        case YT.PlayerState.PLAYING:
                            {
                                _this._hidePoster();
                                _this.trigger('playing', [_this.player]);
                                _this.currentCueIndex = _this.player.getPlaylistIndex();
                            }
                            break;
                        default: {
                            if ('console' in window) {
                                console.warn('YouTube Player state is unknown.');
                            }
                        }
                    }
                },
            },
        });
    };
    /**
     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
     *
     * use: jQuery
     *
     * TODO: embeddedyoutubeplayイベント廃止予定(v1.0.0)
     *
     * @version 0.10.3
     * @since 0.8.0
     *
     */
    YouTube.prototype._onEmbeded = function () {
        var _this = this;
        this.isEmbeded = true;
        this._isMuted = this.player.isMuted();
        if (this.movieOption.mute) {
            this.mute();
        }
        if (this.movieOption.stopOnInactive) {
            $(window).on('blur', function () {
                _this.player.pauseVideo();
            }).on('focus', function () {
                _this.player.playVideo();
            });
        }
        if (this.movieId.length >= 2) {
            // TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
            var _player = this.player;
            if (this.movieOption.autoplay) {
                _player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
            }
            else {
                _player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
            }
        }
        else if (this.movieOption.autoplay) {
            this.player.playVideo();
        }
        this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
        this.trigger('embeded', [this.player]);
    };
    /**
     * ポスター要素を非表示にする
     *
     * @version 0.10.2
     * @since 0.10.0
     */
    YouTube.prototype._hidePoster = function () {
        if (this._$posterContainer) {
            this._$posterContainer.removeClass('-bc-youtube-pseudo-poster-element--loading');
            this._$posterContainer.detach();
        }
    };
    /**
     * 管理対象の要素に付加するclass属性値のプレフィックス
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    YouTube.className = '-bc-youtube-element';
    /**
     * Player URL
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    YouTube.PLAYER_URL = '//www.youtube.com/embed/';
    /**
     * API URL
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    YouTube.API_URL = '//www.youtube.com/player_api';
    /**
     * 管理対象の要素
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    YouTube.movies = [];
    return YouTube;
}(BaserElement));
module.exports = YouTube;
