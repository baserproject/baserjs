/**
 * YouTubeインスタンスの muteControllerメソッドのオプション
 *
 * @version 0.5.0
 * @since 0.5.0
 *
 */
interface YouTubeMuteControllerOptions {
    /**
     * コントローラが実行されるイベントタイプ
     *
     * @since 0.5.0
     *
     */
    eventType?: string;
    /**
     * 適用要素に付加されるミュート状態のクラス名
     *
     * @since 0.5.0
     *
     */
    mutedClass?: string;
    /**
     * 適用要素に付加されるミュートでない状態クラス名
     *
     * @since 0.5.0
     *
     */
    unmutedClass?: string;
    /**
     * 適用要素に付加されるクラス名
     *
     * @since 0.5.0
     *
     */
    baseClass?: string;
}
export = YouTubeMuteControllerOptions;
