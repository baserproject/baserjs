import IFormElement = require('./IFormElement');

interface ISelect extends IFormElement {
	defaultSelectedIndex: number;
	$selected: JQuery;
	$pseudo: JQuery;
	$options: JQuery;
	getIndex (): number;
	next (isSilent: boolean): void;
	prev (isSilent: boolean): void;
}

export = ISelect;