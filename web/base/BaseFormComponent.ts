import BaseComponent from "./BaseComponent";
import FormHelper from "../../../bundlesExt/form/helpers/FormHelper";

export default class BaseFormComponent extends BaseComponent {

    extractAttributes() {
        return null;
    }

    getValues() {
        let extractAttributes = this.extractAttributes();
        if (extractAttributes) {
            return FormHelper.extractInitValues(this.props["entity"], extractAttributes);
        }
        return this.props["entity"];
    }

    getViewProps() {
        let viewProps = {};
        viewProps["values"] = this.getValues();
        viewProps["onSubmit"] = this.props["onSubmit"];
        return viewProps;
    }

}
