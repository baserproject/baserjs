import BreakPointsOption = require('../Interface/BreakPointsOption');
import AlignedBoxCallback = require('../Interface/AlignedBoxCallback');
import CheckableElementOption = require('../Interface/CheckableElementOption');
import SelectOption = require('../Interface/SelectOption');
import ScrollOptions = require('../Interface/ScrollOptions');
import GoogleMapsOption = require('../Interface/GoogleMapsOption');
import YouTubeOption = require('../Interface/YouTubeOption');
declare class JQueryAdapter {
    static bcScrollTo(selector: any, options?: ScrollOptions): void;
    /**
     * 自信の要素を基準に、指定の子要素を背景のように扱う
     *
     * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
     *
     * 基準も縦横のセンター・上下・左右に指定可能
     *
     * @version 0.2.0
     * @since 0.0.9
     * @param {Object} options オプション
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
     * ```
     *
     * ### Result
     *
     * comming soon...
     *
     */
    bcBackground(options: any): JQuery;
    /**
     * 要素の高さを揃える
     *
     * @version 0.7.0
     * @since 0.0.15
     *
     */
    bcBoxAlignHeight(columnOrKeyword?: string | number | BreakPointsOption<number>, detailTarget?: string, callback?: AlignedBoxCallback): JQuery;
    bcBoxLink(): JQuery;
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたチェックボックスに変更する
     *
     * @version 0.7.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    bcCheckbox(options: CheckableElementOption): JQuery;
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたラジオボタンに変更する
     *
     * @version 0.7.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    bcRadio(options: CheckableElementOption): JQuery;
    /**
     * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
     *
     * @version 0.8.0
     * @since 0.0.1
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    bcSelect(options: string | SelectOption): JQuery;
    /**
     * 要素内の画像の読み込みが完了してからコールバックを実行する
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    bcImageLoaded(callback: () => any): JQuery;
    /**
     * 親のコンテナ要素の幅に合わせて、自信の縦横比を保ったまま幅の変更に対応する
     *
     * iframeなどの縦横比を保ちたいが、幅を変更しても高さが変化しない要素などに有効
     *
     * @version 0.0.9
     * @since 0.0.9
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
     * ```
     *
     * ### Result
     *
     * comming soon...
     *
     */
    bcKeepAspectRatio(): JQuery;
    /**
     * リンク要素からのアンカーまでスムーズにスクロールをさせる
     *
     * @version 0.1.0
     * @since 0.0.8
     *
     * * * *
     *
     * ## Sample
     *
     * comming soon...
     *
     */
    bcScrollTo(options?: ScrollOptions): JQuery;
    /**
     * リストを均等に分割する
     *
     * @version 0.2.0
     * @since 0.0.14
     *
     */
    bcSplitList(columnSize: number, options: any): JQuery;
    /**
     * マウスオーバー時に一瞬透明になるエフェクトをかける
     *
     * @version 0.0.14
     * @since 0.0.14
     *
     */
    bcWink(options: any): JQuery;
    /**
     * マップを埋め込む
     *
     * 現在の対応はGoogleMapsのみ
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-lat="33.606785" data-lng="130.418314"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcMaps();
     * ```
     *
     * ### Result
     *
     * comming soon...
     *
     */
    bcMaps(options?: GoogleMapsOption): JQuery;
    /**
     * YouTubeを埋め込む
     *
     * @version 0.0.8
     * @since 0.0.8
     *
     * * * *
     *
     * ## Sample
     *
     * ### Target HTML
     *
     * ```html
     * <div class="sample" data-id="rb0zOstIiyU" data-width="720" data-height="480"></div>
     * ```
     *
     * ### Execute
     *
     * ```js
     * $('.sample').bcYoutube();
     * ```
     *
     * ### Result
     *
     * <div data-height="400"
         data-theme-id="9760"
         data-slug-hash="pboIt"
         data-default-tab="result"
         data-user="YusukeHirao"
         class='codepen'>
         <pre>
           <code>$(&#39;.sample&#39;).bcYoutube();</code>
         </pre>
         <p>See the Pen <a href='http://codepen.io/YusukeHirao/pen/pboIt/'>bcYoutube</a>
         by Yusuke Hirao (<a href='http://codepen.io/YusukeHirao'>@YusukeHirao</a>)
         on <a href='http://codepen.io'>CodePen</a>.</p>
       </div>
       <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
     *
     */
    bcYoutube(options?: YouTubeOption): JQuery;
    /**
     * マウスオーバー時に画像を切り替える
     *
     * 【使用非推奨】できるかぎり CSS の `:hover` と `background-image` を使用するべきです。
     *
     * @deprecated
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    bcRollover(options: any): JQuery;
    /**
     * マウスオーバー時に半透明になるエフェクトをかける
     *
     * 【使用非推奨】できるかぎり CSS の `:hover` と `opacity`、そして `transition` を使用するべきです。
     *
     * @deprecated
     * @version 0.0.15
     * @since 0.0.15
     *
     */
    bcShy(options: any): JQuery;
}
export = JQueryAdapter;
