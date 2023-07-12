import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={props.buttonVariant} onClick={function() {handleShow(); props.handleUpdate()}}>
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
          <Button variant={props.submitButtonVariant} onClick={function(){props.handleSubmit(); handleClose()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;