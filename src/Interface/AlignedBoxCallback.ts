import AlignedBoxes = require('../Class/AlignedBoxes');

/**
 * ボックスの高さ揃えるときのコールバック
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
interface IAlignedBoxCallback {
	(maxHeight: number, currentHeight: number, boxes: AlignedBoxes): boolean | void;
}

export = IAlignedBoxCallback;
