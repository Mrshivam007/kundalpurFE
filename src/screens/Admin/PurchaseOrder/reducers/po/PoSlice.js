import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../../../../constants/Config";
import { toast } from "react-toastify";
export const fetchPoSearchList = createAsyncThunk(
	"po/fetchPoSearchList",
	async (data, { getState }, thunkAPI) => {
		const auth = localStorage.getItem("token");
		const { po } = getState();

		try {
			const response = await axios.get(
				Config.apiUrl +
					"purchase/po/list?limit=" +
					po.limit +
					"&offset=" +
					po.offset +
					po.searchString,
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

export const fetchPo = createAsyncThunk(
	"po/fetchPo",
	async (data, { getState }, thunkAPI) => {
	    const auth = localStorage.getItem("token");

		try {
			const response = await axios.get(
				Config.apiUrl + "purchase/po/retrive/" + data.id,
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

export const createPo = createAsyncThunk(
	"po/createPo",
	async (data, { getState }, thunkAPI) => {
	    const auth = localStorage.getItem("token");

		try {
			const response = await axios.post(
				Config.apiUrl + "purchase/po/create",
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
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const updatePo = createAsyncThunk(
	"po/updatePo",
	async (data, { getState }, thunkAPI) => {
	    const auth = localStorage.getItem("token");


		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/po/update/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Successfully Updated");
			return response;
		} catch (e) {
			toast.error(e?.response?.data?.non_field_errors[0]);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);

export const deletePo = createAsyncThunk(
	"po/deletePo",
	async (data, { getState }, thunkAPI) => {
	    const auth = localStorage.getItem("token");

		try {
			const response = await axios.put(
				Config.apiUrl + "purchase/po/delete/" + data.id,
				data,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);
			toast.success("Successfully Deleted");
			return response;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
		}
	},
);
export const poSlice = createSlice({
	name: "po",
	initialState: {
		inAction: null,
		error: null,
		message: null,
		po: null,
		poList: null,
		poSearchList: null,
		searchString: "",
		limit: 15,
		offset: 0,
	},
	reducers: {
		clearFlag: (state) => {
			state.inAction = null;
			state.error = null;
			state.message = null;
			return state;
		},
		setLimit: (state, action) => {
			state.limit = action.payload;
			return state;
		},
		setOffset: (state, action) => {
			state.offset = action.payload;
			return state;
		},
		setSearchString: (state, action) => {
			state.searchString = action.payload;
			return state;
		},
	},
	extraReducers: {
	
		[fetchPoSearchList.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPoSearchList.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.poSearchList = payload.data;
		},
		[fetchPoSearchList.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Fetch */
		[fetchPo.pending]: (state) => {
			state.inAction = true;
		},
		[fetchPo.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.po = payload.data;
		},
		[fetchPo.rejected]: (state, { payload }) => {
			state.inAction = false;
		},
		/* Create */
		[createPo.pending]: (state) => {
			state.inAction = true;
		},
		[createPo.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[createPo.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to create";
		},
		/* Update */
		[updatePo.pending]: (state) => {
			state.inAction = true;
		},
		[updatePo.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[updatePo.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
		/* Delete */
		[deletePo.pending]: (state) => {
			state.inAction = true;
		},
		[deletePo.fulfilled]: (state, { payload }) => {
			state.inAction = false;
			state.error = false;
		},
		[deletePo.rejected]: (state, { payload }) => {
			state.inAction = false;
			state.error = true;
			state.message = "Unable to update";
		},
	},
});
export const { clearFlag, setLimit, setOffset, setSearchString } =
	poSlice.actions;
export const poSelector = (state) => state.po;
