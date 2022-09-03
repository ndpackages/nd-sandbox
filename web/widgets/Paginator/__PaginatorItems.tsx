import React from 'react';
import {Pagination} from 'react-bootstrap';

import _ from 'lodash';

/*let defaultProps = {
    page: 1,
    perPage: 21,
    totalCount: 1765,

};*/

// console.log(defaultProps);

export default function PaginatorItems(props) {
    let paginator = props.paginator;
    //console.log(paginator);

    /*let cc = 3;
    for (let number = paginator.page - cc; number <= paginator.page + cc - 1; number++) {
        console.log(number);
    }*/

    let items = [];

    items.push(
        <>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />
        </>
    );

    for (let number = 1; number <= paginator.lastPage; number++) {
        let isActive = number === paginator.page;
        items.push(
            <>
                <Pagination.Item key={number} active={isActive}>
                    {number}
                </Pagination.Item>

                {/*<Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>*/}


            </>
        );
    }


    items.push(
        <>
            <Pagination.Ellipsis />
            <Pagination.Item>{paginator.lastPage}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </>
    );


    return items;
}
