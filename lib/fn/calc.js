"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ARITHMETIC_OPERATOR_ADDITION = '+';
var ARITHMETIC_OPERATOR_SUBTRACTION = '-';
var ARITHMETIC_OPERATOR_MULTIPLICATION = '*';
var ARITHMETIC_OPERATOR_DIVISION = '/';
var ARITHMETIC_OPERATOR_REMAINDER = '%';
var ARITHMETIC_OPERATOR_EXPONENTIATION = '**';
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
function calc(expression) {
    if (arguments.length !== 1) {
        throw new Error("Illegal number of arguments.");
    }
    var type = typeof expression;
    if (type !== 'string') {
        throw new TypeError("Invalid argument type [" + type + "]. An expected type is evaluable string.");
    }
    if (!expression.trim()) {
        throw new TypeError("Invalid string format. An expression \"" + expression + "\" is empty.");
    }
    var expressionSize = expression.length;
    var numberCharBuffer = [];
    var invalidKeywordBuffer = [];
    var isNum = false;
    var isDouble = false;
    var sign = 1;
    var nextNumberIsNegative = false;
    var lastChar = '';
    var lastOperand = '';
    var lastOperator = '';
    var buffer = [];
    for (var i = 0; i <= expressionSize; i++) {
        var charCode = expression.charCodeAt(i);
        // is space
        switch (charCode) {
            case 32: // space
            case 10: // \n
            case 13: // \r
            case 9:// \t
                continue;
        }
        var char = expression.charAt(i);
        if (charCode === 46 || 48 <= charCode && charCode <= 57) {
            if (invalidKeywordBuffer.length) {
                throw new SyntaxError("annot evaluate in \"" + invalidKeywordBuffer.join('') + "\" in \"" + expression + "\"");
            }
            numberCharBuffer.push(char);
            if (charCode === 46) {
                if (isDouble) {
                    throw new SyntaxError("Unexpected number.");
                }
                isDouble = true;
            }
            isNum = true;
        }
        else if (isOperator(char) || char === '') {
            if (invalidKeywordBuffer.length) {
                throw new SyntaxError("annot evaluate \"" + invalidKeywordBuffer.join('') + "\" in \"" + expression + "\"");
            }
            var operator = char;
            if (operator === ARITHMETIC_OPERATOR_SUBTRACTION) {
                nextNumberIsNegative = true;
            }
            if (isOperator(lastChar)) {
                if (lastChar === ARITHMETIC_OPERATOR_MULTIPLICATION && operator === ARITHMETIC_OPERATOR_MULTIPLICATION) {
                    operator = ARITHMETIC_OPERATOR_EXPONENTIATION;
                }
                else if (operator === ARITHMETIC_OPERATOR_SUBTRACTION) {
                    // case:=> x ? -x
                    sign *= -1;
                    operator = lastOperator;
                }
                else {
                    throw new Error("successive operator.");
                }
            }
            var evalBuffer = false;
            switch (lastOperator) {
                case '':
                case ARITHMETIC_OPERATOR_ADDITION:
                case ARITHMETIC_OPERATOR_SUBTRACTION:
                    evalBuffer = true;
            }
            if (numberCharBuffer.length) {
                var operand = numberCharBuffer.join('');
                if (nextNumberIsNegative) {
                    sign *= 1;
                    nextNumberIsNegative = false;
                }
                var num = parseFloat(operand) * sign;
                if (evalBuffer) {
                    buffer.push(num);
                }
                else {
                    var lastNum = buffer.pop();
                    if (lastNum == null) {
                        throw new SyntaxError("Invalid left operand.");
                    }
                    var res = 0;
                    switch (lastOperator) {
                        case ARITHMETIC_OPERATOR_EXPONENTIATION:
                            res += Math.pow(lastNum, num);
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
        }
        else {
            invalidKeywordBuffer.push(char);
        }
        lastChar = char;
        console.log("[" + (charCode || '--') + "] " + expression.charAt(i) + "\t| " + (lastOperator || ' ') + (isNum ? 'n' : ' ') + (isDouble ? 'd' : ' ') + (sign === -1 ? '-' : ' ') + "\t| " + buffer.join(' + '));
    }
    console.log("\n\t\tin: " + expression + "\n\t\tout: " + buffer.join(' + ') + "\n\t");
    return buffer.reduce(function (p, v) { return p + v; }, 0);
}
exports.default = calc;
function isOperator(char) {
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
