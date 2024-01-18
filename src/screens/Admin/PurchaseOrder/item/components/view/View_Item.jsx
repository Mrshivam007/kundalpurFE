import React, { useState, forwardRef, useImperativeHandle } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/styles/Form.css";
import { useSelector } from "react-redux/es/exports";
import moment from "moment";
import { itemSelector } from "../../../../../reducers/master/item/ItemSlice";

export const View_Item = forwardRef((props, ref) => {
  const [index, setIndex] = useState(1);
  const [show, setShow] = useState(true);
  const item = useSelector(itemSelector);
  const handleClose = () =>
  {
    setIndex(1)
    setShow(false);
  }
  useImperativeHandle(ref, () => ({
    showAlert2() {
      setShow(true);
    },
  }));
  var balance = 0;
  var close = 0;

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mainContainer">
            <ul class="nav nav-pills"id="navpillss_1">
              <li style={{ marginLeft: "1%" }}>
                <a
                  href="#datile"
                  data-toggle="tab"
                  className={`${index === 1 ? 'active-tab' : 'is-hidden'}`}
                  onClick={() => {
                    setIndex(1)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-file-earmark-zip-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243z" />
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1h6.5V6h-1V5h1V4h-1V3h1zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1z" />
                  </svg>
                  &nbsp;Item Details
                </a>
              </li>
              <li>
                <a href="#poda" data-toggle="tab"	
                className={`${index === 2 ? 'active-tab' : 'is-hidden'}`}
							onClick={() => {
								setIndex(2)
							}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  &nbsp; Item Image
                </a>
              </li>
              <li>
                <a href="#stock" data-toggle="tab"
                	className={`${index === 3 ? 'active-tab' : 'is-hidden'}`}
							onClick={() => {
								setIndex(3)
							}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  &nbsp; Item Stock{" "}
                </a>
              </li>
            </ul>
            <div class="tab-content clearfix">
              <div class="tab-pane active" id="datile">
              <hr />
              <br/>
                <div className="cont">
               
                  <h6>
                    Item Code :- <span>{props.item.item_code}</span>
                  </h6>
                  <h6>
                    Inventory Type:- <span>{props.item.items_type}</span>
                  </h6>
                  <h6>
                    Inventory Name :- <span>{props.item.item_name}</span>
                  </h6>
                  <h6>
                    Inventory Category :-{" "}
                    <span>{props.item.item_category.category_name}</span>
                  </h6>
                  <h6>
                    HSN Code :- <span>{props.item.item_category.hsn_code}</span>
                  </h6>
                  <h6>
                    GST % :- <span> {props.item.item_gst.gst_percent}</span>
                  </h6>
                  <h6>
                    Color :- <span>{props.item.item_color.color_name}</span>
                  </h6>
                  <h6>
                    UOM :- <span>{props.item.item_unit.unit} </span>
                  </h6>
                  <h6>
                    Size :- <span>{props.item.item_size} </span>
                  </h6>
                  <h6>
                    Purchase Price :- <span>{props.item.purchase_price} </span>
                  </h6>
                  <h6>
                  Selling Price :- <span>{props.item.selling_price} </span>
                  </h6>
                  {/* <h6>
                    Opening stock :- <span>{props.item.opening_stock} </span>
                  </h6> */}
                  <h6>
                    Created Date :-{" "}
                    <span>
                      {moment(props.item.created_at).format("DD-MM-YYYY")}{" "}
                    </span>
                  </h6>
                  <h6>
                    Created By :-{" "}
                    <span>{props.item.created_by.full_name} </span>
                  </h6>
                  {/* <h6>Description :-   <span>{props.item.description}</span></h6> */}
                  <h6>
                    Remark :- <span>{props.item.remark}</span>
                  </h6>
                </div>
              </div>
              <div class="tab-pane" id="poda">
              <hr />
              <br/>
                <div className="row">
                  <div className="col-md-3">
                    <h6 style={{ textAlign: "center" }}>Image 1</h6>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={props.item.item_image}
                    />
                  </div>
                  <div className="col-md-3">
                    <h6 style={{ textAlign: "center" }}>Image 2</h6>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={props.item.item_image_2}
                    />
                  </div>
                  <div className="col-md-3">
                    <h6 style={{ textAlign: "center" }}>Image 3</h6>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={props.item.item_image_3}
                    />
                  </div>
                  <div className="col-md-3">
                    <h6 style={{ textAlign: "center" }}>Image 4</h6>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={props.item.item_image_4}
                    />
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="stock">
              <hr />
              <br/>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Accept/Reject Qty</th>
                    <th>Opening Stock</th>
                    <th>Closing Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {item &&
                    item.inventoryList &&
                    item.inventoryList.item_recieve &&
                    item.inventoryList.item_recieve.map((x) => {
                      balance = parseInt(close);
                      close = parseInt(x.recieve_quantity) + parseInt(balance);
                      return (
                        <tr>
                          <td>
                            {moment
                              .utc(x.created_at, "YYYY-MM-DDTHH:mm:ssZ")
                              .format("YYYY-MM-DD")}
                          </td>
                          <td>{x.recieve_quantity}</td>
                          <td>{balance}</td>
                          <td>{close}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
});
