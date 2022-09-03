import React, {useState} from "react";

const SpoilerWidget = (props) => {
    const [showResults, setShowResults] = useState(false);
    const onClick = () => {
        setShowResults(!showResults);
        if (props.targetId) {
            let filterPanel = document.getElementById(props.targetId);

            /*let classes = filterPanel.className.split(' ');
            if (showResults) {
                classes.push('d-none');
            } else {
                classes = _.remove(classes, 'd-none');
            }
            filterPanel.className = classes.join(' '); // showResults ? 'd-none' : '';
            console.log(classes);*/

            filterPanel.style.display = showResults ? 'none' : null;
            // filterPanel.hidden = showResults;
        }
    };
    return (
        <span onClick={onClick}>
            {props.button}
            {showResults ? props.children : null}
        </span>
    )
};

export default SpoilerWidget;
