module baser {

	export module ui {

		export module element {

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
				 * ムービーのオプション
				 *
				 * @version 0.0.7
				 * @since 0.0.7
				 *
				 */
				public movieOption: YoutubeOption;

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
				 * @version 0.0.7
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
						showinfo: <boolean> false
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

					if (ids.length >= 2) {
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

					var y: YT.Player;
					var intervalTimer: number;

					if (this.movieOption.stopOnInactive) {
						intervalTimer = window.setInterval( () => {
							if (!y && 'YT' in window && YT.Player) {
								y = new YT.Player(playerID, null);
							}
							if (y && y.pauseVideo && y.playVideo) {
								window.clearInterval(intervalTimer);
								this.$el.trigger('embeddedyoutubeplay', [y]);
								$(window).on('blur', () => {
									y.pauseVideo();
								}).on('focus', () => {
									y.playVideo();
								});
							}
						}, 300);
					}

					return true;

				}

				public reload (options?: YoutubeOption): void {
					this._init(options);
				}

			}

		}

	}

}