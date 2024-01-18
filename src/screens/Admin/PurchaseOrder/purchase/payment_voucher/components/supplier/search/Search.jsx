import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
// import "../../../../../../assets/styles/Search.css";

import {
  fetchPvSupplierList,
  fetchPvSupplierSearchList,
  pvSelector,
} from "../../../../../reducers/pv/PvSlice";

import { supplierSelector } from "../../../../../reducers/supplier/SupplierSlice";

import Excel from "../ExcelPm_v/Excel";
import Pdf from "../form/Pdf";

export default function Search() {
  const dispatch = useDispatch();
  const supplier = useSelector(supplierSelector);

  const pv = useSelector(pvSelector);

  const [supplierValue, setSupplier] = useState("");
  const [codeValue, setCode] = useState("");

  const codeArr = [{ value: "0", label: "Select Code" }];
  const supplierArr = [{ value: "0", label: "Select Supplier Name" }];
  {
    pv &&
      pv.PvSupplierDropList &&
      pv.PvSupplierDropList.map((pv, index) => {
        codeArr.push({
          value: pv.id,
          label: pv.pv_code,
        });
      });
  }

  {
    supplier &&
      supplier.supplierList &&
      supplier.supplierList.map((supplier, index) => {
        supplierArr.push({
          value: supplier.id,
          label: supplier.supplier_name,
        });
      });
  }

  const setCodeValue = (e) => {
    if (e.value > 0) {
      setCode(e.label);
    } else {
      setCode("");
    }
  };

  const setSupplierValue = (e) => {
    if (e.value > 0) {
      setSupplier(e.label);
    } else {
      setSupplier("");
    }
  };

  const myfunCtion = () => {
    dispatch(fetchPvSupplierList({ searchString: "" }));
    setCode("");
    setSupplier("");
  };

  const searchAction = () => {
    var search_str = "";
    if (codeValue != 0) {
      search_str += "&pv_code__icontains=" + codeValue;
    }
    if (supplierValue != 0) {
      search_str +=
        "&purchase_order__supplier__supplier_name__icontains=" + supplierValue;
    }

    dispatch(
      fetchPvSupplierSearchList({
        offset: 0,
        limit: 15, 
        searchString: search_str,
      })
    );
  };

  return (
    <>
      <div className="bigcontainer">
        <div className="selecttabcontainer1">
          <Select
            value={codeArr.filter(function (option) {
              return option.label === codeValue;
            })}
            placeholder="Code"
            className="selecttab"
            options={codeArr}
            onChange={setCodeValue}
          />
          <Select
            value={supplierArr.filter(function (option) {
              return option.label === supplierValue;
            })}
            placeholder="Supplier Name"
            className="selecttab"
            options={supplierArr}
            onChange={setSupplierValue}
          />
          <button id="srcbtn" onClick={() => searchAction()}>
            Search
          </button>
          <button id="srcbtn" onClick={myfunCtion}>
            Reset
          </button>
        </div>

        <div className="selecttabcontainer2">
          <div className="col-md-1">
            <Link to="voucher">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                id="sg"
                class="bi bi-printer-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              </svg>
            </Link>
          </div>
          <div className="col-md-1">
            <Excel />
          </div>
          <div className="col-md-1">
            <Pdf />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
}
