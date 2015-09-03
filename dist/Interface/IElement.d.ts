import IEventDispacher = require('./IEventDispacher');
interface IElement extends IEventDispacher {
    id: string;
    name: string;
    $el: JQuery;
    addClass(blockNames: string, elementNames?: string, modifierName?: string): void;
    getBoolAttr(attrName: string): boolean;
}
export = IElement;
