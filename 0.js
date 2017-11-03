
    // 4.10
        // 写法二
        let  str = '(name) => `Hello ${name}!`';
        let func = eval.call(null, str);
        func('Jack')
