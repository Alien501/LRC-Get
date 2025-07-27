import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Music } from "lucide-react";

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
        <div className="w-full max-w-md input-box">
            <Input
                isClearable
                radius="lg"
                type="link"
                placeholder="Paste Spotify link here..."
                variant="bordered"
                className="placeholder:text-sm placeholder:font-medium"
                color={!isValid? "danger": "primary"}
                isInvalid = {!isValid}
                onChange={onInputChange}
                validationBehavior="aria"
                errorMessage={validationMessagem}
                onClear={onClear}
                startContent={
                    <Music className="w-4 h-4 text-default-400" />
                }
                classNames={{
                    input: "text-base",
                    inputWrapper: "h-12 shadow-sm hover:shadow-md transition-shadow duration-200",
                }}
            />
        </div>
    )
}

export default InputBox;