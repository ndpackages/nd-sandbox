import React from 'react';
import _ from 'lodash';
import Pagination from "react-bootstrap-4-pagination";
import UrlHelper from "../../core/helpers/UrlHelper";

export default function PaginatorWidget(props) {
    let paginationConfig = {
        className: "",
        totalPages: 1,
        currentPage: 1,
        showMax: 5,
        threeDots: null,
        prevNext: null,
        href: null,
        pageOneHref: null,
    };
    let paginator = props.paginator;

    if (paginator) {
        if(paginator.lastPage === 1) {
            return <span> </span>;
        }

        paginationConfig = {
            className: "",
            totalPages: paginator.lastPage,
            currentPage: paginator.page,
            showMax: 5,
            // size: "lg",
            threeDots: true,
            prevNext: true,
            href: UrlHelper.getMaskUrl('page', '*'),
            pageOneHref: UrlHelper.getMaskUrl('page', null),
        };
    }

    if(props.config) {
        paginationConfig = _.merge(paginationConfig, props.config);
    }

    if(paginationConfig.totalPages) {
        return (
            <div className="container">
                <div className="float-right">
                    <Pagination {...paginationConfig} />
                </div>
            </div>
        );
    }
    return <span> </span>;
}
