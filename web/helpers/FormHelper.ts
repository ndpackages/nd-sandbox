import UnprocessableEntityError from "../../contract/errors/UnprocessableEntityError";
import _ from "lodash";

export default class FormHelper {

    public static assignErrorsFromError(error: UnprocessableEntityError, setFieldError) {
        let errors = error.getErrors();
        let errorMap = {};
        errors.map((errorItem) => {
            let field = _.camelCase(errorItem.field);
            if(!errorMap.hasOwnProperty(field)) {
                errorMap[field] = [];
            }
            errorMap[field].push(errorItem.message);
        });

        for (let fieldName in errorMap) {
            let messages = errorMap[fieldName];
            let message = messages[0];
            // let message = messages.join("\n");
            setFieldError(fieldName, message);
        }
    }
}
