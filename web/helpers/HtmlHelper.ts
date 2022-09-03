import Base64Helper from "../../../bundlesExt/baseX/helpers/Base64Helper";

export default class HtmlHelper {

    static encodeDataForSrc(mimeType: string, content) {
        return 'data:' + mimeType + ';base64,' + Base64Helper.encode(content);
    }
}
