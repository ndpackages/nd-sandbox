export default class StringHelper {

    static align(value, length: number) {
        value = value.toString();
        if (value.length < length) {
            value = '0' + value;
        }
        return value;
    }
}
