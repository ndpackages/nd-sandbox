import React, {Component} from 'react';
import {connect} from 'react-redux';
import container from "../../../../core/container/singletons/container";

class Loader extends Component {

    render() {
        let LoaderWidget = this.props["type"];
        let isLoading;
        if (this.props.hasOwnProperty('isLoading')) {
            isLoading = this.props["isLoading"];
        } else {
            isLoading = container.get('loader.services.status').isLoading(this.props["name"]);
        }
        return (
            isLoading ? (
                LoaderWidget ? (
                    <LoaderWidget/>
                ) : (
                    <div>Loading....</div>
                )
            ) : (
                this.props.children
            )
        );
    }
}

const mapStateToProps = (store) => {
    return {
        loaderStatus: store.loaderStatus,
    };
};
export default connect(mapStateToProps)(Loader);
