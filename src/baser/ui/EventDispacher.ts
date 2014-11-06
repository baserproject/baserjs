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
		export class EventDispacher {

			constructor () {


			}

			public on (type: string, handler: Function): EventDispacher {

				var eventHandler: EventHandler = new EventHandler(this, type, handler);
				eventHandlers[eventHandler.id] = eventHandler;
				if (!types[type]) {
					types[type] = [];
				}
				types[type].push(eventHandler);

				return this;
			}

			public off (): EventDispacher {
				return this;
			}

			public trigger (type: string, context?: any): EventDispacher {

				var eventHandler: EventHandler;
				var e: DispacheEvent;

				context = context || this;

				var i: number = 0;
				var l: number;

				if (types[type]) {

					l = types[type].length;

					for (; i < l; i++) {
						eventHandler = types[type][i];
						if (eventHandler.context === this) {
							e = new DispacheEvent(type);
							eventHandler.handler.call(context, e);
							if (e.isImmediatePropagationStopped()) {
								break;
							}
						}
					}

				}

				return this;
			}

		}

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

		export class DispacheEvent {

			private _isImmediatePropagationStopped: boolean = false;

			constructor (type: string) {
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
