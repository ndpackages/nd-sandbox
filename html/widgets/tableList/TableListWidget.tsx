import React from 'react';

export default function TableListWidget(props) {
    let dataProvider = props.dataProvider;
    let ItemRender = props.itemRender;
    let HeadRender = props.headRender;
    return (
        <>
            <table className="table table-bordered-- table-striped table-sm table-valign-middle table-borderless">
                {HeadRender ? (
                    <thead>
                    <HeadRender/>
                    </thead>
                ) : null}
                <tbody>
                {dataProvider.collection.map(function (employeeEntity, index) {
                    return (
                        <ItemRender
                            key={index}
                            entity={employeeEntity}
                            onDelete={props.onDelete}
                        />
                    );
                })}
                </tbody>
            </table>
        </>
    );
}
