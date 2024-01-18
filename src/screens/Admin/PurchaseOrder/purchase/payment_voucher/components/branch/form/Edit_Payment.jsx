import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/styles/Form.css";
export default function Edit_Payment() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				fill="currentColor"
				class="bi bi-pencil"
				viewBox="0 0 16 16"
				onClick={handleShow}
			>
				<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
			</svg>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Payment Voucher</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-md-6">
							<div class="form-group">
								<label>Purchase Id</label>
								<select class="form-control">
									<option value="volvo">Select</option>
									<option value="saab">id</option>
									<option value="audi">id</option>
									<option value="fiat">id</option>
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Suplier Name</label>
								<select class="form-control">
									<option value="volvo">Select</option>
									<option value="saab">Name</option>
									<option value="audi">Name</option>
									<option value="fiat">Name</option>
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Tally data</label>
								<input type="text" name="name" class="form-control" />
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Bill No</label>
								<input type="text" name="name" class="form-control" />
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Payment amount</label>
								<input type="text" name="name" class="form-control" />
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Billed Date</label>
								<input type="date" name="name" class="form-control" />
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Payment type</label>
								<select class="form-control">
									<option value="volvo">Select</option>
									<option value="saab">upi</option>
									<option value="audi">phonepy</option>
									<option value="fiat">gpy</option>
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div class="form-group">
								<label>Transaction Number*</label>
								<input type="text" name="name" class="form-control" />
							</div>
						</div>
						<div className="col-md-10">
							<div class="form-group">
								<label>Description</label>
								<textarea rows="2" cols="60" class="form-control" />
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="Btn">
						<Button variant="secondary" onClick={handleClose} className="B1">
							Cancel
						</Button>
						<Button variant="primary" onClick={handleClose} className="B2">
							Submit
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
}
