import { Button } from "@nextui-org/react";
import React from "react";


const PrimaryButton = ({buttonTitle, buttonOnClick, isLoading, variant="shadow"}) => {
    return isLoading?
                <Button name={buttonTitle} isLoading color="primary" size="md" radius="sm" variant={variant}>
                    {buttonTitle}
                </Button>
                :
                <Button name={buttonTitle} onClick={buttonOnClick} color="primary" size="md" radius="sm" variant={variant}>
                    {buttonTitle}
                </Button>
        
}

export default PrimaryButton;