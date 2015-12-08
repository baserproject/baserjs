/**
 * Scrollクラスのオプションのインターフェイス
 *
 * @version 0.0.8
 * @since 0.0.8
 *
 */
interface ScrollOptions {
	offset?: number;
	keywords?: { [index: string]: any; };
	wheelCancel?: boolean;
	onScrollEnd?: Function;
	onScrollCancel?: Function;
	onScrollStart?: Function;
	onScrollProgress?: Function;
}

export = ScrollOptions;
