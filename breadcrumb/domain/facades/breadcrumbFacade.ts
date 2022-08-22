import container from "../../../../packages/container/singletons/container";

class BreadcrumbFacade {

    addHome() {
        container.get('breadcrumb.services.breadcrumb').clear();
        this.add('Home', '/');
    }

    add(title, route = '/') {
        container.get('breadcrumb.services.breadcrumb').add(title, route);
    }
}

export default new BreadcrumbFacade();
