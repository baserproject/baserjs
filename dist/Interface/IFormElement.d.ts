import IElement = require('./IElement');
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
export = IFormElement;
