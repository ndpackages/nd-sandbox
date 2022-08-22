export default class UnprocessableEntityError extends Error {

    protected errors = [];

    setErrors(errors) {
        this.errors = errors;
    }

    getErrors() {
        return this.errors;
    }
}
