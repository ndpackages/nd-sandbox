import React from 'react';
import pageHead from "../singletons/pageTitle";

class ResetPageTitleEffect {

    run() {
        pageHead.setPageTitleDefault();
    }
}

const resetPageTitleEffect = new ResetPageTitleEffect();

export default resetPageTitleEffect;
