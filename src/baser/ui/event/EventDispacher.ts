module baser {

	export module ui {

		export module event {

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
				 * @version 0.0.10
				 * @since 0.0.10
				 *
				 */
				public on (type: string, handler: Function): EventDispacher {
	
					var eventHandler: EventHandler = new EventHandler(this, type, handler);
					EventDispacher.eventHandlers[eventHandler.id] = eventHandler;
					if (!EventDispacher.types[type]) {
						EventDispacher.types[type] = [];
					}
					EventDispacher.types[type].push(eventHandler);
	
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
					delete EventDispacher.types[type];
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

	}

}
