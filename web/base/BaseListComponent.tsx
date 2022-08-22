import BaseCrudComponent from "./BaseCrudComponent";
import Query from "../../domain/libs/Query";
import {t} from "i18next";
import {toast} from "react-toastify";
import {List} from "react-content-loader";
import React from "react";
import EmptyList from "../components/emptyList";
import DataProvider from "../../domain/libs/DataProvider";
import {Col} from "react-bootstrap";
import QueryHelper from "../../domain/helpers/QueryHelper";

export default abstract class BaseListComponent extends BaseCrudComponent {

    state = {
        dataProvider: null,
    };

    emptyMessageRender() {
        return (
            <Col className="mt-3">
                <EmptyList/>
            </Col>
        );
    }

    wrapper(props) {
        let dataProvider: DataProvider = this.getDataProvider();
        let hideOnEmpty = props.hideOnEmpty;
        let hasData = dataProvider && dataProvider.collection;
        let isHide = hideOnEmpty && !hasData;
        let content;
        if (isHide) {
            content = this.emptyMessageRender();
        } else {
            content = props.children;
        }
        return this.loaderRender(content);
    }

    getLoader() {
        return List;
    }

    getDataProvider(): DataProvider {
        return this.state["dataProvider"];
    }

    protected forgeQueryFromEnv(): Query {
        let query = this.forgeQuery(this.props["location"]);
        return query;
    }

    protected forgeQuery(location): Query {
        // let query = new Query();
        let query = QueryHelper.uriToQuery(location.search, this.default);
        return query;
    }

    async handleDelete(entity) {
        try {
            await this.service.deleteById(entity.id);
            let messageText = t('language.message.deleteSuccess');
            toast.success(messageText);
            this.loadData();
        } catch (error) {
        }
    }

    defaultPerPage() {
        return 20;
    }

    async loadData() {
        let query = this.forgeQueryFromEnv();
        query.perPage = query.perPage ? query.perPage : this.defaultPerPage();
        try {
            let dataProvider = await this.service.getDataProvider(query);
            this.setState({dataProvider});
        } catch (e) {
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        this.componentDidMountIfUpdated(prevProps);
    }
}
