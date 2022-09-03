import React from 'react';
import pageHead from "../singletons/pageHead";

class ResetPageTitleEffect {

    run() {
        pageHead.setPageTitleDefault();
    }
}

const resetPageTitleEffect = new ResetPageTitleEffect();

export default resetPageTitleEffect;
