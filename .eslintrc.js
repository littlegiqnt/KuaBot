/**
 * @type {import('eslint').ESLint.ConfigData}
 */
const baseConfig = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
    },
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended"],
    env: {
        node: true,
        es2022: true,
    },
};

/**
 * set to `'error'` for rules which satisfies one of
 *  - can cause unexpected behavior
 *  - strongly recommended to use
 * set to `'warn'` for rules which can make code looks better
 * 
 * @type {import('eslint').Linter.RulesRecord}
 */
const rules = {
    /* eslint-disable @typescript-eslint/naming-convention */
    /**
     * `T[]` might be confused with property access. \
     * and when `T` is actually very long(e.g. `SocketEventHandlerCreator<SocketEventHandler<SocketEventType>>`),
     * you may not notice it's an array quickly.
     * also, you can distinguish between tuples and arrays clearly.
     */
    "@typescript-eslint/array-type": ["warn", { default: "generic" }],
    "@typescript-eslint/brace-style": "warn",
    "@typescript-eslint/class-literal-property-style": "warn",
    /**
     * see https://eslint.org/docs/latest/rules/comma-dangle
     */
    "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],
    "@typescript-eslint/comma-spacing": "warn",
    "@typescript-eslint/consistent-generic-constructors": "warn",
    /**
     * strongly recommended
     */
    "@typescript-eslint/consistent-indexed-object-style": "error",
    /**
     * see https://typescript-eslint.io/rules/consistent-type-assertions#assertionstyle
     */
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "warn",
    /**
     * strongly recommended
     */
    "@typescript-eslint/dot-notation": "error",
    /**
     * in some languages like C++, member visibility is not public by default. \
     * this rule increases intuitiveness.
     */
    "@typescript-eslint/explicit-member-accessibility": "warn",
    "@typescript-eslint/func-call-spacing": "warn",
    /**
     * because of rule `@typescript-eslint/indent` is so unstable, disabled the rule. \
     * see https://github.com/typescript-eslint/typescript-eslint/issues/1824
     * 
     * RECOMMENDS TO USE TAB CHARACTER FOR INDENTATION. \
     * here are some reasons:
     *  - more simple to detect indentation level without context
     *  - single indentation level, single backspace key press
     *  - don't need to think about which amount of spaces to use
     *  - width of tab character is configurable in most editors
     */
    "@typescript-eslint/indent": ["warn"], // ['warn', 'tab'],
    "@typescript-eslint/member-delimiter-style": ["warn", { multiline: { delimiter: "none" } }],
    "@typescript-eslint/method-signature-style": "warn",
    /**
     * strongly recommended
     */
    "@typescript-eslint/naming-convention": [
        "error",
        {
            selector: "default",
            format: ["strictCamelCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
        },
        {
            selector: "variable",
            format: ["strictCamelCase", "UPPER_CASE"/* constants */, "StrictPascalCase"/* react components */],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
        },
        {
            selector: "parameter",
            format: ["strictCamelCase", "StrictPascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
        },
        {
            selector: "objectLiteralProperty",
            format: ["strictCamelCase", "UPPER_CASE"/* some APIs in package `redis` takes option with uppercased name, e.g. `REV` */],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid",
        },
        {
            selector: "typeLike",
            format: ["StrictPascalCase"],
        },
    ],
    "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-extraneous-class": "warn",
    "@typescript-eslint/no-for-in-array": "error",
    /**
     * strongly recommended
     */
    "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true }],
    "@typescript-eslint/no-misused-promises": ["error", { checkConditionals: false/* conditions will be handled by `@typescript-eslint/strict-boolean-expressions` */ }],
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
    "@typescript-eslint/no-redundant-type-constituents": "warn",
    "@typescript-eslint/no-throw-literal": "warn",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unsafe-declaration-merging": "error",
    "@typescript-eslint/no-var-requires": "warn",
    /**
     * strongly recommended
     */
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/object-curly-spacing": ["warn", "always"],
    "@typescript-eslint/parameter-properties": ["warn", { prefer: "parameter-property" }],
    /**
     * strongly recommended
     */
    "@typescript-eslint/prefer-as-const": "error",
    /**
     * strongly recommended
     */
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": ["warn", { ignoreTernaryTests: false, ignoreMixedLogicalExpressions: false }],
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/quotes": ["warn", "double"],
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/space-before-blocks": "warn",
    "@typescript-eslint/space-infix-ops": "warn",
    /**
     * strings and numbers can be falsy, that might cause unexpected behavior. \
     * objects like `{}`, `[]` might be confused whether the value is falsy.
     */
    "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
            allowNullableBoolean: true,
        },
    ],
    "@typescript-eslint/type-annotation-spacing": ["warn", { after: true }],
    "@typescript-eslint/unified-signatures": "warn",
    "array-bracket-newline": ["warn", "consistent"],
    "array-bracket-spacing": "warn",
    "array-element-newline": ["warn", "consistent"],
    /**
     * strongly recommended
     */
    "arrow-body-style": "error",
    "arrow-parens": "warn",
    /**
     * strongly recommended
     */
    "arrow-spacing": "error",
    "block-spacing": "warn",
    /**
     * strongly recommended
     */
    "comma-style": "error",
    /**
     * strongly recommended
     */
    "computed-property-spacing": "error",
    "consistent-return": "error",
    "curly": ["warn", "multi-line", "consistent"],
    /**
     * strongly recommended
     */
    "dot-location": ["error", "property"],
    /**
     * ```
     * const someValueThatHasUnionType: string | number = ...
     * if (someValueThatHasUnionType == 0) {
     *   console.log('it\'s 0')
     * }
     * ```
     * author is expecting `someValueThatHasUnionType` equals `0` in the code, but it isn't. \
     * with `==`, 0 is also equal to empty string(`''`), which is unexpected behavior. \
     * so, even in TS, still `==` is unsafe and `===` is safe.
     */
    "eqeqeq": ["error", "smart"],
    "function-call-argument-newline": ["warn", "consistent"],
    "implicit-arrow-linebreak": ["error", "below"],
    /**
     * strongly recommended
     */
    "init-declarations": "error",
    "jsx-quotes": "warn",
    /**
     * strongly recommended
     */
    "key-spacing": "error",
    "keyword-spacing": "warn",
    "logical-assignment-operators": "warn",
    "max-classes-per-file": "warn",
    /**
     * strongly recommended
     */
    "max-statements-per-line": "error",
    "multiline-ternary": "warn",
    /**
     * `new` without parentheses might be confused:
     * ```
     * // code
     * new Person.name
     * 
     * // intended behavior
     * new Person().name
     * 
     * // actual behavior
     * new (Person.name)()
     * ```
     */
    "new-parens": "error",
    "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 1 }],
    /**
     * strongly recommended
     * 
     * `Array` constructor is useless since
     *   [`Array.of()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
     * and
     *   [`Array.from()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
     * exists.
     */
    "no-array-constructor": "error",
    "no-async-promise-executor": "error",
    "no-bitwise": ["error", { allow: ["<<"/* can be used for bit flag */] }],
    "no-cond-assign": "error",
    "no-constant-binary-expression": "error",
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-empty": "warn",
    "no-ex-assign": "error",
    "no-extend-native": "error",
    "no-extra-semi": "warn",
    "no-floating-decimal": "error",
    "no-implicit-coercion": ["error", { boolean: false }],
    "no-invalid-regexp": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-mixed-operators": "warn",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-assign": "error",
    "no-multi-spaces": "warn",
    "no-multi-str": "error",
    "no-new-native-nonconstructor": "error",
    "no-new-object": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    /**
     * strongly recommended
     */
    "no-param-reassign": "error",
    "no-promise-executor-return": "error",
    "no-restricted-syntax": ["error", ":not(ExpressionStatement) > AssignmentExpression"/* assignment which is not statement */],
    "no-return-assign": ["error", "always"],
    "no-return-await": "error",
    "no-sequences": ["error", { allowInParentheses: false }],
    "no-sparse-arrays": "error",
    "no-tabs": ["error", { allowIndentationTabs: true }],
    "no-template-curly-in-string": "error",
    "no-trailing-spaces": ["warn", { ignoreComments: true }],
    "no-unexpected-multiline": "error",
    "no-unneeded-ternary": "warn",
    "no-unsafe-negation": "error",
    "no-unsafe-optional-chaining": "error",
    "no-var": "error",
    "no-whitespace-before-property": "warn",
    "nonblock-statement-body-position": ["warn", "beside"],
    "object-curly-newline": "warn",
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",
    "operator-linebreak": ["warn", "before", { overrides: { "=": "after" } }],
    "padded-blocks": ["warn", "never"],
    "prefer-const": "error",
    "prefer-exponentiation-operator": "warn",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "require-atomic-updates": "error",
    "rest-spread-spacing": "warn",
    /**
     * semicolon makes code which needs to see more characters. \
     * in JS, semicolon is not mandatory because of ASI(Auto Semicolon Insertion). \
     * ASI affects to semicolon users as well, \
     * so writing code without knowledges about behavior of ASI can cause unexpected behavior like this:
     * ```
     * return
     *   { foo: 'bar' }; // i expected to return `{ foo: 'bar' }`!
     * 
     * // actual code to run
     * return;
     *   { foo: 'bar' };
     * ```
     * if you decided to don't put semicolon everywhere, \
     * all you need to do is just putting semicolons where it's really needed. \
     * how simple it is?
     */
    "semi": ["error", "always"],
    "semi-spacing": "warn",
    "space-in-parens": "warn",
    "space-unary-ops": "warn",
    "spaced-comment": "warn",
    "switch-colon-spacing": "warn",
    "template-curly-spacing": "warn",
    "template-tag-spacing": "warn",
    "yoda": "warn",
    /* eslint-enable @typescript-eslint/naming-convention */
};

module.exports = {
    ...baseConfig,
    rules,
};