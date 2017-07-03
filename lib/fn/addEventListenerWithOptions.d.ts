export interface EventListenerOptions {
    passive?: boolean;
    once?: boolean;
    capture?: boolean;
}
/**
 *
 * @param target
 * @param type
 * @param listener
 * @param options
 */
export default function addEventListenerWithOptions<T extends Element | Window | Document, K extends keyof ElementEventMap>(target: T, type: K, listener: (this: T, e: ElementEventMap[K]) => any, options: EventListenerOptions): void;
