// import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "../../../../../assets/styles/Table.css";
import { Delete } from "../delete/Delete";
import { setSelectedRow, supplierSelector } from "../../../../../reducers/master/supplier/SupplierSlice";
import { Update_Supplier } from "../form/Update_Supplier";
import { View_Supplier } from "../view/View_Supplier";
export default function Category_list() {
	const dispatch = useDispatch();
	const allSupplier = useSelector(supplierSelector);
	
	const childPvRef = useRef();
	const [pvData, setPvData] = useState(null);

	const handleShowModal = () => {
		childPvRef.current.showPv();
	}
	const selectedRow = (e) => { 
		dispatch(setSelectedRow(e));
	};
	return (

		<>
			{/* <p>{JSON.stringify(po)}</p> */}
			<div className="wrapper_abc">
				<table>
					<thead>
						<tr>

							<th>Sn</th>
							<th>Supplier Code</th>
							<th>Title</th>
							<th>Supplier Type</th>
							<th>Supplier Name</th>
							<th>Contact No</th>
							<th>Email Id</th>
							<th>GST Number</th>
							<th>Place of Supply</th>
							<th>Billing Name</th>
							<th>Street/House Number</th>
							<th>City</th>
							<th>State</th>
							<th>Postalcode</th>
							<th>Country</th>
							<th>Supplier Product</th>
							<th>Created At</th>
							<th>Created By</th>
							{/* <th>Description</th> */}
							<th>Remark</th>
							<th className="sticky-col first-col" id="acts">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{allSupplier &&
							allSupplier.supplierSearchList &&
							allSupplier.supplierSearchList.results &&
							allSupplier.supplierSearchList.results.map((supplier, index) => (
								<tr id="{index}">
									<td>{allSupplier?.rowPerPage === "20"
										? allSupplier?.currentPage * 20 - 20 + index + 1
										: allSupplier?.currentPage * 15 - 15 + index + 1}</td>
									<td>{supplier.supplier_code}</td>
									<td>{supplier.title}</td>
									<td>{supplier.supplier_type?.supplier_type}</td>
									<td>{supplier.supplier_name}</td>
									<td>{supplier.contact_no}</td>
									<td>{supplier.email}</td>
									<td>{supplier.gstin}</td>
									<td>{supplier.place_of_supply.state_name}</td>
									<td>{supplier.billing_name}</td>
									<td>{supplier.street_h_n}</td>
									<td>{supplier.city.city_name}</td>
									<td>{supplier.city.state.state_name}</td>
									<td>{supplier.postalcode}</td>
									<td>{supplier.country.country}</td>
									<td>{supplier.suppliers_product}</td>
									<td>{moment(supplier.Created_at).format("DD-MM-YYYY")}</td>
									<td>{supplier.created_by.full_name}</td>
									{/* <td>{supplier.description}</td> */}
									<td>{supplier.remark}</td>
									<td className="sticky-col first-col">
										<div className="row">
											&nbsp;
											<div className="col-md-2">
												<View_Supplier item={supplier} />
											</div>
											&nbsp;
											<div className="col-md-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													class="bi bi-pencil"
													viewBox="0 0 16 16"
													onClick={() => {
														setPvData(supplier)
														handleShowModal()
													}}
												>
													<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
												</svg>
												{/* <Update_Payment_Sup pv={pv} /> */}
											</div>
											&nbsp;
											<div className="col-md-2">
												<Delete supplier={supplier} />
											</div>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{pvData && <Update_Supplier supplier={pvData} ref={childPvRef} />}

			</div>
		</>
	);
}