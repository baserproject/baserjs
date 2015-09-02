/**
 * イベントオブジェクトのクラス
 *
 * @version 0.3.0
 * @since 0.0.10
 *
 */
class DispacheEvent {

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
		
export = DispacheEvent;