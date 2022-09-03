import React, {Component} from 'react';
import container from "../../../bundlesCore/container/singletons/container";
import breadcrumbFacade from "../../../bundles/breadcrumb/domain/facades/breadcrumbFacade";
import Loader from "../../../bundles/loader/web/widget/loader";
import pageHead from "../../../bundlesExt/pageTitle/singletons/pageTitle";
import _ from "lodash"

export default abstract class BaseComponent extends Component {

    protected default = {};

    // protected defaultState() {
    //     return {};
    // }

    setTitle(title: string) {
        pageHead.setPageTitle(title);
    }

    getLoader() {
        return null;
    }

    addBreadcrumb(title: string, route: string = null) {
        breadcrumbFacade.add(title, route);
    }

    getClassName() {
        return this.constructor.name;
    }

    loaderRender(children) {
        return (
            <Loader type={this.getLoader()} name={this.getClassName()}>
                {children}
            </Loader>
        );
    }

    wrapper(props) {
        if (this.getLoader()) {
            return this.loaderRender(props.children);
        } else {
            return props.children;
        }
    }

    startLoad() {
        container.get('loader.services.status').startLoad(this.getClassName());
    }

    endLoad() {
        container.get('loader.services.status').endLoad(this.getClassName());
    }

    isLoading() {
        return container.get('loader.services.status').isLoading(this.getClassName());
    }

    redirect(uri) {
        if (uri === null) {
            throw new Error('Empty uri for redirect!');
        }
        this.props['history'].push(uri);
    }

    redirectToHome() {
        this.redirect('/');
    }

    componentDidMountIfUpdated(prevProps: Readonly<{}>, prevState?: Readonly<{}>, snapshot?: any): void {
        let prevLocation = _.get(prevProps, 'location.search', '');
        let currentLocation = _.get(this.props, 'location.search', '');
        // let prevLocation = prevProps['location'].search;
        // let currentLocation = this.props["location"].search;

        let isUpdated = currentLocation !== prevLocation;
        if (isUpdated) {
            this.componentDidMount();
        }
    }
}
