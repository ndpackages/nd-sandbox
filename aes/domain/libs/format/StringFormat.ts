import AesDataEntity from "../../entities/AesDataEntity";
import HexHelper from "../../../../core/helpers/encoders/HexHelper";
import ConvHelper from "../../../../core/helpers/encoders/ConvHelper";
import Base64Helper from "../../../../core/helpers/encoders/Base64Helper";
import JsonBinaryEncoder from "../../../../encoders/domain/libs/JsonBinaryEncoder";
import BaseXHelper from "../../../../core/helpers/encoders/BaseXHelper";

export default class StringFormat {

    stringify(aesDataEntity: AesDataEntity) {
        let o = {
            cipher: (aesDataEntity['encrypted']),
            iv: (aesDataEntity['iv']),
            // salt: ConvHelper.toBase64(aesDataEntity['encrypted']['salt']),
            mac: (aesDataEntity['mac']),
        };



        let encoder = new JsonBinaryEncoder();
        let json = encoder.encode(o);
        // console.log(aesDataEntity)
        // console.log(json)

        // let json = JSON.stringify(o);
        return BaseXHelper.toBase64(json);
    }

    parse(str): AesDataEntity {
        let aesDataEntity = new AesDataEntity();
        let json = Base64Helper.decode(str);

        // console.log(json)

        let encoder = new JsonBinaryEncoder();
        let data = encoder.decode(json);

        // console.log(data)


        // let data = JSON.parse(json);

        aesDataEntity.encrypted = (data['cipher']);
        aesDataEntity.iv = (data['iv']);
        aesDataEntity.mac = (data.mac);

        // console.log(aesDataEntity)

        return aesDataEntity;
    }
}
