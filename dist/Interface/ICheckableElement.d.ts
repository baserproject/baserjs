import IFormElement = require('./IFormElement');
interface ICheckableElement extends IFormElement {
    checked: boolean;
    defaultChecked: boolean;
    update(): void;
}
export = ICheckableElement;
