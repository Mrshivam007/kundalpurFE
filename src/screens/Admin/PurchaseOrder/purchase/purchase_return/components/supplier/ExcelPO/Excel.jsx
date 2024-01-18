// import "jspdf-autotable/dist/jspdf.plugin.autotable";
import React from "react";
// import "../../../../../../assets/styles/Search.css";
import exportFromJSON from "export-from-json";
import { useSelector } from "react-redux";
import moment from "moment";
export default function Excel() {
	const po = useSelector((state) => state.purchaseOrder);
	const fileName = "download";
	const exportType = "xls";
	const exportExcel = () => {
		let data = [];

		{
			po &&
				po.purchaseSupplierOrderList &&
				po.purchaseSupplierOrderList.map((po, index) => {
					
					data.push({
						"Po ID": po?.id,
						"PO Code": po?.po_code,
						"PO Date":moment(po?.created_at).format("DD-MM-YYYY"),
						// "Item Names":po?.order_list.map(x=>{
						// 	return x.item_master?.item_name?x.item_master?.item_name.toUpperCase():x?.finish_product?.fp_name.toUpperCase();
						// }).toString(),
						"Item Count  " :po?.order_list?.length ,
						"Supplier" : po?.supplier?.supplier_name?po?.supplier?.supplier_name.toUpperCase():po?.branch?.branch_name.toUpperCase(),
						"Supplier Email": po?.supplier?.email,
						"Supplier Contact No.": po?.supplier?.contact_no,
						"Supplier State": po?.supplier?.place_of_supply?.state_name.toUpperCase(),
						"Delivery Date": moment(po?.exp_arr_date).format("DD-MM-YYYY") ,
						"Delivery State": po?.delivery_location?.state_name,
						" Grand Total": po?.grand_total,
						"Return Grand Total": po?.return_grand_total,
						"Po Status": po?.po_status,
					});
				});
		}
		
		exportFromJSON({ data, fileName, exportType });
	};

	return (
		<div className="App">
			<header className="App-header" style={{ textAlign: "center" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					fill="currentColor"
					id="sg"
					class="bi bi-file-earmark-spreadsheet-fill"
					viewBox="0 0 16 16"
					onClick={() => exportExcel()}
				>
					<path d="M6 12v-2h3v2H6z" />
					<path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
				</svg>
			</header>
		</div>
	);
}
