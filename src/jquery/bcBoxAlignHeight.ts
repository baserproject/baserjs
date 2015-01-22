module baser {

	/**
	 * 要素の高さを揃える
	 *
	 * TODO: 計算ロジックとDOMアクセスのロジックを分ける
	 *
	 * @version 0.2.0
	 * @since 0.0.15
	 *
	 */
	function bcBoxAlignHeight (columnOrKeyword: number, detailTarget?: string, callback?: Function, breakPoint?: number): JQuery;
	function bcBoxAlignHeight (columnOrKeyword: string): JQuery;
	function bcBoxAlignHeight (columnOrKeyword: any, detailTarget?: string, callback?: Function, breakPoint: number = 0): JQuery {

		if ($.isNumeric(columnOrKeyword)) {

			var column: number = <number> +columnOrKeyword;

			baser.ui.Box.boot();

			var $detailTarget: JQuery;
			var settings = baser.ui.Box.settings;

			// 要素群の高さを揃え、setsに追加
			if (detailTarget) {
				$detailTarget = this.find(detailTarget);
				if ($detailTarget.length) {
					this.each(function () {
						var $split: JQuery = $(this).find(detailTarget);
						baser.ui.Box.push($split, column, callback, breakPoint);
					});
				}
			} else {
				baser.ui.Box.push(this, column, callback, breakPoint);
			}

		} else {

			var keyword: string = <string> columnOrKeyword;

			switch (keyword) {

				case 'destroy': {

					this.each(function () {

						baser.ui.Box.destory($(this));

					});

					break;
				}
			}

		}

		return this;

	}

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcBoxAlignHeight = bcBoxAlignHeight;

}
