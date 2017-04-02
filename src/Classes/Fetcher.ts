import ExceptionTracker from './ExceptionTracker';
import Timer from './Timer';

const MAX_RETRY_REQUEST = 5;
const RETRING_DELAY_DURATION = 2000;

/**
 * API独自のエラー処理
 *
 * Fetcher::request処理の途中で実行される
 */
export interface IFetcherAPIErrorHandler<T> {

	/**
	 * @param result APIのレスポンスデータ
	 * @param retryCounter 現在のリトライ回数
	 * @param isOverRetryCount リトライ回数の限度を超えたかどうか判定する関数
	 */
	(result: T, retryCounter: number,  isOverRetryCount: () => boolean): IFetcherAPIErrorHandlerResult;
}

export interface IFetcherAPIErrorHandlerResult {

	/**
	 * エラー名
	 */
	errorName: string;

	/**
	 * 追加するエラーメッセージ
	 */
	errorMessage: string;

	/**
	 * リトライするかどうか
	 */
	willRetry: boolean;

	/**
	 * リトライする際に指定時間待機するかどうか
	 */
	willWait: boolean;
}

/**
 * JSON Fetcher
 *
 * @version 1.0.0
 * @since 1.0.0
 *
 */
export default class Fetcher {

	private _retryCounter = 0;

	private _cache: { [ uri: string ]: Object } = {};

	/**
	 * WebAPIを取得するクラス
	 *
	 * 取得しつつ詳細なエラートラッキングをする
	 */
	constructor () {
		//
	}

	/**
	 * リクエストを投げてAPIデータを取得する
	 *
	 * @param requestUri WebAPIのエンドポイントURI
	 * @param option fetch関数と同じオプション
	 * @param errorHandler API独自のエラー処理
	 * @param cache キャッシュの利用
	 */
	public async request<T> (requestUri: string, option: RequestInit, errorHandler?: IFetcherAPIErrorHandler<T>, cache: boolean = true) {
		// log
		if ('console' in window) {
			console.info(`Request to ${requestUri}`);
		}

		// キャッシュの確認
		if (cache && this._cache[requestUri] != null) {
			console.info(`use cache ${requestUri}`);
			return Promise.resolve(this._cache[requestUri] as T);
		}

		// エラーオブジェクトの準備 処理が成功していれば投げられることはない
		const networkError = new Error();
		networkError.name = ExceptionTracker.ERROR_NAME_NETWORK_ERROR;

		// リクエストを投げる（所謂Ajax）
		const responce = await fetch(requestUri, option);

		// ⏳ awaiting...

		// レスポンスの確認 fetchは異常ステータスでもPromise::rejectされない
		if (!responce.ok) {
			// エラーオブジェクトに整形したメッセージを入れる まだ投げない
			networkError.message = `${(option.method || 'get').toUpperCase()} ${requestUri} ${responce.status} ${responce.statusText}`;
		}

		try {
			// Responce::jsonは非同期でストリームデータをパースする
			// ⚠️ ここでパースに失敗した場合はrejectされて例外がキャッチされる 👉 ①へ
			const result = await responce.json() as T;

			// ⏳ awaiting...

			// リトライのフラグ
			let willRetry = false;
			let willWait = false;

			// API独自のエラーハンドリングがある場合はここで処理をする
			if (errorHandler) {
				const handleResult = errorHandler(result, this._retryCounter, this.isOverRetryCount.bind(this));

				// 結果を反映する
				networkError.name = handleResult.errorName;
				networkError.message += handleResult.errorMessage;
				willRetry = handleResult.willRetry;
				willWait = handleResult.willWait;
			}

			// リトライする場合
			if (willRetry) {
				// 例外を投げると処理が中断するので、エラートラッカーにエラー通知して処理を続行する
				ExceptionTracker.catch(networkError);

				if (willWait) {
					// 待機フラグがある場合 指定秒待機
					await Timer.delay(RETRING_DELAY_DURATION)();
				}

				// ⏳ awaiting... かもしれない

				// カウンターを増やしてリトライする
				this._retryCounter++;
				await this.request(requestUri, option, errorHandler);

			// リトライしない場合
			} else if (networkError.message) {
				// メッセージがエラーオブジェクトに入っていれば例外を投げる 👉 ②へ
				throw networkError;
			}

			// エラーが何もなければ成功
			// リトライ中であればカウンターをリセットして結果を返却
			this._retryCounter = 0;

			// キャッシュする
			this._cache[requestUri] = result;
			return result;
		} catch (e) {
			// 最終的な例外時もカウンターをリセットする
			this._retryCounter = 0;
			if (e instanceof SyntaxError) {
				/**
				 * ①
				 * JSONのパースエラー（SyntaxError）
				 * ネットワークエラーにエラーメッセージを追加させるかたちで例外を投げる
				 */
				networkError.message += ` --> ${e}`;
				return Promise.reject(networkError);
			} else {

				/**
				 * ②
				 * 上記のtryスコープでスタックしてきたエラーオブジェクト
				 * そのまま例外を投げる
				 */
				return Promise.reject(e);
			}
		}
	}

	protected isOverRetryCount (): boolean {
		return MAX_RETRY_REQUEST <= this._retryCounter;
	}
}
