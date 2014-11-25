module baser {

	/**
	 * リストを均等に分割する
	 *
	 * @version 0.0.14
	 * @since 0.0.14
	 *
	 */
	var bcSplitList = function (columnSize: number, options: any): JQuery {
		var CLASS_NAME: string = '-bc-splited-list';
		var CLASS_NAME_NTH: string = '-bc-splited-list--nth';
		var CLASS_NAME_ITEM: string = '-bc-splited-list__item';
		var config: any = $.extend({
			dataKey: '-bc-split-list-index',
		}, options);
		this.each( (i: number, elem: HTMLElement): void => {

			var $container: JQuery = $(elem);
			var $list: JQuery = $container.find('ul');
			var $items: JQuery = $list.find('li');
			var size: number = $items.length;
			var sizeParCol: number = Math.floor(size / columnSize);
			var sizeRem = size % columnSize;

			var $col: JQuery;
			var remShift: number = sizeRem;
			var row: number = 1;
			var col: number = 1;
			$items.each( (itemIndex: number, itemEl: HTMLElement): void => {
				var $item = $(itemEl);

				itemIndex += 1; // 0からでなく1からのカウント

				var colByCurrentRow: number;
				if (0 < remShift) {
					colByCurrentRow = sizeParCol + 1;
				} else {
					colByCurrentRow = sizeParCol;
				}

				if (!$col) {
					$col = $('<ul></ul>');
					$col.addClass(CLASS_NAME);
					$col.addClass(CLASS_NAME_NTH + col);
					$col.appendTo($container);
				}
				$item.appendTo($col);
				$item.data(config.dataKey, itemIndex - 1);
				$item.addClass(CLASS_NAME_ITEM);
				$item.addClass(CLASS_NAME_ITEM + '--nth' + (itemIndex - 1));

				if (colByCurrentRow === row) {
					col += 1;
					row = 0;
					remShift -= 1;
					$col = null;
				}
				row += 1;
			});

			$list.remove();

		});
		return this;
	};

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcSplitList = bcSplitList;

}