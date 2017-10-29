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
        
