import TimeHelper from "../../../../ext/time/helpers/TimeHelper";
import * as crypto from "crypto";
import Base58Encoder from "../../../../ext/baseX/libs/encoders/Base58Encoder";

export default class P2pRequestEntity {

    id;
    address: string;
    method: string;
    params;
    timestamp: number;

    constructor(method: string = null, params = null) {
        if (method) {
            this.method = method;
        }
        if (params) {
            this.params = params;
        }
        this.timestamp = TimeHelper.timestamp();

        let randomBytes = crypto.randomBytes(16);
        let base58Encoder = new Base58Encoder();
        let randomBytesBase58 = base58Encoder.encode(randomBytes);
        this.id = this.timestamp.toString() + '-' + randomBytesBase58.slice();
    }
}
