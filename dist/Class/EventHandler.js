var UtilString = require('./UtilString');
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.0.10
 * @since 0.0.10
 *
 */
var EventHandler = (function () {
    function EventHandler(context, type, handler) {
        this.context = context;
        this.id = UtilString.UID();
        this.type = type;
        this.handler = handler;
    }
    return EventHandler;
})();
module.exports = EventHandler;
