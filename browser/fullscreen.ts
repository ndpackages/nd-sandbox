let voidFunction = function () {
};

class Fullscreen {

    _status = false;

    _forgeElement(element) {
        if (typeof element === 'undefined') {
            element = document.documentElement;
        }
        return element;
    }

    open(element = null) {
        element = this._forgeElement(element);
        element.requestFullscreen().then(voidFunction);
        this._status = true;
    }

    close() {
        document.exitFullscreen().then(voidFunction);
        this._status = false;
    }

    toggle(element) {
        element = this._forgeElement(element);
        if (this._status) {
            this.close();
        } else {
            this.open(element);
        }
    }
}

export default new Fullscreen();