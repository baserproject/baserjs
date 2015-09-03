import BaserElement = require('./BaserElement');
import AlignedBoxCallback = require('../Interface/AlignedBoxCallback');

/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
class AlignedBoxes extends BaserElement {

	/**
	 * jQuery dataに自信のインスタンスを登録するキー
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static DATA_KEY: string = 'bc-box';

	/**
	 * jQuery dataにUIDを登録するキー
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static DATA_KEY_ID: string = AlignedBoxes.DATA_KEY + '-id';

	/**
	 * 監視タイマーID
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static watchTimer: number;

	/**
	 * 監視の間隔
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static watchInterval: number = 1000;

	/**
	 * 監視タイマーが起動しているかどうか
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static isBooted: boolean = false;

	/**
	 * 現在の基準のフォントサイズ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static currentFontSize: number;

	/**
	 * 監視対象のボックスグループ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static groups: { [id: string]: AlignedBoxes } = {};

	/**
	 * 基準の文字要素
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static dummyCharElement: HTMLElement;

	/**
	 * 基準の文字要素を生成する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static createChar (): void {
		var dummyChar: HTMLElement;
		var $dummyChar: JQuery = $('<del>M</del>').css({
			display: 'block',
			visibility: 'hidden',
			position: 'absolute',
			padding: 0,
			top: 0,
			zIndex: -1
		});
		$dummyChar.appendTo('body');
		AlignedBoxes.dummyCharElement = $dummyChar[0];
		AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
	}

	/**
	 * 文字の大きさが変わったかどうか
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static isChanged (): boolean {
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
	static observerForFontSize (): void {
		if (AlignedBoxes.isChanged()) {
			AlignedBoxes.reAlign();
		}
		return;
	}

	/**
	 * ボックスのサイズを再設定する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static reAlign (): void {
		var uid: string;
		for (uid in AlignedBoxes.groups) {
			AlignedBoxes.groups[uid].trigger('realign');
		}
		return;
	}

	/**
	 * 監視タイマーを起動する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	static boot (): void {
		var $w: JQuery;
		if (!AlignedBoxes.isBooted) {
			$w = $(window);
			$w.on('load', AlignedBoxes.reAlign);
			Browser.browser.on('resizeend', AlignedBoxes.reAlign);
			AlignedBoxes.isBooted = true;
			AlignedBoxes.createChar();
			AlignedBoxes.watchTimer = window.setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
		}
	}

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
	 * @version 0.7.0
	 * @since 0.7.0
	 * @param $el 対象のボックス要素
	 * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
	 * @param callback ボックスの高さ揃えるときのコールバック
	 */
	constructor ($el: JQuery, column: number | BreakPointsOption<number> = 0, callback?: AlignedBoxCallback) {
		super($el);

		AlignedBoxes.boot();

		var uid: string = this.$el.data(AlignedBoxes.DATA_KEY_ID);

		if (uid) {
			this.destroy();
		}

		uid = utility.String.UID();
		this.$el.data(AlignedBoxes.DATA_KEY_ID, uid);

		this.$el.data(AlignedBoxes.DATA_KEY, this);

		AlignedBoxes.groups[uid] = this;

		var columnInfo: BreakPointsOption<number>;

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
	 * ボックスの高さ揃える
	 *
	 * @version 0.8.1
	 * @since 0.8.1
	 *
	 */
	private _align (): void {
		var $box_array: JQuery[] = [];
		var maxHeight: number = 0;
		var lastIndex: number = this.$el.length - 1;
		this.$el.each( (i: number, elem: HTMLElement): any => {
			var $box: JQuery = $(elem);

			// 要素の高さを強制に無効にする
			Element.removeCSSPropertyFromDOMElement('height', elem);

			// column が 0 だと最初の要素の意味
			var column: number = i % this._currentColumn;
			if (column === 0) {
				// 配列をリセットする
				$box_array = [];
			}

			// 配列に追加
			$box_array[column] = $box;

			// 現在の高さと最大の高さを比べて最大の高さを更新
			// column が 0 ならばリセットさせるので最大の高さもリセット
			var currentHeight = $box.height();
			if (column === 0 || currentHeight > maxHeight) {
				maxHeight = currentHeight;
			}
			if (i === lastIndex || column === this._currentColumn - 1) {
				for (let j: number = 0, l: number = $box_array.length; j < l; j++) {
					if ($box_array[j]) {
						let cancel: boolean;
						// コールバックを実行
						if ($.isFunction(this._callback)) {
							cancel = !this._callback(maxHeight, currentHeight, this);
						}
						// コールバックの戻り値がfalseでなければ高さを変更
						if (!cancel) {
							$box_array[j].height(maxHeight);
						}
					}
				}
			}
		});
	}

	/**
	 * 高さ揃えを解除する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public destroy (): void {
		this.$el.each( (i: number, elem: HTMLElement): void => {
			var $this: JQuery = $(elem);
			var uid: string = $this.data(AlignedBoxes.DATA_KEY_ID);
			$this.removeData(AlignedBoxes.DATA_KEY_ID);
			if (uid in AlignedBoxes.groups) {
				delete AlignedBoxes.groups[uid];
			}
		});
	}

}


export = AlignedBoxes;