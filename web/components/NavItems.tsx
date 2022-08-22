import React from 'react';
import {Nav} from "react-bootstrap";
import UrlHelper from "../../core/helpers/UrlHelper";
import ControlledNavsItem from "../widgets/ControlledNavs/ControlledNavsItem";

export default function EmployeeListView1111(props) {

    let attributeName = props['attributeName'];
    // let value = props['value'];
    let collection = props['collection'];

    return (
        <>
            {collection.map(function (entity) {
                // let isActive = parseInt(value) === entity.id;
                let urlParams = {};
                urlParams[attributeName] = entity.id;
                urlParams['page'] = null;
                let route = UrlHelper.getMaskUrlArr(urlParams);
               // uri = UrlHelper.normalize(route);

                let item = {
                    title: entity.title,
                    route: route,
                };

                return (
                    <ControlledNavsItem
                        key={entity.id}
                        item={item}
                    />

                    /*<Nav.Item key={entity.id}>
                        <Nav.Link
                            active={isActive}
                            href={uri}
                        >
                            {entity.title}
                        </Nav.Link>
                    </Nav.Item>*/
                );
            })}
        </>
    );
}
