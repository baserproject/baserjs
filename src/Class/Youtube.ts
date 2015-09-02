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
		 * YouTubeの動画ID
		 *
		 * @since 0.8.0
		 *
		 */
		id?: string;

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

		/**
		 * 動画の幅
		 *
		 * @since 0.8.0
		 *
		 */
		width?: number;

		/**
		 * 動画の高さ
		 *
		 * @since 0.8.0
		 *
		 */
		height?: number;

		/**
		 * 再生リストの中から最初に再生する動画の番号
		 *
		 * @since 0.8.0
		 *
		 */
		index?: number;

		/**
		 * 再生リストの中から最初に再生する動画の再生位置
		 * 
		 * 単位: 秒
		 *
		 * @since 0.8.0
		 *
		 */
		startSeconds: number;

		/**
		 * 動画の推奨再生画質を指定
		 * 
		 * - 画質レベル small: プレーヤーの高さが 240 ピクセル、サイズが 320x240 ピクセル（アスペクト比 4:3）以上。
		 * - 画質レベル medium: プレーヤーの高さが 360 ピクセル、サイズが 640x360 ピクセル（アスペクト比 16:9）または 480x360 ピクセル（アスペクト比 4:3）。
		 * - 画質レベル large: プレーヤーの高さが 480 ピクセル、サイズが 853x480 ピクセル（アスペクト比 16:9）または 640x480 ピクセル（アスペクト比 4:3）。
		 * - 画質レベル hd720: プレーヤーの高さが 720 ピクセル、サイズが 1280x720 ピクセル（アスペクト比 16:9）または 960x720 ピクセル（アスペクト比 4:3）。
		 * - 画質レベル hd1080: プレーヤーの高さが 1080 ピクセル、サイズが 1920x1080 ピクセル（アスペクト比 16:9）または 1440x1080 ピクセル（アスペクト比 4:3）。
		 * - 画質レベル highres: プレーヤーの高さが 1080 ピクセル以上、つまりプレーヤーのアスペクト比が 1920x1080 ピクセル以上。
		 * - 画質レベル default: YouTube が適切な再生画質を選択します。この設定は、画質レベルをデフォルトの状態に戻します。それまでに cueVideoById、loadVideoById または setPlaybackQuality の各関数で行った再生画質の設定は無効になります。
		 *
		 * @since 0.8.0
		 *
		 */
		suggestedQuality: string;

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
	 * @version 0.8.0
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
		 * @version 0.8.0
		 * @since 0.0.7
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 *
		 */
		constructor ($el: JQuery, options?: YoutubeOption) {

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
		 * @version 0.8.0
		 * @since 0.0.7
		 * @param $el 管理するDOM要素のjQueryオブジェクト
		 * @return {booelan} 初期化が成功したかどうか
		 *
		 */
		private _init (options?: YoutubeOption): boolean {

			var protocol: string = location.protocol === 'file:' ? 'http:' : '';
			
			var defaultOptions: YoutubeOption = {
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

			this.movieOption = <YoutubeOption> this.mergeOptions(defaultOptions, options);
			
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

			var src: string = protocol + Youtube.PLAYER_URL + id + '?' + param;
			
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

			$.getScript(protocol + Youtube.API_URL);

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
		public reload (options?: YoutubeOption): void {
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
			this.on('onmute onunmute', (): void => {
				update();
			});
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
