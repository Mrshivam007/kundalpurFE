import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../../../constants/Config";

import { toast } from "react-toastify";

export const fetchItemList = createAsyncThunk(
	"item/fetchItemList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/item/filter/list",
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

export const fetchItemSearchList = createAsyncThunk(
	"item/fetchItemSearchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl +
				"master/item/list?limit=" +
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

export const fetchItem = createAsyncThunk(
	"item/fetchItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");

		try {
			const response = await axios.get(
				Config.apiUrl + "master/item/retrive/" + data.id,
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


export const fetchinventoryList = createAsyncThunk(
	"item/fetchinventoryList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");

		try {
			const response = await axios.get(
				Config.apiUrl + "inventory/stock/" + data.id,
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


export const createItem = createAsyncThunk(
	"item/createItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.post(
				Config.apiUrl + "master/item/create",
				data,
				{
					headers: { 
						Authorization: `Token ${auth}`,
					}, 
				},
			);

			toast.success("Inventory Created !");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const updateItem = createAsyncThunk(
	"item/updateItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");

		try {
			const response = await axios.put(
				Config.apiUrl + "master/item/update/" + data.get("id"),
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			toast.success("Inventory Updated !");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const deleteItem = createAsyncThunk(
	"item/deleteItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "master/item/delete/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Inventory Deleted !");
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}

	},
);
export const fetchFinishedItem = createAsyncThunk(
	"item/fetchFinishedItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/itemtype/list?items_type=" + data.id,
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
export const fetchRawItem = createAsyncThunk(
	"item/fetchRawItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/itemtype/list?items_type=" + data.id,
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
export const fetchSemiItem = createAsyncThunk(
	"item/fetchSemiItem",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "master/itemtype/list?items_type=" + data.id,
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
export const itemSlice = createSlice({
	name: "item",
	initialState: {
		inAction: null,
		error: null,
		message: null,
		item: null,
		inventoryList:null,
		finisheditem: null,
		rawitem: null,
		semiitem:null,
		itemList: null,
		itemSearchList: null,
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
		[fetchItemList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchItemList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.itemList = payload.data;
		},
		[fetchItemList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Finished List */
		[fetchFinishedItem.pending]: (state) => {
			state.inAction = true;
		},
		[fetchFinishedItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.finisheditem = payload?.data;
		},
		[fetchFinishedItem.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Raw List */
		[fetchRawItem.pending]: (state) => {
			state.inAction = true;
		},
		[fetchRawItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.rawitem = payload?.data;
		},
		[fetchRawItem.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch Semi List */
		[fetchSemiItem.pending]: (state) => {
			state.inAction = true;
		},
		[fetchSemiItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.semiitem = payload?.data;
		},
		[fetchSemiItem.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch List */
		[fetchItemList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchItemList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.itemList = payload.data;
		},
		[fetchItemList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		
/* inventory - stock */

		[fetchinventoryList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchinventoryList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.inventoryList = payload.data;
		},
		[fetchinventoryList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Search */
		[fetchItemSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchItemSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.itemSearchList = payload.data;
		},
		[fetchItemSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch */
		[fetchItem.pending]: (state) => {
			state.inAction = true;
		},
		[fetchItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.item = payload.data;
		},
		[fetchItem.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Create */
		[createItem.pending]: (state) => {
			state.inAction = true;
		},
		[createItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[createItem.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to create";
		},
		/* Update */
		[updateItem.pending]: (state) => {
			state.inAction = true;
		},
		[updateItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[updateItem.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
		/* Delete */
		[deleteItem.pending]: (state) => {
			state.inAction = true;
		},
		[deleteItem.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[deleteItem.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
	},
});
export const { setRowPerPage, setCurrentPage, setSearchString, setSelectedRow } =
	itemSlice.actions;
export const itemSelector = (state) => state.item;
