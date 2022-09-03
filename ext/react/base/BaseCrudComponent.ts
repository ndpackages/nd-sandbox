import BaseCrudService from "../../../core/domain/services/BaseCrudService";
import BaseActiveComponent from "./BaseActiveComponent";

export default class BaseCrudComponent extends BaseActiveComponent {

    protected service: BaseCrudService;

}
