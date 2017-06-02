const targetElements: WeakMap<Sequencer<any>, any[]> = new WeakMap(); // tslint:disable-line:no-any

export type ISequencerState = 'before-create' | 'stop' | 'before-start' | 'started' | 'progress' | 'step-end' | 'continue';

export type IPromiseOrNull<E> = Promise<E> | E | Promise<null> | null | Promise<undefined> | undefined | Promise<void> | void;

export interface ISequenceProgression {
	(rate: number, index: number): Promise<number>;
}

export interface ISequencerEventObject<E> {
	index: number;
	current: E;
	prev?: E;
	next?: E;
	list?: E[];
	rate: number;
	state: ISequencerState;
}

export type ISequencerEventHandler<E> = (this: Sequencer<E>, target: ISequencerEventObject<E>) => void;
export type ISequencerStopEventHandler<E> = (this: Sequencer<E>) => void;
export type ISequencerEventPromisifyHandler<E> = (this: Sequencer<E>, target: ISequencerEventObject<E>) => IPromiseOrNull<E>;

export default class Sequencer<E> {

	public static delay<T = undefined> (delayTime: number, context?: T) {
		return new Promise<T>((resolve) => {
			setTimeout(() => resolve(context), delayTime);
		});
	}

	public static animationFrameProgression (duration: number) {
		let startTimestamp: number;
		return (rate: number, index: number) => {
			// STOP -> STARTに対応していない
			return new Promise<number>((resolve) => {
				if (rate === 0) {
					// initialize startTimestamp
					startTimestamp = Date.now();
				}
				requestAnimationFrame(() => resolve((Date.now() - startTimestamp) / duration));
			});
		};
	}

	public isRepeat = false;

	private _sequenceProgression: ISequenceProgression;

	private _currentStepIndex = 0;

	private _state: ISequencerState = 'before-create';

	private _standBy = false;

	private _progressRate = 0;

	private _available = false;

	private _stopper = Symbol('seaquence-stopper');

	private _onBeforeStartHandler: ISequencerEventPromisifyHandler<E>;
	private _onStartHandler: ISequencerEventPromisifyHandler<E>;
	private _onProgressHandler: ISequencerEventHandler<E>;
	private _onBeforeStepEndHandler: ISequencerEventPromisifyHandler<E>;
	private _onBeforeContinueHandler: ISequencerEventPromisifyHandler<E>;
	private _onContinueHandler: ISequencerEventPromisifyHandler<E>;
	private _onFinishHandler: ISequencerEventHandler<E>;
	private _onStoppedHandler: ISequencerStopEventHandler<E>;

	/**
	 * 要素ごとに何かしらの逐次処理を実行させるクラス
	 *
	 * 第2引数に数値を与えると **ステップ間の経過時間** と解釈され、
	 * `Sequencer.animationFrameProgression(duration)` を指定したことと同義になる。
	 *
	 * @param elements 逐次処理をする対象の要素リスト
	 * @param stepDurationOrProgression ステップ間の経過時間 もしくは ステップ間の進捗処理
	 * @param init 初期処理
	 */
	constructor (elements: E[], stepDurationOrProgression: number | ISequenceProgression, init?: ISequencerEventPromisifyHandler<E>) {
		targetElements.set(this, elements);
		this._sequenceProgression = typeof stepDurationOrProgression === 'number' ? Sequencer.animationFrameProgression(stepDurationOrProgression) : stepDurationOrProgression;
		this._create(init);
	}

	/**
	 * シーケンス処理をする対象の要素リスト
	 */
	public get elements (): E[] {
		return targetElements.get(this)!;
	}

	/**
	 * シーケンス処理を開始する
	 *
	 * @chainable
	 */
	public start () {
		if (this._state === 'before-create') {
			this._standBy = true;
		} else {
			this._available = true;
			this._seq();
		}
		return this;
	}

	/**
	 *
	 */
	public stop () {
		this._available = false;
		return this;
	}

	/**
	 * 処理をはじめに開始する要素番号を指定する
	 *
	 * @chainable
	 */
	public setStartIndex (index: number) {
		// TODO: validation
		this._currentStepIndex = index;
		return this;
	}

	/**
	 * 繰り返し処理をするかどうか指定する
	 *
	 * @chainable
	 * @param repeat 繰り返す
	 */
	public repeat (repeat: boolean) {
		this.isRepeat = repeat;
		return this;
	}

