module baser.ui.element {

	/**
	 * Youtubeクラスのコンストラクタのオプション
	 *
	 * @version 0.0.16
	 * @since 0.0.16
	 *
	 */
	export interface YoutubeOption {

		/**
		 * 関連動画を再生後に表示させるかどうか
		 *
		 * @since 0.0.16
		 *
		 */
		rel?: boolean;

		/**
		 * 自動再生させるかどうか
		 *
		 * @since 0.0.16
		 *
		 */
		autoplay?: boolean;

		/**
		 * ウィンドウがアクティブでなくなった時に再生を停止するかどうか
		 *
		 * @since 0.0.16
		 *
		 */
		stopOnInactive?: boolean;

		/**
		 * コントロールを表示させるかどうか
		 *
		 * @since 0.0.16
		 *
		 */
		controls?: boolean;

		/**
		 * ループ再生するかどうか
		 *
		 * @since 0.0.16
		 *
		 */
		loop?: boolean;

		/**
		 * 動画情報を表示させるかどうか
		 *
		 * @since 0.0.16
		 *
		 */
		showinfo?: boolean;

		/**
		 * 初期状態でミュートするかどうか
		 *
		 * @since 0.5.0
		 *
		 */
		mute?: boolean;
	}

	/**
	 * Youtubeインスタンスの muteControllerメソッドのオプション
	 *
	 * @version 0.5.0
	 * @since 0.5.0
	 *
	 */
	export interface YoutubeMuteControllerOptions {

		/**
		 * コントローラが実行されるイベントタイプ
		 *
		 * @since 0.5.0
		 *
		 */
		eventType?: string;

		/**
		 * 適用要素に付加されるミュート状態のクラス名
		 *
		 * @since 0.5.0
		 *
		 */
		mutedClass?: string;

		/**
		 * 適用要素に付加されるミュートでない状態クラス名
		 *
		 * @since 0.5.0
		 *
		 */
		unmutedClass?: string;

		/**
		 * 適用要素に付加されるクラス名
		 *
		 * @since 0.5.0
		 *
		 */
		baseClass?: string;
	}

	/**
	 * YouTube要素
	 *
	 * @version 0.0.7
	 * @since 0.0.7
	 *
	 */
	export class Youtube extends Element {

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
		static movies: Youtube[] = [];

		/**
		 * ムービーのID
		 *
		 * @version 0.0.7
		 * @since 0.0.7
		 *
		 */
		public movieId: string;

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
		public movieOption: YoutubeOption;

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
		 * @version 0.0.7
		 * @since 0.0.7
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 *
		 */
		constructor ($el: JQuery, options?: YoutubeOption) {

			super($el);

			if (this._init(options)) {
				Youtube.movies.push(this);
				this.$el.addClass(Youtube.className);
				$el.data(Youtube.className, this);
			}

		}

		/**
		 * 初期化
		 *
		 * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
		 *
		 * @version 0.5.0
		 * @since 0.0.7
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 * @return {booelan} 初期化が成功したかどうか
		 *
		 */
		private _init (options?: YoutubeOption): boolean {

			var id: string = this.$el.data('id');
			var width: number = <number> +(this.$el.data('width') || this.$el.attr('width') || NaN);
			var height: number = <number> +(this.$el.data('height') || this.$el.attr('height') || NaN);

			var protocol: string = location.protocol === 'file:' ? 'http:' : '';

			this.movieOption = <YoutubeOption> $.extend(<YoutubeOption> {
				rel: <boolean> false,
				autoplay: <boolean> true,
				stopOnInactive: <boolean> false,
				controls: <boolean> false,
				loop: <boolean> true,
				showinfo: <boolean> false,
				mute: <boolean> false
			}, options);

			this.$el.empty();

			var ids: string[] = id.split(/\s*,\s*/);

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

			if (ids.length >= 2 || this.movieOption.loop) {
				param += '&amp;playlist=' + ids.join(',');
			}

			var src: string = protocol + Youtube.PLAYER_URL + id + '?' + param;

			this.movieId = id;

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

			if (width) {
				$mov.width(width);
				$mov.data('width', width);
			}

			if (height) {
				$mov.height(height);
				$mov.data('height', height);
			}

			$.getScript(protocol + Youtube.API_URL);

			var intervalTimer: number;
			var listIndex: number;

			intervalTimer = window.setInterval( () => {
				if (!this.player && 'YT' in window && YT.Player) {
					this.player = new YT.Player(playerID, {
						events: {
							onStateChange: (e: YT.EventArgs): void => {
								switch (e.data) {
									case -1: {
										this.trigger('unstarted', [this.player]);
										listIndex = this.player.getPlaylistIndex();
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
				if (this.player && this.player.pauseVideo && this.player.playVideo) {
					window.clearInterval(intervalTimer);

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

					this.$el.trigger('embeddedyoutubeplay', [this.player]); // TODO: 廃止予定(v1.0.0)
					this.trigger('embeded', [this.player]);

				}
			}, 300);

			return true;

		}

		public reload (options?: YoutubeOption): void {
			this._init(options);
		}
		
		public mute (): void {
			this.player.mute();
			this._isMuted = true;
		}
		
		public unMute (): void {
			this.player.unMute();
			this._isMuted = false;
		}

		public muteController ($el, options: YoutubeMuteControllerOptions): void {
			var defaults: YoutubeMuteControllerOptions = {
				eventType: <string> 'click',
				mutedClass: <string> 'is-muted',
				unmutedClass: <string> 'is-unmuted',
				baseClass: <string> 'youtube-mute-ctrl'
			};
			var conf: YoutubeMuteControllerOptions = $.extend(defaults, options);
			Element.addClassTo($el, conf.baseClass);
			var update: () => void = (): void => {
				if (this._isMuted) {
					Element.addClassTo($el, conf.baseClass, '', conf.mutedClass);
					Element.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
				} else {
					Element.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
					Element.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
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
			if (this.isEmbeded) {
				bindCtrl();
			} else {
				this.on('embeded', (e: event.DispacheEvent, ytp: YT.Player): void => {
					this.off(e.type);
					bindCtrl();
				});	
			}

		}

	}

}
