module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  plugins: ['babel'],
  root: true,
  globals:{
     fetch: true,
  },
  rules: {
    'accessor-pairs': 'error', // 强制 getter 和 setter 在对象中成对出现
    'array-bracket-spacing': 'off', // 强制数组方括号中使用一致的空格
    'arrow-parens': 'off', // 要求箭头函数的参数使用圆括号
    'arrow-spacing': 'error', // 强制箭头函数的箭头前后使用一致的空格
    'babel/arrow-parens': ['error', 'as-needed'],
    'babel/generator-star-spacing': ['error', 'before'],
    'block-scoped-var': 'error', // 强制把变量的使用限制在其定义的作用域范围内
    'block-spacing': 'off', // 强制在单行代码块中使用一致的空格
    'brace-style': 'off', // 强制在代码块中使用一致的大括号风格
    camelcase: 'off', // 强制使用骆驼拼写法命名约定
    'comma-dangle': 'off', // 要求或禁止末尾逗号
    'comma-spacing': 'off', // 强制在逗号前后使用一致的空格
    'comma-style': 'off', // 强制使用一致的逗号风格
    complexity: 'off', // 指定程序中允许的最大环路复杂度
    'computed-property-spacing': 'error', // 强制在计算的属性的方括号中使用一致的空格
    'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-this': 'error', // 当获取当前执行环境的上下文时，强制使用一致的命名
    'constructor-super': 'error', // 要求在构造函数中有 super() 的调用
    curly: 'off', // 强制所有控制语句使用一致的括号风格
    'default-case': 'error', // 要求 switch 语句中有 default 分支
    'dot-location': ['error', 'property'], // 强制在点号之前和之后一致的换行
    'dot-notation': 'off', // 强制在任何允许的时候使用点号
    'eol-last': 'off', // 强制文件末尾至少保留一行空行
    eqeqeq: ['error', 'smart'], // 要求使用 === 和 !==
    'func-names': 'off', // 强制使用命名的 function 表达式
    'func-style': ['error', 'declaration', { // 强制一致地使用函数声明或函数表达式
      allowArrowFunctions: true
    }], 'generator-star-spacing': 'off', // 强制 generator 函数中 * 号周围使用一致的空格
    'id-length': ['error', { // 强制标识符的最新和最大长度
      exceptions: ['_', 'e', 'i', '$']
    }],
    indent: ['error', 2, { // 强制使用一致的缩进
      SwitchCase: 1
    }],
    'key-spacing': 'off', // 强制在对象字面量的属性中键和值之间使用一致的间距
    'keyword-spacing': ['off', { // 强制在关键字前后使用一致的空格
      overrides: {
        case: {
          after: true
        },
        return: {
          after: true
        },
        throw: {
          after: true
        }
      }
    }],
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'max-depth': 'off', // 强制可嵌套的块的最大深度
    'max-nested-callbacks': 'off',
    'max-params': ['error', 4],
    'new-cap': 'off',
    'new-parens': 'error', // 要求调用无参构造函数时有圆括号
    'newline-after-var': 'off',
    'no-alert': 'error', // 禁用 alert、confirm 和 prompt
    'no-array-constructor': 'error', // 禁止使用 Array 构造函数
    'no-bitwise': 'error', // 禁用按位运算符
    'no-caller': 'error', // 禁用 arguments.caller 或 arguments.callee
    'no-catch-shadow': 'off',
    'no-class-assign': 'error', // 禁止修改类声明的变量
    'no-cond-assign': ['error', 'always'], // 禁止条件表达式中出现赋值操作符
    'no-confusing-arrow': 'error', // 不允许箭头功能，在那里他们可以混淆的比较
    "no-console": 0,
    'no-const-assign': 'error', // 禁止修改 const 声明的变量
    'no-constant-condition': 'error', // 禁止在条件中使用常量表达式
    'no-div-regex': 'error', // 禁止除法操作符显式的出现在正则表达式开始的位置
    'no-dupe-class-members': 'error', // 禁止类成员中出现重复的名称
    'no-duplicate-imports': 'error', // disallow duplicate module imports
    'no-else-return': 'error', // 禁止 if 语句中有 return 之后有 else
    'no-empty-label': 'off',
    'no-empty': 'off',
    'no-eq-null': 'error', // 禁止在没有类型检查操作符的情况下与 null 进行比较
    'no-eval': 'error', // 禁用 eval()
    'no-extend-native': 'error', // 禁止扩展原生类型
    'no-extra-bind': 'error', // 禁止不必要的 .bind() 调用
    'no-extra-parens': 'off', // 禁止不必要的括号
    'no-floating-decimal': 'error', // 禁止数字字面量中使用前导和末尾小数点
    'no-implied-eval': 'error', // 禁止使用类似 eval() 的方法
    'no-inline-comments': 'off', // 禁止在代码行后使用内联注释
    'no-iterator': 'error', // 禁用 __iterator__ 属性
    'no-label-var': 'off',
    'no-labels': 'off',
    'no-lone-blocks': 'error', // 禁用不必要的嵌套块
    'no-lonely-if': 'off',
    'no-loop-func': 'error', // 禁止在循环中出现 function 声明和表达式
    'no-mixed-requires': 'error', // 禁止混合常规 var 声明和 require 调用
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-spaces': 'off',
    'no-multi-str': 'off',
    'no-native-reassign': 'error', // 禁止对原生对象赋值
    'no-nested-ternary': 'error', // 不允许使用嵌套的三元表达式
    'no-new-func': 'error', // 禁止对 Function 对象使用 new 操作符
    'no-new-object': 'error', // 禁止使用 Object 的构造函数
    'no-new-require': 'error', // 禁止调用 require 时使用 new 操作符
    'no-new-wrappers': 'error', // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new': 'error', // 禁止在非赋值或条件语句中使用 new 操作符
    'no-octal-escape': 'error', // 禁止在字符串中使用八进制转义序列
    'no-path-concat': 'error', // 禁止对 __dirname 和 __filename进行字符串连接
    'no-process-env': 'error', // 禁用 process.env
    'no-process-exit': 'error', // 禁用 process.exit()
    'no-proto': 'error', // 禁用 __proto__ 属性
    'no-restricted-modules': 'error', // 禁用指定的通过 require 加载的模块
    'no-return-assign': 'error', // 禁止在 return 语句中使用赋值语句
    'no-script-url': 'error', // 禁止使用 javascript: url
    'no-self-compare': 'error', // 禁止自身比较
    'no-sequences': 'error', // 禁用逗号操作符
    'no-shadow-restricted-names': 'error', // 禁止覆盖受限制的标识符
    'no-shadow': 'off',
    'no-spaced-func': 'off',
    'no-sync': 'off', // 禁用同步方法
    'no-this-before-super': 'error', // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 'error', // 禁止抛出非异常字面量
    'no-trailing-spaces': 'warn', // 禁用行尾空格
    'no-undef-init': 'error', // 禁止将变量初始化为 undefined
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'error', // 禁止出现令人困惑的多行表达式
    'no-unneeded-ternary': 'error', // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unused-expressions': 'off', // 禁止出现未使用过的表达式
    "no-unused-vars": [1, { // 禁止出现未使用过的变量
      "vars": "all",
      "args": "after-used"
    }],
    'no-use-before-define': 'off', // 不允许在变量定义之前使用它们
    'no-useless-call': 'error', // 禁止不必要的 .call() 和 .apply()
    'no-useless-concat': 'error', // 禁止不必要的字符串字面量或模板字面量的连接
    'no-var': 'off',
    'no-void': 'error', // 禁用 void 操作符
    'no-warning-comments': 'off',
    'no-with': 'off',
    'object-curly-spacing': 'off',
    'object-shorthand': 'error', // 要求或禁止对象字面量中方法和属性使用简写语法
    'one-var': 'off',
    'operator-assignment': 'error', // 要求或禁止在可能的情况下要求使用简化的赋值操作符
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off', // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-spread': 'error', // 要求使用扩展运算符而非 .apply()
    'prefer-template': 'off', // 要求使用模板字面量而非字符串连接
    quotes: 'off',
    'quote-props': 'off',
    radix: 'error', // 强制在parseInt()使用基数参数
    'require-yield': 'error', // 要求generator 函数内有 yield
    "semi": ["error", "always"], // 要求或禁止使用分号
    'semi-spacing': 'off',
    'sort-vars': 'error', // 要求同一个声明块中的变量按顺序排列
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'space-infix-ops': 'off',
    'space-unary-ops': 'off',
    'spaced-comment': 'off',
    'sort-imports': ['off', { // 强制模块内的 import 排序
      'ignoreCase': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'single', 'multiple']
    }],
    strict: 'off',
    'valid-jsdoc': 'error', // 强制使用有效的 JSDoc 注释
    'vars-on-top': 'off',
    yoda: 'off',
    'wrap-iife': 'off',
    'wrap-regex': 'error' // 要求正则表达式被括号括起来
  }
}
