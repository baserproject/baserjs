import UtilString = require('./UtilString');
import EventDispatcher = require('./EventDispatcher');
import Browser = require('./Browser');
import BreakPoints = require('./BreakPoints');
import BaserElement = require('./BaserElement');
import AlignedBoxCallback = require('../Interface/AlignedBoxCallback');
import BreakPointsOption = require('../Interface/BreakPointsOption');

/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */
class AlignedBoxes extends EventDispatcher {

	/**
	 * jQuery dataに自信のインスタンスを登録するキー
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static DATA_KEY: string = 'bc-box';

	/**
	 * jQuery dataにUIDを登録するキー
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static DATA_KEY_ID: string = AlignedBoxes.DATA_KEY + '-id';

	/**
	 * 監視タイマーID
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static watchTimer: number;

	/**
	 * 監視の間隔
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static watchInterval: number = 1000;

	/**
	 * 監視タイマーが起動しているかどうか
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static isBooted: boolean = false;

	/**
	 * 現在の基準のフォントサイズ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static currentFontSize: number;

	/**
	 * 監視対象のボックスグループ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static groups: { [id: string]: AlignedBoxes } = {};

	/**
	 * 基準の文字要素
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static dummyCharElement: HTMLElement;

	/**
	 * 対象のDOM要素
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public $el: JQuery;

	/**
	 * ブレークポイントに寄るカラム数
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	private _columns: BreakPoints<number>;

	/**
	 * ボックスの高さ揃えるときのコールバック
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	private _callback: AlignedBoxCallback;

	/**
	 * 現在のカラム
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	private _currentColumn: number;

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 * @param $el 対象のボックス要素
	 * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
	 * @param callback ボックスの高さ揃えるときのコールバック
	 */
	constructor ($el: JQuery, column: number | BreakPointsOption<number> = 0, callback?: AlignedBoxCallback) {
		super();

		this.$el = $el;

		AlignedBoxes.boot();

		let uid: string = this.$el.data(AlignedBoxes.DATA_KEY_ID);

		if (uid) {
			this.destroy();
		}

		uid = UtilString.UID();
		this.$el.data(AlignedBoxes.DATA_KEY_ID, uid);

		this.$el.data(AlignedBoxes.DATA_KEY, this);

		AlignedBoxes.groups[uid] = this;

		let columnInfo: BreakPointsOption<number>;
		if (typeof column === 'number') {
			columnInfo = {
				Infinity: column
			};
		} else {
			columnInfo = column;
		}

		this._columns = new BreakPoints<number>(columnInfo, (column: number, breakPoint: number, windowWidth: number): void => {
			this._currentColumn = column;
			this._align();
		});

		this._callback = callback;

		this._align();

		this.on('realign', (): void => {
			this._align();
		});

	}

	/**
	 * 基準の文字要素を生成する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public static createChar (): void {
		const $dummyChar: JQuery = $('<del>M</del>').css({
			display: 'block',
			visibility: 'hidden',
			position: 'absolute',
			padding: 0,
			top: 0,
			zIndex: -1,
		});
		$dummyChar.appendTo('body');
		AlignedBoxes.dummyCharElement = $dummyChar[0];
		AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
	}

	/**
	 * 文字の大きさが変わったかどうか
	 *
	 * TODO: 破壊的変更を加えていて単純な評価関数ではない
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * @return 文字の大きさが変わったかどうか
	 *
	 */
	public static isChanged (): boolean {
		if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
			return false;
		}
		AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
		return true;
	}

	/**
	 * 文字の大きさが変わったかどうかを監視するルーチン
	 *
	 * 文字の大きさが変わればボックスのサイズを再設定する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static observerForFontSize (): void {
		if (AlignedBoxes.isChanged()) {
			AlignedBoxes.reAlign();
		}
		return;
	}

	/**
	 * ボックスのサイズを再設定する
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public static reAlign (): void {
		for (const uid in AlignedBoxes.groups) {
			if (AlignedBoxes.groups.hasOwnProperty(uid)) {
				AlignedBoxes.groups[uid].trigger('realign');
			}
		}
		return;
	}

	/**
	 * 監視タイマーを起動する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public static boot (): void {
		if (!AlignedBoxes.isBooted) {
			$(window).on('load', AlignedBoxes.reAlign);
			Browser.browser.on('resizeend', AlignedBoxes.reAlign);
			AlignedBoxes.isBooted = true;
			AlignedBoxes.createChar();
			// TODO: タイマーによる監視をオプションでオフにできるようにする
			AlignedBoxes.watchTimer = window.setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
		}
	}

	/**
	 * 高さ揃えを解除する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public destroy (): void {
		this.$el.each( (i: number, elem: HTMLElement): void => {
			const $this: JQuery = $(elem);
			const uid: string = $this.data(AlignedBoxes.DATA_KEY_ID);
			$this.removeData(AlignedBoxes.DATA_KEY_ID);
			if (uid in AlignedBoxes.groups) {
				delete AlignedBoxes.groups[uid];
			}
		});
	}

	/**
	 * ボックスの高さ揃える
	 *
	 * use: jQuery
	 *
	 * @version 0.10.0
	 * @since 0.8.1
	 *
	 */
	private _align (): void {
		let $boxArray: JQuery[] = [];
		let maxHeight: number = 0;
		const lastIndex: number = this.$el.length - 1;
		this.$el.each( (i: number, elem: HTMLElement): any => {
			const $box: JQuery = $(elem);

			// 要素の高さを強制に無効にする
			BaserElement.removeCSSPropertyFromDOMElement('height', elem);

			// column が 0 だと最初の要素の意味
			const column: number = i % this._currentColumn;
			if (column === 0) {
				// 配列をリセットする
				$boxArray = [];
			}

			// 配列に追加
			$boxArray[column] = $box;

			// 現在の高さと最大の高さを比べて最大の高さを更新
			// column が 0 ならばリセットさせるので最大の高さもリセット
			const currentHeight: number = $box.height();
			if (column === 0 || currentHeight > maxHeight) {
				maxHeight = currentHeight;
			}
			if (i === lastIndex || column === this._currentColumn - 1) {
				for (const $box of $boxArray) {
					if ($box) {
						let cancel: boolean = false;
						// コールバックを実行
						if (this._callback) {
							cancel = !this._callback(maxHeight, currentHeight, this);
						}
						// コールバックの戻り値がfalseでなければ高さを変更
						if (!cancel) {
							$box.height(maxHeight);
						}
					}
				}
			}
		});
	}

}

export = AlignedBoxes;
