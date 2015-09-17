var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaserElement = require('./BaserElement');
/**
 * YouTube要素
 *
 * @version 0.9.0
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
     * 初期化
     *
     * use: jQuery
     *
     * TODO: 長いので分割
     *
     * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
     *
     * @version 0.9.0
     * @since 0.0.7
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @param options オプション
     * @return 初期化が成功したかどうか
     *
     */
    YouTube.prototype._init = function (options) {
        var _this = this;
        var protocol = location.protocol === 'file:' ? 'http:' : '';
        var defaultOptions = {
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
            startSeconds: 0,
            suggestedQuality: 'default'
        };
        this.movieOption = this.mergeOptions(defaultOptions, options);
        this.$el.empty();
        this.movieId = this.movieOption.id.split(/\s*,\s*/);
        var $mov = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>');
        var param = $.param({
            version: 3,
            rel: this.movieOption.rel ? 1 : 0,
            autoplay: this.movieOption.autoplay ? 1 : 0,
            controls: this.movieOption.controls ? 1 : 0,
            disablekb: 1,
            iv_load_policy: 3,
            loop: this.movieOption.loop ? 1 : 0,
            modestbranding: 1,
            showinfo: this.movieOption.showinfo ? 1 : 0,
            wmode: 'transparent',
            enablejsapi: 1
        });
        var id = this.movieId[this.movieOption.index];
        var src = protocol + YouTube.PLAYER_URL + id + '?' + param;
        $mov.prop('src', src);
        var playerID = this.id + '-Player';
        $mov.prop('id', playerID);
        $mov.css({
            position: 'relative',
            display: 'block',
            width: '100%',
            height: '100%'
        });
        $mov.appendTo(this.$el);
        if (this.movieOption.width) {
            $mov.width(this.movieOption.width);
            $mov.data('width', this.movieOption.width);
        }
        if (this.movieOption.height) {
            $mov.height(this.movieOption.height);
            $mov.data('height', this.movieOption.height);
        }
        $.getScript(protocol + YouTube.API_URL);
        var intervalTimer = setInterval(function () {
            if (!_this.player && 'YT' in window && YT.Player) {
                _this._createPlayer(playerID);
            }
            if (_this.player && _this.player.pauseVideo && _this.player.playVideo) {
                clearInterval(intervalTimer);
                _this._onEmbeded();
            }
        }, 300);
        return true;
    };
    /**
     * プレイヤーを生成する
     *
     * use: jQuery
     *
     * @version 0.9.0
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
                        case -1: {
                            _this.trigger('unstarted', [_this.player]);
                            var listIndex = _this.player.getPlaylistIndex();
                            if (_this.currentCueIndex !== listIndex) {
                                _this.trigger('changecue', [_this.player]);
                            }
                            _this.currentCueIndex = listIndex;
                            break;
                        }
                        case YT.PlayerState.BUFFERING: {
                            _this.trigger('buffering', [_this.player]);
                            break;
                        }
                        case YT.PlayerState.CUED: {
                            _this.trigger('cued', [_this.player]);
                            break;
                        }
                        case YT.PlayerState.ENDED: {
                            _this.trigger('ended', [_this.player]);
                            if (_this.movieId.length > 1 && _this.movieOption.loop && _this.currentCueIndex === _this.movieId.length - 1) {
                                _this.player.playVideoAt(0);
                            }
                            else if (_this.movieOption.loop) {
                                _this.player.playVideo();
                            }
                            break;
                        }
                        case YT.PlayerState.PAUSED: {
                            _this.trigger('paused', [_this.player]);
                            break;
                        }
                        case YT.PlayerState.PLAYING: {
                            _this.trigger('playing', [_this.player]);
                            _this.currentCueIndex = _this.player.getPlaylistIndex();
                            break;
                        }
                        default: {
                            if ('console' in window) {
                                console.warn('YouTube Player state is unknown.');
                            }
                        }
                    }
                }
            }
        });
    };
    /**
     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
     *
     * use: jQuery
     *
     * @version 0.9.0
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
        // TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
        var _player = this.player;
        if (this.movieId.length >= 2) {
            if (this.movieOption.autoplay) {
                _player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
            }
            else {
                _player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
            }
        }
        this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
        this.trigger('embeded', [this.player]);
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
            baseClass: 'youtube-mute-ctrl'
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
})(BaserElement);
module.exports = YouTube;
