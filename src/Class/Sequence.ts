import EventDispatcher = require('./EventDispatcher');
import Timer = require('./Timer');

/**
 * 非同期逐次処理クラス
 *
 * @version 0.9.0
 * @since 0.4.0
 *
 */
class Sequence extends EventDispatcher {

	/**
	 * シーケンスの持つタスク
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _tasks: Task[] = [];

	/**
	 * 現在実行中のタスク番号
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _currentTaskIndex: number = 0;

	/**
	 * タスクを実行したトータルカウント数
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _iterator: number = 0;

	/**
	 * シーケンスのプロミスオブジェクト
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _promise: JQueryPromise<any> = null;

	/**
	 * シーケンスのリゾルバ
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _resolver: JQueryDeferred<any> = null;

	/**
	 * 遅延時間
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _waitingTime: number = 0;

	/**
	 * 遅延用タイマー
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _waitTimer: Timer = new Timer();

	/**
	 * 停止状態
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _isStop: boolean = true;

	/**
	 * コンストラクタ
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param tasks タスク
	 *
	 */
	constructor (tasks: Function[]) {
		super();
		for (let task of tasks) {
			this._tasks.push(new Task(task, this));
		}
	}

	/**
	 * タスクの実行
	 * TODO: ネイティブのPromiseを使う
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param value タスクに渡すデータ
	 * @param isLoop 最後のタスクが終了したあとに最初に戻ってループ処理をするかどうか
	 * @return インスタンス自身
	 *
	 */
	public act (value: any, isLoop: boolean = false): Sequence {

		// ストップ状態解除
		this._isStop = false;

		// TODO: 引数の設計とテスト書く
		this.trigger('beforeact');

		// タスク取得
		let task: Task = this._tasks[this._currentTaskIndex];

		// タスク実行
		let result: any = task.act(value);

		// 戻り値によるプロミスの設定
		this._setPromiseFrom(result);

		// プロミスの結果から次のタスクを実行
		this._promise.done( (doneResult: any): void => {
			this._reset();
			this._currentTaskIndex += 1;
			this._iterator += 1;
			if (!this._isStop && (this._currentTaskIndex < this._tasks.length || isLoop)) {
				if (this._currentTaskIndex >= this._tasks.length && isLoop) {
					this._currentTaskIndex = 0;
				}
				this.act(doneResult, isLoop);
			} else {
				// TODO: 引数の設計とテスト書く
				this.trigger('stop');
			}
		}).fail( (): void => {
			this._reset();
			// TODO: 引数の設計とテスト書く
			this.trigger('exit');
			this.trigger('stop');
		});
		return this;
	}

	/**
	 * ループでタスクの実行
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public loop (value: any): Sequence {
		return this.act(value, true);
	}

	/**
	 * シーケンス処理から抜ける
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	public exit (): Sequence {
		this._isStop = true;
		if (this._resolver) {
			this._resolver.reject();
		}
		return this;
	}

	/**
	 * 遅延時間を設定する
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public wait (watingTime: number): void {
		this._waitingTime = watingTime;
	}

	/**
	 * タスクを実行したトータルカウント数を取得
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public getCount (): number {
		return this._iterator;
	}

	/**
	 * プロミスの設定
	 * TODO: ネイティブのPromiseを使う
	 * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _setPromiseFrom (value: any): void {
		if (this._isJQueryPromiseLikeObject(value)) {
			// 値がプロミスであればそのままそれを設定
			this._promise = value.promise();
		} else {
			// 値がプロミスでない場合は
			// プロミスを生成してリゾルバへ一時的に設定
			this._resolver = $.Deferred<any>();
			this._promise = this._resolver.promise();
			// タイマーを使い遅延実行後リゾルバからプロミスを解決
			this._waitTimer.wait(this._waitingTime, (): void => {
				this._resolver.resolve(value);
			});
			// TODO: Timerクラス側が未実装
			this._waitTimer.on('cencel', () => {
				this._resolver.reject(value);
			});
		}
	}

	/**
	 * 次のタスクを実行するために一時的なオブジェクトをリセットする
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _reset (): void {
		this._waitTimer.stop();
		this._promise = null;
		this._resolver = null;
		this._waitingTime = 0;
	}

	/**
	 * jQuery Promiseに近いオブジェクト化どうかを判定する
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param object 対象のオブジェクト
	 * @return 判定結果
	 *
	 */
	private _isJQueryPromiseLikeObject (object: any): boolean {
		// 以下列挙したプロパティのみをメンバにもち、かつ全て関数オブジェクトであること
		const PROPS: string[] = [
			'always',
			'done',
			'fail',
			'pipe',
			'progress',
			'promise',
			'state',
			'then',
		];
		if (object instanceof jQuery) {
			return !!object.promise;
		} else {
			object = Object(object);
			while (PROPS.length) {
				let propsName: string = PROPS.shift();
				if (!(propsName in object && $.isFunction(object[propsName]))) {
					return false;
				}
			}
			return true;
		}
	}

}

/**
 * タスクのクラス
 *
 * @private
 * @version 0.9.0
 * @since 0.4.0
 *
 */
class Task {

	/**
	 * 紐づくシーケンサ
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _sequencer: Sequence;

	/**
	 * ___
	 * TODO: ネイティブのPromiseを使う
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _func: Function;

	/**
	 * コンストラクタ
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	constructor (func: Function, sequencer: Sequence) {
		this._func = func;
		this._sequencer = sequencer;
	}

	/**
	 * タスクの実行
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param value タスクに渡すデータ
	 * @return 実行したタスクの戻り値
	 *
	 */
	public act (value: any): any {
		let result: any = this._func.call(this._sequencer, this._sequencer.getCount(), value);
		return result;
	}

}

export = Sequence;
