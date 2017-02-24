import * as  qs from 'qs';

import BaserElement from './BaserElement';

import arrayShuffle from '../fn/arrayShuffle';
import scriptLoad from '../fn/scriptLoad';

const PLAYER_URL = 'https://www.youtube.com/embed/';
const API_URL = 'https://www.youtube.com/player_api';

type YouTubeState = 'unavailable' | 'unstarted' | 'buffering' | 'cued' | 'ended' | 'paused' | 'playing';

/**
 * YouTubeクラスのコンストラクタのオプション
 *
 * @version 0.0.16
 * @since 0.0.16
 *
 */
export interface YouTubeOption {

	/**
	 * YouTubeの動画ID
	 *
	 * @since 1.0.0
	 *
	 */
	videoId?: string;

	/**
	 * 関連動画を再生後に表示させるかどうか
	 *
	 * @since 0.0.16
	 *
	 */
	rel?: boolean;

	/**
	 * 自動再生させるかどうか
	 *
	 * @since 0.0.16
	 *
	 */
	autoplay?: boolean;

	/**
	 * ウィンドウがアクティブでなくなった時に再生を停止するかどうか
	 *
	 * @since 0.0.16
	 *
	 */
	stopOnInactive?: boolean;

	/**
	 * コントロールを表示させるかどうか
	 *
	 * @since 0.0.16
	 *
	 */
	controls?: boolean;

	/**
	 * ループ再生するかどうか
	 *
	 * @since 0.0.16
	 *
	 */
	loop?: boolean;

	/**
	 * 動画情報を表示させるかどうか
	 *
	 * @since 0.0.16
	 *
	 */
	showinfo?: boolean;

	/**
	 * 初期状態でミュートするかどうか
	 *
	 * @since 0.5.0
	 *
	 */
	mute?: boolean;

	/**
	 * 動画の幅
	 *
	 * @since 0.8.0
	 *
	 */
	width?: number;

	/**
	 * 動画の高さ
	 *
	 * @since 0.8.0
	 *
	 */
	height?: number;

	/**
	 * 再生リストの中から最初に再生する動画の番号
	 *
	 * @since 0.8.0
	 *
	 */
	index?: number;

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
	posterHighQuality?: boolean;

	/**
	 * 再生リストの中から最初に再生する動画の再生位置
	 *
	 * 単位: 秒
	 *
	 * @since 0.9.1
	 *
	 */
	startSeconds?: number;

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
	suggestedQuality?: string;

	/**
	 * シャッフル再生するかどうか
	 *
	 * @since 0.10.0
	 *
	 */
	shuffle?: boolean;

	/**
	 * 自動再生でないとき、且つサムネイルの指定があるときに仮埋め込みを実行するかどうか
	 *
	 * @since 0.10.3
	 */
	preEmbed?: boolean;
}

/**
 * IFrame Player Prameters
 *
 * @see https://developers.google.com/youtube/player_parameters#Parameters
 */
interface IFramePlayerParameters {
	/**
	 * autoplay
	 *
	 * 値: 0 または 1。デフォルトは 0 です。プレーヤーを読み込んだときに最初の動画を自動再生するかどうかを指定します。
	 */
	autoplay: 0 | 1;

	/**
	 * cc_load_policy
	 *
	 * 値: 1。デフォルトは、ユーザー設定に基づきます。
	 * 1 に設定すると、ユーザーが字幕をオフにしていても、字幕がデフォルトで表示されます。
	 */
	cc_load_policy?: number;

	/**
	 * color
	 *
	 * プレーヤーの動画進行バーに動画を開始してからの経過時間を示すときに使用する色を指定します。
	 * 有効なパラメータ値は red と white で、デフォルトではプレーヤーの動画進行バーに赤色が使用されます。
	 * color オプションの詳細については YouTube API ブログをご覧ください。
	 *
	 * 注: color パラメータを white に設定すると、modestbranding オプションが無効になります。
	 */
	color: 'white' | 'red';

