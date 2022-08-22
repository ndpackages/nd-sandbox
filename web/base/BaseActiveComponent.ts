import BaseComponent from "./BaseComponent";
import breadcrumbFacade from "../../breadcrumb/domain/facades/breadcrumbFacade";

export default class BaseActiveComponent extends BaseComponent {

    protected service: object;

    async loadData() {

    }

    initBreadcrumbs(): void {

    }

    async componentDidMount() {
        this.startLoad();
        await this.loadData();
        this.endLoad();

        breadcrumbFacade.addHome();
        this.initBreadcrumbs();
    }
}
