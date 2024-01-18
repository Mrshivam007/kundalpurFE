import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../../../assets/styles/Table.css";
import { AppSubmitInput } from "../../../../../../components/form/AppSubmitButton";
import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import {
  createPOAc,
  fetchPOItemReturnPrice,
  fetchPoItemReturnTotal,
  fetchPurchaseBranchOrderList,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { toast } from "react-toastify";

export const Item_Accept = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const [load, isLoad] = useState(false);
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    isLoad(false);
    setShow(false);
  };
  const handleShow = () => {
    isLoad(false);
    setShow(true);
  };

  const create = (data) => {
    if (load) {
      toast.warn("Already Submitted Please Wait!!");
      return;
    }
    dispatch(createPOAc({ data })).then(() => {
      toast.success("Successfully submitted");

      isLoad(false);
      handleClose();
    });

    setTimeout(() => {
      const pricedata = {
        id: props?.item?.id,
      };
      dispatch(fetchPOItemReturnPrice(pricedata));
    }, 1000);
    setTimeout(() => {
      const totalPricedata = {
        id: props?.poData?.id,
      };
      dispatch(fetchPoItemReturnTotal(totalPricedata));
    }, 2000);
    setTimeout(() => {
      dispatch(fetchPurchaseBranchOrderList());
    }, 3000);

    setShow(false);
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          background: "white",
          border: "none",
          boxShadow: "none",
          color: "green",
        }}
      >
        Accept
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Formik
          initialValues={{
            po_item: props?.item?.id,
            inventory_name: props?.item?.item_master?.item_name,
            opening_stock:
              props.item?.item_return.length > 0
                ? Number(props?.item?.quantity) -
                  props?.item?.item_recieve.reduce(
                    (n, { recieve_quantity }) => n + recieve_quantity,
                    0
                  ) -
                  props?.item?.item_return.reduce(
                    (n, { return_quantity }) => n + return_quantity,
                    0
                  )
                : props?.item?.item_recieve.length > 0 &&
                  props?.item?.item_return.length === 0
                ? Number(props?.item?.quantity) -
                  props?.item?.item_recieve.reduce(
                    (n, { recieve_quantity }) => n + recieve_quantity,
                    0
                  )
                : props?.item?.quantity,
            recieve_quantity: "",
            remark: "",
            created_by: auth && auth.user && auth.user.user_id,
          }}
          // validationSchema={Schema}
          onSubmit={(values) => create(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Purchase Order Item Accept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* <p>{JSON.stringify(po)}</p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group">
                        <label>Inventory Name</label>
                        <input
                          type="text"
                          class="form-control"
                          name="inventory_name"
                          value={values.inventory_name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div class="form-group">
                        <label>Po Qty</label>
                        <input
                          type="text"
                          class="form-control"
                          name="opening_stock"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.opening_stock}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div class="form-group">
                        <label>Recieve Quantity</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="form-control"
                          name="recieve_quantity"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
											<div class="form-group">
												<label>Remark </label>
												<input
													type="text"
													class="form-control"
													name="remark"
												/>
											</div>
										</div> */}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="Btn">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="B1"
                    >
                      Cancel
                    </Button>
                    <AppSubmitInput
                      className="B2"
                      // type="submit"
                      value="Submit"
                      disabled={
                        values.recieve_quantity == "" ||
                        values.recieve_quantity <= 0 ||
                        values.recieve_quantity > values.opening_stock
                      }
                      onClick={handleSubmit}
                    />
                  </div>
                </Modal.Footer>
              </form>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};