	/**
	 * controls
	 *
	 * 値: 0、1、または 2。デフォルトは 1 です。
	 * 動画のプレーヤー コントロールを表示するかどうかを指定します。
	 * Flash プレーヤーを読み込む埋め込み IFrame の場合、いつプレーヤーにコントロールを表示するかと、いつプレーヤーを読み込むかも定義します。
	 *
	 * - 0: プレーヤーにプレーヤー コントロールは表示されません。埋め込み IFrame の場合は、Flash プレーヤーがすぐに読み込まれます。
	 * - 1: プレーヤーにプレーヤー コントロールが表示されます。埋め込み IFrame の場合は、コントロールがすぐに表示され、Flash プレーヤーもすぐに読み込まれます。
	 * - 2: プレーヤーにプレーヤー コントロールが表示されます。埋め込み IFrame の場合は、ユーザーが動画の再生を開始した後にコントロールが表示され、Flash プレーヤーが読み込まれます。
	 *
	 * 注: 埋め込み IFrame の場合は、パラメータ値が 1 と 2 の場合のユーザー エクスペリエンスはまったく同じですが、controls=2 を指定すると controls=1 よりもパフォーマンスがよくなります。
	 * 現在は、動画のタイトルのフォントサイズが異なるなど、2 つの値の間でプレーヤーの表示にまだ多少の相違があります。
	 * ただし、両方の値の間の相違がユーザーにまったくわからなくなった場合は、パラメータのデフォルト値が 1 から 2 に変更される可能性があります。
	 */
	controls: 0 | 1 | 2;

	/**
	 * disablekb
	 *
	 * 値: 0 または 1。デフォルトは 0 です。
	 * 1 に設定するとプレーヤーをキーボードで操作できなくなります。
	 * キーボードによる操作は次のようになります。
	 *
	 * - スペースキー: 再生 / 一時停止
	 * - 左矢印キー: 現在の動画を 10% 戻す
	 * - 右矢印キー: 現在の動画を 10% 進める
	 * - 上矢印キー: 音量を上げる
	 * - 下矢印キー: 音量を下げる
	 */
	disablekb: 0 | 1;

	/**
	 * enablejsapi
	 *
	 * 値: 0 または 1。デフォルトは 0 です。このパラメータを 1 に設定すると JavaScript API が有効になります。
	 * JavaScript API とその使用方法の詳細については、JavaScript API に関するドキュメントをご覧ください。
	 *
	 * このbaserJSでは必ず有効にしないといけないため必ず 1 である。
	 */
	enablejsapi: 1;

	/**
	 * end
	 *
	 * 値: 正の整数。動画の再生を停止する必要がある場合に、動画を開始してからの経過時間を秒単位で指定します。
	 * 時間は動画の先頭から測定されます。start プレーヤー パラメータや startSeconds パラメータの値からではありません。
	 * これらは、動画の読み込みまたはキューイングを行うために YouTube Player API 関数で使用されるパラメータです。
	 */
	end: number;

	/**
	 * fs
	 *
	 * 値: 0 または 1。デフォルト値は 1 です。
	 * この値を指定すると全画面表示ボタンが表示されます。
	 * このパラメータを 0 に設定すると、全画面表示ボタンは表示されなくなります。
	 */
	fs: 0 | 1;

	/**
	 * hl
	 *
	 * プレーヤーのインターフェースの言語を設定します。
	 * パラメータの値は、ISO 639-1 2 文字言語コードです。
	 * ただし、IETF 言語タグ（BCP 47）などの他の言語入力コードも正しく処理されます。
	 *
	 * インターフェースの言語はプレーヤーのツールチップで使用され、デフォルトの字幕トラックにも影響します。
	 * なお、ユーザー個別の言語設定と利用可能な字幕トラックに基づいて、YouTube が特定のユーザーに対し異なる字幕トラックを選択することもあります。
	 */
	hl?: string;

	/**
	 * iv_load_policy
	 *
	 * 値: 1 または 3。デフォルトは 1 です。
	 * 1 に設定すると動画アノテーションがデフォルト表示されます。
	 * 3 に設定すると、動画アノテーションはデフォルトで表示されなくなります。
	 */
	iv_load_policy: 1 | 3;

