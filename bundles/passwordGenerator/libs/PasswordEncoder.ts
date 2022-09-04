import HashHelper from "../../../ext/hash/helpers/HashHelper";
import basex from 'base-x';
import AlphabetEnum from "../../../ext/baseX/enums/AlphabetEnum";

export default class PasswordEncoder {

    protected alphabet = AlphabetEnum.BASE_58 + "!#$%&()*+-./:<=>?@[\\]_{}";

    constructor(alphabet = null) {
        if (alphabet) {
            this.alphabet = alphabet;
        }
    }

    generate(scope) {
        let hash = HashHelper.sha256(scope);
        let baseX = basex(this.alphabet);
        let out = baseX.encode(hash);
        return out.substr(2);
    }
}
