export default class ExceptionTracker {

	public static ERROR_NAME_NETWORK_ERROR = 'NetworkError';

	public static ERROR_NAME_NETWORK_FATAL_ERROR = 'NetworkFatalError';

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
	public static catch (error: Error | ErrorEvent | string): void { // tslint:disable-line no-any

		/**
		 * 例外の説明
		 */
		let exDescription = '';

		/**
		 * 例外が致命的の場合は true
		 */
		let exFatal = false;

		if (error instanceof ErrorEvent) {
			error = error.error || `${error.message} (${error.filename}:${error.lineno})`;
		}

		if (error instanceof Error) {
			exDescription = error.stack || `${error.name}: ${error.message}`;
			exFatal =
				error instanceof SyntaxError
				||
				error instanceof TypeError
				||
				error.name === ExceptionTracker.ERROR_NAME_NETWORK_FATAL_ERROR;
		} else {
			exDescription = `UnknownError: ${error}`;
		}

		if ('console' in window) {
			if (exFatal) {
				console.error(exDescription);
			} else {
				console.warn(exDescription);
			}
		}

		/**
		 * 例外の情報があり、かつgaオブジェクトがあれば送信する
		 */
		if (exDescription && 'ga' in window) {
			exDescription += ` [${navigator.userAgent}]`;
			console.info(`Send to GA Exception tracking --- ${exDescription}`);
			ga('send', 'exception', {
				exDescription,
				exFatal,
			});
		}
	}
}
