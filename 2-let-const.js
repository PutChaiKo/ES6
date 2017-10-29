// 2.let 和 const 命令
    // 1.let
        {
            let a = 10;
            console.log(a);
            var b = 1;
        }
        console.log(b);
        console.log(a);

        for (let i = 0; i < 10; i++) {
            //
        }

        var a = [];
        for (var i = 0; i < 10; i++) {
            a[i] = function(){
                console.log(i);
            };
        }
        a[6]();

        var a = [];
        for (let i = 0; i < 10; i++) {
            a[i] = function() {
                console.log(i);
            }
        }
        a[6]();

        for(let i = 0; i < 3; i++)
        {
            let i = "abc";
            console.log(i);
        }

        // 变量提升限制
        console.log(foo);
        var foo = 2;

        console.log(bar);
        let bar = 2;

        // temporal dead zone
        var tmp = 123;

        if (true)
        {
            tmp = "abc";
            let tmp;
        }

        // typeof in TDZ
        typeof x;   // ReferenceError
        let x;

        typeof undefined_variable;   // "undefined"

        // 隐蔽的 TDZ
        function bar(x = y, y = 2)  // 此处 y 未声明
        {
            return [x, y];
        }

        bar();

        function bar(x = 2, y = x)
        {
            return [x, y];
        }
        bar();

        // 不允许重复声明
        // 以下报错
        function func()
        {
            let a = 10;
            var a = 1;
        }

        function func()
        {
            let a = 10;
            let a = 1;
        }

        function func(arg)
        {
            let arg;
        }

        // 不报错
        function func(arg)
        {
            {
                let arg;    // 不报错
            }
        }

    // 2.块级作用域
        var tmp = new Date();

        function f()
        {
            console.log(tmp);   // 这里的 tmp 被覆盖了
            if (false)
            {
                var tmp = 'hello world';    // 就算没运行也会覆盖
            }
        }
        f();

        // i 泄漏
        var s = 'hello';
        for(var i = 0; i < s.length; i++)
        {
            console.log(s[i]);
        }
        console.log(i);

        // ES6 块级作用域
        function f1()
        {
            let n = 5;
            if (true)
            {
                let n = 10;
            }
            console.log(n); //5
        }

        // 块级作用域与函数声明
        // 下列两种定义函数的方法 ES5 规定是非法的，但实际能运行
        if (true)
        {
            function f(){}
        }

        try {
            function f(){}
        } catch (e) {
            //
        }

        // ES6 允许在作用域之中声明函数，但在作用域之外不能引用
        function f(){console.log('I am outside')}
        (function()
        {
            if (false)
            {
                // 重复声明函数 f
                function f(){console.log('I am inside!');}
            }
            f();
        }());

        // 上述代码在 ES5 环境下相对于
        function f() {console.log('I am outside!');}
        (function()
        {
            function f(){console.log('I am inside!')}
            if (false){

            }
            f();
        }());

        // 上述代码在符合 ES6 的浏览器中相对于
        function f() {console.log('I am outside!');}

        (function(){
            var f = undefined;
            if (false) {
                function f() {console.log('I am inside!');}
            }
            f();
        }());

        // 避免作用域内声明函数，或应写成函数表达式形式
        // 函数声明
        {
            let a ='secret';
            function f(){return a;}
        }
        // 函数表达式
        {
            let a = 'secret';
            let f = function(){return a;};
        }

        // do 表达式
        {
            let t = f();
            t = t * t + 1;
        }
        // 外块级作用域之外不能访问到 t 的值

        let x = do {
            let t = f();
            t * t + 1;
        };
        // 变量 x 会得到整个块级作用域的返回值 (t * t + 1)
        // chrome 尚未支持

    // 3.const 命令
        // 声明一个只读的常量
        const PI = 3.1415;
        PI
        PI = 3;
        // TypeError: Assignment to constant variable.

        const foo;  // 声明后必须初始化赋值
        // SyntaxError: Missing initializer in const declaration

        // 与 let 类似只在，只在声明所在的的块级作用域内有效
        if (true)
        {
            const MAX = 5;
        }
        MAX // Uncaught ReferenceError: MAX is not defined

        // 同样也不提升
        if (true)
        {
            console.log(MAX);   // VM4130:3 Uncaught ReferenceError: MAX is not defined
            const MAX = 5;
        }

        // 同样不可重复声明
        var message = "Hello!";
        let age = 25;
        // 下两行报错
        const message = "Goodbye!";
        const age = 30;

        // const 本质为指针不变，并不是不能改动
        const foo = {};

        // 添加属性
        foo.prop = 123;
        foo.prop;

        // 指向另一个对象，报错
        foo = {};   // TypeError: Assignment to constant variable.

        // 例子，常量是数组
        const a = [];
        a.push('Hello');    // 添加
        a.length = 0;       // 删除
        a = ['Dave'];   // 报错

        // 不想让对象修改应该使用冻结方法
        const foo = Object.freeze({});
        // 常规模式下行不起作用，严格模式报错。
        foo.prop = 123; // 无法添加新属性

        // 彻底冻结一个对象的函数
        var constantize = (obj) => {
            Object.freeze(obj);
            Object.key(obj).forEach( (key, i) => {
                if (typeof obj[key] === 'object') {
                    constantize(obj[key]);
                }
            });
        };

        // 声明变量的6种方法
        // ES5 var function
        // ES6 let const import class

        // 4.顶层对象的属性
        // ES5中
        window.a = 1;
        a // 1

        a = 2;
        window.a // 2

        // ES6
        var a = 1;
        window.a    // 1

        let b = 1;
        window.b    // undefined

        // 获取顶层顶层对象并不容易
