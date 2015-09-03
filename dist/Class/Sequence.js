/**
 * 非同期逐次処理クラス
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */
var Sequence = (function () {
    function Sequence(tasks) {
        this._tasks = [];
        this._index = 0;
        this._iterator = 0;
        this._promise = null;
        this._resolver = null;
        this._waitingTime = 0;
        this._waitTimer = 0;
        this._toExit = false;
        var i = 0;
        var l = tasks.length;
        for (; i < l; i++) {
            this._tasks.push(new Task(tasks[i]));
        }
    }
    // TODO: ネイティブのPromiseを使う
    Sequence.prototype.act = function (value, isLoop) {
        var _this = this;
        if (isLoop === void 0) { isLoop = false; }
        var task = this._tasks[this._index];
        var result = task.act(this, this._iterator, value);
        // Type like JQueryDeferred
        if (isJQueryPromiseLikeObject(result)) {
            this._promise = result.promise();
        }
        else {
            this._resolver = $.Deferred();
            this._waitTimer = setTimeout(function () {
                _this._resolver.resolve(result);
            }, this._waitingTime);
            // promised
            this._promise = this._resolver.promise();
        }
        this._promise.done(function (doneResult) {
            clearTimeout(_this._waitTimer);
            _this._promise = null;
            _this._resolver = null;
            _this._waitTimer = null;
            _this._waitingTime = 0;
            _this._index += 1;
            _this._iterator += 1;
            if (!_this._toExit && (_this._index < _this._tasks.length || isLoop)) {
                if (_this._index >= _this._tasks.length && isLoop) {
                    _this._index = 0;
                }
                _this.act(doneResult, isLoop);
            }
        }).fail(function () {
            clearTimeout(_this._waitTimer);
            _this._promise = null;
            _this._resolver = null;
            _this._waitTimer = null;
            _this._waitingTime = 0;
        });
        return this;
    };
    Sequence.prototype.loop = function (value) {
        return this.act(value, true);
    };
    Sequence.prototype.exit = function () {
        this._toExit = true;
        if (this._resolver) {
            this._resolver.reject();
        }
        return this;
    };
    Sequence.prototype.wait = function (watingTime) {
        this._waitingTime = watingTime;
    };
    return Sequence;
})();
var Task = (function () {
    function Task(func) {
        this.status = TaskState.yet;
        this._func = func;
    }
    Task.prototype.act = function (sequence, sequenceIndex, value) {
        var result = this._func.call(sequence, sequenceIndex, value);
        this.status = TaskState.done;
        return result;
    };
    return Task;
})();
var TaskState;
(function (TaskState) {
    TaskState[TaskState["done"] = 0] = "done";
    TaskState[TaskState["yet"] = 1] = "yet";
})(TaskState || (TaskState = {}));
function isJQueryPromiseLikeObject(object) {
    var props = [
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
        while (props.length) {
            if (!(props.shift() in Object(object))) {
                return false;
            }
        }
        return true;
    }
}
module.exports = Sequence;
