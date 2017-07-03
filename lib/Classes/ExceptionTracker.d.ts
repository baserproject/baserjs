export default class ExceptionTracker {
    static ERROR_NAME_NETWORK_ERROR: string;
    static ERROR_NAME_NETWORK_FATAL_ERROR: string;
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
    static catch(error: Error | ErrorEvent | string): void;
}
