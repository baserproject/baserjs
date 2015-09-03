/**
 * 非同期逐次処理クラス
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */
declare class Sequence {
    private _tasks;
    private _index;
    private _iterator;
    private _promise;
    private _resolver;
    private _waitingTime;
    private _waitTimer;
    private _toExit;
    constructor(tasks: Function[]);
    act(value: any, isLoop?: boolean): Sequence;
    loop(value: any): Sequence;
    exit(): Sequence;
    wait(watingTime: number): void;
}
export = Sequence;
