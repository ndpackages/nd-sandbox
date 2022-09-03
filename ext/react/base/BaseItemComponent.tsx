import BaseCrudComponent from "./BaseCrudComponent";
import Query from "../../../core/domain/libs/Query";
import {t} from "i18next";
import {toast} from "react-toastify";
import {Facebook} from "react-content-loader";

export default class BaseItemComponent extends BaseCrudComponent {

    protected listRoute = null;

    state = {
        entity: null,
    };

    getLoader() {
        return Facebook;
    }

    getItemId() {
        return this.props["match"].params.id;
    }

    getEntity() {
        return this.state["entity"];
    }

    forgeQuery(): Query {
        return new Query();
    }

    async handleDelete(entity) {
        try {
            await this.service.deleteById(entity.id);
            let messageText = t('language.message.deleteSuccess');
            toast.success(messageText);
            this.redirect(this.listRoute);
        } catch (error) {
        }
    }

    async loadData() {
        let id = this.props["match"].params.id;
        let query = this.forgeQuery();
        try {
            let entity = await this.service.oneById(id, query);
            this.setState({entity});
        } catch (e) {
        }
    }
}
