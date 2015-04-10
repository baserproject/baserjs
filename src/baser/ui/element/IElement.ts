module baser {

	export module ui {

		export module element {

			export interface IElement extends IEventDispacher {

				id: string;
				name: string;
				$el: JQuery;

				addClass (blockNames: string, elementNames?: string, modifierName?: string): void;
				getBoolAttr (attrName: string): boolean;

			}

		}

	}

}