	/**
	 * list
	 *
	 * list パラメータは、プレーヤーに読み込むコンテンツを識別するときに、listType パラメータと組み合わせて使用します。
	 *
	 * - listType パラメータの値が search の場合は、list パラメータの値に検索クエリを指定します。
	 * - listType パラメータの値が user_uploads の場合、list パラメータの値には、読み込まれるアップロード動画の所有者の YouTube チャンネルを指定します。
	 * - listType パラメータの値が playlist の場合は、list パラメータの値に YouTube 再生リスト ID を指定します。パラメータ値に含める再生リスト ID には、下の例に示すように、PL という文字を先頭に付ける必要があります。
	 *   - `http://www.youtube.com/embed?listType=playlist&list=PLC77007E23FF423C6`
	 *
	 * 注: list パラメータと listType パラメータに値を指定する場合は、IFrame 埋め込み URL に動画 ID を指定する必要はありません。
	 */
	list?: string;

	/**
	 * listType
	 *
	 * listType パラメータは、プレーヤーに読み込むコンテンツを識別するときに list パラメータと組み合わせて使用します。
	 * 有効なパラメータ値は、playlist、search および user_uploads です。
	 *
	 * list パラメータと listType パラメータに値を指定する場合は、IFrame 埋め込み URL に動画 ID を指定する必要はありません。
	 */
	listType?: 'search' | 'user_uploads' | 'playlist';

	/**
	 * loop
	 *
	 * 値: 0 または 1。デフォルトは 0 です。
	 * 単一動画プレーヤーの場合に 1 を設定すると、最初の動画が繰り返し再生されます。
	 * 再生リストプレーヤーまたはカスタム プレーヤーの場合、再生リスト全体を再生した後、最初の動画から再び再生が始まります。
	 *
	 * 注: このパラメータは AS3 プレーヤーと埋め込み IFrame でのみサポートされており、AS3 または HTML5 プレーヤーのいずれかが読み込まれます。
	 * loop パラメータは、現時点では playlist パラメータと組み合わせて AS3 プレーヤーで使用した場合のみ動作します。
	 * 単一の動画をループさせる場合は、loop パラメータの値を 1 に設定し、既に Player API URL に指定してある動画 ID と同じ値を playlist パラメータの値に設定します。
	 *
	 * `http://www.youtube.com/v/VIDEO_ID?version=3&loop=1&playlist=VIDEO_ID`
	 */
	loop: 0 | 1;

	/**
	 * modestbranding
	 *
	 * このパラメータを使用すると、YouTube プレーヤーに YouTube ロゴが表示されないようにすることができます。
	 * パラメータの値を 1 に設定すると、YouTube ロゴがコントロール バーに表示されなくなります。
	 * ただし、動画を一時停止したときにユーザーがプレーヤーにカーソルを合わせると、動画の右上に引き続き小さい YouTube テキストラベルが表示されます。
	 */
	modestbranding?: 1;

	/**
	 * origin
	 *
	 * このパラメータは IFrame API のセキュリティを強化します。
	 * 埋め込み IFrame でのみ使用できます。
	 * IFrame API を使用している場合、つまり enablejsapi パラメータの値を 1 に設定している場合は、常に自分のドメインを origin パラメータ値として指定する必要があります。
	 */
	origin?: string;

	/**
	 * playlist
	 *
	 * 値: 再生する動画 ID をカンマで区切ったリスト。
	 * 値を指定すると、URL パスの VIDEO_ID に指定した動画が最初に再生され、playlist パラメータに指定した動画はその後に再生されます。
	 */
	playlist?: string;

	/**
	 * playsinline
	 *
	 * このパラメータは iOS 上の HTML5 プレーヤーで動画をインラインまたは全画面表示のどちらで再生するかを制御します。
	 * 有効な値は次のとおりです。
	 *
	 * - 0: この値を指定すると全画面表示で再生されます。現時点ではこれがデフォルト値ですが、デフォルトは変更される場合があります。
	 * - 1: この値を指定すると、UIWebViews（allowsInlineMediaPlayback プロパティを TRUE に設定して作成したもの）がインライン再生されます。
	 */
	playsinline: 0 | 1;