	/**
	 * 開始前のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onBeforeStart (handler: ISequencerEventPromisifyHandler<E>) {
		this._onBeforeStartHandler = handler.bind(this);
		return this;
	}

	/**
	 * 開始時のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onStart (handler: ISequencerEventPromisifyHandler<E>) {
		this._onStartHandler = handler.bind(this);
		return this;
	}

	/**
	 * 処理中のイベント
	 *
	 * requestAnimationFrameのタイミングで発火する
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onProgress (handler: ISequencerEventHandler<E>) {
		this._onProgressHandler = handler.bind(this);
		return this;
	}

	/**
	 * 1つのシーケンスステップが終わった時のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onBeforeStepEnd (handler: ISequencerEventPromisifyHandler<E>) {
		this._onBeforeStepEndHandler = handler.bind(this);
		return this;
	}

	/**
	 * 次のシーケンスに移る直前のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onBeforeContinue (handler: ISequencerEventPromisifyHandler<E>) {
		this._onBeforeContinueHandler = handler.bind(this);
		return this;
	}

	/**
	 * 次のシーケンスに移った時のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onContinue (handler: ISequencerEventPromisifyHandler<E>) {
		this._onContinueHandler = handler.bind(this);
		return this;
	}

	/**
	 * 終了時のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onFinish (handler: ISequencerEventHandler<E>) {
		this._onFinishHandler = handler.bind(this);
		return this;
	}

	/**
	 * 停止時のイベント
	 *
	 * @chainable
	 * @param handler イベントハンドラ
	 */
	public onStopped (handler: ISequencerStopEventHandler<E>) {
		this._onStoppedHandler = handler.bind(this);
		return this;
	}

	private async _create (init?: ISequencerEventPromisifyHandler<E>) {
		await this._init(init);
		this._state = 'stop';
		if (this._standBy) {
			this._standBy = false;
			this._available = true;
			await this._seq();
		}
	}

	private async _init (init?: ISequencerEventPromisifyHandler<E>) {
		if (!init) {
			return Promise.resolve();
		}
		await init.call(this, this._getEventObject());
	}

	private async _seq () {
		try {
			await this._beforeStart();
			await this._start();
			await this._step();
			await this._stepEnd();
		} catch (rejectReason) {
			if (this._stopper === rejectReason) {
				this._onStoppedHandler.call(this);
				return;
			} else {
				throw rejectReason;
			}
		}
		if (this._uncontinuable()) {
			this._finish();
		} else {
			await this._continue();
			this._seq();
		}
	}

	private async _beforeStart () {
		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		this._state = 'before-start';
		if (!this._onBeforeStartHandler) {
			return Promise.resolve();
		}
		await this._onBeforeStartHandler(this._getEventObject());
	}

	private async _start () {
		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		this._state = 'started';
		if (!this._onStartHandler) {
			return Promise.resolve();
		}
		await this._onStartHandler(this._getEventObject());
	}

	private async _step () {
		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		this._state = 'progress';
		if (this._progressRate >= 1) {
			this._progressRate = 0;
		}
		while (await this._progress()); // tslint:disable-line:curly
		if (!this._onBeforeStepEndHandler) {
			return Promise.resolve();
		}
		await this._onBeforeStepEndHandler(this._getEventObject());
	}

	private async _progress () {
		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		const rate = await this._sequenceProgression(this._progressRate, this._currentStepIndex);
		this._progressRate = Math.min(rate, 1);
		if (this._onProgressHandler) {
			this._onProgressHandler(this._getEventObject());
		}
		if (this._progressRate < 1) {
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	}

	private async _stepEnd () {
		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		this._state = 'step-end';
	}

	private async _continue () {
		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		const elements = this.elements;
		if (this._onBeforeContinueHandler) {
			await this._onBeforeContinueHandler(this._getEventObject());
		}

		if (!this._available) {
			return Promise.reject(this._stopper);
		}
		this._state = 'continue';
		this._currentStepIndex += 1;
		if (elements.length <= this._currentStepIndex) {
			this._currentStepIndex = 0;
		}
		if (!this._onContinueHandler) {
			return Promise.resolve();
		}
		await this._onContinueHandler(this._getEventObject());
	}

	private _finish () {
		this._state = 'stop';
		if (this._onFinishHandler) {
			this._onFinishHandler(this._getEventObject());
		}
	}

	private _getEventObject (): ISequencerEventObject<E> {
		const elements = this.elements;
		return {
			current: elements[this._currentStepIndex],
			prev: elements[this._currentStepIndex - 1] || elements[elements.length - 1] || null,
			next: elements[this._currentStepIndex + 1] || elements[0] || null,
			index: this._currentStepIndex,
			list: elements,
			rate: this._progressRate,
			state: this._state,
		};
	}

	private _uncontinuable () {
		return this.elements.length - 1 <= this._currentStepIndex && !this.isRepeat;
	}
}
