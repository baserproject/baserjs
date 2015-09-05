var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EventDispatcher = require('./EventDispatcher');
var Timer = require('./Timer');
/**
 * 非同期逐次処理クラス
 *
 * @version 0.9.0
 * @since 0.4.0
 *
 */
var Sequence = (function (_super) {
    __extends(Sequence, _super);
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param tasks タスク
     *
     */
    function Sequence(tasks) {
        _super.call(this);
        /**
         * シーケンスの持つタスク
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this._tasks = [];
        /**
         * 現在実行中のタスク番号
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */
        this._currentTaskIndex = 0;
        /**
         * タスクを実行したトータルカウント数
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this._iterator = 0;
        /**
         * シーケンスのプロミスオブジェクト
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this._promise = null;
        /**
         * シーケンスのリゾルバ
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this._resolver = null;
        /**
         * 遅延時間
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this._waitingTime = 0;
        /**
         * 遅延用タイマー
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */
        this._waitTimer = new Timer();
        /**
         * 停止状態
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        this._isStop = true;
        for (var i = 0, l = tasks.length; i < l; i++) {
            this._tasks.push(new Task(tasks[i], this));
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
    Sequence.prototype.act = function (value, isLoop) {
        var _this = this;
        if (isLoop === void 0) { isLoop = false; }
        // ストップ状態解除
        this._isStop = false;
        // TODO: 引数の設計とテスト書く
        this.trigger('beforeact');
        // タスク取得
        var task = this._tasks[this._currentTaskIndex];
        // タスク実行
        var result = task.act(value);
        // 戻り値によるプロミスの設定
        this._setPromiseFrom(result);
        // プロミスの結果から次のタスクを実行
        this._promise.done(function (doneResult) {
            _this._reset();
            _this._currentTaskIndex += 1;
            _this._iterator += 1;
            if (!_this._isStop && (_this._currentTaskIndex < _this._tasks.length || isLoop)) {
                if (_this._currentTaskIndex >= _this._tasks.length && isLoop) {
                    _this._currentTaskIndex = 0;
                }
                _this.act(doneResult, isLoop);
            }
            else {
                // TODO: 引数の設計とテスト書く
                _this.trigger('stop');
            }
        }).fail(function () {
            _this._reset();
            // TODO: 引数の設計とテスト書く
            _this.trigger('exit');
            _this.trigger('stop');
        });
        return this;
    };
    /**
     * プロミスの設定
     * TODO: ネイティブのPromiseを使う
     * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    Sequence.prototype._setPromiseFrom = function (value) {
        var _this = this;
        if (this._isJQueryPromiseLikeObject(value)) {
            // 値がプロミスであればそのままそれを設定
            this._promise = value.promise();
        }
        else {
            // 値がプロミスでない場合は
            // プロミスを生成してリゾルバへ一時的に設定
            this._resolver = $.Deferred();
            this._promise = this._resolver.promise();
            // タイマーを使い遅延実行後リゾルバからプロミスを解決
            this._waitTimer.wait(this._waitingTime, function () {
                _this._resolver.resolve(value);
            });
            // TODO: Timerクラス側が未実装
            this._waitTimer.on('cencel', function () {
                _this._resolver.reject(value);
            });
        }
    };
    /**
     * 次のタスクを実行するために一時的なオブジェクトをリセットする
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    Sequence.prototype._reset = function () {
        this._waitTimer.stop();
        this._promise = null;
        this._resolver = null;
        this._waitingTime = 0;
    };
    /**
     * jQuery Promiseに近いオブジェクト化どうかを判定する
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param object 対象のオブジェクト
     * @return 判定結果
     *
     */
    Sequence.prototype._isJQueryPromiseLikeObject = function (object) {
        // 以下列挙したプロパティのみをメンバにもち、かつ全て関数オブジェクトであること
        var PROPS = [
            'always',
            'done',
            'fail',
            'pipe',
            'progress',
            'promise',
            'state',
            'then'
        ];
        if (object instanceof jQuery) {
            return !!object.promise;
        }
        else {
            object = Object(object);
            while (PROPS.length) {
                var propsName = PROPS.shift();
                if (!(propsName in object && $.isFunction(object[propsName]))) {
                    return false;
                }
            }
            return true;
        }
    };
    /**
     * ループでタスクの実行
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    Sequence.prototype.loop = function (value) {
        return this.act(value, true);
    };
    /**
     * シーケンス処理から抜ける
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    Sequence.prototype.exit = function () {
        this._isStop = true;
        if (this._resolver) {
            this._resolver.reject();
        }
        return this;
    };
    /**
    * ___
    *
    * @version 0.4.0
    * @since 0.4.0
    *
    */
    Sequence.prototype.wait = function (watingTime) {
        this._waitingTime = watingTime;
    };
    /**
     * タスクを実行したトータルカウント数を取得
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    Sequence.prototype.getCount = function () {
        return this._iterator;
    };
    return Sequence;
})(EventDispatcher);
/**
 * タスクのクラス
 *
 * @private
 * @version 0.9.0
 * @since 0.4.0
 *
 */
var Task = (function () {
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    function Task(func, sequencer) {
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
    Task.prototype.act = function (value) {
        var result = this._func.call(this._sequencer, this._sequencer.getCount(), value);
        return result;
    };
    return Task;
})();
module.exports = Sequence;
