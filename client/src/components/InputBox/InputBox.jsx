import { Input } from "@nextui-org/react";
import React, { useState } from "react";

import './InputBox.css'
import { validateSpotifyUrl } from "../../util/validateSpotifyUrl";

const InputBox = ({inputValue, setInputValue, onClear}) => {
    const [isValid, setIsValid] = useState(true);
    const [validationMessagem, setValidationMessage] = useState('');

    const onInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if(validateSpotifyUrl(value)) {
            setIsValid(true);
            setValidationMessage('');
        }else {
            setIsValid(false);
            setValidationMessage("Invalid Spotify URL.");
        }
    }

    return(
        <div className="w-56 input-box">
            <Input
                isClearable
                radius="sm"
                type="link"
                placeholder="Paste Spotify link here"
                variant="flat"
                className="placeholder:text-sm placeholder:font-thin placeholder:text-primary-100"
                color={!isValid? "danger": "primary"}
                isInvalid = {!isValid}
                onChange={onInputChange}
                validationBehavior="aria"
                errorMessage={validationMessagem}
                onClear={onClear}
            />
        </div>
    )
}

export default InputBox;