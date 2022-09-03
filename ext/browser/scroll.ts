class Scroll {

    top(element = window) {
        element.scrollTo({top: 0});
    }

    bottom(element) {
        // element.scrollTo = element["scrollHeight"];

        const scrollHeight = element.scrollHeight;
        const height = element.clientHeight;
        const maxScrollTop = scrollHeight - height;
        element.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
}

export default new Scroll();
