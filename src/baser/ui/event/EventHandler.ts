module baser.ui.event {

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

}