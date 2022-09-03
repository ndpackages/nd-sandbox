class ErrorHelper {

    unprocessableEntityErrorToString(error) {
        let message = '';
        let errorCollection = error.getErrors();
        if (errorCollection.length > 0) {
            for (let k in errorCollection) {
                if (errorCollection.hasOwnProperty(k)) {
                    let item = errorCollection[k];
                    message += " \n " + item.message;
                }
            }
        } else {
            message = error.message;
        }
        return message;
    }

    unprocessableEntityErrorToAssoc(error) {
        let errors = {};
        let errorCollection = error.getErrors();
        if (errorCollection.length > 0) {
            for (let k in errorCollection) {
                if (errorCollection.hasOwnProperty(k)) {
                    let item = errorCollection[k];
                    let field = item.field;
                    if (errors[field] === undefined) {
                        errors[field] = [];
                    }
                    errors[field].push(item.message);
                }
            }
        }
        return errors;
    }
}

export default new ErrorHelper();
