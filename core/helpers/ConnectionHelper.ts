import server from "../../../app/common/config/server";

export default class ConnectionHelper {

    static first() {
        let connectionEntity = server.connections[0];
        return connectionEntity;
    }

    static all() {
        return server.connections;
    }
}
