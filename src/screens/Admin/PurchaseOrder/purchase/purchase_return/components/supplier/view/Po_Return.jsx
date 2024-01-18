import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../../../../assets/styles/Table.css";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppSubmitInput } from "../../../../../../components/form/AppSubmitButton";
import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import {
  createPORetrun,
  fetchPOItemReturn,
  fetchPurchaseSupplierOrderList,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { toast } from "react-toastify";
// const Schema = Yup.object().shape({
// 	recieve_quantity: Yup.number().required('Please enter your quantity'),
// });
export const Po_Return = ({ ...props }) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [show, setShow] = useState(false);
  const [load, isLoad] = useState(false);

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
    dispatch(createPORetrun({ data })).then(() => {
      toast.success("Successfully submitted");     
      isLoad(false);
      handleClose();
    });
    setTimeout(() => {
      const pricedata = {
        id: props?.item?.id,
      };
      dispatch(fetchPOItemReturn(pricedata));
    }, 1000);
    setTimeout(() =>
    {
      dispatch(fetchPurchaseSupplierOrderList());
    }, 2000);


    setShow(false);
  };

  return (
    <>
      {props?.item?.item_recieve.length !== 0 ? (
        <Button
          variant="primary"
          onClick={handleShow}
          style={{
            background: "white",
            border: "none",
            boxShadow: "none",
            color: "red",
          }}
        >
          Return
        </Button>
      ) : (
        ""
      )}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Formik
          initialValues={{
            por_item: props?.item?.id,
            inventory_name: props?.item?.item_master?.item_name,
            opening_stock:
              props.item?.item_return.length > 0
                ? props?.item?.item_recieve.reduce(
                    (n, { recieve_quantity }) => n + recieve_quantity,
                    0
                  ) -
                  props?.item?.item_return.reduce(
                    (n, { return_quantity }) => n + return_quantity,
                    0
                  )
                : props?.item?.item_recieve.reduce(
                    (n, { recieve_quantity }) => n + recieve_quantity,
                    0
                  ),
            // opening_stock:
            //   props.item?.item_return.length > 0
            //     ? Number(props?.item?.quantity) -
            //       props?.item?.item_recieve.reduce(
            //         (n, { recieve_quantity }) => n + recieve_quantity,
            //         0
            //       ) -
            //       props?.item?.item_return.reduce(
            //         (n, { return_quantity }) => n + return_quantity,
            //         0
            //       )
            //     : props?.item?.item_recieve.length > 0 &&
            //       props?.item?.item_return.length === 0
            //     ? Number(props?.item?.quantity) -
            //       props?.item?.item_recieve.reduce(
            //         (n, { recieve_quantity }) => n + recieve_quantity,
            //         0
            //       )
            //     : props?.item?.quantity,
            return_quantity: "",
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
                  <Modal.Title>Purchase Order Return</Modal.Title>
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
                        <label>Receive Qty</label>
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
                        <label>Return Quantity</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          class="form-control"
                          name="return_quantity"
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
                        values.return_quantity == "" ||
                        values.return_quantity <= 0 ||
                        values.return_quantity > values.opening_stock
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
