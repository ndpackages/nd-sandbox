import HashHelper from "../../../crypto/encode/domain/helpers/HashHelper";
import basex from 'base-x';
import AlphabetEnum from "../../core/enums/AlphabetEnum";

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
