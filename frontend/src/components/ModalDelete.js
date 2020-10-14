import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useAlert } from 'react-alert';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const ModalDelete = forwardRef(({ movieId }, ref) => {
  const [redirect, setRedirect] = useState(false);
  const alert = useAlert();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const deleteMovie = async () => {
    const { data } = await axios.delete(`/api/v1/movies/${movieId}`);
    if (data.success) {
      alert.success('Movie deleted!');
      setRedirect(true);
      return;
    }
    setShow(false);
  };

  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => {
    return {
      openModal: () => handleShow(),
    };
  });

  function renderRedirect() {
    if (redirect) {
      return <Redirect to={`/`} />;
    }
  }
  return (
    <div ref={ref}>
      {renderRedirect()}
      <Modal show={show} animation={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary btn-sm" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-danger btn-sm" onClick={deleteMovie}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default ModalDelete;
