import UtilArray = require('./UtilArray');
import DispatchEvent = require('./DispatchEvent');
import BaserElement = require('./BaserElement');
import Browser = require('./Browser');
import YouTubeOption = require('../Interface/YouTubeOption');
import YoutubeMuteControllerOptions = require('../Interface/YoutubeMuteControllerOptions');

/**
 * YouTube要素
 *
 * TODO: YouTubeのURLパラメータのinterfaceをつくる
 *
 * @version 0.10.0
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
	public static className: string = '-bc-youtube-element';

	/**
	 * Player URL
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	public static PLAYER_URL: string = '//www.youtube.com/embed/';

	/**
	 * API URL
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	public static API_URL: string = '//www.youtube.com/player_api';

	/**
	 * 管理対象の要素
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	public static movies: YouTube[] = [];

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
	 * 参照しているiframeのソース
	 *
	 * @version 0.9.1
	 * @since 0.9.1
	 */
	public src: string;

	/**
	 * YouTubeのプレイヤーのDOM ID
	 *
	 * @version 0.9.1
	 * @since 0.9.1
	 */
	public playerDomId: string;

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
	 * プレイヤーフレーム
	 *
	 * @since 0.10.0
	 *
	 */
	private _$frame: JQuery;

	/**
	 * ポスター要素
	 *
	 * @since 0.10.0
	 */
	private _$posterContainer: JQuery;

	/**
	 * YouTubeのiframeのソースURIを生成する
	 *
	 * @version 0.9.1
	 * @since 0.9.1
	 */
	public static getURI (movieId: string, param: any): string {
		const paramQuery: string = $.param(param);
		return `${Browser.apiScheme}${YouTube.PLAYER_URL}${movieId}?${paramQuery}`;
	}

	/**
	 * YouTubeのサムネイル画像を取得する
	 *
	 * @version 0.10.0
	 * @since 0.9.1
	 *
	 */
	public static getPosterImage (movieId: string, highQuality: boolean = false): string {
		const THUMB_URL: string = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
		const THUMB_FILE_NAME: string = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
		return `${Browser.apiScheme}${THUMB_URL}${movieId}${THUMB_FILE_NAME}`;
	}

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
	constructor (el: HTMLElement, options?: YouTubeOption) {
		super(el);
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
	 * 再設定する
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 * @param options オプション
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
	public muteController (el: HTMLElement | JQuery, options: YoutubeMuteControllerOptions): void {
		const $el: JQuery = $(el);
		const defaults: YoutubeMuteControllerOptions = {
			eventType: 'click',
			mutedClass: 'is-muted',
			unmutedClass: 'is-unmuted',
			baseClass: 'youtube-mute-ctrl',
		};
		const conf: YoutubeMuteControllerOptions = $.extend(defaults, options);
		BaserElement.addClassTo($el, conf.baseClass);
		const update: () => void = (): void => {
			if (this._isMuted) {
				BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
				BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
			} else {
				BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
				BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
			}
		};
		const bindCtrl: () => void = (): void => {
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
	private _init (options?: YouTubeOption): boolean {

		this.movieOption = <YouTubeOption> this.mergeOptions(
			{
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
			},
			options
		);

		if (Browser.spec.ua.iOS) {
			this.movieOption.autoplay = false;
			this.movieOption.preEmbed = true;
		}

		let movieIdList: string[] = this.movieOption.id.split(/\s*,\s*/);

		if (this.movieOption.shuffle) {
			movieIdList = UtilArray.shuffle<string>(movieIdList);
		}

		const movieId: string = movieIdList[this.movieOption.index];

		const param: any = {
			version: 3,
			rel: this.movieOption.rel ? 1 : 0,
			autoplay: 0, // YT.Player.playVideo()を使ってコントロールする
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
		} else {
			this._createPlayerFrame();
			this._loadYouTubeAPI();
		}

		return true;
	}

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
	private _createPosterImage (movieId: string): void {
		const $posterContainer: JQuery = $('<div class="-bc-element -bc-youtube-pseudo-poster-element" />');
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
			const $children: JQuery = this.$el.children().detach();
			if (this.movieOption.preEmbed) {
				this._createPlayerFrame();
				this._loadYouTubeAPI();
			}
			$posterContainer.append($children);
			$posterContainer.appendTo(this.$el);
		} else {
			if (this.movieOption.poster === '') {
				this.movieOption.poster = YouTube.getPosterImage(movieId, this.movieOption.posterHighQuality);
			}
			if (this.movieOption.preEmbed) {
				this.$el.empty();
				this._createPlayerFrame();
				this._loadYouTubeAPI();
			} else {
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
				backgroundImage: `url("${this.movieOption.poster}")`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				backgroundColor: '#000',
			});
		}
		if (this.movieOption.preEmbed) {
			$posterContainer.on('click', () => {
				if (this.player) {
					$posterContainer.off('click');
					this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
					this.player.playVideo();
				}
			});
		} else {
			$posterContainer.css({
				pointerEvents: 'all',
			});
			if (/^@contents?$/i.test(this.movieOption.poster)) {
				const $children: JQuery = this.$el.children().detach();
				$posterContainer.append($children);
				$posterContainer.appendTo(this.$el);
			}
			$posterContainer.on('click', () => {
				this.movieOption.autoplay = true;
				this._createPlayerFrame();
				this._loadYouTubeAPI();
			});
		}
		this._$posterContainer = $posterContainer;
	}

	/**
	 * プレイヤーフレームを生成する
	 *
	 * @version 0.10.3
	 * @since 0.9.1
	 */
	private _createPlayerFrame (): void {
		const $frame: JQuery = $('<iframe class="-bc-youtube-player-frame-element" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
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
	}

	/**
	 * YouTube APIをロードする
	 *
	 * @version 0.10.2
	 * @since 0.9.1
	 */
	private _loadYouTubeAPI (): void {
		if (!('YT' in window && YT.Player)) {
			$.getScript(`${Browser.apiScheme}${YouTube.API_URL}`);
		}
		const intervalTimer: number = setInterval(
			() => {
				if (!this.player && 'YT' in window && YT.Player) {
					this._createPlayer(this.playerDomId);
				}
				if (this.player && this.player.pauseVideo && this.player.playVideo) {
					clearInterval(intervalTimer);
					this._onEmbeded();
				}
			},
			300
		);
	}

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
	private _createPlayer (playerID: string): void {
		this.player = new YT.Player(playerID, <YT.PlayerOptions> {
			events: {
				onStateChange: (e: YT.EventArgs): void => {
					switch (e.data) {
						case -1: {
							this.trigger('unstarted', [this.player]);
							const listIndex: number = this.player.getPlaylistIndex();
							if (this.currentCueIndex !== listIndex) {
								this.trigger('changecue', [this.player]);
							}
							this.currentCueIndex = listIndex;
						}
						break;
						case YT.PlayerState.BUFFERING: {
							if (this._$posterContainer) {
								this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
							}
							this.trigger('buffering', [this.player]);
						}
						break;
						case YT.PlayerState.CUED: {
							this.trigger('cued', [this.player]);
						}
						break;
						case YT.PlayerState.ENDED: {
							this.trigger('ended', [this.player]);
							if (this.movieId.length > 1 && this.movieOption.loop && this.currentCueIndex === this.movieId.length - 1) {
								this.player.playVideoAt(0);
							} else if (this.movieOption.loop) {
								this.player.playVideo();
							}
						}
						break;
						case YT.PlayerState.PAUSED: {
							this.trigger('paused', [this.player]);
						}
						break;
						case YT.PlayerState.PLAYING: {
							this._hidePoster();
							this.trigger('playing', [this.player]);
							this.currentCueIndex = this.player.getPlaylistIndex();
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
	}

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

		if (this.movieId.length >= 2) {
			// TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
			const _player: any = this.player;
			if (this.movieOption.autoplay) {
				_player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
			} else {
				_player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
			}
		} else if (this.movieOption.autoplay) {
			this.player.playVideo();
		}

		this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
		this.trigger('embeded', [this.player]);
	}

	/**
	 * ポスター要素を非表示にする
	 *
	 * @version 0.10.2
	 * @since 0.10.0
	 */
	private _hidePoster (): void {
		if (this._$posterContainer) {
			this._$posterContainer.removeClass('-bc-youtube-pseudo-poster-element--loading');
			this._$posterContainer.detach();
		}
	}

}

export = YouTube;
