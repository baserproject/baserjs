/// <reference path="typings/bundle.d.ts" />
declare module baser {
    module utility {
        /**
         * ユーティリティ文字列クラス
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        class String {
            /**
             * ユニークIDを発行する
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            static UID(seed?: number): string;
            /**
             * ハイフン チェインケース化
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            static hyphenDelimited(str: string): string;
            /**
             * スネークケース化
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            static snakeCase(str: string): string;
            /**
             * キャメルケース化
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            static camelCase(str: string, upperCase?: boolean): string;
            /**
             * 文字列が論理値の偽相等であるかどうか
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             */
            static isFalsy(str: string): boolean;
        }
    }
}
declare module baser {
    module utility {
        /**
         * ユーティリティ配列クラス
         *
         * @version 0.2.0
         * @since 0.2.0
         *
         */
        class Array {
            /**
             * 配列中の対象の要素が一番最初に存在するインデックス番号を返す
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             */
            static indexOf<T>(array: any[], element: T): number;
            /**
             * 配列中の対象のインデックスを削除する
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             */
            static remove(array: any[], index: number): any[];
        }
    }
}
declare module baser {
    module utility {
        /**
         * ユーティリティ算術クラス
         *
         * @version 0.2.0
         * @since 0.0.2
         *
         */
        class Mathematics {
            /**
             * 指定の範囲のランダムな数を返す
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             * @param base 基準の数
             * @param dist 基準からこの数までの範囲の乱数になる
             * @return 乱数
             *
             */
            static random(base?: number, dist?: number): number;
            /**
             * 配列内の数値の合計を算出する
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             * @param numberList 数の配列
             * @return 合計値
             *
             */
            static sam(numberList: number[]): number;
            /**
             * 均等に分割する
             *
             * @version 0.2.0
             * @since 0.2.0
             *
             * @param n 分割される数
             * @param devide 分割する数
             * @param returnInfo 詳細情報を返すかどうか
             * @return `returnInfo`が真の場合 分割された数値で構成された配列を、偽の場合 詳細情報と結果を返す
             *
             */
            static split(n: number, devide: number, returnInfo?: boolean): any;
        }
    }
}
declare module baser {
    module ui {
        interface IEventDispacher {
            on(type: string, handler: Function): IEventDispacher;
            off(type?: string): IEventDispacher;
            trigger(type: string, args?: any[], context?: any): IEventDispacher;
        }
    }
}
declare module baser {
    module ui {
        /**
         * イベント駆動できるクラス
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        class EventDispacher implements IEventDispacher {
            /**
             * コンストラクタ
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            constructor();
            /**
             * イベントハンドラを登録する
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            on(type: string, handler: Function): EventDispacher;
            /**
             * イベントハンドラを削除する
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            off(type?: string): EventDispacher;
            /**
             * イベントハンドラを発火させる
             *
             * @version 0.5.0
             * @since 0.0.10
             *
             */
            trigger(type: string, args?: any[], context?: any): EventDispacher;
        }
        /**
         * イベントハンドラのラッパークラス
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        class EventHandler {
            id: string;
            context: EventDispacher;
            type: string;
            handler: Function;
            constructor(context: EventDispacher, type: string, handler: Function);
        }
        /**
         * イベントオブジェクトのクラス
         *
         * @version 0.3.0
         * @since 0.0.10
         *
         */
        class DispacheEvent {
            type: string;
            private _isImmediatePropagationStopped;
            constructor(type: string);
            isImmediatePropagationStopped(): boolean;
            stopImmediatePropagation(): void;
        }
    }
}
declare module baser {
    module ui {
        /**
         * 非同期逐次処理クラス
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        class Sequence {
            private _tasks;
            private _index;
            private _iterator;
            private _promise;
            private _resolver;
            private _waitingTime;
            private _waitTimer;
            private _toExit;
            constructor(tasks: Function[]);
            act(value: any, isLoop?: boolean): Sequence;
            loop(value: any): Sequence;
            exit(): Sequence;
            wait(watingTime: number): void;
        }
    }
}
declare module baser {
    module ui {
        interface BrowserUserAgent {
            iOS: boolean;
            android: boolean;
            iPad: boolean;
            iPhone: boolean;
            iPod: boolean;
            safari: boolean;
            chrome: boolean;
        }
        /**
         * ブラウザの情報を管理するクラス
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        class Browser extends EventDispacher {
            /**
             * ブラウザ
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            static browser: Browser;
            /**
             * デバイス・OS・ブラウザの情報
             *
             * @version 0.4.0
             * @since 0.0.1
             *
             */
            static spec: {
                isTouchable: boolean;
                ua: BrowserUserAgent;
            };
            /**
             * ページ遷移する
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            static jumpTo(path: string, isBlank?: boolean): void;
            /**
             * ユーザーエージェント情報を取得する
             *
             * @version 0.4.0
             * @since 0.0.1
             *
             */
            static getUA(): BrowserUserAgent;
            resizeEndInterval: number;
            scrollEndInterval: number;
            isResize: boolean;
            isScroll: boolean;
            constructor();
        }
    }
}
declare module baser {
    module ui {
        /**
         * 時間管理クラス
         *
         * @version 0.0.8
         * @since 0.0.1
         *
         */
        class Timer {
            /**
             * コアとなるDateオブジェクト
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            datetime: Date;
            /**
             * タイマーID
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            timerId: number;
            /**
             * インターバル
             *
             * `13`は[jQuery](http://jquery.com/)を参考
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            interval: number;
            /**
             * プログレスイベントのコールバック
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            private _onProgress;
            /**
             * コンストラクタ
             *
             * @version 0.0.8
             * @since 0.0.1
             *
             */
            constructor();
            /**
             * 暗黙の型変換時の振る舞い
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            valueOf(): number;
            /**
             * 時間を現在に更新する
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            now(): number;
            /**
             * タイマーをスタートする
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            start(time: number): Timer;
            /**
             * タイマーをストップする
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            stop(): Timer;
            /**
             * 遅延処理
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            wait(time: number, callback: Function, context?: any): Timer;
            /**
             * プログレスイベントを登録
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            progress(callback: Function): Timer;
            /**
             * 遅延処理
             *
             * @version 0.0.8
             * @since 0.0.8
             *
             */
            static wait(time: number, callback: Function, context?: any): Timer;
        }
    }
}
declare module baser {
    module ui {
        /**
         * アニメーションフレームを管理するクラス
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        class AnimationFrames {
            /**
             * フレームレート
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            static FRAME_RATE: number;
            /**
             * フレーム毎に実行するコールバック
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            callback: Function;
            /**
             * フレームのリクエストID
             *
             * @version 0.0.10
             * @since 0.0.10
             *
             */
            requestId: number;
            /**
             * フレーム毎のに実行するコールバックを登録する
             *
             * @version 0.0.10
             * @since 0.0.10
             * @return {number} リクエストIDを返す
             *
             */
            constructor(callback: Function);
            start(context?: any): void;
            /**
             * リクエストしたコールバックを停止する
             *
             * @version 0.0.10
             * @since 0.0.10
             * @return {number} リクエストIDを返す
             *
             */
            stop(): void;
        }
    }
}
declare module baser {
    module ui {
        /**
         * Scrollクラスのオプションのインターフェイス
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        interface ScrollOptions {
            offset?: number;
            keywords?: {
                [index: string]: any;
            };
            wheelCancel?: boolean;
            onScrollEnd?: Function;
            onScrollCancel?: Function;
            onScrollStart?: Function;
            onScrollProgress?: Function;
        }
        /**
         * スクロールを管理するクラス
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        class Scroll {
            static speed: number;
            static interval: number;
            static delayWhenURLHashTarget: number;
            targetX: number;
            targetY: number;
            prevX: number;
            prevY: number;
            isScroll: boolean;
            timer: Timer;
            options: ScrollOptions;
            /**
             * 対象の要素もしくは位置にスクロールを移動させる
             *
             * @version 0.3.2
             * @since 0.0.8
             * @param {string | HTMLElement | JQuery | number} 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
             * @param {ScrollOptions} オプション
             * @return {Scroll} 自信のスクロールオブジェクト
             *
             */
            to(selector: string | HTMLElement | JQuery | number, options?: ScrollOptions): Scroll;
            private _scroll();
            private _getX();
            private _getY();
            private _finish();
        }
    }
}
declare module baser {
    module ui {
        /**
         * 要素の寸法(幅・高さ)を管理するクラス
         *
         * @version 0.0.9
         * @since 0.0.9
         *
         */
        class Dimension {
            /**
             * 幅
             *
             * @version 0.0.9
             * @since 0.0.9
             *
             */
            private _width;
            /**
             * 高さ
             *
             * @version 0.0.9
             * @since 0.0.9
             *
             */
            private _height;
            /**
             * 管理する要素
             *
             * @version 0.0.9
             * @since 0.0.9
             *
             */
            el: Element;
            /**
             * コンストラクタ
             *
             * @version 0.0.9
             * @since 0.0.9
             *
             */
            constructor(el?: Element);
        }
    }
}
declare module baser {
    module ui {
        /**
         * Box管理を担うクラス
         *
         * @version 0.2.2
         * @since 0.0.15
         *
         */
        class Box {
            static align($target: JQuery, columns: number, callback: Function, breakPoint?: number): JQuery;
            static createChar(): void;
            static isChanged(): boolean;
            static observer(): void;
            static reAlign(): void;
            static boot(): void;
            static sleep(): void;
            static push($target: JQuery, column?: number, callback?: Function, breakPoint?: number): void;
            static destory($target: any): void;
            static watchTimer: number;
            static isBooted: boolean;
            static settings: any;
        }
    }
}
declare module baser {
    module ui {
        /**
         * フォームのバリデーションを担うクラス
         *
         * @version 0.0.x
         * @since 0.0.x
         *
         */
        class Validation {
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface IElement extends IEventDispacher {
                id: string;
                name: string;
                $el: JQuery;
                addClass(blockNames: string, elementNames?: string, modifierName?: string): void;
                getBoolAttr(attrName: string): boolean;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * クラス名の形式
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            enum ElementClassNameCase {
                HYPHEN_DELIMITED = 0,
                SNAKE_CASE = 1,
                CAMEL_CASE = 2,
            }
            /**
             * BEM式のクラス名の接続形式
             *
             * @version 0.1.0
             * @since 0.1.0
             *
             */
            enum ClassNameSeparatorForBEM {
                HYPHEN = 0,
                DOUBLE_HYPHEN = 1,
                UNDERSCORE = 2,
                DOUBLE_UNDERSCORE = 3,
                CAMEL_CASE = 4,
            }
            /**
             * DOM要素の抽象クラス
             *
             * @version 0.3.0
             * @since 0.0.1
             *
             */
            class Element extends EventDispacher implements IElement {
                /**
                 * クラス名のデフォルトのプレフィックス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameDefaultPrefix: string;
                /**
                 * インスタンスに付加するデフォルトのクラス名
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameElementCommon: string;
                /**
                 * クラス名のデフォルトの単語繋ぎの形式
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameDefaultCase: ElementClassNameCase;
                /**
                 * BEMのエレメントのクラス名の繋ぎ文字
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameDefaultSeparatorForElement: ClassNameSeparatorForBEM;
                /**
                 * BEMのモディファイアのクラス名の繋ぎ文字
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameDefaultSeparatorForModifier: ClassNameSeparatorForBEM;
                /**
                 * 管理するDOM要素のjQueryオブジェクト
                 *
                 * @since 0.0.1
                 *
                 */
                $el: JQuery;
                /**
                 * 管理するDOM要素のid属性値
                 *
                 * @since 0.0.1
                 *
                 */
                id: string;
                /**
                 * 管理するDOM要素のname属性値
                 *
                 * @since 0.0.1
                 *
                 */
                name: string;
                /**
                 * クラス名文字列を生成する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static createClassName(blockNames: string, elementNames?: string, modifierName?: string): string;
                /**
                 * 要素の属性の真偽を判定する
                 *
                 * DOM APIの標準で判定できるものはそれで判断
                 *
                 * 値なし属性の場合は存在すれば真
                 *
                 * 値あり属性の場合は偽相等の文字列でなければ全て真とする
                 *
                 * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                static getBoolAttr($elem: JQuery, attrName: string): boolean;
                /**
                 * クラス名を付加する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static addClassTo($elem: JQuery, blockNames: string, elementNames?: string, modifierName?: string): void;
                /**
                 * クラス名を取り除く
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static removeClassFrom($elem: JQuery, blockNames: string, elementNames?: string, modifierName?: string): void;
                /**
                 * CSSプロパティをDOM要素から取り除く
                 *
                 * @version 0.2.2
                 * @since 0.2.2
                 *
                 */
                static removeCSSPropertyFromDOMElement(propertyName: string, elem: HTMLElement): void;
                /**
                 * CSSプロパティを取り除く
                 *
                 * @version 0.2.2
                 * @since 0.2.2
                 *
                 */
                static removeCSSProperty(propertyName: string, $elem: JQuery): void;
                /**
                 * コンストラクタ
                 *
                 * @version 0.3.0
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                constructor($el: JQuery);
                /**
                 * クラス名を付加する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                addClass(blockNames: string, elementNames?: string, modifierName?: string): void;
                /**
                 * 要素の属性の真偽を判定する
                 *
                 * `baser.ui.element.Element.getBoolAttr` のインスタンスメソッド版
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                getBoolAttr(attrName: string): boolean;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * フォーム要素を扱う静的クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            class Form {
                /**
                 * 管理対象要素リスト
                 *
                 * @since 0.0.1
                 *
                 */
                static elements: Element[];
                /**
                 * ラジオボタンのname属性値で紐付いたブループを管理するリスト
                 *
                 * @since 0.0.1
                 *
                 */
                static radioGroups: {
                    [index: string]: RadioGroup;
                };
                /**
                 * ラジオボタンを拡張する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                static radio($elem: JQuery, options?: CheckableElementOption): JQuery;
                /**
                 * チェックボックスを拡張する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                static checkbox($elem: JQuery, options?: CheckableElementOption): JQuery;
                /**
                 * セレクトボックスを拡張する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                static select($elem: JQuery, options?: FormElementOption): JQuery;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface IFormElement extends IElement {
                label: string;
                hasFocus: boolean;
                disabled: boolean;
                defaultValue: string;
                isWrappedByLabel: boolean;
                $label: JQuery;
                $wrapper: JQuery;
                setValue(value: string | number | boolean): void;
                setDisabled(isDisabled: boolean): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * FormElementクラスのオプションハッシュのインターフェイス
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            interface FormElementOption {
                /**
                 * 任意で指定するラベル要素
                 *
                 * @since 0.0.1
                 *
                 */
                label?: string;
                /**
                 * 任意で指定するラベルのタグ名
                 *
                 * @since 0.0.1
                 * @default "label"
                 *
                 */
                labelTag?: string;
                /**
                 * 任意で指定するラベルに付加するクラス属性値
                 *
                 * @since 0.0.1
                 *
                 */
                labelClass?: string;
                /**
                 * 自動でラベルを生成するかどうか
                 *
                 * @since 0.0.5
                 * @default true
                 *
                 */
                autoLabeling?: boolean;
            }
            /**
             * フォーム要素の抽象クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            class FormElement extends Element implements IFormElement {
                /**
                 * オプションのデフォルト値
                 *
                 * @version 0.0.5
                 * @since 0.0.1
                 *
                 */
                static defaultOption: FormElementOption;
                /**
                 * FormElement関連の要素の共通のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameFormElementCommon: string;
                /**
                 * FormElement関連のラッパー要素の共通のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameWrapper: string;
                /**
                 * FormElement関連のラベル要素の共通のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameLabel: string;
                /**
                 * FormElement関連の要素のフォーカス時に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameStateFocus: string;
                /**
                 * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameStateBlur: string;
                /**
                 * FormElement関連の要素の無効状態の時に付加されるクラス
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static classNameStateDisabled: string;
                /**
                 * ラベルのテキスト
                 *
                 * @since 0.0.1
                 *
                 */
                label: string;
                /**
                 * 前にあるラベルのテキスト
                 *
                 * @since 0.4.0
                 *
                 */
                labelBeforeText: string;
                /**
                 * 後ろにあるラベルのテキスト
                 *
                 * @since 0.4.0
                 *
                 */
                labelAfterText: string;
                /**
                 * フォーカスがあたっている状態かどうか
                 *
                 * @since 0.1.0
                 *
                 */
                hasFocus: boolean;
                /**
                 * 無効状態
                 *
                 * @since 0.4.0
                 *
                 */
                disabled: boolean;
                /**
                 * 初期の値
                 *
                 * @since 0.4.0
                 *
                 */
                defaultValue: string;
                /**
                 * ラベル要素にラップされているかどうか
                 *
                 * @since 0.0.4
                 *
                 */
                isWrappedByLabel: boolean;
                /**
                 * ラベル要素のjQueryオブジェクト
                 *
                 * @since 0.0.1
                 *
                 */
                $label: JQuery;
                /**
                 * ラッパー要素のjQueryオブジェクト
                 *
                 * @since 0.0.4
                 *
                 */
                $wrapper: JQuery;
                /**
                 * オプション情報
                 *
                 * @since 0.4.1
                 *
                 */
                protected _config: FormElementOption;
                /**
                 * コンストラクタ
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: FormElementOption);
                /**
                 * クラス名を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                protected _setClassName(): void;
                /**
                 * ラベル要素内のテキストを取得する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                private _setLabelText();
                /**
                 * ラベル要素を割り当てる
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                private _asignLabel();
                /**
                 * ラップ要素を生成
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                protected _createWrapper(): void;
                /**
                 * 擬似要素を生成する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                protected _createPsuedoElements(): void;
                /**
                 * イベントの登録
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                protected _bindEvents(): void;
                /**
                 * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                protected _onSilentChange(): void;
                /**
                 * フォーカスがあたった時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                protected _onfocus(): void;
                /**
                 * フォーカスがはずれた時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                protected _onblur(): void;
                /**
                 * changeイベントを発火する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                protected _fireChangeEvent(isSilent?: boolean): void;
                /**
                 * 値を設定する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                setValue(value: string | number | boolean, isSilent?: boolean): void;
                /**
                 * 無効状態を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                setDisabled(isDisabled: boolean): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface ITextField extends IFormElement {
                isEmpty: boolean;
                placeholder: string;
                hasPlaceholder: boolean;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * TextFieldクラスのオプションハッシュのインターフェイス
             *
             * @version 0.4.0
             * @since 0.4.0
             *
             */
            interface TextFieldOption extends FormElementOption {
            }
            /**
             * テキストフィールドの拡張クラス
             *
             * @version 0.4.0
             * @since 0.4.0
             *
             */
            class TextField extends FormElement implements ITextField {
                /**
                 * オプションのデフォルト値
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static defaultOption: TextFieldOption;
                /**
                 * TextField要素のクラス
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static classNameTextField: string;
                /**
                 * 未入力状態に付加されるクラス
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static classNameStateUninput: string;
                /**
                 * プレースホルダー属性に対応しているかどうか
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static supportPlaceholder: boolean;
                /**
                 * 空かどうか
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                isEmpty: boolean;
                /**
                 * プレースホルダーテキスト
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                placeholder: string;
                /**
                 * プレースホルダーをもっているかどうか
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                hasPlaceholder: boolean;
                /**
                 * オプション情報
                 *
                 * @since 0.4.1
                 *
                 */
                protected _config: TextFieldOption;
                /**
                 * コンストラクタ
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: TextFieldOption);
                /**
                 * クラス名を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _setClassName(): void;
                /**
                 * ラップ要素を生成
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _createWrapper(): void;
                /**
                 * イベントの登録
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _bindEvents(): void;
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                private _update();
                /**
                 * 入力されている状態を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                private _setStateInputted();
                /**
                 * 入力されていない状態を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                private _setStateUninputted();
                /**
                 * プレースホルダーと値が同じかどうか
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                private _equalPlaceholder();
                /**
                 * プレースホルダーの値を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                private _setPlaceholderValue();
                /**
                 * 【IE用】カーソル（キャレット）を先頭に持っていく
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                private _msCaretMoveToTop();
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface ISelect extends IFormElement {
                defaultSelectedIndex: number;
                $selected: JQuery;
                $pseudo: JQuery;
                $options: JQuery;
                getIndex(): number;
                next(isSilent: boolean): void;
                prev(isSilent: boolean): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * Selectクラスのオプションハッシュのインターフェイス
             *
             * @version 0.4.0
             * @since 0.4.0
             *
             */
            interface SelectOption extends FormElementOption {
                /**
                 * 選択リストをブラウザデフォルトのものにするかどうか
                 *
                 * @since 0.4.0
                 *
                 */
                useDefaultOptionList?: boolean;
            }
            /**
             * セレクトボックスの拡張クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            class Select extends FormElement implements ISelect {
                /**
                 * オプションのデフォルト値
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static defaultOption: SelectOption;
                /**
                 * Select要素のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameSelect: string;
                /**
                 * Select要素の擬似要素のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNamePseudoSelect: string;
                /**
                 * Select要素の選択した値を表示する擬似要素のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNamePseudoSelectedDisplay: string;
                /**
                 * Select要素のoption要素をのクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameSelectOptionList: string;
                /**
                 * Select要素のoption要素のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameSelectOption: string;
                /**
                 * iOSの場合に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameOsIOs: string;
                /**
                 * Androidの場合に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameOsAndroid: string;
                /**
                 * ブラウザデフォルトの選択リストを使用する場合に付加されるクラス
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                static classNameUseDefaultOptionList: string;
                /**
                 * Select要素の擬似option要素の選択時に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameStateSelected: string;
                /**
                 * Select要素の擬似option要素の選択がはずれた時に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameStateUnselected: string;
                /**
                 * 初期の選択されているオプションのインデックス番号
                 *
                 * @since 0.4.0
                 *
                 */
                defaultSelectedIndex: number;
                /**
                 * 選択されたオプションを表示する表示領域のjQueryオブジェクト
                 *
                 * @since 0.0.1
                 *
                 */
                $selected: JQuery;
                /**
                 * デザイン適応要の擬似要素のjQueryオブジェクト
                 *
                 * @since 0.0.1
                 *
                 */
                $pseudo: JQuery;
                /**
                 * オプション要素の擬似要素のjQueryコレクション
                 *
                 * @since 0.0.1
                 *
                 */
                $options: JQuery;
                /**
                 * オプション情報
                 *
                 * @since 0.4.1
                 *
                 */
                protected _config: SelectOption;
                /**
                 * 現在選択されているインデックス
                 *
                 * @since 0.4.1
                 *
                 */
                private _currentIndex;
                /**
                 * コンストラクタ
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: SelectOption);
                /**
                 * クラス名を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _setClassName(): void;
                /**
                 * ラップ要素を生成
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _createWrapper(): void;
                /**
                 * 擬似セレクトボックス要素を生成する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _createPsuedoElements(): void;
                /**
                 * イベントの登録
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 * @override
                 *
                 */
                protected _bindEvents(): void;
                /**
                 * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                protected _onSilentChange(): void;
                /**
                 * スクロール位置を調整する
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                private _scrollToSelectedPosition();
                /**
                 * 擬似要素にフォーカスがあったった時のイベントと伝達を制御する
                 *
                 * @version 0.4.0
                 * @since 0.0.1
                 *
                 */
                private _psuedoFocusEvent();
                /**
                 * フォーカス時のキーボードイベント
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 * TODO: KeyCodeの数値をマジックナンバーにせずに定数から参照するようにする
                 *
                 */
                private _bindKeybordEvent();
                /**
                 * フォーカスがあたった時の処理
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 * @override
                 *
                 */
                protected _onfocus(): void;
                /**
                 * フォーカスがはずれた時の処理
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                protected _onblur(): void;
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 *
                 */
                private _update();
                /**
                 * 値を設定する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 * @override
                 *
                 */
                setValue(value: string | number | boolean): void;
                /**
                 * 値をインデックス番号から設定する
                 *
                 * @version 0.4.1
                 * @since 0.4.0
                 *
                 */
                setIndex(index: number, isSilent?: boolean): void;
                /**
                 * 現在の選択中のインデックス番号を取得する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                getIndex(): number;
                /**
                 * 次の項目を選択する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                next(isSilent: boolean): void;
                /**
                 * 前の項目を選択する
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                prev(isSilent: boolean): void;
                /**
                 * 無効状態を設定する
                 *
                 * @version 0.4.1
                 * @since 0.4.1
                 * @override
                 *
                 */
                setDisabled(isDisabled: boolean): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface ICheckableElement extends IFormElement {
                checked: boolean;
                defaultChecked: boolean;
                update(): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * CheckableElementクラスのオプションハッシュのインターフェイス
             *
             * @version 0.0.2
             * @since 0.0.1
             *
             */
            interface CheckableElementOption extends FormElementOption {
                /**
                 * チェック状態の時に付加されるclass属性値
                 *
                 * @since 0.0.1
                 *
                 */
                checkedClass?: string;
            }
            /**
             * ラジオボタンとチェックボックスの抽象クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            class CheckableElement extends FormElement implements ICheckableElement {
                /**
                 * オプションのデフォルト値
                 *
                 * @since 0.0.1
                 *
                 */
                static defaultOption: CheckableElementOption;
                /**
                 * CheckableElement関連の要素のチェック時に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameStateChecked: string;
                /**
                 * CheckableElement関連の要素のチェックがはずれた時に付加されるクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameStateUnchecked: string;
                /**
                 * チェック状態
                 *
                 * @since 0.0.1
                 *
                 */
                checked: boolean;
                /**
                 * 初期のチェック状態
                 *
                 * @since 0.0.1
                 *
                 */
                defaultChecked: boolean;
                /**
                 * チェック状態の時に付加されるclass属性値
                 *
                 * @since 0.0.1
                 *
                 */
                private _checkedClass;
                /**
                 * オプション情報
                 *
                 * @since 0.4.1
                 *
                 */
                protected _config: CheckableElementOption;
                /**
                 * コンストラクタ
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: CheckableElementOption);
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                update(): void;
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                protected _onchenge(): void;
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.1.0
                 * @since 0.0.1
                 *
                 */
                private _update();
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface IRadio extends ICheckableElement {
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * ラジオボタンの拡張クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            class Radio extends CheckableElement implements IRadio {
                /**
                 * Radio要素のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameRadio: string;
                /**
                 * コンストラクタ
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: CheckableElementOption);
                /**
                 * チェンジイベントのハンドラ
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                _onchenge(): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            interface ICheckbox extends ICheckableElement {
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * チェックボックスの拡張クラス
             *
             * @version 0.1.0
             * @since 0.0.1
             *
             */
            class Checkbox extends CheckableElement {
                /**
                 * Checkbox要素のクラス
                 *
                 * @version 0.1.0
                 * @since 0.1.0
                 *
                 */
                static classNameCheckbox: string;
                /**
                 * コンストラクタ
                 *
                 * @version 0.4.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: CheckableElementOption);
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * ラジオボタンのname属性値で紐付いたブループを管理するクラス
             *
             * @since 0.0.1
             *
             */
            class RadioGroup {
                /**
                 * ラジオボタンのリスト
                 *
                 * @since 0.0.1
                 *
                 */
                radioButtons: Radio[];
                /**
                 * 紐づくname属性値
                 *
                 * @since 0.0.1
                 *
                 */
                name: string;
                /**
                 * コンストラクタ
                 *
                 * @since 0.0.1
                 * @param name 紐づくname属性値
                 *
                 */
                constructor(name: string);
                /**
                 * 紐づくラジオボタンを追加する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param radio 拡張ラジオボタン
                 *
                 */
                add(radio: Radio): void;
                /**
                 * 管理するラジオボタンの状態を更新する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param ignoreRadio 対象外のラジオボタン
                 *
                 */
                update(ignoreRadio: Radio): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * MapOptionクラスのオプションハッシュのインターフェイス
             *
             * @version 0.0.9
             * @since 0.0.9
             *
             */
            interface MapOption {
                /**
                 * ズーム率
                 *
                 * @version 0.0.9
                 * @since 0.0.9
                 *
                 */
                zoom?: number;
                /**
                 * マップのコントロールオプション
                 *
                 * @version 0.0.9
                 * @since 0.0.9
                 *
                 */
                mapTypeControlOptions?: google.maps.MapTypeControlOptions;
                /**
                 * スクロールホイールが有効かどうか
                 *
                 * @version 0.0.9
                 * @since 0.0.9
                 *
                 */
                scrollwheel?: boolean;
                /**
                 * 地図の中央の座標
                 *
                 * @version 0.0.9
                 * @since 0.0.9
                 *
                 */
                center?: google.maps.LatLng;
                /**
                 * 地図のスタイル
                 *
                 * @version 0.0.9
                 * @since 0.0.9
                 *
                 */
                styles?: google.maps.MapTypeStyle[];
            }
            /**
             * マップ要素
             *
             * @version 0.0.6
             * @since 0.0.6
             *
             */
            class Map extends Element {
                /**
                 * 初期設定用の緯度
                 * 東京都庁
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                static defaultLat: number;
                /**
                 * 初期設定用の経度
                 * 東京都庁
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                static defaultLng: number;
                /**
                 * 緯度
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                lat: number;
                /**
                 * 経度
                 *
                 * @version 0.2.0
                 * @since 0.2.0
                 *
                 */
                lng: number;
                /**
                 * 管理対象の要素に付加するclass属性値のプレフィックス
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                static className: string;
                /**
                 * 管理するマップ要素リスト
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                static maps: Map[];
                /**
                 * Google Mapsのインスタンス
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                gmap: google.maps.Map;
                /**
                 * インフォウィンドウ
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                info: google.maps.InfoWindow;
                /**
                 * ピンを置いた座標の要素
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                $coordinates: JQuery;
                /**
                 * マップオプション
                 *
                 * @version 0.0.9
                 * @since 0.0.9
                 *
                 */
                mapOption: MapOption;
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.9
                 * @since 0.0.6
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options マップオプション
                 *
                 */
                constructor($el: JQuery, options?: MapOption);
                /**
                 * 初期化
                 *
                 * @version 0.2.0
                 * @since 0.0.6
                 *
                 */
                private _init();
                /**
                 * レンダリング
                 *
                 * @version 0.2.1
                 * @since 0.2.0
                 * @param mapCenterLat 緯度
                 * @param mapCenterLng 経度
                 *
                 */
                private _render(mapCenterLat, mapCenterLng);
                reload(options?: MapOption): void;
                static getLatLngByAddress(address: string, callback: (lat: number, lng: number) => void): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * Youtubeクラスのコンストラクタのオプション
             *
             * @version 0.0.16
             * @since 0.0.16
             *
             */
            interface YoutubeOption {
                /**
                 * 関連動画を再生後に表示させるかどうか
                 *
                 * @since 0.0.16
                 *
                 */
                rel?: boolean;
                /**
                 * 自動再生させるかどうか
                 *
                 * @since 0.0.16
                 *
                 */
                autoplay?: boolean;
                /**
                 * ウィンドウがアクティブでなくなった時に再生を停止するかどうか
                 *
                 * @since 0.0.16
                 *
                 */
                stopOnInactive?: boolean;
                /**
                 * コントロールを表示させるかどうか
                 *
                 * @since 0.0.16
                 *
                 */
                controls?: boolean;
                /**
                 * ループ再生するかどうか
                 *
                 * @since 0.0.16
                 *
                 */
                loop?: boolean;
                /**
                 * 動画情報を表示させるかどうか
                 *
                 * @since 0.0.16
                 *
                 */
                showinfo?: boolean;
                /**
                 * 初期状態でミュートするかどうか
                 *
                 * @since 0.5.0
                 *
                 */
                mute?: boolean;
            }
            /**
             * Youtubeインスタンスの muteControllerメソッドのオプション
             *
             * @version 0.5.0
             * @since 0.5.0
             *
             */
            interface YoutubeMuteControllerOptions {
                /**
                 * コントローラが実行されるイベントタイプ
                 *
                 * @since 0.5.0
                 *
                 */
                eventType?: string;
                /**
                 * 適用要素に付加されるミュート状態のクラス名
                 *
                 * @since 0.5.0
                 *
                 */
                mutedClass?: string;
                /**
                 * 適用要素に付加されるミュートでない状態クラス名
                 *
                 * @since 0.5.0
                 *
                 */
                unmutedClass?: string;
                /**
                 * 適用要素に付加されるクラス名
                 *
                 * @since 0.5.0
                 *
                 */
                baseClass?: string;
            }
            /**
             * YouTube要素
             *
             * @version 0.0.7
             * @since 0.0.7
             *
             */
            class Youtube extends Element {
                /**
                 * 管理対象の要素に付加するclass属性値のプレフィックス
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                static className: string;
                /**
                 * Player URL
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                static PLAYER_URL: string;
                /**
                 * API URL
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                static API_URL: string;
                /**
                 * 管理対象の要素
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                static movies: Youtube[];
                /**
                 * ムービーのID
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                movieId: string;
                /**
                 * 現在のキューのインデックス番号
                 *
                 * @version 0.4.0
                 * @since 0.4.0
                 *
                 */
                currentCueIndex: number;
                /**
                 * ムービーのオプション
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                movieOption: YoutubeOption;
                /**
                 * プレイヤーオブジェクト
                 *
                 * @version 0.5.0
                 * @since 0.5.0
                 *
                 */
                player: YT.Player;
                /**
                 * プレイヤーが有効になっているかどうか
                 *
                 * @version 0.5.0
                 * @since 0.5.0
                 *
                 */
                isEmbeded: boolean;
                /**
                 * ミュートされているかどうか
                 *
                 * `this.player.isMuted()` を利用すれば判定はできるが
                 * `this.player.mute()` もしくは `this.player.unMute()` 実行直後では
                 * `this.player.isMuted()` の判定が不安定なため
                 * （APIの実行完了を監視しなければならないが、そのためのイベントが存在しない）
                 * 独自にインスタンスプロパティとして保持する
                 *
                 * @version 0.5.0
                 * @since 0.5.0
                 *
                 */
                private _isMuted;
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                constructor($el: JQuery, options?: YoutubeOption);
                /**
                 * 初期化
                 *
                 * ※ `this.$el` の `embeddedyoutubeplay` イベント非推奨
                 *
                 * @version 0.5.0
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @return {booelan} 初期化が成功したかどうか
                 *
                 */
                private _init(options?);
                reload(options?: YoutubeOption): void;
                mute(): void;
                unMute(): void;
                muteController($el: any, options: YoutubeMuteControllerOptions): void;
            }
        }
    }
}
declare module baser {
}
declare module baser {
}
/**
 * 指定の要素、もしくはy座標までスムーズにスクロールをさせる
 *
 * @version 0.0.8
 * @since 0.0.8
 *
 * * * *
 *
 * ## Sample
 *
 * comming soon...
 *
 */
interface JQueryStatic {
    bcScrollTo(selector: string, options?: baser.ui.ScrollOptions): void;
    bcScrollTo(selector: HTMLElement, options?: baser.ui.ScrollOptions): void;
    bcScrollTo(selector: JQuery, options?: baser.ui.ScrollOptions): void;
    bcScrollTo(selector: number, options?: baser.ui.ScrollOptions): void;
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
declare module baser {
}
