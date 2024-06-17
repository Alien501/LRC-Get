import React from "react";
import { Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

const QueryModel = ({isOpen, onOpenChange, accordianList}) => {

    return(
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Query</ModalHeader>
                            <ModalBody>
                                <Accordion>
                                    {
                                        accordianList.map(accord => 
                                            <AccordionItem key={accord.key} aria-label={accord.airaLabel} title={accord.title}>
                                                {accord.content}
                                            </AccordionItem>
                                        )
                                    }
                                </Accordion>
                            </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    )
}

export default QueryModel;