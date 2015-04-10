module baser {

	export module ui {

		export module element {

			export interface ISelect extends IFormElement {

				defaultSelectedIndex: number;
				$selected: JQuery;
				$pseudo: JQuery;
				$options: JQuery;

				getIndex (): number;
				next (isSilent: boolean): void;
				prev (isSilent: boolean): void;

			}

		}

	}

}
