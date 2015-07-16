module baser {

	/**
	 * 要素の高さを揃える
	 *
	 * @version 0.7.0
	 * @since 0.0.15
	 *
	 */
	function bcBoxAlignHeight (columnOrKeyword: string | number | ui.BreakPointsOption<number> = 0, detailTarget?: string, callback?: ui.element.AlignedBoxCallback): JQuery {

		var keyword: string;
		var column: number | ui.BreakPointsOption<number>;
		
		var boxes: ui.element.AlignedBoxes;

		if (typeof columnOrKeyword === 'string') {

			keyword = columnOrKeyword;

			switch (keyword) {
				case 'destroy': {
					boxes = <ui.element.AlignedBoxes> this.data(ui.element.AlignedBoxes.DATA_KEY);
					boxes.destroy();
					break;
				}
			}

		} else {
			
			column = columnOrKeyword;

			var $detailTarget: JQuery;

			// 要素群の高さを揃え、setsに追加
			if (detailTarget) {
				$detailTarget = this.find(detailTarget);
				if ($detailTarget.length) {
					this.each(function () {
						var $split: JQuery = $(this).find(detailTarget);
						new baser.ui.element.AlignedBoxes($split, column, callback);
					});
				}
			} else {
				new baser.ui.element.AlignedBoxes(this, column, callback);
			}
		}

		return this;

	}

	// jQueryのインスタンスメソッドとしてprototypeに登録
	$.fn.bcBoxAlignHeight = bcBoxAlignHeight;

}
