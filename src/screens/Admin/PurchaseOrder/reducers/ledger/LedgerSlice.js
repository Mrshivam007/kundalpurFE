import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../../../constants/Config";

export const fetchLedgerBranchList = createAsyncThunk(
	"ledger/fetchLedgerBranchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/ledger/listbranch",
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

export const fetchLedgerSupplierList = createAsyncThunk(
	"ledger/fetchLedgerSupplierList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/ledger/listsup",
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
export const fetchLedgerSupSearchList = createAsyncThunk(
	"ledger/fetchLedgerSupSearchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl +
				"purchase/ledger/listsup?limit=" +
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
			// console.log("response",response);
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const fetchLedgerBraSearchList = createAsyncThunk(
	"ledger/fetchLedgerBraSearchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.get(
				Config.apiUrl +
				"purchase/ledger/listbranch?limit=" +
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
export const fetchLedger = createAsyncThunk(
	"ledger/fetchLedger",
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

export const createLedger = createAsyncThunk(
	"ledger/createLedger",
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
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const updateLedger = createAsyncThunk(
	"ledger/updateLedger",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/pv/update/" + data.id,
				data,
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

export const deleteLedger = createAsyncThunk(
	"ledger/deleteLedger",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/pv/update/" + data.id,
				data,
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
export const ledgerSlice = createSlice({
	name: "ledger",
	initialState: {
		inAction: null,
		error: null,
		message: null,
		ledger: null,
		ledgerBranchList: null,
		ledgerSupplierList: null,
		ledgerSupSearchList: null,
		ledgerBraSearchList:null,
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
		[fetchLedgerBranchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchLedgerBranchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.ledgerBranchList = payload.data.results;
		},
		[fetchLedgerBranchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		// fetch ledger supplier list
		[fetchLedgerSupplierList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchLedgerSupplierList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.ledgerSupplierList = payload.data.results;
		},
		[fetchLedgerSupplierList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch Sup List */
		[fetchLedgerSupSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchLedgerSupSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false; 
			state.ledgerSupplierList = payload.data.results;
		},
		[fetchLedgerSupSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},

		/* Fetch Branch List */
		[fetchLedgerBraSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchLedgerBraSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.ledgerBranchList = payload.data.results;
		},
		[fetchLedgerBraSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch */
		[fetchLedger.pending]: (state) => {
			state.inAction = true;
		},
		[fetchLedger.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.ledger = payload.data;
		},
		[fetchLedger.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Create */
		[createLedger.pending]: (state) => {
			state.inAction = true;
		},
		[createLedger.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[createLedger.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to create";
		},
		/* Update */
		[updateLedger.pending]: (state) => {
			state.inAction = true;
		},
		[updateLedger.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[updateLedger.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
		/* Delete */
		[deleteLedger.pending]: (state) => {
			state.inAction = true;
		},
		[deleteLedger.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[deleteLedger.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
	},
});
export const { setRowPerPage, setCurrentPage, setSearchString, setSelectedRow } =
	ledgerSlice.actions;
export const ledgerSelector = (state) => state.ledger;
