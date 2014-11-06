module baser {

	export module ui {

		/**
		 * 時間管理クラス
		 *
		 * @version 0.0.8
		 * @since 0.0.1
		 *
		 */
		export class Timer {

			/**
			 * コアとなるDateオブジェクト
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			public datetime: Date;

			/**
			 * タイマーID
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			public timerId: number = null;

			/**
			 * インターバル
			 *
			 * `13`は[jQuery](http://jquery.com/)を参考
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			public interval: number = 13;

			/**
			 * プログレスイベントのコールバック
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			private _onProgress: Function = null;

			/**
			 * コンストラクタ
			 *
			 * @version 0.0.8
			 * @since 0.0.1
			 *
			 */
			constructor () {
				this.now();
			}

			/**
			 * 暗黙の型変換時の振る舞い
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			public valueOf (): number {
				return this.datetime.valueOf();
			}

			/**
			 * 時間を現在に更新する
			 *
			 * @version 0.0.1
			 * @since 0.0.1
			 *
			 */
			public now (): number {
				this.datetime = new Date();
				return this.valueOf();
			}

			/**
			 * タイマーをスタートする
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			public start (time: number): Timer {
				var startTimestamp: number = this.now();
				this.stop();
				var tick: Function = (): void => {
					this.timerId = setTimeout( (): void => {
						var period: number = this.now() - startTimestamp;
						if (period < time) {
							if (this._onProgress) {
								this._onProgress.call(this);
							}
							tick();
						} else {
							this.stop();
						}
					}, this.interval);
				};
				return this;
			}

			/**
			 * タイマーをストップする
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			public stop (): Timer {
				clearTimeout(this.timerId);
				this.timerId = null;
				return this;
			}

			/**
			 * 遅延処理
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			public wait (time: number, callback: Function, context?: any): Timer {
				if (context == null) {
					context = this;
				}
				this.stop();
				this.timerId = setTimeout( (): void => {
					this.stop();
					callback.call(context);
				}, time);
				return this;
			}

			/**
			 * プログレスイベントを登録
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			public progress (callback: Function): Timer {
				if ($.isFunction(callback)) {
					this._onProgress = callback;
				}
				return this;
			}

			/**
			 * 遅延処理
			 *
			 * @version 0.0.8
			 * @since 0.0.8
			 *
			 */
			static wait (time: number, callback: Function, context?: any): Timer {
				return new Timer().wait(time, callback, context);
			}

		}

	}

}