	/**
	 * rel
	 *
	 * 値: 0 または 1。デフォルトは 1 です。
	 * 最初の動画の再生が終了したときに、プレーヤーに関連動画を表示するかどうかを指定します。
	 */
	rel: 0 | 1;

	/**
	 * showinfo
	 *
	 * 値: 0 または 1。
	 * デフォルト値は 1 です。
	 * パラメータの値を 0 に設定すると、動画の再生が始まる前に動画のタイトルやアップロードしたユーザーなどの情報は表示されません。
	 */
	showinfo: 0 | 1;

	/**
	 * start
	 *
	 * 値: 正の整数。このパラメータを指定すると、動画の先頭から指定された秒数分進めた位置から動画の再生が開始されます。
	 * seekTo 関数と同様に、プレーヤーは指定された時間に最も近いキーフレームを探します。
	 * そのため、リクエストされた時間の直前から再生が開始される場合もありますが、ずれは通常、最大で 2 秒程度です。
	 */
	start: number;
}

/**
 * YouTube要素
 *
 * @version 1.0.0
 * @since 0.0.7
 *
 */
export default class YouTube extends BaserElement<HTMLDivElement> {

	public static STATE_KEY_NAME = 'youtube';

	/**
	 * YouTubeのサムネイル画像を取得する
	 *
	 * @version 0.10.0
	 * @since 0.9.1
	 *
	 */
	public static getPosterImage (movieId: string, highQuality: boolean = false): string {
		const THUMB_URL: string = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
		const THUMB_FILE_NAME: string = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
		return `https:${THUMB_URL}${movieId}${THUMB_FILE_NAME}`;
	}

	/**
	 * ムービーのID
	 *
	 * @version 1.0.0
	 * @since 0.0.7
	 *
	 */
	public movieId: string[] = [];

	/**
	 * 現在のキューのインデックス番号
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public currentCueIndex: number;

	/**
	 * プレイヤーオブジェクト
	 *
	 * @version 0.5.0
	 * @since 0.5.0
	 *
	 */
	public player: YT.Player;

	/**
	 * YouTubeのプレイヤーのDOM ID
	 *
	 * @version 0.9.1
	 * @since 0.9.1
	 */
	public playerDomId: string;

	/**
	 * data-{*}-state属性のキー
	 */
	protected stateKeyName = 'youtube';

	/**
	 * iFrameのsrc値
	 */
	private _src: string;

	/**
	 * ムービーのオプション
	 *
	 * @version 1.0.0
	 * @since 0.0.7
	 *
	 */
	private _config: YouTubeOption;

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
	private _isMuted: boolean;

	/**
	 * APIスクリプトがロード済みで YTオブジェクトが使用可能かどうか
	 */
	private _apiIsLoaded = false;

