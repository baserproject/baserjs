module baser {

	/**
	 * リストを均等に分割する
	 *
	 * @version 0.2.0
	 * @since 0.0.14
	 *
	 */
	var bcSplitList = function (columnSize: number, options: any): JQuery {
		var CLASS_NAME: string = 'splited-list';
		var CLASS_NAME_NTH: string = 'nth';
		var CLASS_NAME_ITEM: string = 'item';
		var config: any = $.extend({
			dataKey: '-bc-split-list-index',
			splitChildren: true
		}, options);
		this.each( (i: number, elem: HTMLElement): void => {

			var $container: JQuery = $(elem);
			var $list: JQuery = $container.find('>ul');
			var $items: JQuery;
			if (!config.splitChildren) {
				// 直下のliのみ取得
				$items = $list.find('>li').detach();
			} else {
				// 入れ子のliも含めて全て取得
				$items = $list.find('li').detach();
				// 入れ子のulの削除
				$items.find('ul').remove();
			}

			// リストアイテムの総数
			var size: number = $items.length;

			var splited: number[] = baser.utility.Mathematics.split(size, columnSize);

			var i: number;
			var j: number;
			var sizeByColumn: number;

			var itemArray: HTMLElement[] = $items.toArray();
			var $col: JQuery;
			var $item: JQuery;

			for (i = 0; i < columnSize; i++) {
				sizeByColumn = splited[i];
				$col = $('<ul></ul>');
				baser.ui.element.Element.addClassTo($col, CLASS_NAME);
				baser.ui.element.Element.addClassTo($col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
				$col.appendTo($container);
				for (j = 0; j < sizeByColumn; j++) {
					$item = $(itemArray.shift());
					$item.appendTo($col);
					$item.data(config.dataKey, i);
					baser.ui.element.Element.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM);
					baser.ui.element.Element.addClassTo($item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
				}
				$col = null;
			}

			$list.remove();

		});
		return this;
	};

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcSplitList = bcSplitList;

}