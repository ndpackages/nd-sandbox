import React from 'react';
import Breadcrumbs from "../../../bundles/breadcrumb/web/components/Breadcrumbs";

export default function HeaderView(props) {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">
                            {props.title}
                        </h1>
                    </div>
                    <div className="col-sm-6">
                        <Breadcrumbs className="float-sm-right"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
