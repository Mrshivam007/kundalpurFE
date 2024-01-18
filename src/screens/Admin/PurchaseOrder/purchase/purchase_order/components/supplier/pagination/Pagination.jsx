import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPurchaseSupplierOrderSearchList,
  purchaseOrderSelector,
  setCurrentPage,
  setRowPerPage,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import "../../../../../../assets/styles/Pagination.css";
import { poSelector } from "../../../../../../reducers/purchase/po/PoSlice";
export default function Pagination() {
  const dispatch = useDispatch();
  const purchaseOrder = useSelector(purchaseOrderSelector);
  const [page, setPage] = useState(1);

  const po = useSelector(poSelector);
  var start = purchaseOrder.currentPage;

  var total =
    purchaseOrder &&
    purchaseOrder.purchaseSupplierOrderList &&
    purchaseOrder.purchaseSupplierOrderList.length;

  var no_of_page = Math.ceil(total / purchaseOrder.rowPerPage);

  const pageLink = [];
  for (let i = 1; i <= no_of_page; i++) {
    if (i > page - 3 && i < page + 3) {
      pageLink.push({ key: i, value: i });
    }
  }

	function setRecordPerPage(event) {

		const e = event.target.value;
		dispatch(setRowPerPage(e));

		dispatch(
			fetchPurchaseSupplierOrderSearchList({
				offset: 0,
				limit: e,
				searchString: "",
			}),
		);
	}

  const setOff = (page) => {
    if (page > 0) {
      setPage(page);
      dispatch(setCurrentPage(page));
      var offset = (parseInt(page) - 1) * purchaseOrder.rowPerPage;
      dispatch(
        fetchPurchaseSupplierOrderSearchList({
          offset: offset,
          limit: purchaseOrder.rowPerPage,
          searchString: "",
        })
      );
    }
  };

  return (
    <div>
      <div class="row">
        <div class="col-md-6 mt-4" style={{ color: "black" }}>
          <select className="page-limit-select" onChange={setRecordPerPage}>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div class="col-md-6 mt-4 ms-auto" style={{ marginRight: "10rem" }}>
          <ul class="pagination" style={{ color: "black", fontSize: "12px" }}>
            <li class="page-item ">
              Showing {start} to {no_of_page} of {total} entries
            </li>
            <li class="page-item">
              <a aria-label="Previous" onClick={() => setOff(page - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pageLink.map((link, index) => (
				<li class={`page-item page-link ${ purchaseOrder.currentPage === link.key
						? "text-white bg-dark cursor-pointer"
						: ""
					}`} onClick={() => setOff(link.key)}>
                {link.value}
              </li>
            ))}
            {no_of_page != page ? (
              <li class="page-item">
                <a aria-label="Next" onClick={() => setOff(page + 1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
