import axios from "axios";

export default class TransportRepository {

    protected rpcUrl = null;

    send(body) {
        let options = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let axiosPromise = axios.post(this.rpcUrl, body, options);
        return axiosPromise
            .then(function (response) {
                if (response.headers['content-type'] === 'application/json') {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        throw new Error("Transport error. Parse error.");
                    }
                } else {
                    throw new Error("Transport error. Content type invalid.");
                }
            })
            .catch(function () {
                throw new Error("Transport error.");
            });
    }
}