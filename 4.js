    // 2.codePointAt()
        let s = "𠮷a";
        s.codePointAt(0)
        s.codePointAt(1)
        s.codePointAt(2)

        // 转换为十六进制的值
        let s = "𠮷a";
        s.codePointAt(0).toString(16)
        s.codePointAt(2).toString(16)

        // 用 for...of 循环来解决位置序号的问题
        let s = "𠮷a";
        for (let ch of s) {
            console.log(ch.codePointAt(0).toString(16));
        }


        // codePointAt 测试字符为两字节还是四字节
        function is32Bit(c)
        {
            return  c.codePointAt(0) > 0xFFFF;
        }

        is32Bit("𠮷");
        is32Bit("a");

    // 3.String.fromCodePoint()
        // ES5
        String.fromCharCharCode(0x20BB7);
        // 会被识别为 0x0BB7

        // ES6
        String.fromCodePoint(0x20BB7);
        // 多参数会被合并为一个字符串
        String.fromCodePoint(0x78, 0x1f680, 0x79) === "x\uD83D\uDE80y"

    // 4.字符串遍历接口
        // 可识别大于 0xFFFF 码点
        for (let codePoint of "foo")
        {
            console.log(codePoint);
        }

        // 传统的遍历器
        let text = String.fromCodePoint(0x20BB7);

        for (let i = 0; i < text.length; i++) {
            console.log(text[i]);
        }

        for (let i of text)
        {
            console.log(i);
        }

    // 5. at() 提案
        // ES5
        'abc'.charAt(0)     // "a"
        '𠮷'.charAt(0)      // "�"

        // 提案
        'abc'.at(0)     // "a"
        '𠮷'.at(0)      // "𠮷"

    // 6.normalize()
        // 用于欧洲字符上标的合并
        // 称为 Unicode 正规化

    // 7.includes() startsWith() endsWith()
        // indexOf 方法的补充
        let s = 'Hello world!';
        console.log(s.indexOf('llo'));      // 2
        console.log(s.startsWith('Hello')); // true
        console.log(s.endsWith('!'));       // true
        console.log(s.includes('o'));       // true

        // 接受第二个参数
        console.log(s.startsWith('world', 6));  // true     world! 表示从位置6开始搜索
        console.log(s.endsWith('Hello', 5));    // true     Hello 表示前5个字符
        console.log(s.includes('Hello', 6));    // false    world!

    // 8.repeat()
        'x'.repeat(3)   // "xxx"
        'na'.repeat(2.9) // "nana" 取整
        'na'.repeat(Infinity)   // 报错
        'na'.repeat(-1)         // 报错
        'na'.repeat(-0.9)       // "" 取整视为0
        'na'.repeat(NaN)        // "" 视为0
        'na'.repeat('na')       // "" 字符串转换为数字0
        'na'.repeat('3')        // "nanana" 字符串转换为3

    // 9.padStart() padEnd()
        // 字符串补全
        'x',padStart(5, 'ab')       // "ababx"
        'x'.padStart(s, 'ab')       // "abax"

        'x'.padEnd(5, 'ab')         // "xabab"
        'x'.padEnd(4, 'ab')         // "xaba"

        'xxx'.padStart(2, 'ab')     // "xxx"
        'xxx'.padEnd(2. 'ab')       // "xxx"

        'x'.padStart(4)             // "   x"
        'x'.padEnd(4)               // "x   "

        // 常用于数值补全位数
        '1'.padStart(10, '0')       // "0000000001"

        // 提示字符串格式
        '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"

    // 10.模板字符串
        // 创痛输出模板
        $('#result').append(
            'There are <b>' + basket.count + '</b>' +
            'items in your basket, ' +
            '<em>' + basket.onSale +
            '</em> are on sale!'
        );

        // ES6
        $('#result').append(`
            There are <b>${basket.count}</b> items
            in your basket, <em>${basket.onSale}</em>
            are on sale!
        `);

        // 普通字符串
        `In JavaScript '/n' is a line-feed.`

        // 多行字符串
        `In JavaScript this is
         not legel.`

        console.log(`string text line 1
        string text line 2`);   // 空格会被显示出来

        // 字符串中嵌入变量
        let name = "bob",
            time = "today";
            `Hello ${name}, how are you ${time}?`

        // 反斜杠转义
        let greeting = `\`Yo\` World!`;

        // 空格和换行将全部被保留，可用 trim() 方法消除最前面的换行
        $('#list').html(`
        <ul>
          <li>first</li>
          <li>second</li>
        </ul>
        `.trim());

        function authorize(user, action)
        {
            if (!user.hasPrivilege(action)) {
                throw new Error(
                    `User ${user.name} is not authorized to do ${action}.`
                );
            }
        }

        
