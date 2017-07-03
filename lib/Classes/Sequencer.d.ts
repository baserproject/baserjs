export declare type ISequencerState = 'before-create' | 'stop' | 'before-start' | 'started' | 'progress' | 'step-end' | 'continue';
export declare type IPromiseOrNull<E> = Promise<E> | E | Promise<null> | null | Promise<undefined> | undefined | Promise<void> | void;
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
export declare type ISequencerEventHandler<E> = (this: Sequencer<E>, target: ISequencerEventObject<E>) => void;
export declare type ISequencerStopEventHandler<E> = (this: Sequencer<E>) => void;
export declare type ISequencerEventPromisifyHandler<E> = (this: Sequencer<E>, target: ISequencerEventObject<E>) => IPromiseOrNull<E>;
export default class Sequencer<E> {
    static delay<T = undefined>(delayTime: number, context?: T): Promise<T>;
    static animationFrameProgression(duration: number): (rate: number, index: number) => Promise<number>;
    isRepeat: boolean;
    private _sequenceProgression;
    private _currentStepIndex;
    private _state;
    private _standBy;
    private _progressRate;
    private _available;
    private _stopper;
    private _onBeforeStartHandler;
    private _onStartHandler;
    private _onProgressHandler;
    private _onBeforeStepEndHandler;
    private _onBeforeContinueHandler;
    private _onContinueHandler;
    private _onFinishHandler;
    private _onStoppedHandler;
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
    constructor(elements: E[], stepDurationOrProgression: number | ISequenceProgression, init?: ISequencerEventPromisifyHandler<E>);
    /**
     * シーケンス処理をする対象の要素リスト
     */
    readonly elements: E[];
    /**
     * シーケンス処理を開始する
     *
     * @chainable
     */
    start(): this;
    /**
     *
     */
    stop(): this;
    /**
     * 処理をはじめに開始する要素番号を指定する
     *
     * @chainable
     */
    setStartIndex(index: number): this;
    /**
     * 繰り返し処理をするかどうか指定する
     *
     * @chainable
     * @param repeat 繰り返す
     */
    repeat(repeat: boolean): this;
    /**
     * 開始前のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onBeforeStart(handler: ISequencerEventPromisifyHandler<E>): this;
    /**
     * 開始時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onStart(handler: ISequencerEventPromisifyHandler<E>): this;
    /**
     * 処理中のイベント
     *
     * requestAnimationFrameのタイミングで発火する
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onProgress(handler: ISequencerEventHandler<E>): this;
    /**
     * 1つのシーケンスステップが終わった時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onBeforeStepEnd(handler: ISequencerEventPromisifyHandler<E>): this;
    /**
     * 次のシーケンスに移る直前のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onBeforeContinue(handler: ISequencerEventPromisifyHandler<E>): this;
    /**
     * 次のシーケンスに移った時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onContinue(handler: ISequencerEventPromisifyHandler<E>): this;
    /**
     * 終了時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onFinish(handler: ISequencerEventHandler<E>): this;
    /**
     * 停止時のイベント
     *
     * @chainable
     * @param handler イベントハンドラ
     */
    onStopped(handler: ISequencerStopEventHandler<E>): this;
    private _create(init?);
    private _init(init?);
    private _seq();
    private _beforeStart();
    private _start();
    private _step();
    private _progress();
    private _stepEnd();
    private _continue();
    private _finish();
    private _getEventObject();
    private _uncontinuable();
}
