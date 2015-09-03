/**
 * BEM式のクラス名の接続形式
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
var ClassNameSeparatorForBEM;
(function (ClassNameSeparatorForBEM) {
    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["HYPHEN"] = 0] = "HYPHEN";
    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_HYPHEN"] = 1] = "DOUBLE_HYPHEN";
    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["UNDERSCORE"] = 2] = "UNDERSCORE";
    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_UNDERSCORE"] = 3] = "DOUBLE_UNDERSCORE";
    ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["CAMEL_CASE"] = 4] = "CAMEL_CASE";
})(ClassNameSeparatorForBEM || (ClassNameSeparatorForBEM = {}));
module.exports = ClassNameSeparatorForBEM;