	/**
	 *
	 */
	private _iframe: BaserElement<HTMLIFrameElement>;

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.0.7
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLDivElement, options?: YouTubeOption) {
		super(el);
		this._init(options);
	}

	// /**
	//  * 再設定する
	//  *
	//  * @version 0.0.7
	//  * @since 0.0.7
	//  * @param options オプション
	//  *
	//  */
	// public reload (options?: YouTubeOption): void {
	// 	this._init(options);
	// }

	/**
	 * ミュートする
	 *
	 * @version 0.8.0
	 * @since 0.5.0
	 *
	 */
	public mute (): void {
		this.player.mute();
		this._isMuted = true;
		this.trigger('onmute', [this.player]);
	}

	/**
	 * ミュートを解除する
	 *
	 * @version 0.8.0
	 * @since 0.5.0
	 *
	 */
	public unMute (): void {
		this.player.unMute();
		this._isMuted = false;
		this.trigger('onunmute', [this.player]);
	}

	/**
	 * ミュートのオンオフを要素にアサインする
	 *
	 * TODO: 別のクラスにする
	 *
	 * @version 0.9.0
	 * @since 0.5.0
	 * @param $el アサインするDOM要素のjQueryオブジェクト
	 * @param options オプション
	 *
	 */
	public muteController (el: HTMLElement, options: {} /* YoutubeMuteControllerOptions */) {
		// const $el: JQuery = $(el);
		// const defaults: YoutubeMuteControllerOptions = {
		// 	eventType: 'click',
		// 	mutedClass: 'is-muted',
		// 	unmutedClass: 'is-unmuted',
		// 	baseClass: 'youtube-mute-ctrl',
		// };
		// const conf: YoutubeMuteControllerOptions = $.extend(defaults, options);
		// BaserElement.addClassTo($el, conf.baseClass);
		// const update: () => void = (): void => {
		// 	if (this._isMuted) {
		// 		BaserElement.addClassTo($el, conf.baseClass, '', conf.mutedClass);
		// 		BaserElement.removeClassFrom($el, conf.baseClass, '', conf.unmutedClass);
		// 	} else {
		// 		BaserElement.addClassTo($el, conf.baseClass, '', conf.unmutedClass);
		// 		BaserElement.removeClassFrom($el, conf.baseClass, '', conf.mutedClass);
		// 	}
		// };
		// const bindCtrl: () => void = (): void => {
		// 	$el.on(conf.eventType, (e: JQueryEventObject): any => {
		// 		if (this._isMuted) {
		// 			this.unMute();
		// 		} else {
		// 			this.mute();
		// 		}
		// 		update();
		// 	});
		// 	update();
		// };
		// this.on('onmute onunmute', (): void => {
		// 	update();
		// });
		// if (this.isEmbeded) {
		// 	bindCtrl();
		// } else {
		// 	this.on('embeded', (e: DispatchEvent, ytp: YT.Player): void => {
		// 		this.off(e.type);
		// 		bindCtrl();
		// 	});
		// }

	}

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
	private async _init (options?: YouTubeOption) {

		this._apiIsLoaded = 'YT' in window;

		this._config = this.merge<YouTubeOption, YouTubeOption>(
			options,
			{
				videoId: '',
				rel: false,
				autoplay: true,
				stopOnInactive: false,
				controls: false,
				loop: true,
				showinfo: false,
				mute: false,
				width: 400,
				height: 300,
				index: 0,
				poster: undefined,
				posterHighQuality: false,
				startSeconds: 0,
				suggestedQuality: 'default',
				shuffle: false,
				preEmbed: true,
			},
		);

		if (!this._config.videoId) {
			throw new TypeError(`Invalid option "videoId".`);
		}

		let movieIdList: string[] = this._config.videoId.split(/\s*,\s*/);

		if (this._config.shuffle) {
			movieIdList = arrayShuffle(movieIdList);
		}

		const param: IFramePlayerParameters = {
			autoplay: 0, // YT.Player.playVideo()を使ってコントロールする
			color: 'red',
			controls: this._config.controls ? 1 : 0,
			disablekb: 1, // TODO: YouTubeOptionから操作可能にする
			enablejsapi: 1,
			end: 0, // TODO: YouTubeOptionから操作可能にする
			fs: 1, // TODO: YouTubeOptionから操作可能にする
			// hl: undefined, // TODO: YouTubeOptionから操作可能にする
			iv_load_policy: 3, // TODO: YouTubeOptionから操作可能にする
			// list: ... // TODO: YouTubeOptionから操作可能にする
			// listType: ... // TODO: YouTubeOptionから操作可能にする
			loop: this._config.loop ? 1 : 0,
			modestbranding: 1, // TODO: YouTubeOptionから操作可能にする
			// origin: undefined // 指定しない
			// playlist: ... // 別実装する
			playsinline: 0, // TODO: YouTubeOptionから操作可能にする
			rel: this._config.rel ? 1 : 0,
			showinfo: this._config.showinfo ? 1 : 0,
			start: 0, // TODO: YouTubeOptionから操作可能にする
		};

		this.movieId = movieIdList;
		this._src = `${PLAYER_URL}${this.movieId[0]}?${qs.stringify(param)}`;
		this.playerDomId = `${this.id}-player`;

		this.changeState('unavailable');

		this._createPosterImage();
		this._createPlayerFrame();

		if (!this._apiIsLoaded) {
			await scriptLoad(API_URL);
			await this._enableYTObject();
		}

		await this._createPlayer();

		this._onEmbeded();
	}

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
	private _createPosterImage (): void {
		const posterUrl = this._config.poster || YouTube.getPosterImage(this.movieId[0], this._config.posterHighQuality);
		this.el.style.backgroundImage = `url("${encodeURI(posterUrl)}")`;
	}

	/**
	 * プレイヤーフレームを生成する
	 *
	 * @version 0.10.3
	 * @since 0.9.1
	 */
	private _createPlayerFrame (): void {
		const iframe = document.createElement('iframe');
		iframe.frameBorder = '0';
		iframe.allowFullscreen = true;
		iframe.src = this._src;
		iframe.id = this.playerDomId;
		iframe.style.position = 'relative';
		iframe.style.display = 'block';
		iframe.style.width = '100%';
		iframe.style.height = '100%';

		this._iframe = new BaserElement(iframe);
		this.detachChildren();
		this.el.appendChild(iframe);
	}

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
	private async _createPlayer () {
		return new Promise((resolve, reject) => {
			const player = new YT.Player(
				this._iframe.el,
				{
					videoId: this.movieId[0],
					events: {
						onStateChange: this._onStateChange.bind(this),
						onReady: () => {
							this.player = player;
							player.playVideo();
							resolve();
						},
					},
				},
			);
		});
	}

	/**
	 * enableYTObject
	 */
	private async _enableYTObject () {
		return new Promise((resolve, reject) => {
			// tslint:disable-next-line no-string-literal
			window['onYouTubeIframeAPIReady'] = () => {
				// tslint:disable-next-line no-string-literal
				window['onYouTubeIframeAPIReady'] = undefined;
				this._apiIsLoaded = true;
				resolve();
			};
		});
	}

	/**
	 *
	 */
	private _onStateChange (e: YT.EventArgs) {
		switch (e.data) {
			case -1: {
				this.changeState('unstarted');
				this.trigger('unstarted', [this.player]);
				const listIndex: number = this.player.getPlaylistIndex();
				if (this.currentCueIndex !== listIndex) {
					this.trigger('changecue', [this.player]);
				}
				this.currentCueIndex = listIndex;
			}
			break;
			case YT.PlayerState.BUFFERING: {
				this.changeState('buffering');
				this.trigger('buffering', [this.player]);
			}
			break;
			case YT.PlayerState.CUED: {
				this.changeState('cued');
				this.trigger('cued', [this.player]);
			}
			break;
			case YT.PlayerState.ENDED: {
				this.changeState('ended');
				this.trigger('ended', [this.player]);
				if (this.movieId.length > 1 && this._config.loop && this.currentCueIndex === this.movieId.length - 1) {
					this.player.playVideoAt(0);
				} else if (this._config.loop) {
					this.player.playVideo();
				}
			}
			break;
			case YT.PlayerState.PAUSED: {
				this.changeState('paused');
				this.trigger('paused', [this.player]);
			}
			break;
			case YT.PlayerState.PLAYING: {
				this.changeState('playing');
				this.trigger('playing', [this.player]);
				this.currentCueIndex = this.player.getPlaylistIndex();
			}
			break;
			default: {
				if ('console' in window) {
					console.warn('YouTube Player state is unknown.');
				}
			}
		}
	}

	/**
	 * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
	 *
	 * @version 1.0.0
	 * @since 0.8.0
	 *
	 */
	private _onEmbeded (): void {
		this._isMuted = this.player.isMuted();

		if (this._config.mute) {
			this.mute();
		}

		if (this._config.stopOnInactive) {
			window.addEventListener('focusout', () => {
				this.player.pauseVideo();
			});
			window.addEventListener('focusin', () => {
				this.player.playVideo();
			});
		}

		// if (this.movieId.length >= 2) {
		// 	// TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
		// 	const _player: any = this.player;
		// 	if (this._config.autoplay) {
		// 		_player.loadPlaylist(this.movieId, this._config.index, this._config.startSeconds, this._config.suggestedQuality);
		// 	} else {
		// 		_player.cuePlaylist(this.movieId, this._config.index, this._config.startSeconds, this._config.suggestedQuality);
		// 	}
		// } else if (this._config.autoplay) {
		// 	this.player.playVideo();
		// }

		this.trigger('embeded', [this.player]);
	}
}
