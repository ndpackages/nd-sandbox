class Scroll {

    top(element = window) {
        element.scrollTo({top: 0});
    }

    bottom(element = window) {
        // element.scrollTop = element.scrollHeight;
        element.scrollTo = element["scrollHeight"];
    }
}

export default new Scroll();
