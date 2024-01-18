import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../../../constants/Config";
import { toast, ToastContainer } from "react-toastify";


export const fetchPvSupplierDropList = createAsyncThunk(
	"pv/fetchPvSupplierDropList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/pv/filter/listsup",
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

export const fetchPvBranchDropList = createAsyncThunk(
	"pv/fetchPvBranchDropList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/pv/filter/listbranch",
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


export const fetchPvBranchList = createAsyncThunk(
	"pv/fetchPvBranchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/pv/listbranch",
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
export const fetchPvSupplierList = createAsyncThunk(
	"pv/fetchPvSupplierList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/pv/listsup",
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
export const fetchPvBranchSearchList = createAsyncThunk(
	"pv/fetchPvBranchSearchList",
	async (data, { getState }, thunkAPI) => {

		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl +
				"purchase/pv/listbranch?limit=" +
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
export const fetchPvSupplierSearchList = createAsyncThunk(
	"pv/fetchPvSupplierSearchList",
	async (data, { getState }, thunkAPI) => {

		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl +
				"purchase/pv/listsup?limit=" +
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
// export const fetchPvList = createAsyncThunk(
// 	"pv/fetchPvSupplierSearchList",
// 	async (data, { getState }, thunkAPI) => {
// 		const auth = localStorage.getItem("token");
// 		try {
// 			const response = await axios.get(
// 				Config.apiUrl +
// 				"purchase/pv/filter/listsup",
// 				{
// 					headers: {
// 						Authorization: `Token ${auth}`,
// 					},
// 				},
// 			);

		
// 			return response;
// 		} catch (e) {
// 			return thunkAPI.rejectWithValue(e.response.data);
// 		}
// 	},
// );

export const fetchPv = createAsyncThunk(
	"pv/fetchPv",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/pv/retrive/" + data.id,
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

export const createPv = createAsyncThunk(
	"pv/createPv",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.post(
				Config.apiUrl + "purchase/pv/create",
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			toast.success("Payment Created !");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const updatePv = createAsyncThunk(
	"pv/updatePv",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/pv/update/" + data.get("id"),
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Payment Updated !");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const deletePv = createAsyncThunk(
	"pv/deletePv",
	async ({ data, toast }, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/pv/delete/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Payment Deleted !");
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const pvSlice = createSlice({
	name: "pv",
	initialState: {
		inAction: null,
		error: null,
		message: null,
		pv: null,
		PvBranchDropList: null,
		PvSupplierDropList: null,
		PvBranchList: null,
		PvSupplierList: null,
		pvBranchSearchList: null,
		pvSupplierSearchList: null,
		searchString: "",
		rowPerPage: 15,
		currentPage: 1,
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
		/* Fetch List */
		[fetchPvBranchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPvBranchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.PvBranchList = payload.data;
		},
		[fetchPvBranchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		[fetchPvSupplierList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPvSupplierList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.PvSupplierList = payload.data;
		},
		[fetchPvSupplierList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch List Sup Drop */
		[fetchPvSupplierDropList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPvSupplierDropList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.PvSupplierDropList = payload.data;
		},
		[fetchPvSupplierDropList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch List Branch Drop */

		[fetchPvBranchDropList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPvBranchDropList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.PvBranchDropList = payload.data;
		},
		[fetchPvBranchDropList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch List Branch */

		[fetchPvBranchSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPvBranchSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.PvBranchList = payload.data;
		},
		[fetchPvBranchSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch List Supplier*/

		[fetchPvSupplierSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPvSupplierSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.PvSupplierList = payload.data;
		},
		[fetchPvSupplierSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch */

		[fetchPv.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPv.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.pv = payload.data;
		},
		[fetchPv.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Create */

		[createPv.pending]: (state) => {
			state.inAction = true;
		},
		[createPv.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[createPv.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to create";
		},

		/* Update */
		[updatePv.pending]: (state) => {
			state.inAction = true;
		},
		[updatePv.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[updatePv.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},

		/* Delete */
		
		[deletePv.pending]: (state) => {
			state.inAction = true;
		},
		[deletePv.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[deletePv.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
	},
});
export const {
	clearFlag,
	setLimit,
	setOffset,
	setCurrentPage,
	setRowPerPage,
	setSearchString,
	setSelectedRow,
} = pvSlice.actions;

export const pvSelector = (state) => state.pv;
