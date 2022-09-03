import React from 'react';
import _ from "lodash";

function collectionToCols(collection, columnsPerRow) {
    let rows = _.chunk(collection, columnsPerRow);
    let lastRow = _.last(rows);
    if (lastRow.length < columnsPerRow) {
        for (let i = lastRow.length; i < columnsPerRow; i++) {
            lastRow.push(null);
        }
    }
    return rows;
}

export default function CardDeckWidget(props) {
    let ItemRender = props.itemRender;
    let rows = collectionToCols(props.dataProvider.collection, props.columnsPerRow);
    return (
        <div className="card-deck-wrapper">
            {rows.map(function (cols, index) {
                return (
                    <div key={index} className="card-deck mb-3">
                        {cols.map(function (entity, index) {
                            if (entity == null) {
                                return (
                                    <div key={index} className="card border-light" style={{opacity: 0}}/>
                                );
                            }
                            return (
                                <ItemRender
                                    key={index}
                                    entity={entity}
                                    onDelete={props.onDelete}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
