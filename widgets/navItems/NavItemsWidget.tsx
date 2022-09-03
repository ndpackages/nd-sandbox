import React from 'react';
import {Nav} from "react-bootstrap";
import UrlHelper from "../../web/helpers/UrlHelper";
import Item from "../controlledNavs/views/Item";

export default function NavItemsWidget(props) {

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
                    <Item
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
