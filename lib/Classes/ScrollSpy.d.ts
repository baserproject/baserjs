import BaserElement from './BaserElement';
export interface ScrollSpyHandler {
    (y: number, viewportHeight: number): boolean;
}
/**
 * DOM要素の抽象クラス
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
export default class ScrollSpy<R> {
    static return<R>(returnValue: R): ScrollSpy<R>;
    static by<E extends Element>(bEl: BaserElement<E>): Promise<undefined>;
    private _returnValue;
    private constructor();
    by<E extends Element>(bEl: BaserElement<E>): Promise<R>;
}
