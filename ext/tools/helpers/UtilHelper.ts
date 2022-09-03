
export default class UtilHelper {

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
