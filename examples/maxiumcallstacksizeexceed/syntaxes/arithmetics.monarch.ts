// Monarch syntax highlighting for the arithmetics language.
export default {
    keywords: [
        'any','any_array','array','bool','byte','date','date_and_time','dint','dword','end_struct','false','function','int','lint','lreal','lword','of','real','sint','string','struct','time','time_of_day','true','typed','udint','uint','ulint','usint','word','wstring'
    ],
    operators: [
        '!','%','*','**','+',',','-','.','..','/',':',':=',';','^'
    ],
    symbols: /!|%|\(|\)|\*|\*\*|\+|,|-|\.|\.\.|\/|:|:=|;|\[|\]|\^/,

    tokenizer: {
        initial: [
            { regex: /('(((((((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T))|\$')|")|(\$([0-9a-fA-F])([0-9a-fA-F]))))*')/, action: {"token":"S_Byte_Char_Str"} },
            { regex: /("(((((((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T))|')|\$")|(\$([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F]))))*")/, action: {"token":"D_Byte_Char_Str"} },
            { regex: /[0-9a-fA-F]/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"Hex_Digit"} }} },
            { regex: /(2#(_?([0-1]))+)/, action: {"token":"Binary_Int"} },
            { regex: /[0-1]/, action: {"token":"Bit"} },
            { regex: /[_a-zA-Z][\w_]*/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"ID"} }} },
            { regex: /[0-9]+(\.[0-9]*)?/, action: {"token":"number"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /((((((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T))|\$')|")|(\$([0-9a-fA-F])([0-9a-fA-F])))/, action: {"token":"white"} },
            { regex: /((((((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T))|')|\$")|(\$([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])))/, action: {"token":"white"} },
            { regex: /((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T)/, action: {"token":"white"} },
            { regex: /\s+/, action: {"token":"white"} },
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /\/\/[^\n\r]*/, action: {"token":"comment"} },
        ],
        comment: [
            { regex: /[^/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*]/, action: {"token":"comment"} },
        ],
    }
};
