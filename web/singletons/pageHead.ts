class PageHead {

    private _defaultTitle: string;

    public setPageTitleDefault(): void {
        if (this._defaultTitle) {
            this.setPageTitle(this._defaultTitle);
        }
    }

    public setPageTitle(title: string): void {
        let titleElem = document.querySelector("title");
        if (!this._defaultTitle) {
            this._defaultTitle = titleElem.innerText;
        }
        titleElem.innerText = title;
    }
}

export default new PageHead();
