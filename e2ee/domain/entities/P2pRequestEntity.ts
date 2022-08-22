import TimeHelper from "../../../core/helpers/TimeHelper";
import HashHelper from "../../../../crypto/encode/domain/helpers/HashHelper";
import * as crypto from "crypto";
import ConvHelper from "../../../core/helpers/encoders/ConvHelper";
import BaseXHelper from "../../../core/helpers/encoders/BaseXHelper";

export default class P2pRequestEntity {

    id;
    address: string;
    method: string;
    params;
    timestamp: number;

    constructor(method: string = null, params = null) {
        if(method) {
            this.method = method;
        }
        if (params) {
            this.params = params;
        }
        this.timestamp = TimeHelper.timestamp();
        this.id = this.timestamp.toString() + '-' + BaseXHelper.toBase58(crypto.randomBytes(16)).slice();
    }
}
