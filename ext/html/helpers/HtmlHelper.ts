import Base64Encoder from "../../baseX/libs/encoders/Base64Encoder";

export default class HtmlHelper {

    static encodeDataForSrc(mimeType: string, content) {
        let baseXEncoder = new Base64Encoder();
        let base64Content = baseXEncoder.encode(content);
        return 'data:' + mimeType + ';base64,' + base64Content;
    }
}
