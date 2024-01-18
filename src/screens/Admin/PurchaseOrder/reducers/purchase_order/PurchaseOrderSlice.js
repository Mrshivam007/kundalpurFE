import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../../../constants/Config";

export const fetchPurchaseSupplierDropList = createAsyncThunk(
  "po/fetchPurchaseSupplierDropList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + "purchase/po/filter/listsup",
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchPurchaseBranchDropList = createAsyncThunk(
  "po/fetchPurchaseBranchDropList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + "purchase/po/filter/listbranch",
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchPurchaseSupplierOrderList = createAsyncThunk(
  "po/fetchPurchaseSupplierOrderList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(Config.apiUrl + "purchase/po/listsup", {
        headers: {
          Authorization: `Token ${auth}`,
        },
      });
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchPOItemReturnPrice = createAsyncThunk(
  "po/fetchPOItemReturnPrice",
  async (pricedata, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + `purchase/poitem/${pricedata.id}`,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.pricedata);
    }
  }
);

export const fetchPoItemReturnTotal = createAsyncThunk(
  "po/fetchPoItemReturnTotal",
  async (totalPricedata, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + `purchase/po/${totalPricedata.id}`,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.totalPricedata);
    }
  }
);

export const fetchPOItemReturn = createAsyncThunk(
  "po/fetchPOItemReturn",
  async (pricedata, { getState }, thunkAPI) =>
  {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + `purchase/poitemreturn/${ pricedata.id }`,
        {
          headers: {
            Authorization: `Token ${ auth }`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.pricedata);
    }
  }
);


