// import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React,{useState,useRef} from "react";
import { useSelector } from "react-redux";
// import "../../../../../../assets/styles/Table.css";
import {
	pvSelector,
	setSelectedRow,
} from "../../../../../reducers/pv/PvSlice";
import { Delete } from "../delete/Delete";
import { View_PayVo } from "../view/View_PayVo";
import { useDispatch } from "react-redux";
import { Update_Payment_Sup } from "../form/Update_Payment_Sup";
export default function Payment_list_Sup() {
	const dispatch = useDispatch();
	const allpv = useSelector(pvSelector);
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
			{/* <p>{JSON.stringify(pv)}</p> */}
			<div className="wrapper_abc">
				<table>
					<thead>
						<tr>
							<th>
								<input
									type="checkbox" />
							</th>
							<th>Sn.</th>
							<th>Payment Code</th>
							<th>PO Code </th>
							<th>Supplier</th>
							<th>Tally data</th>
							<th>Payment Date </th>
							<th>Payment/Voucher Date</th>
							<th>Payment Type</th>
							{/* <th>Payment Type</th> */}
							<th>Payment Amount</th>
							<th className="sticky-col first-col" id="acts">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{allpv &&
							allpv.PvSupplierList &&
							allpv.PvSupplierList.results &&
							allpv.PvSupplierList.results.map((pv, index) => (
								<tr>
									<td>
										<input
											type="checkbox"
											onChange={(e) => {
												selectedRow(pv.id);
											}}
										/>
									</td>
									<td>{allpv?.rowPerPage === "20"
										? allpv?.currentPage * 20 - 20 + index + 1
										: allpv?.currentPage * 15 - 15 + index + 1}</td>
									<td>{pv?.pv_code}</td>
									<td>{pv?.purchase_order?.po_code}</td>
									<td>{pv?.purchase_order?.supplier?.supplier_name}</td>
									<td>{pv?.tally_data?.tally_name}</td>
									<td>{moment(pv.created_at).format("DD-MM-YYYY")}</td>
									<td>{pv?.bill_date}</td>
									<td>{pv?.payment_type.split(" ")[0]}</td>
									{/* <td>{"PO"+pv?.id}</td> */}
									<td>{pv?.payment_amount}</td>

									<td className="sticky-col first-col">
										<div className="row">
											<div className="col-md-1">
												<View_PayVo pv={pv} />
											</div>
											<div className="col-md-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill="currentColor"
													class="bi bi-pencil"
													viewBox="0 0 16 16"
													onClick={() => {
														setPvData(pv)
														handleShowModal()
													}}
												>
													<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
												</svg>
												{/* <Update_Payment_Sup pv={pv} /> */}
											</div>
											<div className="col-md-1">
												<Delete pv={pv} />
											</div>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				{pvData && <Update_Payment_Sup pv={pvData} ref={childPvRef} />}
			</div>
		</>
	);
}