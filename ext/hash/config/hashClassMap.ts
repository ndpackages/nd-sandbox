import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";
import Sha1Hasher from "../libs/encoders/hash/Sha1Hasher";
import Sha224Hasher from "../libs/encoders/hash/Sha224Hasher";
import Sha256Hasher from "../libs/encoders/hash/Sha256Hasher";
import Sha512Hasher from "../libs/encoders/hash/Sha512Hasher";
import Sha384Hasher from "../libs/encoders/hash/Sha384Hasher";
import Sha3Hasher from "../libs/encoders/hash/Sha3Hasher";
import Ripemd160Hasher from "../libs/encoders/hash/Ripemd160Hasher";
import Md5Hasher from "../libs/encoders/hash/Md5Hasher";

let hashClassMap = {};
hashClassMap[HashAlgorithmEnum.SHA1] = Sha1Hasher;
hashClassMap[HashAlgorithmEnum.SHA224] = Sha224Hasher;
hashClassMap[HashAlgorithmEnum.SHA256] = Sha256Hasher;
hashClassMap[HashAlgorithmEnum.SHA512] = Sha512Hasher;
hashClassMap[HashAlgorithmEnum.SHA384] = Sha384Hasher;
hashClassMap[HashAlgorithmEnum.SHA3] = Sha3Hasher;
hashClassMap[HashAlgorithmEnum.RIPEMD160] = Ripemd160Hasher;
hashClassMap[HashAlgorithmEnum.MD5] = Md5Hasher;

export default hashClassMap;
