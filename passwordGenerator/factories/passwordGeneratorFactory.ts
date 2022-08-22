import PasswordGenerator from "../libs/PasswordGenerator";
import ChainHashV2 from "../../../crypto/encode/domain/libs/chainHash/ChainHashV2";
import HashAlgorithmEnum from "../../../crypto/encode/domain/enums/HashAlgorithmEnum";
import PasswordStrengthEnum from "../enums/PasswordStrengthEnum";
import PasswordEncoder from "../libs/PasswordEncoder";
import Pbkdf2ChainHash from "../../../crypto/encode/domain/libs/chainHash/Pbkdf2ChainHash";
import HashHelper from "../../../crypto/encode/domain/helpers/HashHelper";

class PasswordGeneratorFactory {

    createInstance(masterKey, passwordLength, cost, hashAlgorithm) {
        let passwordEncoder = new PasswordEncoder();
        let hasher = new ChainHashV2(cost, hashAlgorithm);
        let passwordGenerator = new PasswordGenerator(hasher, passwordEncoder);
        passwordGenerator.masterKey = masterKey;
        passwordGenerator.passwordLength = passwordLength;
        passwordGenerator.passwordStrength = PasswordStrengthEnum.STRONG;
        return passwordGenerator;
    }

    createInstanceV1(masterKey, passwordLength) {
        return this.createInstance18kSha256(masterKey, passwordLength);
    }

    createInstance18kSha256(masterKey, passwordLength) {
        return this.createInstance(masterKey, passwordLength, 18000, HashAlgorithmEnum.SHA256);
    }

    createInstance18kPbkdf2(masterKey, passwordLength) {
        let cost = 18000;
        let passwordEncoder = new PasswordEncoder();
        let hasher = new Pbkdf2ChainHash(cost);
        hasher.salt = HashHelper.sha256('passwordGenerator');
        let passwordGenerator = new PasswordGenerator(hasher, passwordEncoder);
        passwordGenerator.masterKey = masterKey;
        passwordGenerator.passwordLength = passwordLength;
        passwordGenerator.passwordStrength = PasswordStrengthEnum.STRONG;
        return passwordGenerator;
    }
}

export default new PasswordGeneratorFactory();
