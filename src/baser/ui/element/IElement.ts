module baser.ui.element {

	export interface IElement extends event.IEventDispacher {

		id: string;
		name: string;
		$el: JQuery;

		addClass (blockNames: string, elementNames?: string, modifierName?: string): void;
		getBoolAttr (attrName: string): boolean;

	}

}
