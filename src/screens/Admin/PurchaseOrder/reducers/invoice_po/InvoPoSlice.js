import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Config from "../../../../../constants/Config";

export const fetchInvPurchaseOrderList = createAsyncThunk(
	"invwpo/fetchInvPurchaseOrderList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/invwpo/filter/list",
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
export const fetchInvPurchaseOrderSearchList = createAsyncThunk(
	"invwpo/fetchInvPurchaseOrderSearchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl +
				"purchase/invwpo/list?limit=" +
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

export const createInvPurchaseOrder = createAsyncThunk(
	"invwpo/createInvPurchaseOrder",
	async ({ data, toast }, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.post(
				Config.apiUrl + "purchase/invwpo/create",
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Successfully Created");
			return response;
		} catch (e) {
			if (e?.response?.data?.non_field_errors !== undefined) {
				toast.error(e?.response?.data?.non_field_errors[0]);
			}

			return false;
		}
	},
);

export const updateInvPurchaseOrder = createAsyncThunk(
	"invwpo/updateInvPurchaseOrder",
	async ({ data, toast }, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {

			const response = await axios.put(
				Config.apiUrl + "purchase/invwpo/update/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			toast.success(" Successfully Updated");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const deleteInvPurchaseOrder = createAsyncThunk(
	"invwpo/deleteInvPurchaseOrder",
	async ({ data, toast }, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/invwpo/delete/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			toast.success(" Successfully Deleted");
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const InvoPoSlice = createSlice({
	name: "InvPo",
	initialState: {
		inAction: null,
		InvPoList: null,
		InvPoSearchList: null,
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
		/* Fetch List */
		[fetchInvPurchaseOrderList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchInvPurchaseOrderList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.InvPoList = payload.data;
		},
		[fetchInvPurchaseOrderList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Search */
		[fetchInvPurchaseOrderSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchInvPurchaseOrderSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.InvPoSearchList = payload.data;
		},
		[fetchInvPurchaseOrderSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Create */
		[createInvPurchaseOrder.pending]: (state) => {
			state.inAction = true;
		},
		[createInvPurchaseOrder.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;

		},
		[createInvPurchaseOrder.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to create";
		},

		/* Update */
		[updateInvPurchaseOrder.pending]: (state) => {
			state.inAction = true;
		},
		[updateInvPurchaseOrder.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;

		},
		[updateInvPurchaseOrder.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
	},
});

export const { setRowPerPage, setCurrentPage, setSearchString, setSelectedRow } =
InvoPoSlice.actions;
export const InvPoSelector = (state) => state.InvPo;
