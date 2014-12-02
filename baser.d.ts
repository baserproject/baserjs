/// <reference path="typings/tsd.d.ts" />
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
        class EventDispacher {
            constructor();
            on(type: string, handler: Function): EventDispacher;
            off(type?: string): EventDispacher;
            trigger(type: string, context?: any): EventDispacher;
        }
        class EventHandler {
            id: string;
            context: EventDispacher;
            type: string;
            handler: Function;
            constructor(context: EventDispacher, type: string, handler: Function);
        }
        class DispacheEvent {
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
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            static spec: {
                isTouchable: boolean;
                ua: any;
            };
            /**
             * ユーザーエージェント情報を取得する
             *
             * @version 0.0.2
             * @since 0.0.1
             *
             */
            static getUA(): any;
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
                [x: string]: any;
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
             * @version 0.0.8
             * @since 0.0.8
             * @param {string|HTMLElement|JQuery|number} 対象の要素のセレクタ・HTMLオブジェクト・jQueryオブジェクトもしくはスクロール位置
             * @param {ScrollOptions} オプション
             * @return {Scroll} 自信のスクロールオブジェクト
             *
             */
            to(selector: string, options?: ScrollOptions): Scroll;
            to(selector: HTMLElement, options?: ScrollOptions): Scroll;
            to(selector: JQuery, options?: ScrollOptions): Scroll;
            to(selector: number, options?: ScrollOptions): Scroll;
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
            /**
             * DOM要素の抽象クラス
             *
             * @version 0.0.2
             * @since 0.0.1
             *
             */
            class Element {
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
                 * コンストラクタ
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                constructor($el: JQuery);
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
             * @version 0.0.2
             * @since 0.0.1
             *
             */
            class Form {
                /**
                 * 管理対象の要素に付加するclass属性値のプレフィックス
                 *
                 * @since 0.0.1
                 *
                 */
                static className: string;
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
                    [x: string]: RadioGroup;
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
                /**
                 * [未実装] 複数選択可セレクトボックスを拡張する
                 *
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                static selectMultiple($elem: JQuery): JQuery;
                /**
                 * [未実装] 妥当性チェックを拡張する
                 *
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                static valid($elem: JQuery, options?: any): JQuery;
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
             * @version 0.0.5
             * @since 0.0.1
             *
             */
            class FormElement extends Element {
                /**
                 * オプションのデフォルト値
                 *
                 * @version 0.0.5
                 * @since 0.0.1
                 *
                 */
                static defaultOption: FormElementOption;
                /**
                 * フォーカスがあたっている状態かどうか
                 *
                 * @since 0.0.1
                 *
                 */
                isFocus: boolean;
                /**
                 * ラベルのテキスト
                 *
                 * @since 0.0.1
                 *
                 */
                label: string;
                /**
                 * ラベル要素のjQueryオブジェクト
                 *
                 * @since 0.0.1
                 *
                 */
                $label: JQuery;
                /**
                 * ラベル要素にラップされているかどうか
                 *
                 * @since 0.0.4
                 *
                 */
                isWrappedByLabel: boolean;
                /**
                 * ラッパー要素のjQueryオブジェクト
                 *
                 * @since 0.0.4
                 *
                 */
                $wrapper: JQuery;
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.5
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: FormElementOption);
                /**
                 * フォーカスがあたった時のルーチン
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @protected プロテクテッドメソッド想定
                 *
                 */
                _onfocus(): void;
                /**
                 * フォーカスがはずれた時のルーチン
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @protected プロテクテッドメソッド想定
                 *
                 */
                _onblur(): void;
            }
        }
    }
}
declare module baser {
    module ui {
        module element {
            /**
             * セレクトボックスの拡張クラス
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            class Select extends FormElement {
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
                 * コンストラクタ
                 *
                 * @version 0.0.4
                 * @since 0.0.1
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                constructor($el: JQuery, options: CheckableElementOption);
                /**
                 * 擬似要素にフォーカスがあったった時のイベント伝達を制御する
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                private _psuedoFocusEvent();
                /**
                 * チェンジイベントのハンドラ
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 *
                 */
                private _onchange();
                /**
                 * フォーカスがあたった時のルーチン
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @protected プロテクテッドメソッド想定
                 *
                 */
                _onfocus(): void;
                /**
                 * フォーカスがはずれた時のルーチン
                 *
                 * @version 0.0.1
                 * @since 0.0.1
                 * @protected プロテクテッドメソッド想定
                 *
                 */
                _onblur(): void;
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.0.1
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
             * @version 0.0.3
             * @since 0.0.1
             *
             */
            class CheckableElement extends FormElement {
                /**
                 * オプションのデフォルト値
                 *
                 * @since 0.0.1
                 *
                 */
                static defaultOption: CheckableElementOption;
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
                 * コンストラクタ
                 *
                 * @version 0.0.1
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
                 * @protected プロテクテッド想定
                 *
                 */
                _onchenge(): void;
                /**
                 * 要素の状態を更新する
                 *
                 * @version 0.0.3
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
            /**
             * ラジオボタンの拡張クラス
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            class Radio extends CheckableElement {
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.4
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
            /**
             * チェックボックスの拡張クラス
             *
             * @version 0.0.1
             * @since 0.0.1
             *
             */
            class Checkbox extends CheckableElement {
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.4
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
             * ボックス要素の抽象クラス
             *
             * @version 0.0.5
             * @since 0.0.5
             *
             */
            class Box extends Element {
                /**
                 * 管理対象の要素に付加するclass属性値のプレフィックス
                 *
                 * @version 0.0.5
                 * @since 0.0.5
                 *
                 */
                static className: string;
                /**
                 * 管理対象の要素
                 *
                 * @version 0.0.5
                 * @since 0.0.5
                 *
                 */
                static boxes: string[];
                /**
                 * ボックスの高さを揃える
                 *
                 * @version 0.0.x
                 * @since 0.0.x
                 * @param $elem 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                static alignHeight($elem: JQuery, options?: Object): JQuery;
                /**
                 * コンストラクタ
                 *
                 * @version 0.0.5
                 * @since 0.0.5
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 *
                 */
                constructor($el: JQuery);
                /**
                 * ボックスの高さを揃える
                 *
                 * @version 0.0.x
                 * @since 0.0.x
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @param options オプション
                 *
                 */
                alignHeight(options?: Object): Box;
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
                static lat: number;
                /**
                 * 初期設定用の経度
                 * 東京都庁
                 *
                 * @version 0.0.6
                 * @since 0.0.6
                 *
                 */
                static lng: number;
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
                 *
                 */
                constructor($el: JQuery, options?: MapOption);
                private _init(options?);
                reload(): void;
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
                 * ムービーのオプション
                 *
                 * @version 0.0.7
                 * @since 0.0.7
                 *
                 */
                movieOption: YoutubeOption;
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
                 * @version 0.0.7
                 * @since 0.0.7
                 * @param $el 管理するDOM要素のjQueryオブジェクト
                 * @return {booelan} 初期化が成功したかどうか
                 *
                 */
                private _init(options?);
                reload(options?: YoutubeOption): void;
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
