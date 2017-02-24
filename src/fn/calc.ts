const ARITHMETIC_OPERATOR_ADDITION = '+';
const ARITHMETIC_OPERATOR_SUBTRACTION = '-';
const ARITHMETIC_OPERATOR_MULTIPLICATION = '*';
const ARITHMETIC_OPERATOR_DIVISION = '/';
const ARITHMETIC_OPERATOR_REMAINDER = '%';
const ARITHMETIC_OPERATOR_EXPONENTIATION = '**';

/**
 * 四則演算処理
 *
 * TODO: x - -xの計算
 * TODO: ()を使った優先
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param str 評価文字列
 * @return 評価結果
 *
 */
export default function calc (expression: string) {
	if (arguments.length !== 1) {
		throw new Error(`Illegal number of arguments.`);
	}
	const type = typeof expression;
	if (type !== 'string') {
		throw new TypeError(`Invalid argument type [${type}]. An expected type is evaluable string.`);
	}
	if (!expression.trim()) {
		throw new TypeError(`Invalid string format. An expression "${expression}" is empty.`);
	}

	const expressionSize = expression.length;

	const numberCharBuffer: string[] = [];
	const invalidKeywordBuffer: string[] = [];

	let isNum = false;
	let isDouble = false;
	let sign = 1;
	let nextNumberIsNegative = false;
	let lastChar = '';
	let lastOperand = '';
	let lastOperator = '';

	let buffer: number[] = [];

	for (let i = 0; i <= expressionSize; i++) {
		const charCode = expression.charCodeAt(i);

		// is space
		switch (charCode) {
			case 32: // space
			case 10: // \n
			case 13: // \r
			case  9: // \t
				continue;
		}

		const char = expression.charAt(i);
		if (charCode === 46 || 48 <= charCode && charCode <= 57) {
			if (invalidKeywordBuffer.length) {
				throw new SyntaxError(`annot evaluate in "${invalidKeywordBuffer.join('')}" in "${expression}"`);
			}

			numberCharBuffer.push(char);
			if (charCode === 46) {
				if (isDouble) {
					throw new SyntaxError(`Unexpected number.`);
				}
				isDouble = true;
			}
			isNum = true;
		} else if (isOperator(char) || char === '') {
			if (invalidKeywordBuffer.length) {
				throw new SyntaxError(`annot evaluate "${invalidKeywordBuffer.join('')}" in "${expression}"`);
			}

			let operator = char;

			if (operator === ARITHMETIC_OPERATOR_SUBTRACTION) {
				nextNumberIsNegative = true;
			}

			if (isOperator(lastChar)) {
				if (lastChar === ARITHMETIC_OPERATOR_MULTIPLICATION && operator === ARITHMETIC_OPERATOR_MULTIPLICATION) {
					operator = ARITHMETIC_OPERATOR_EXPONENTIATION;
				} else if (operator === ARITHMETIC_OPERATOR_SUBTRACTION) {
					// case:=> x ? -x
					sign *= -1;
					operator = lastOperator;
				} else {
					throw new Error(`successive operator.`);
				}
			}

			let evalBuffer = false;
			switch (lastOperator) {
				case '':
				case ARITHMETIC_OPERATOR_ADDITION:
				case ARITHMETIC_OPERATOR_SUBTRACTION:
					evalBuffer = true;
			}
			if (numberCharBuffer.length) {
				const operand = numberCharBuffer.join('');
				if (nextNumberIsNegative) {
					sign *= 1;
					nextNumberIsNegative = false;
				}
				const num = parseFloat(operand) * sign;
				if (evalBuffer) {
					buffer.push(num);
				} else {
					const lastNum = buffer.pop();
					if (lastNum == null) {
						throw new SyntaxError(`Invalid left operand.`);
					}
					let res = 0;
					switch (lastOperator) {
						case ARITHMETIC_OPERATOR_EXPONENTIATION:
							res += lastNum ** num;
							break;
						case ARITHMETIC_OPERATOR_MULTIPLICATION:
							res += lastNum * num;
							break;
						case ARITHMETIC_OPERATOR_DIVISION:
							res += lastNum / num;
							break;
						case ARITHMETIC_OPERATOR_REMAINDER:
							res += lastNum % num;
							break;
					}
					buffer.push(res);
				}
				lastOperand = operand;
				numberCharBuffer.length = 0;
				sign = 1;
			}
			lastOperator = operator;
			isNum = false;
			isDouble = false;
		} else {
			invalidKeywordBuffer.push(char);
		}
		lastChar = char;
		console.log(`[${charCode || '--'}] ${expression.charAt(i)}	| ${lastOperator || ' '}${isNum ? 'n' : ' '}${isDouble ? 'd' : ' '}${sign === -1 ? '-' : ' '}	| ${buffer.join(' + ')}`);
	}

	console.log(`
		in: ${expression}
		out: ${buffer.join(' + ')}
	`);

	return buffer.reduce((p, v) => p + v, 0);
}

function isOperator (char: string) {
	return char === ARITHMETIC_OPERATOR_ADDITION
			||
			char === ARITHMETIC_OPERATOR_SUBTRACTION
			||
			char === ARITHMETIC_OPERATOR_MULTIPLICATION
			||
			char === ARITHMETIC_OPERATOR_DIVISION
			||
			char === ARITHMETIC_OPERATOR_REMAINDER;
}
