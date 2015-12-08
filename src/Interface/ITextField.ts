import IFormElement = require('./IFormElement');

interface ITextField extends IFormElement {
	isEmpty: boolean;
	placeholder: string;
	hasPlaceholder: boolean;
}

export = ITextField;
