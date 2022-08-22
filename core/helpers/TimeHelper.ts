export default class TimeHelper {

    static timestamp() {
        return new Date().getTime() / 1000;
    }
}
