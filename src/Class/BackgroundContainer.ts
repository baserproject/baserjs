import UtilMath = require('./UtilMath');
import Browser = require('./Browser');
import BaserElement = require('./BaserElement');
import IDimension = require('../Interface/IDimension');
import BackgroundContainerOption = require('../Interface/BackgroundContainerOption');

/**
 * 背景化要素
 *
 * @version 0.13.0
 * @since 0.11.0
 *
 */
class BackgroundContainer extends BaserElement {

	/**
	 * 管理対象の要素に付加するclass属性値のプレフィックス
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 *
	 */
	public static className: string = '-bc-background-container-element';

	/**
	 * オプションのデフォルト値
	 *
	 * @since 0.11.0
	 *
	 */
	public static defaultOption: BackgroundContainerOption = {
		align: 'center',
		valign: 'center',
		size: 'contain',
		child: '>*:first',
		outer: false,
		useCSSBackgroundImage: false,
	};

	/**
	 * オプション情報
	 *
	 * @since 0.11.0
	 *
	 */
	protected _config: BackgroundContainerOption;

	/**
	 * 背景となる対象の要素
	 *
	 * @since 0.11.0
	 */
	private _$bgElement: JQuery;

	/**
	 * 背景となる要素の幅
	 *
	 * @since 0.11.0
	 */
	private _bgWidth: number;

	/**
	 * 背景となる要素の高さ
	 *
	 * @since 0.11.0
	 */
	private _bgHeight: number;

	/**
	 * 背景となる要素の最終的なスタイル
	 *
	 * @since 0.11.0
	 */
	private _bgStyle: {
		width: number;
		height: number;
		maxWidth: number | string;
		minWidth: number | string;
		maxHeight: number | string;
		minHeight: number | string;
		top: number;
		left: number;
	};

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * @version 0.13.0
	 * @since 0.11.0
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLElement, options: BackgroundContainerOption) {

		super(el);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		// IE6・7は反映させない
		if (!el.querySelector) {
			return;
		}

		this.$el.addClass(BackgroundContainer.className);
		this.$el.data(BackgroundContainer.className, this);

		this._config = $.extend({}, BackgroundContainer.defaultOption, options);

		this._$bgElement = this.$el.find(this._config.child);

		const isImage: boolean = this._$bgElement.is('img');

		this._bgWidth = +(this.$el.data('width') || this._$bgElement.data('width') || this._$bgElement.attr('width') || this._$bgElement.width()) || 400;
		this._bgHeight = +(this.$el.data('height') || this._$bgElement.data('height') || this._$bgElement.attr('height') || this._$bgElement.height()) || 300;

		if (isImage && this._config.useCSSBackgroundImage) {

			const img: HTMLImageElement = this._$bgElement[0] as HTMLImageElement;
			this.$el.css({
				backgroundImage: `url(${img.src})`,
				backgroundSize: this._config.size,
				backgroundPosition: `${this._config.align} ${this._config.valign}`,
				backgroundRepeat: 'no-repeat',
			});

			this._$bgElement.detach();

		} else {
			const currentCSSPosition: string = this.$el.css('position');
			if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
				this.$el.css('position', 'relative');
			}

			this._$bgElement.css({
				position: 'absolute',
			});

			this._bgStyle = {
				width: 0,
				height: 0,
				top: 0,
				left: 0,
				maxWidth: 'none',
				minWidth: 0,
				maxHeight: 'none',
				minHeight: 0,
			};

			// 初期計算
			this.calc();

			Browser.browser.on('resizeend', this.calc.bind(this));
		}

	}

	/**
	 * 計算
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 *
	 */
	public calc (): void {
		const containerWidth: number = this._config.outer ? this.$el.outerWidth() : this.$el.width();
		const containerHeight: number = this._config.outer ? this.$el.outerHeight() : this.$el.height();
		const { width, height, top, left }: IDimension = UtilMath.stretchDimension(
			containerWidth,
			containerHeight,
			this._bgWidth,
			this._bgHeight,
			this._config.size,
			this._config.align,
			this._config.valign
		);
		this._bgStyle.width = width;
		this._bgStyle.height = height;
		this._bgStyle.top = top;
		this._bgStyle.left = left;
		this._$bgElement.css(this._bgStyle);
	}

}

export = BackgroundContainer;
