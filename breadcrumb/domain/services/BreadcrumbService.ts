export default class BreadcrumbService {

    protected itemRepository;

    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }

    clear() {
        this.itemRepository.clear();
    }

    add(title, route) {
        let itemEntity = {
            title: title,
            route: route,
        };
        this.itemRepository.add(itemEntity);
    }
}