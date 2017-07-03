"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExceptionTracker = (function () {
    function ExceptionTracker() {
    }
    /**
     * エラーをキャッチしてGoogle Analyticsにトラッキングする
     *
     * 例外処理をキャッチする
     * ```
     * try {
     * 	// error
     * } catch (err) {
     * 	ExceptionTracker.catch(err);
     * }
     * ```
     *
     * エラーイベントをキャッチする
     * ```
     * instance.addEventListener('error', (e) => {
     * 	ExceptionTracker.catch(e);
     * });
     * ```
     */
    ExceptionTracker.catch = function (error) {
        /**
         * 例外の説明
         */
        var exDescription = '';
        /**
         * 例外が致命的の場合は true
         */
        var exFatal = false;
        if (error instanceof ErrorEvent) {
            error = error.error || error.message + " (" + error.filename + ":" + error.lineno + ")";
        }
        if (error instanceof Error) {
            exDescription = error.stack || error.name + ": " + error.message;
            exFatal =
                error instanceof SyntaxError
                    ||
                        error instanceof TypeError
                    ||
                        error.name === ExceptionTracker.ERROR_NAME_NETWORK_FATAL_ERROR;
        }
        else {
            exDescription = "UnknownError: " + error;
        }
        if ('console' in window) {
            if (exFatal) {
                console.error(exDescription);
            }
            else {
                console.warn(exDescription);
            }
        }
        /**
         * 例外の情報があり、かつgaオブジェクトがあれば送信する
         */
        if (exDescription && 'ga' in window) {
            exDescription += " [" + navigator.userAgent + "]";
            console.info("Send to GA Exception tracking --- " + exDescription);
            ga('send', 'exception', {
                exDescription: exDescription,
                exFatal: exFatal,
            });
        }
    };
    ExceptionTracker.ERROR_NAME_NETWORK_ERROR = 'NetworkError';
    ExceptionTracker.ERROR_NAME_NETWORK_FATAL_ERROR = 'NetworkFatalError';
    return ExceptionTracker;
}());
exports.default = ExceptionTracker;
