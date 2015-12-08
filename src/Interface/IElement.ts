import IEventDispatcher = require('./IEventDispatcher');

interface IElement extends IEventDispatcher {
	id: string;
	name: string;
	$el: JQuery;
	addClass (blockNames: string, elementNames?: string, modifierName?: string): void;
	getBoolAttr (attrName: string): boolean;
}

export = IElement;
