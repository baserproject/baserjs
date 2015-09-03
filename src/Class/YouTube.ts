import DispatchEvent = require('./DispatchEvent');
import BaserElement = require('./BaserElement');
import YouTubeOption = require('../Interface/YouTubeOption');
import YoutubeMuteControllerOptions = require('../Interface/YoutubeMuteControllerOptions');

/**
 * YouTube要素
 *
 * @version 0.8.0
 * @since 0.0.7
 *
 */
class YouTube extends BaserElement {

	/**
	 * 管理対象の要素に付加するclass属性値のプレフィックス
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	static className: string = '-bc-youtube-element';

	/**
	 * Player URL
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	static PLAYER_URL: string = '//www.youtube.com/embed/';

	/**
	 * API URL
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	static API_URL: string = '//www.youtube.com/player_api';

	/**
	 * 管理対象の要素
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	static movies: YouTube[] = [];

	/**
	 * ムービーのID
	 *
	 * @version 0.8.0
	 * @since 0.0.7
	 *
	 */
	public movieId: string[];

	/**
	 * 現在のキューのインデックス番号
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public currentCueIndex: number;

	/**
	 * ムービーのオプション
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	public movieOption: YouTubeOption;

	/**
	 * プレイヤーオブジェクト
	 *
	 * @version 0.5.0
	 * @since 0.5.0
	 *
	 */
	public player: YT.Player;

	/**
	 * プレイヤーが有効になっているかどうか
	 *
	 * @version 0.5.0
	 * @since 0.5.0
	 *
	 */
	public isEmbeded: boolean = false;

	/**
	 * ミュートされているかどうか
	 *
	 * `this.player.isMuted()` を利用すれば判定はできるが
	 * `this.player.mute()` もしくは `this.player.unMute()` 実行直後では
	 * `this.player.isMuted()` の判定が不安定なため
	 * （APIの実行完了を監視しなければならないが、そのためのイベントが存在しない）
	 * 独自にインスタンスプロパティとして保持する
	 *
	 * @version 0.5.0
	 * @since 0.5.0
	 *
	 */
	private _isMuted: boolean;

	/**
	 * コンストラクタ
	 *
	 * @version 0.8.0
	 * @since 0.0.7
	 * @param $el 管理するDOM要素のjQueryオブジェクト
	 *
	 */
	constructor ($el: JQuery, options?: YouTubeOption) {

		super($el);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!$el[0].querySelector) {
			return;
		}

