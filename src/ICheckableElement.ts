module baser.ui.element {

	export interface ICheckableElement extends IFormElement {

		checked: boolean;
		defaultChecked: boolean;

		update (): void;

	}

}
