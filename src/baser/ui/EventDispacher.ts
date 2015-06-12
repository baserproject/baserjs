module baser {

	var eventHandlers: { [index: string]: ui.EventHandler } = {};
	var types: { [index: string]: ui.EventHandler[] } = {};

	export module ui {

		/**
		 * イベント駆動できるクラス
		 *
		 * @version 0.0.10
		 * @since 0.0.10
		 *
		 */
		export class EventDispacher implements IEventDispacher {

			/**
			 * コンストラクタ
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			constructor () {
				// void
			}

			/**
			 * イベントハンドラを登録する
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			public on (type: string, handler: Function): EventDispacher {

				var eventHandler: EventHandler = new EventHandler(this, type, handler);
				eventHandlers[eventHandler.id] = eventHandler;
				if (!types[type]) {
					types[type] = [];
				}
				types[type].push(eventHandler);

				return this;
			}

			/**
			 * イベントハンドラを削除する
			 *
			 * @version 0.0.10
			 * @since 0.0.10
			 *
			 */
			public off (type?: string): EventDispacher {
				delete types[type];
				return this;
			}

			/**
			 * イベントハンドラを発火させる
			 *
			 * @version 0.5.0
			 * @since 0.0.10
			 *
			 */
			public trigger (type: string, args: any[] = [], context?: any): EventDispacher {

				var handlers: EventHandler[];
				var eventHandler: EventHandler;
				var e: DispacheEvent;

				context = context || this;

				if (types[type]) {

					handlers = types[type].slice(); // clone

					while (handlers.length) {
						eventHandler = handlers.shift();
						if (eventHandler.context === this) {
							e = new DispacheEvent(type);
							eventHandler.handler.apply(context, [e].concat(args));
							if (e.isImmediatePropagationStopped()) {
								break;
							}
						}
					}

				}

				return this;
			}

		}

		/**
		 * イベントハンドラのラッパークラス
		 *
		 * @version 0.0.10
		 * @since 0.0.10
		 *
		 */
		export class EventHandler {

			public id: string;
			public context: EventDispacher;
			public type: string;
			public handler: Function;

			constructor (context: EventDispacher, type: string, handler: Function) {

				this.context = context;
				this.id = utility.String.UID();
				this.type = type;
				this.handler = handler;

			}

		}

		/**
		 * イベントオブジェクトのクラス
		 *
		 * @version 0.3.0
		 * @since 0.0.10
		 *
		 */
		export class DispacheEvent {

			public type: string;

			private _isImmediatePropagationStopped: boolean = false;

			constructor (type: string) {
				this.type = type;
			}

			public isImmediatePropagationStopped (): boolean {
				return this._isImmediatePropagationStopped;
			}

			public stopImmediatePropagation (): void {
				this._isImmediatePropagationStopped = true;
			}

		}

	}

}