		if (this._init(options)) {
			YouTube.movies.push(this);
			this.$el.addClass(YouTube.className);
			$el.data(YouTube.className, this);
		}

	}

	/**
	 * 初期化
	 *
	 * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
	 *
	 * @version 0.8.0
	 * @since 0.0.7
	 * @param $el 管理するDOM要素のjQueryオブジェクト
	 * @return {booelan} 初期化が成功したかどうか
	 *
	 */
	private _init (options?: YouTubeOption): boolean {

		var protocol: string = location.protocol === 'file:' ? 'http:' : '';

		var defaultOptions: YouTubeOption = {
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

		this.movieOption = <YouTubeOption> this.mergeOptions(defaultOptions, options);

		this.$el.empty();

		this.movieId = this.movieOption.id.split(/\s*,\s*/);

		var $mov: JQuery = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>');
		var param: string = $.param({
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

		var id: string = this.movieId[this.movieOption.index];

		var src: string = protocol + YouTube.PLAYER_URL + id + '?' + param;

		$mov.prop('src', src);

		var playerID: string = this.id + '-Player';
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

		var intervalTimer: number;

		intervalTimer = window.setInterval( () => {
			if (!this.player && 'YT' in window && YT.Player) {
				this._createPlayer(playerID);
			}
			if (this.player && this.player.pauseVideo && this.player.playVideo) {
				window.clearInterval(intervalTimer);
				this._onEmbeded();
			}
		}, 300);

		return true;

	}

	/**
	 * プレイヤーを生成する
	 *
	 * @version 0.8.0
	 * @since 0.8.0
	 * @param playerID プレイヤーのDOM ID
	 *
	 */
	private _createPlayer (playerID: string) {
		this.player = new YT.Player(playerID, {
			events: {
				onStateChange: (e: YT.EventArgs): void => {
					switch (e.data) {
						case -1: {
							this.trigger('unstarted', [this.player]);
							var listIndex: number = this.player.getPlaylistIndex();
							if (this.currentCueIndex !== listIndex) {
								this.trigger('changecue', [this.player]);
							}
							this.currentCueIndex = listIndex;
							break;
						}
						case YT.PlayerState.BUFFERING: {
							this.trigger('buffering', [this.player]);
							break;
						}
						case YT.PlayerState.CUED: {
							this.trigger('cued', [this.player]);
							break;
						}
						case YT.PlayerState.ENDED: {
							this.trigger('ended', [this.player]);
							if (this.movieId.length > 1 && this.movieOption.loop && this.currentCueIndex === this.movieId.length - 1) {
								this.player.playVideoAt(0);
							} else if (this.movieOption.loop) {
								this.player.playVideo();
							}
							break;
						}
						case YT.PlayerState.PAUSED: {
							this.trigger('paused', [this.player]);
							break;
						}
						case YT.PlayerState.PLAYING: {
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
				}
			}
		});
	}

	/**
	 * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
	 *
	 * @version 0.8.0
	 * @since 0.8.0
	 *
	 */
	private _onEmbeded (): void {
		this.isEmbeded = true;
		this._isMuted = this.player.isMuted();

		if (this.movieOption.mute) {
			this.mute();
		}

		if (this.movieOption.stopOnInactive) {
			$(window).on('blur', () => {
				this.player.pauseVideo();
			}).on('focus', () => {
				this.player.playVideo();
			});
		}

		// TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
		var _player: any = this.player;
		if (this.movieId.length >= 2) {
			if (this.movieOption.autoplay) {
				_player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
			} else {
				_player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
			}
		}

		this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
		this.trigger('embeded', [this.player]);
	}

	/**
	 * 再設定する
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	public reload (options?: YouTubeOption): void {
		this._init(options);
	}

	/**
	 * ミュートする
	 *
	 * @version 0.8.0
	 * @since 0.5.0
	 *
	 */
	public mute (): void {
		this.player.mute();
		this._isMuted = true;
		this.trigger('onmute', [this.player]);
	}

	/**
	 * ミュートを解除する
	 *
	 * @version 0.8.0
	 * @since 0.5.0
	 *
	 */
	public unMute (): void {
		this.player.unMute();
		this._isMuted = false;
		this.trigger('onunmute', [this.player]);
	}

	/**
	 * ミュートのオンオフを要素にアサインする
	 *
	 * @version 0.8.0
	 * @since 0.5.0
	 * @param $el アサインするDOM要素のjQueryオブジェクト
	 * @param options オプション
	 *
	 */
	public muteController ($el, options: YoutubeMuteControllerOptions): void {
		var defaults: YoutubeMuteControllerOptions = {
			eventType: <string> 'click',
			mutedClass: <string> 'is-muted',
			unmutedClass: <string> 'is-unmuted',
			baseClass: <string> 'youtube-mute-ctrl'
		};
		var conf: YoutubeMuteControllerOptions = $.extend(defaults, options);
		BaserElement.addClassTo($el, conf.baseClass);
		var update: () => void = (): void => {
			if (this._isMuted) {
				BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
				BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
			} else {
				BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
				BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
			}
		};
		var bindCtrl: () => void = (): void => {
			$el.on(conf.eventType, (e: JQueryEventObject): any => {
				if (this._isMuted) {
					this.unMute();
				} else {
					this.mute();
				}
				update();
			});
			update();
		};
		this.on('onmute onunmute', (): void => {
			update();
		});
		if (this.isEmbeded) {
			bindCtrl();
		} else {
			this.on('embeded', (e: DispatchEvent, ytp: YT.Player): void => {
				this.off(e.type);
				bindCtrl();
			});
		}

	}

}

export = YouTube;
