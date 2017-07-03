/// <reference types="youtube" />
import BaserElement from './BaserElement';
/**
 * YouTubeクラスのコンストラクタのオプション
 *
 * @version 0.0.16
 * @since 0.0.16
 *
 */
export interface YouTubeConfig {
    /**
     * YouTubeの動画ID
     *
     * @since 1.0.0
     *
     */
    videoId: string;
    /**
     * 関連動画を再生後に表示させるかどうか
     *
     * @since 0.0.16
     *
     */
    rel: boolean;
    /**
     * 自動再生させるかどうか
     *
     * @since 0.0.16
     *
     */
    autoplay: boolean;
    /**
     * ウィンドウがアクティブでなくなった時に再生を停止するかどうか
     *
     * @since 0.0.16
     *
     */
    stopOnInactive: boolean;
    /**
     * コントロールを表示させるかどうか
     *
     * @since 0.0.16
     *
     */
    controls: boolean;
    /**
     * ループ再生するかどうか
     *
     * @since 0.0.16
     *
     */
    loop: boolean;
    /**
     * 動画情報を表示させるかどうか
     *
     * @since 0.0.16
     *
     */
    showinfo: boolean;
    /**
     * 初期状態でミュートするかどうか
     *
     * @since 0.5.0
     *
     */
    mute: boolean;
    /**
     * 動画の幅
     *
     * @since 0.8.0
     *
     */
    width: number;
    /**
     * 動画の高さ
     *
     * @since 0.8.0
     *
     */
    height: number;
    /**
     * 再生リストの中から最初に再生する動画の番号
     *
     * @since 0.8.0
     *
     */
    index: number;
    /**
     * サムネイル画像のパス
     *
     * @version 0.9.1
     * @since 0.9.1
     */
    poster?: string;
    /**
     * サムネイル画像が高画質かどうか
     *
     * @version 0.10.0
     * @since 0.9.1
     */
    posterHighQuality: boolean;
    /**
     * 再生リストの中から最初に再生する動画の再生位置
     *
     * 単位: 秒
     *
     * @since 0.9.1
     *
     */
    startSeconds: number;
    /**
     * 動画の推奨再生画質を指定
     *
     * - 画質レベル small: プレーヤーの高さが 240 ピクセル、サイズが 320x240 ピクセル（アスペクト比 4:3）以上。
     * - 画質レベル medium: プレーヤーの高さが 360 ピクセル、サイズが 640x360 ピクセル（アスペクト比 16:9）または 480x360 ピクセル（アスペクト比 4:3）。
     * - 画質レベル large: プレーヤーの高さが 480 ピクセル、サイズが 853x480 ピクセル（アスペクト比 16:9）または 640x480 ピクセル（アスペクト比 4:3）。
     * - 画質レベル hd720: プレーヤーの高さが 720 ピクセル、サイズが 1280x720 ピクセル（アスペクト比 16:9）または 960x720 ピクセル（アスペクト比 4:3）。
     * - 画質レベル hd1080: プレーヤーの高さが 1080 ピクセル、サイズが 1920x1080 ピクセル（アスペクト比 16:9）または 1440x1080 ピクセル（アスペクト比 4:3）。
     * - 画質レベル highres: プレーヤーの高さが 1080 ピクセル以上、つまりプレーヤーのアスペクト比が 1920x1080 ピクセル以上。
     * - 画質レベル default: YouTube が適切な再生画質を選択します。この設定は、画質レベルをデフォルトの状態に戻します。それまでに cueVideoById、loadVideoById または setPlaybackQuality の各関数で行った再生画質の設定は無効になります。
     *
     * @since 0.9.1
     *
     */
    suggestedQuality: string;
    /**
     * シャッフル再生するかどうか
     *
     * @since 0.10.0
     *
     */
    shuffle: boolean;
    /**
     * 自動再生でないとき、且つサムネイルの指定があるときに仮埋め込みを実行するかどうか
     *
     * @since 0.10.3
     */
    preEmbed: boolean;
}
/**
 * YouTube要素
 *
 * @version 1.0.0
 * @since 0.0.7
 *
 */
export default class YouTube extends BaserElement<HTMLDivElement, YouTubeConfig> {
    static STATE_KEY_NAME: string;
    /**
     * YouTubeのサムネイル画像を取得する
     *
     * @version 0.10.0
     * @since 0.9.1
     *
     */
    static getPosterImage(movieId: string, highQuality?: boolean): string;
    /**
     * ムービーのID
     *
     * @version 1.0.0
     * @since 0.0.7
     *
     */
    movieId: string[];
    /**
     * 現在のキューのインデックス番号
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    currentCueIndex: number;
    /**
     * プレイヤーオブジェクト
     *
     * @version 0.5.0
     * @since 0.5.0
     *
     */
    player: YT.Player;
    /**
     * YouTubeのプレイヤーのDOM ID
     *
     * @version 0.9.1
     * @since 0.9.1
     */
    playerDomId: string;
    /**
     * data-{*}-state属性のキー
     */
    protected stateKeyName: string;
    /**
     * iFrameのsrc値
     */
    private _src;
    /**
     * ミュートされているかどうか
     *
     * `this.player.isMuted()` を利用すれば判定はできるが
     * `this.player.mute()` もしくは `this.player.unMute()` 実行直後では
     * `this.player.isMuted()` の判定が不安定なため
     * （APIの実行完了を監視しなければならないが、そのためのイベントが存在しない）
     * 独自にインスタンスプロパティとして保持する
     *
     * @version 0.5.0
     * @since 0.5.0
     *
     */
    private _isMuted;
    /**
     * APIスクリプトがロード済みで YTオブジェクトが使用可能かどうか
     */
    private _apiIsLoaded;
    /**
     *
     */
    private _iframe;
    /**
     * ミュートする
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    mute(): void;
    /**
     * ミュートを解除する
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    unMute(): void;
    protected _create(): void;
    /**
     * 初期化
     *
     * use: jQuery
     *
     * TODO: 長いので分割
     *
     * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
     *
     * @version 1.0.0
     * @since 0.0.7
     * @param options オプション
     *
     */
    private _init();
    /**
     * ポスターイメージの生成
     *
     * data-poster属性の中からポスター画像を生成する
     *
     * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
     * それ以外の場合は パスと見なして画像を参照する
     *
     * @version 1.0.0
     * @since 0.9.1
     * @param movieId 動画のID
     *
     */
    private _createPosterImage();
    /**
     * プレイヤーフレームを生成する
     *
     * @version 0.10.3
     * @since 0.9.1
     */
    private _createPlayerFrame();
    /**
     * プレイヤーを生成する
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.8.0
     * @param playerID プレイヤーのDOM ID
     *
     */
    private _createPlayer();
    /**
     * enableYTObject
     */
    private _enableYTObject();
    /**
     *
     */
    private _onStateChange(e);
    /**
     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
     *
     * @version 1.0.0
     * @since 0.8.0
     *
     */
    private _onEmbeded();
}
