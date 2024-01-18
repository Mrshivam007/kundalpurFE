import jsPDF from "jspdf";
import "jspdf-autotable/dist/jspdf.plugin.autotable";
import React from "react";
// import "../../../../../../assets/styles/Search.css";

import { useSelector } from "react-redux";
import { pvSelector, } from "../../../../../../reducers/purchase/pv/PvSlice";

export default function Pdf() {
	const pv = useSelector(pvSelector);

	const exportPDF = () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "portrait"; // portrait or landscape

		const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);

		doc.setFontSize(10);

		const title = "My Reports";
		const headers = [
			[
				"Sn.",
				"Voucher Code",
				"Party Name",
				"Particular",
				"Date",
				"Credit",
				"Debit",
				"Balance",
			],
		];

		doc.setTextColor("#653D3D");

		const data = pv.pvSearchList.results.map((elt, index) => [
			index + 1,
			// elt.pv_code,
			// elt?.purchase_order?.supplier?.supplier_name?elt.purchase_order.supplier.supplier_name:elt.purchase_order.branch.branch_name,
			// elt.description,
			// elt.bill_date,
			// elt.payment_amount,
		]);

		let content = {
			startY: 50,
			head: headers,
			body: data,
			headStyles: { fillColor: "#653D3D" },
		};

		doc.text(title, marginLeft, 40);
		doc.autoTable(content);

		doc.save("report.pdf");
	};

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
				onClick={() => exportPDF()}
			>
				<path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8 6a.5.5 0 0 1 .5.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5A.5.5 0 0 1 8 6zm-2.5 6.5A.5.5 0 0 1 6 12h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
			</svg>
		</div>
	);
}