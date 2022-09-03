import AesDataEntity from "../../entities/AesDataEntity";
import JsonBinaryEncoder from "../../../../../ext/jsonBinary/libs/encoders/JsonBinaryEncoder";
import Base64Encoder from "../../../../../ext/baseX/libs/encoders/Base64Encoder";

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

        let baseXEncoder = new Base64Encoder();
        return baseXEncoder.encode(json);

        // return BaseXHelper.toBase64(json);
    }

    parse(str): AesDataEntity {
        let aesDataEntity = new AesDataEntity();
        let baseXEncoder = new Base64Encoder();
        let json = baseXEncoder.decode(str);
        // let json = Base64Helper.decode(str);

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
