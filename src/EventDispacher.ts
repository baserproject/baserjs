module baser.ui.event {

	/**
	 * イベント駆動できるクラス
	 *
	 * @version 0.0.10
	 * @since 0.0.10
	 *
	 */
	export class EventDispacher implements IEventDispacher {
		
		static eventHandlers: { [index: string]: EventHandler } = {};
		static types: { [index: string]: EventHandler[] } = {};

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
		 * @version 0.8.0
		 * @since 0.0.10
		 *
		 */
		public on (type: string | string[], handler: Function): EventDispacher {

			var types: string[];
			
			if (typeof type === 'string') {
				types = type.split(/\s+/g);
			} else {
				types = type;
			}

			var i: number = 0;
			var l: number = types.length;
			
			for (; i < l; i++) {
				var eventHandler: EventHandler = new EventHandler(this, types[i], handler);
				EventDispacher.eventHandlers[eventHandler.id] = eventHandler;
				if (!EventDispacher.types[types[i]]) {
					EventDispacher.types[types[i]] = [];
				}
				EventDispacher.types[types[i]].push(eventHandler);
			}

			return this;
		}

		/**
		 * イベントハンドラを削除する
		 *
		 * @version 0.0.10
		 * @since 0.0.10
		 *
		 */
		public off (type?: string | string[]): EventDispacher {

			var types: string[];
			
			if (typeof type === 'string') {
				types = type.split(/\s+/g);
			} else {
				types = type;
			}

			var i: number = 0;
			var l: number = types.length;
			
			for (; i < l; i++) {
				delete EventDispacher.types[types[i]];
			}
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

			if (EventDispacher.types[type]) {

				handlers = EventDispacher.types[type].slice(); // clone

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

}
