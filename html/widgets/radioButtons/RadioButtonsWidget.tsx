import React, {useState} from "react";
import {ButtonGroup, ToggleButton} from "react-bootstrap";

function RadioButtonsWidget(props) {
    // const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    return (
        <ButtonGroup toggle>
            {props.items.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}

export default RadioButtonsWidget;
