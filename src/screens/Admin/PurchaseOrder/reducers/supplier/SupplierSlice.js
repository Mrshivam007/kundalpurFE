import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../../../constants/Config";



export const fetchSellerList = createAsyncThunk(
	"supplier/fetchSellerList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/seller/list",
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
); 
 
export const fetchSupplierList = createAsyncThunk(
	"supplier/fetchSupplierList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/supplier/filter/list",
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
 
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const fetchSupplierSearchList = createAsyncThunk(
	"supplier/fetchSupplierSearchList",
	async (data, { getState }, thunkAPI) => {
		
		const auth = localStorage.getItem("token");

		try {
			const response = await axios.get(
				Config.apiUrl +
				"master/supplier/list?limit=" +
				
				data.limit +
				"&offset=" +
				data.offset +
				data.searchString,
				 
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const fetchPoBySupplier = createAsyncThunk(
	"po/fetchPoBySupplier",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");

		try {
			const response = await axios.get(
				Config.apiUrl +
					"purchase/po/listsup?limit=100" +
					
					data.search_str,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);


export const fetchSupplier = createAsyncThunk(
	"supplier/fetchSupplier",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/supplier/retrive/" + data.id,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const createSupplier = createAsyncThunk(
	"supplier/createSupplier",
	async ({data,toast}, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.post(
				Config.apiUrl + "master/supplier/create",
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Supplier Created !");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const updateSupplier = createAsyncThunk(
	"supplier/updateSupplier",
	async ({data,toast}, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");

		try {
			const response = await axios.put(
				Config.apiUrl + "master/supplier/update/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Supplier Updated !");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const deleteSupplier = createAsyncThunk(
	"supplier/deleteSupplier",
	async ({data,toast}, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "master/supplier/delete/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Supplier Deleted !");
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const supplierSlice = createSlice({
	name: "supplier",
	initialState: {
		inAction: null,
		error: null,
		message: null,
		supplier: null,
		branch:null,
		SellerList:null,
		supplierList: null,
		supplierSearchList: null,
		supplierData: null,
		supplierPoData:null,
	
		rowPerPage: 15,
		currentPage: 1,

		searchString: "",
		selectedRow: "0",
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
				/* seller List */
				[fetchSellerList.pending]: (state) => {
					state.inAction = true;
				},
				[fetchSellerList.fulfilled]: (state, { payload }) => {
					state.inAction = false;
					state.SellerList = payload.data;
				},
				[fetchSellerList.rejected]: (state, { payload }) => {
					state.inAction = false;
				},
		
		/* Fetch List */
		[fetchSupplierList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchSupplierList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.supplierList = payload.data;
		},
		[fetchSupplierList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Search */
		[fetchSupplierSearchList.pending]: (state) => {
			
			state.inAction = true;
		},
		[fetchSupplierSearchList.fulfilled]: (state, { payload }) => {
			
			state.inAction = false;
			state.supplierSearchList = payload.data;
		},
		[fetchSupplierSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Po  BY ISupplierd */
		[fetchPoBySupplier.pending]: (state) => {
			
			state.inAction = true;
		},
		[fetchPoBySupplier.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.supplierPoData = payload.data;
		},
		[fetchPoBySupplier.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Po  BY IBranch */
		
		/* Fetch */
		[fetchSupplier.pending]: (state) => {
			state.inAction = true;
		},
		[fetchSupplier.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.supplier = payload.data;
		},
		[fetchSupplier.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Create */
		[createSupplier.pending]: (state) => {
			state.inAction = true;
		},
		[createSupplier.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[createSupplier.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to create";
		},
		/* Update */
		[updateSupplier.pending]: (state) => {
			state.inAction = true;
		},
		[updateSupplier.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[updateSupplier.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
		/* Delete */
		[deleteSupplier.pending]: (state) => {
			state.inAction = true;
		},
		[deleteSupplier.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[deleteSupplier.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
	},
});
export const { setRowPerPage, setCurrentPage, setSearchString, setSelectedRow } =
supplierSlice.actions;

export const supplierSelector = (state) => state.supplier;
