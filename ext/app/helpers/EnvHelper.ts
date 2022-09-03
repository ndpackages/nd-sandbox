export default class EnvHelper {

    static isDev() {
        // return process.envNODE_ENV === "development";
        return window.location.port === '3000';
    }
}
