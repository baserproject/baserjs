/**
 * クラス名の形式
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */
var ElementClassNameCase;
(function (ElementClassNameCase) {
    ElementClassNameCase[ElementClassNameCase["HYPHEN_DELIMITED"] = 0] = "HYPHEN_DELIMITED";
    ElementClassNameCase[ElementClassNameCase["SNAKE_CASE"] = 1] = "SNAKE_CASE";
    ElementClassNameCase[ElementClassNameCase["CAMEL_CASE"] = 2] = "CAMEL_CASE";
})(ElementClassNameCase || (ElementClassNameCase = {}));
module.exports = ElementClassNameCase;
