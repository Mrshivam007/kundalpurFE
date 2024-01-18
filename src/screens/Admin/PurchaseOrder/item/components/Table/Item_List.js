import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import "../../../../../assets/styles/Table.css";
import { Delete } from "../delete/Delete";
import { Edit_item } from "../form/Edit_item";
import { View_Item } from "../view/View_Item";
import {
  fetchinventoryList,
  itemSelector,
  setSelectedRow,
} from "../../../../../reducers/master/item/ItemSlice";
export default function Item_List() {
  const dispatch = useDispatch();
  const item = useSelector(itemSelector);
//  console.log("------", item);
  const childRefTwo = useRef();
  const [inventoryData, setInventoryData] = useState(null);
  const handleShowModal = (value) => {
    dispatch(fetchinventoryList(value));
    childRefTwo.current.showAlert2();
  };
  const childPvRef = useRef();
	const [pvData, setPvData] = useState(null);

	const handleShowModals = () => {
		childPvRef.current.showPv();
	}
	const selectedRow = (e) => { 
		dispatch(setSelectedRow(e));
	};
  return (
    <>
      {/* <p>{JSON.stringify(item)}</p>  */}
      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>
              <th>Sn</th>
              <th>Inventory Code</th>
              <th>Inventory Type</th>
              <th>Inventory Name</th>
              <th>Inventory Category</th>
              <th>HSN Code</th>
              <th>GST %</th>
              <th>Color</th>
              <th>UOM</th>
              <th>Size</th>
              {/* <th>Opening stock</th> */}
              <th>Purchase price</th>
              <th>Selling Price</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Created By</th>
              <th>Remark</th>
              <th className="sticky-col first-col" id="acts">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {item &&
              item.itemSearchList &&
              item.itemSearchList.results &&
              item.itemSearchList.results.map((item11, index) => (
                <tr id="{index}">
                  <td>
                    {item?.rowPerPage === "20"
                      ? item?.currentPage * 20 - 20 + index + 1
                      : item?.currentPage * 15 - 15 + index + 1}
                  </td>
                  <td>{item11?.item_code}</td>
                  <td>{item11?.items_type}</td>
                  <td>{item11?.item_name}</td>
                  <td>{item11?.item_category?.category_name}</td>
                  <td>{item11?.item_category?.hsn_code}</td>
                  <td>{item11?.item_gst?.gst_percent}</td>
                  <td>{item11?.item_color?.color_name}</td>
                  <td>{item11?.item_unit?.unit}</td>
                  <td>{item11?.item_size}</td>
                  {/* <td>{item11?.opening_stock}</td> */}
                  <td>{item11?.purchase_price}</td>
                  <td>{item11?.selling_price}</td>
                  <td>{item11?.description}</td>
                  <td>{moment(item11?.Created_at).format("DD-MM-YYYY")}</td>
                  <td>{item11?.created_by?.full_name}</td>
                  <td>{item11?.remark}</td>
                  <td className="sticky-col first-col">
                    <div className="row">
                      <div className="col-md-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            // console.log("item inside onclick", item11);
                            setInventoryData(item11);
                            handleShowModal(item11);
                          }}
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
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
														setPvData(item11)
														handleShowModals()
													}}
												>
													<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
												</svg>
											</div>
                      &nbsp;
                      <div className="col-md-1">
                        <Delete item={item11} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {pvData && <Edit_item item={pvData} ref={childPvRef} />}
        {inventoryData && <View_Item item={inventoryData} ref={childRefTwo} />}
      </div>
    </>
  );
}
