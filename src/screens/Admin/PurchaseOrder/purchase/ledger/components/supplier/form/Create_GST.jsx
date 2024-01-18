import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Create_GST.css";

export default function Create_GST() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <> 
      <Button variant="primary" onClick={handleShow}> 
      +Add
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Add New GST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div class="form-group">
                  <label>
                	GST %	
                  </label>
                  <input type="text" name="name" />
                  </div>
            </div>
            <div className="col-md-6">
              <div class="form-group">
                <label>
                Created Date
                </label>
                <input type="text" name="name" />
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group">
                <label>
                Created By
                </label>
                <input type="text" name="name" />
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group">
                <label>
                Description
                </label>
                <input type="text" name="name" />
              </div>
            </div>
            <div className="col-md-6">
              <div class="form-group">
                  <label>
                    Remark
                  </label>
                  <input type="text" name="name" />
                </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
              Cancel
              </Button>
              <Button variant="primary" onClick={handleClose}>
              Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        );
}

