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

        
