module baser {

	export module ui {

		export module element {

			export interface ICheckableElement extends IFormElement {

				checked: boolean;
				defaultChecked: boolean;

				update (): void;

			}

		}

	}

}
