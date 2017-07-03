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
    (result: T, retryCounter: number, isOverRetryCount: () => boolean): IFetcherAPIErrorHandlerResult;
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
    private _retryCounter;
    private _cache;
    /**
     * WebAPIを取得するクラス
     *
     * 取得しつつ詳細なエラートラッキングをする
     */
    constructor();
    /**
     * リクエストを投げてAPIデータを取得する
     *
     * @param requestUri WebAPIのエンドポイントURI
     * @param option fetch関数と同じオプション
     * @param errorHandler API独自のエラー処理
     * @param cache キャッシュの利用
     */
    request<T>(requestUri: string, option: RequestInit, errorHandler?: IFetcherAPIErrorHandler<T>, cache?: boolean): Promise<T>;
    protected isOverRetryCount(): boolean;
}
