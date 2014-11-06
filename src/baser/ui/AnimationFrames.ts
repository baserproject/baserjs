module baser {

	export module ui {

		/**
		 * アニメーションフレームを管理するクラス
		 *
		 * @version 0.0.10
		 * @since 0.0.10
		 *
		 */
		export class AnimationFrames {

			/**
			 * フレームレート
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			static FRAME_RATE = 60;

			/**
			 * フレーム毎に実行するコールバック
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			public callback: Function;

			/**
			 * フレームのリクエストID
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			public requestId: number;

			/**
			 * フレーム毎のに実行するコールバックを登録する
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 * @return {number} リクエストIDを返す
			 *
			 */
			constructor (callback: Function) {
				this.callback = callback;
			}

			public start (context?: any) {
				var interval: number;
				context = context || this;
				if ('requestAnimationFrame' in window) {
					this.requestId = requestAnimationFrame( (): void => {
						cancelAnimationFrame(this.requestId);
						this.callback.call(context);
						this.start(context);
					});
				} else {
					interval = 1000 / AnimationFrames.FRAME_RATE;
					this.requestId = setTimeout( (): void => {
						clearTimeout(this.requestId);
						this.callback.call(context);
						this.start(context);
					}, interval);
				}
			}

			/**
			 * リクエストしたコールバックを停止する
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 * @return {number} リクエストIDを返す
			 *
			 */
			public stop (): void {
				if ('cancelAnimationFrame' in window) {
					cancelAnimationFrame(this.requestId);
				} else {
					clearTimeout(this.requestId);
				}
			}

		}

	}

}
