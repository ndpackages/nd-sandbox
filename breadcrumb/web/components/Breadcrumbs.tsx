import React, {Component} from 'react';
import {Breadcrumb} from "react-bootstrap";
import {connect} from "react-redux";

class Breadcrumbs extends Component {

    render() {
        let collection = this.props["breadcrumbItem"].collection;
        let className = this.props['className'];
        if (collection.length) {
            return (
                <Breadcrumb className={className}>
                    {collection.map(function (itemEntity, key) {
                        return (
                            <Breadcrumb.Item key={key} href={"#" + itemEntity.route}>
                                {itemEntity.title}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            );
        } else {
            return '';
        }
    }
}

const mapStateToProps = (store) => {
    return {
        breadcrumbItem: store.breadcrumbItem,
    };
};

// const mapStateToProps = (store) => store.breadcrumbItem;
export default connect(mapStateToProps)(Breadcrumbs);
