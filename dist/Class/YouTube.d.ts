import BaserElement = require('./BaserElement');
import YouTubeOption = require('../Interface/YouTubeOption');
import YoutubeMuteControllerOptions = require('../Interface/YoutubeMuteControllerOptions');
/**
 * YouTube要素
 *
 * @version 0.8.0
 * @since 0.0.7
 *
 */
declare class YouTube extends BaserElement {
    /**
     * 管理対象の要素に付加するclass属性値のプレフィックス
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    static className: string;
    /**
     * Player URL
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    static PLAYER_URL: string;
    /**
     * API URL
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    static API_URL: string;
    /**
     * 管理対象の要素
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    static movies: YouTube[];
    /**
     * ムービーのID
     *
     * @version 0.8.0
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
     * ムービーのオプション
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    movieOption: YouTubeOption;
    /**
     * プレイヤーオブジェクト
     *
     * @version 0.5.0
     * @since 0.5.0
     *
     */
    player: YT.Player;
    /**
     * プレイヤーが有効になっているかどうか
     *
     * @version 0.5.0
     * @since 0.5.0
     *
     */
    isEmbeded: boolean;
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
     * コンストラクタ
     *
     * @version 0.8.0
     * @since 0.0.7
     * @param $el 管理するDOM要素のjQueryオブジェクト
     *
     */
    constructor($el: JQuery, options?: YouTubeOption);
    /**
     * 初期化
     *
     * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
     *
     * @version 0.8.0
     * @since 0.0.7
     * @param $el 管理するDOM要素のjQueryオブジェクト
     * @return {booelan} 初期化が成功したかどうか
     *
     */
    private _init(options?);
    /**
     * プレイヤーを生成する
     *
     * @version 0.8.0
     * @since 0.8.0
     * @param playerID プレイヤーのDOM ID
     *
     */
    private _createPlayer(playerID);
    /**
     * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
     *
     * @version 0.8.0
     * @since 0.8.0
     *
     */
    private _onEmbeded();
    /**
     * 再設定する
     *
     * @version 0.0.7
     * @since 0.0.7
     *
     */
    reload(options?: YouTubeOption): void;
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
    /**
     * ミュートのオンオフを要素にアサインする
     *
     * @version 0.8.0
     * @since 0.5.0
     * @param $el アサインするDOM要素のjQueryオブジェクト
     * @param options オプション
     *
     */
    muteController($el: any, options: YoutubeMuteControllerOptions): void;
}
export = YouTube;
