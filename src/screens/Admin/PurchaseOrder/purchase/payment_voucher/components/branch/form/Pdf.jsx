import React, { useState } from "react";
import moment from "moment";
// import "../../../../../../assets/styles/Search.css";
import Modal from "react-bootstrap/Modal";
import { Button, ModalFooter } from "react-bootstrap";
import { Checkbox } from "@mui/material";
// import { fetchPvDownloadPDF } from "../../../../../../reducers/document/DocumentSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

 function Pdf() {
	const [show, setShow] = useState(false);
	const [isCheckAll, setIsCheckAll] = useState(false);
	const [isCheck, setIsCheck] = useState([]);
	const [isCheckName, setIsCheckName] = useState([]);
	const [from, setFrom] = useState(null);
	const [to, setTo] = useState(null);
	const dispatch = useDispatch();
	/* Today's date */
	const current = new Date();
	// const date = `${current.getDate()}/${current.getMonth() + 1
	// 	}/${current.getFullYear()}`;
	const dateCurrent = current.toLocaleDateString('en-CA');
	const Catalogues = [
		{
			id: "pv_code",
			name: "PV Code"
		},
		
		{
			id: "purchase_order__branch__branch_name",
			name: "Branch Name"
		},

		{
			id: "tally_data__tally_name",
			name: "Tally Name" 
		},

		{
			id: "bill_no",
			name: "Bill No."
		},

		{
			id: "bill_date",
			name: "Bill Date"
		},

		{
			id: "payment_amount",
			name: "Payment Amount"
		}
	];
	const showModal = () => {
		setFrom(null);
		setTo(null);
		setIsCheckAll(false);
		setIsCheck([]);
		setIsCheckName([]);
		setShow(true);
	}
	const handleSelectAll = e => {
		setIsCheckAll(!isCheckAll);
		setIsCheck(Catalogues.map(li => li.id));
		setIsCheckName(Catalogues.map(li => li.name));
		if (isCheckAll) {
			setIsCheck([]);
			setIsCheckName([]);
		}
	};
	const handleClick = e => {
		const { id, name, checked } = e.target;
		setIsCheck([...isCheck, id]);
		setIsCheckName([...isCheck, name]);
		if (!checked) {
			setIsCheck(isCheck.filter(item => item !== id));
			setIsCheckName(isCheck.filter(item => item !== name));
		}
	};
	const handleClose = () => {
		setShow(false);
	};

	const downloaddPDF = (type) => {
		if (to && from) {
			let data = {
				title_name: isCheckName,
				field_names: isCheck,
				from_date: from,
				to_date: to
			}
			dispatch( fetchPvDownloadPDF({modeltype: 'supplier',data: data })).then(pdf => {
				if (pdf?.payload.data) {
					const blob = new Blob([pdf?.payload.data], { type: 'application/pdf' });
					if (type == "view") {
						var fileURL = URL.createObjectURL(blob);
						window.open(fileURL);
					} else if (type == "download") {
						// process to auto download it
						const fileURL = URL.createObjectURL(blob);
						const link = document.createElement('a');
						link.href = fileURL;
						link.download = "PO_Report_" + new Date() + ".pdf";
						link.click();
					}
				} else {
					toast("No Data Found!")
				}

			})
		} else {
			toast.warning("Please Select From To Date!")
		}
	}
	const catalog = Catalogues.map(({ id, name }) => {
		return (
			<>
				<div>
					<div className="col-md-10">
						<Checkbox
							key={id}
							type="checkbox"
							name={name}
							id={id}
							onChange={handleClick}
							checked={isCheck.includes(id)}
						/>
					<label for={id}>{name}</label>
					</div>
				</div>
			</>
		);
	});
	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				fill="currentColor"
				id="sg"
				class="bi bi-file-earmark-diff-fill"
				viewBox="0 0 16 16"
				onClick={() => showModal()}
			>
				<path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8 6a.5.5 0 0 1 .5.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5A.5.5 0 0 1 8 6zm-2.5 6.5A.5.5 0 0 1 6 12h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
			</svg>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<div className="title-subtitle">
						<Modal.Title>Select Options</Modal.Title>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div class="col">
						<Checkbox
							type="checkbox"
							name="selectAll"
							id="selectAll"
							onChange={handleSelectAll}
							checked={isCheckAll}
						/>
				<label for="selectAll">Select All</label>
						<div className="row">
							{catalog}
						</div>
						<div className="row">
							<div className="col-md-6">
								<div class="form-group">
									<label>From Date *</label>
									<input
										type="date"
										class="form-control"
										onChange={date => {
											const newDate = moment(new Date(date.target.value)).format('YYYY-MM-DD');
											setFrom(newDate);
										}}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div class="form-group">
									<label>To Date *</label>
									<input
										max={dateCurrent}
										type="date"
										class="form-control"
										name="exp_arr_date"
										onChange={date => {
											const newDate = moment(new Date(date.target.value)).format('YYYY-MM-DD');
											setTo(newDate);
										}}
									/>
								</div>
							</div>
						</div>
					</div>
					<ModalFooter>
						{/* <Button variant="primary" style={{ width: "17%" }} className="btn btn-primary btn-sm" aria-pressed="true" onClick={() => downloaddPDF("csv")}>
							Download As CSV
						</Button> */}
						<Button variant="primary" style={{ width: "17%" }} className="btn btn-primary btn-sm" aria-pressed="true" onClick={() => downloaddPDF("view")}>PDF View</Button>
						<Button variant="primary" style={{ width: "17%" }} className="btn btn-primary btn-sm" aria-pressed="true" onClick={() => downloaddPDF("download")}>	Download As PDF</Button>
					</ModalFooter>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default Pdf