
export default class AlphabetEnum {

    static readonly WHITESPACE = " \t\n\r\u000B\u0085\u00A0\u2000\u2001\u2002\u2004\u2005\u2006\u2007\u2008\u2009\u200A"; // Funny: only whitespace...
    static readonly SPEC_CHAR =   "!#$%&()*+,./:,<=>?@[]^_`{|}~\"";
    static readonly PUNCTUATION = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; //'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    static readonly NUMERIC = "0123456789";
    static readonly ALPHA_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static readonly ALPHA_LOWER = "abcdefghijklmnopqrstuvwxyz";

    static readonly BASE_2 = "01";
    static readonly BASE_10 = "0123456789";
    static readonly BASE_32_HEX = "0123456789ABCDEFGHIJKLMNOPQRSTUV";
    static readonly BASE_32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    static readonly BASE_36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static readonly BASE_52 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static readonly BASE_58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    static readonly BASE_62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static readonly BASE_64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    static readonly BASE_85 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-,<=>?@^_`{|}~";
    static readonly Z_85 =    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
    static readonly BASE_91 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"";
    static readonly BASE_94 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"-\\'";

    // static readonly ascii_letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // static readonly ascii_lowercase = 'abcdefghijklmnopqrstuvwxyz';
    // static readonly ascii_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // static readonly digits = '0123456789';
    // static readonly hexdigits = '0123456789abcdefABCDEF';
    // static readonly octdigits = '01234567';
    // static readonly printable = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c';
    // static readonly punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    // static readonly whitespace = ' \t\n\r\x0b\x0c';

 // BASE_94 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
 //    BASE_93 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+./:;<=>?@[]^_`{|}~\"-\\'";
    BASE_98 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"-\\' \t\n\r";
// todo: удалить лишние запятые

    static readonly PRINTABLE = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\x0b\x0c';

}

// https://github.com/cryptocoinjs/base-x/blob/master/README.md
