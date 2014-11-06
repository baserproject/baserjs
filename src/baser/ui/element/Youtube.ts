module baser {

	export module ui {

		export module element {

			/**
			 * マップ要素
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
				public movieOption: any;

				/**
				 * コンストラクタ
				 *
				 * @version 0.0.7
				 * @since 0.0.7
				 * @param $el 管理するDOM要素のjQueryオブジェクト
				 *
				 */
				constructor ($el: JQuery, options?: any) {

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
				private _init (options?: any): boolean {

					var id: string = this.$el.data('id');
					var width: number = <number> +(this.$el.data('width') || this.$el.attr('width') || NaN);
					var height: number = <number> +(this.$el.data('height') || this.$el.attr('height') || NaN);

					var protocol: string = location.protocol === 'file:' ? 'http:' : '';

					this.$el.empty();

					var $mov: JQuery = $('<iframe frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>');
					var param: string = $.param({
						version: 3,
						playlist: id,
						rel: 0,
						autoplay: 1,
						controls: 0,
						disablekb: 1,
						iv_load_policy: 3,
						loop: 1,
						modestbranding: 1,
						showinfo: 0,
						wmode: 'transparent',
						enablejsapi: 1
					});
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

					var i: number = setInterval( () => {
						if (!y && 'YT' in window && YT.Player) {
							y = new YT.Player(playerID, null);
						}
						if (y && y.pauseVideo && y.playVideo) {
							clearInterval(i);
							$(window).on('blur', () => {
								y.pauseVideo();
							}).on('focus', () => {
								y.playVideo();
							});
						}
					}, 300);

					return true;

				}

				public reload (): void {
					this._init();
				}

			}

		}

	}

}