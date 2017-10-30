// 3.变量的解构赋值
    // 1.数组的解构赋值
        // ES5
        let a = 1;
        let b = 2;
        let c = 3;

        // ES6
        let [a, b, c] = [1, 2, 3];

        let [foo, [[bar], baz]] = [1, [[2], 3]];
        foo
        bar
        baz

        let[ , , third] = ["foo", "bar", "baz"];
        third

        let [x, , y] = [1, 2, 3];
        x
        y

        let [head, ...tail] = [1, 2, 3, 4];
        head    // 1
        tail    // [2, 3, 4]

        let [x, y, ...z] = ['a'];
        x   // "a"
        y   // undefined
        z   // []

        // 解构不成功，变量的值会变为 undefined
        let [foo] = [];
        let [bar, foo] = [1];

        // 不完全解构
        let [x, y] = [1, 2, 3];
        let [a, [b], d] = [1, [2, 3], 4];

        // 等号右边不是可遍历结构将会报错
        let [foo] = 1;
        let [foo] = false;
        let [foo] = NaN;
        let [foo] = undefined;
        let [foo] = null;
        let [foo] = {}; //TypeError: {} is not iterable 不可迭代

        // set 结构
        let [x, y, z] = new set(['a', 'b', 'c']);
        x // "a"

        // 解构只需拥有 Iterator 接口
        function* fibs(){
            let a = 0;
            let b = 1;
            while (true) {
                yield a;
                [a, b] = [b, a + b];
            }
        }

        let [first, second, third, fourth, fifth, sixth] = fibs();
        sixth

        // 默认值
        let [foo = true] = [];
        foo // true

        let [x, y = 'b'] = ['a'];
        let [x, y = 'b'] = ['a', undefined];

        // 需要严格等于 undefined 才能取默认值
        let [x = 1] = [undefined];
        // x 1
        let [x = 1] = [null];
        // x null

        // 如果默认值是一个表达式，则为惰性求值
        function f(){console.log('aaa');}
        let [x = f()] = [1];

        // 上述代码等价于下述代码
        let x;
        if ([1][0] === undefined)
        {
            x = f();
        }
        else
        {
            x = [1][0];
        }

        // 默认值可以解构赋值其他变量， 但该变量必须先声明
        let [x = 1, y = x] = [];
        let [x = 1, y = x] = [2];
        let [x = 1, y = x] = [1, 2];
        let [x = y, y = 1] = [];    // ReferenceError

    // 2.对象的解构赋值
        // 对象没有次序，变量需要和属性同名才能取值；
        let {foo, bar} = {foo: "aaa", bar: "bbb"};
        // foo
        // bar

        let{baz} = {foo: "aaa", bar:"bbb"};
        // baz undefined

        // 变量名与属性名不一致
        let {foo: baz} = {foo: 'aaa', bar:'bbb'};
        // baz "aaa"

        let obj = {first: 'hello', last: 'world'};
        let {first: f, last: l} = obj;

        // 本质为找到同名属性对对应的变量赋值

        // 嵌套结构
        let obj = {p: ['Hello',{y: 'World']};
        let {p:[x, {y}]} = obj;

        // 如果需要 p 也赋值
        let obj = {p: ['Hello', {y: 'World'}]};
        let {p, p: ['Hello', {y: 'World'}]};

        // 另一个嵌套的例子
        const node = {loc: {start: {line: 1, column: 5}}};
        let {loc, loc: {start}, loc: {start: {line}}} = node;
        line    // 1 变量
        loc     // {start: {…}} 模式
        start   // {line: 1, column: 5} 模式

        // 嵌套赋值
        let obj = {};
        let arr = [];
        ({foo: obj.prop, bar: arr[0]} = {foo: 123, bar: true});
        obj // {prop: 123}
        arr // [true]

        // 对象解构的默认值
        var {x = 3} = {};

        var {x, y = 5} = {x: 1};

        var {x: y = 3} = {};

        var {x: y = 3} = {x: 5};

        var {message: msg = 'Something went wrong'} = {};

        // 默认值生效的条件是对象的属性值用那个等于 undefined
        var {x = 3} = {x: undefined};

        var {x = 3} = {x: null};

        // 解构失败，变量值为 undefined
        let {foo} = {bar: 'baz'};

        // 报错
        let {foo: {bar}} = {baz: 'baz'};
        // 相当于下述代码
        let _tmp = {baz: 'baz'};
        _tmp.foo.bar

        // 已声明的变量用于解构赋值，则要小心格式
        // 错误的写法
        let x;
        {x} = {x: 1};   // 解析器将其{x}解析为代码块

        // 正确的写法
        let x;
        ({x} = {x: 1}); // 不将大括号放在行首可以解决这个问题。

        // 毫无意义但可以执行的赋值表达式
        ({} = [true, false]);
        ({} = 'abc');
        ({} = []);

        // 很方便将现有对象的方法赋值到某个变量上
        let {log, sin, cos} = Math;
        // Math {abs: ƒ, acos: ƒ, acosh: ƒ, asin: ƒ, asinh: ƒ, …}

        // 可对数组进行对象属性的结构
        let arr = [1, 2, 3];
        let {0: first, [arr.length - 1]: last} = arr;

    // 3.字符串的解构赋值
        // 字符串会被转换成类似于数组的对象
        const [a, b, c, d, e] = 'hello';

        // length 属性解构赋值
        let {length: len} = 'hello';

    // 4.数值和布尔值的结构赋值
        // 等号右边是数值和布尔值则会先转为对象
        let {toString: s} = 123;
        s === Number.prototype.toString;

        let {toString: s} = true;
        s === Boolean.prototype.toString;

    // 5.函数参数的结构赋值
        function add([x, y])
        {
            return x + y;
        }
        add([1, 2]);    // 数组传入参数的那一瞬间就被结构赋值给变量 x y

        // 另一个例子
        [[1, 2], [3, 4]].map(([a, b]) => a + b);

        // 默认值
        function move({x = 0, y = 0} = {})
        {
            return [x, y];
        }
        move({x: 3, y: 8})

        // 默认值错误的写法
        function move({x, y} = {x: 0, y: 0})    // 为参数指定默认值而不是为变量指定默认值
        {
            return [x, y];
        }

        move({x: 3, y: 8});
        move({x: 3});
        move({});
        move();

        // undefined 触发函数参数的默认值
        [1, undefined, 3].map((x = 'yes') => x);
        // [1, 'yes', 3]

    // 6.圆括号问题
        // 尽量别往模式中放圆括号
        // (1)变量声明语句，下述全部报错
        let [(a)] = [1];

        let {x: (c)} = {};
        let ({x: c}) = {};
        let {(x: c)} = {};

        let {o: ({p: p})} = {o: {p: 2}};

        // (2)函数参数也属于变量声明，因此不能带有圆括号
        function f([(z)]){return z;}
        function f([z,(x)]){return x;}

        // (3)赋值语句的模式
        ({p: a}) = {p; 42};
        ([a]) = [5];
        [({p: a}), {x: c}] = [{}, {}];

        // 可以放圆括号的情况
        // 赋值语句的非模式部分
        [(b)] = [3];
        ({p: (d)} = {});
        [(parseInt.prop)] = [3];

    // 7.用途
        // (1)变换变量的值
        let x = 1;
        let y = 2;
        [x, y] = [y, x];

        // (2)从函数返回多个值
        // 返回一个数组
        function example()
        {
            return [1, 2, 3];
        }
        let [a, b, c] = example();

        // 返回一个对象
        function example()
        {
            return {
                foo: 1,
                bar: 2
            };
        }
        let {foo, bar} = example();

        // (3)函数参数的定义
        // 可以将一组参数与变量名对应起来
        // 参数有次序
        function f([x, y, z]) {...}
        f([1, 2, 3]);

        // 参数无次序
        function f({x, y, z}) {...};
        f({z: 3, y: 2, x: 1});

        // (4)提取 JSON 数据
        let jsonData = {
            id: 42,
            status: "OK",
            data: [867, 5309]
        }
        let {id, status, data: number} = jsonData;
        console.log(id, status,number);

        // (5)函数的默认值
        jQuery.ajax = function(url, {
            async = true,
            beforeSend = function(){},
            cache = true,
            complete = function(){},
            crossDomain = false,
            global = true,
            // more config
        }){
            // do stuff
        };

        // (6)遍历 Map 结构
        const map = new Map();
        map.set('frist', 'hello');
        map.set('second', 'world');
        for (let [key, value] of map)
        {
            console.log(key + " is " + value);
        }
        // 值获取键名或者键值
        for (let [key] of map)
        {

        }

        for (let [,value] of map)
        {

        }

        // (7)输入模块的制定方法
        const {SourceMapConsumer, SourceNode} = require("source-map");