export const fetchPurchaseBranchOrderList = createAsyncThunk(
  "po/fetchPurchaseBranchOrderList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + "purchase/po/listbranch",
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const fetchPurchaseSupplierOrderSearchList = createAsyncThunk(
  "po/fetchPurchaseSupplierOrderSearchList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl +
          "purchase/po/listsup?limit=" +
          data.limit +
          "&offset=" +
          data.offset +
          data.searchString,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchPurchaseBranchOrderSearchList = createAsyncThunk(
  "po/fetchPurchaseBranchOrderSearchList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl +
          "purchase/po/listbranch?limit=" +
          data.limit +
          "&offset=" +
          data.offset +
          data.searchString,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );

      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createPurchaseBranchOrder = createAsyncThunk(
  "po/createPurchaseBranchOrder",
  async ({ data, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.post(
        Config.apiUrl + "purchase/po/create",
        data,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      toast.success("PO Branch Created !");
      return response;
    } catch (e) {
      if (e?.response?.data?.non_field_errors !== undefined) {
        toast.error(e?.response?.data?.non_field_errors[0]);
      }

      return false;
    }
  }
);
export const createPurchaseSupplierOrder = createAsyncThunk(
  "po/createPurchaseSupplierOrder",
  async ({ data, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.post(
        Config.apiUrl + "purchase/po/create",
        data,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      toast.success("Po Supplier Created !");
      return response;
    } catch (e) {
      if (e?.response?.data?.non_field_errors !== undefined) {
        toast.error(e?.response?.data?.non_field_errors[0]);
      }

      return false;
    }
  }
);

export const createPORetrun = createAsyncThunk(
  "po/createPORetrun",
  async ({ data, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.post(
        Config.apiUrl + "purchase/poitemrtn/create",
        data,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      toast.success("PR Created !");

      return response;
    } catch (e) {
      if (e?.response?.data?.non_field_errors !== undefined) {
        toast.error(e?.response?.data?.non_field_errors[0]);
      }

      return false;
    }
  }
);

export const fetchSupplierReturnListUps = createAsyncThunk(
  "po/fetchSupplierReturnListUps",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + `purchase/prtn/listsup`,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchSupplierReturnList = createAsyncThunk(
  "po/fetchSupplierReturnList",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + `purchase/prtn/retrieve/${data}`,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createPOAc = createAsyncThunk(
  "po/createPOAc",
  async ({ data, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.post(
        Config.apiUrl + "purchase/poitem/create",
        data,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      console.log("res", response);
      toast.success("Po Ac Created !");
      return response;
    } catch (e) {
      toast.error(e?.response?.data?.non_field_errors[0]);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updatePurchaseBranchOrder = createAsyncThunk(
  "po/updatePurchaseBranchOrder",
  async ({ payload, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.put(
        Config.apiUrl + "purchase/po/update/" + payload.id,
        payload,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );

      toast.success(" Po Branch Updated !");
      return response;
    } catch (e) {
      toast.error(e?.response?.payload?.non_field_errors[0]);
      return thunkAPI.rejectWithValue(e.response.payload);
    }
  }
);
export const updatePurchaseSupplierOrder = createAsyncThunk(
  "po/updatePurchaseBranchOrder",
  async ({ payload, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    console.log("slice res", payload);
    try {
      const response = await axios.put(
        Config.apiUrl + "purchase/po/update/" + payload.id,
        payload,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );

      toast.success(" Po Supplier Updated !");
      return response;
    } catch (e) {
      toast.error(e?.response?.data?.non_field_errors[0]);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const deletePurchaseBranchOrder = createAsyncThunk(
  "po/deletePurchaseBranchOrder",
  async ({ data, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.put(
        Config.apiUrl + "purchase/po/delete/" + data.id,
        data,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );

      toast.success(" Po Branch Deleted !");
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const deletePurchaseSupplierOrder = createAsyncThunk(
  "po/deletePurchaseSupplierOrder",
  async ({ data, toast }, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.put(
        Config.apiUrl + "purchase/po/delete/" + data.id,
        data,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );

      toast.success(" Po Supplier Deleted !");
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// get actual amount
export const getactualBalanceAmount = createAsyncThunk(
  "po/getactualBalanceAmount",
  async (data, { getState }, thunkAPI) => {
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.get(
        Config.apiUrl + `purchase/pvbal/${data.id}`,
        {
          headers: {
            Authorization: `Token ${auth}`,
          },
        }
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const purchaseOrderSlice = createSlice({
  name: "purchaseOrder",
  initialState: {
    inAction: null,

    PurchaseBranchDropList: null,
    PurchaseSupplierDropList: null,

    purchaseBranchOrderList: null,
    purchaseSupplierOrderList: null,

    purchaseBranchOrderSearchList: null,
    purchaseSupplierOrderSearchList: null,

    supplierReturnList: null,
    supplierReturnListsUp: null,

    rowPerPage: 15,
    currentPage: 1,

    searchString: "",
    selectedRow: "0",
    actualBalanceAmount: {},
    poItemReturn:null,
  },
  reducers: {
    setRowPerPage: (state, action) => {
      state.rowPerPage = action.payload;
      return state;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      return state;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
      return state;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
      return state;
    },
  },
  extraReducers: {
    /* Fetch List Branch */
    [fetchPurchaseBranchOrderList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPurchaseBranchOrderList.fulfilled]: (state, { payload }) =>
    {
      state.inAction = false;
      state.purchaseBranchOrderList = payload.data?.results;
    },
    [fetchPurchaseBranchOrderList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },
    /* Fetch List Sup Drop */
    [fetchPurchaseSupplierDropList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPurchaseSupplierDropList.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.PurchaseSupplierDropList = payload.data;
    },
    [fetchPurchaseSupplierDropList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },
    /* Fetch List Branch Drop */

    [fetchPurchaseBranchDropList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPurchaseBranchDropList.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.PurchaseBranchDropList = payload.data;
    },
    [fetchPurchaseBranchDropList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    /* Fetch List Supplier*/
    [fetchPurchaseSupplierOrderList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPurchaseSupplierOrderList.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.purchaseSupplierOrderList = payload.data?.results;
    },
    [fetchPurchaseSupplierOrderList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    //
    [fetchPurchaseSupplierOrderList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPurchaseSupplierOrderList.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.purchaseSupplierOrderList = payload.data?.results;
    },
    [fetchPurchaseSupplierOrderList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    /*fetch Po Item Price*/
    [fetchPOItemReturnPrice.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPOItemReturnPrice.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [fetchPOItemReturnPrice.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    /*fetch Po  Total Price*/
    [fetchPoItemReturnTotal.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPoItemReturnTotal.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [fetchPoItemReturnTotal.rejected]: (state, { payload }) => {
      state.inAction = false;
    },
    /*fetch Po  Item Return*/
    [fetchPOItemReturn.pending]: (state) =>
    {
      state.inAction = true;
    },
    [fetchPOItemReturn.fulfilled]: (state, { payload }) =>
    {
      state.inAction = false;
      state.poItemReturn = payload.data?.results;
    },
    [fetchPOItemReturn.rejected]: (state, { payload }) =>
    {
      state.inAction = false;
    },

    /* Search Supplier*/
    [fetchPurchaseSupplierOrderSearchList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchPurchaseSupplierOrderSearchList.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.purchaseSupplierOrderList = payload?.data?.results;
    },
    [fetchPurchaseSupplierOrderSearchList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    /* Create Branch*/
    [createPurchaseBranchOrder.pending]: (state) => {
      state.inAction = true;
    },
    [createPurchaseBranchOrder.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [createPurchaseBranchOrder.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to create";
    },
    /* Create Supplier*/
    [createPurchaseSupplierOrder.pending]: (state) => {
      state.inAction = true;
    },
    [createPurchaseSupplierOrder.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [createPurchaseSupplierOrder.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to create";
    },

    /* item Accept*/

    [createPOAc.pending]: (state, { payload }) => {
      state.inAction = true;
    },
    [createPOAc.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
      state.createPOCSuccess = payload;
    },
    [createPOAc.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to create";
    },

    /* item Return*/

    [createPORetrun.pending]: (state) => {
      state.inAction = true;
    },
    [createPORetrun.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [createPORetrun.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to create";
    },
    //// supplier Return listUps
    [fetchSupplierReturnListUps.pending]: (state) => {
      state.inAction = true;
    },
    [fetchSupplierReturnListUps.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.supplierReturnListsUp = payload?.data?.results;
    },
    [fetchSupplierReturnListUps.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    // supplier Return list
    [fetchSupplierReturnList.pending]: (state) => {
      state.inAction = true;
    },
    [fetchSupplierReturnList.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.supplierReturnList = payload?.data;
    },
    [fetchSupplierReturnList.rejected]: (state, { payload }) => {
      state.inAction = false;
    },

    /* Update Branch*/
    [updatePurchaseBranchOrder.pending]: (state) => {
      state.inAction = true;
    },
    [updatePurchaseBranchOrder.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [updatePurchaseBranchOrder.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to update";
    },
    /* Update Supplier*/
    [updatePurchaseSupplierOrder.pending]: (state) => {
      state.inAction = true;
    },
    [updatePurchaseSupplierOrder.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [updatePurchaseSupplierOrder.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to update";
    },

    // Delete Supplier

    [deletePurchaseSupplierOrder.pending]: (state) => {
      state.inAction = true;
    },
    [deletePurchaseSupplierOrder.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [deletePurchaseSupplierOrder.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to update";
    },

    // Delete Branch

    [deletePurchaseBranchOrder.pending]: (state) => {
      state.inAction = true;
    },
    [deletePurchaseBranchOrder.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.error = false;
    },
    [deletePurchaseBranchOrder.rejected]: (state, { payload }) => {
      state.inAction = false;
      state.error = true;
      state.message = "Unable to update";
    },

    // get actual totle balance amount
    [getactualBalanceAmount.pending]: (state) => {
      state.inAction = true;
    },
    [getactualBalanceAmount.fulfilled]: (state, { payload }) => {
      state.inAction = false;
      state.actualBalanceAmount = payload?.data;
    },
    [getactualBalanceAmount.rejected]: (state, { payload }) => {
      state.inAction = false;
    },
  },
});

export const {
  setRowPerPage,
  setCurrentPage,
  setSearchString,
  setSelectedRow,
} = purchaseOrderSlice.actions;
export const purchaseOrderSelector = (state) => state.purchaseOrder;
