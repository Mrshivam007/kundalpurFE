import React from "react";
import { useSelector } from "react-redux";
import exportFromJSON from "export-from-json";
import { itemSelector } from "../../../../../reducers/item/ItemSlice";
import moment from "moment";

const fileName = "download";
const exportType = "xls";
export default function Excel() {
  const item = useSelector(itemSelector);
  const ExportToExcel = () => {
    var data = [];
    item?.itemList?.map((item, index) => {
      data.push({
        "item Code": item?.item_code,
        "Inventory Type": item.items_type,
        "Inventory Name": item?.item_name,
        "Item Category": item?.item_category?.category_name,
        "HSN Code": item?.item_category?.hsn_code,
        "GST %": item?.item_gst?.gst_percent,
        Color: item?.item_color?.color_name,
        UOM: item?.item_unit?.unit,
        Size: item?.item_size,
        Price: item?.purchase_price,
        "Opening stock": item?.opening_stock,
        Description: item?.description,
        Remark: item?.remark,
        "Created By": item?.created_by?.full_name,
        "Created Date": moment(item?.created_at).format("DD-MM-YYYY hh:mm a"),
      });
    });
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
          onClick={() => ExportToExcel()}
        >
          <path d="M6 12v-2h3v2H6z" />
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
        </svg>
      </header>
    </div>
  );
}
