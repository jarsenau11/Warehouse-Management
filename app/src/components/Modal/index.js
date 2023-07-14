/**
 * Custom modal component built using the Modal component from react-bootstrap
 * 
 *    props:
 *      - handleInitialButtonClick - takes a function that can perform some action when clicking the button that opens the modal
 *      - buttonStyle - styles the button that opens the modal
 *      - buttonVariant - sets the color for the button that opens the modal
 *      - buttonTitle - sets the title for the button that opens the modal
 *      - modalHeading - sets the modal heading
 *      - modalBody - sets the modal body
 *      - cancelButtonVariant - sets the color of the cancel button in the modal
 *      - submitButtonVariant - sets the color of the submit button in the modal
 *      - handleSubmit - takes a function that executes on submit
 */

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialButtonClickAction = props.handleInitialButtonClick;

  return (
    <>
      <Button style={props?.buttonStyle} variant={props.buttonVariant} onClick={function(){handleShow(); if(initialButtonClickAction == null){} else{initialButtonClickAction()}}}>
        {props.buttonTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant={props.cancelButtonVariant} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={props.submitButtonVariant} onClick={function(){if(props.handleSubmit == null){} else {props.handleSubmit()}; handleClose()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;