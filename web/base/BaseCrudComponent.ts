import BaseCrudService from "../../domain/services/BaseCrudService";
import BaseActiveComponent from "./BaseActiveComponent";

export default class BaseCrudComponent extends BaseActiveComponent {

    protected service: BaseCrudService;

}
