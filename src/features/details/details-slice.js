import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loadCountryByName = createAsyncThunk(
	'@@details/load-country',
	async (name, { extra: { api, client } }) => {
		return await client.get(api.searchByCountry(name))
	}
)

export const loadNeighborsByBorder = createAsyncThunk(
	'@@details/load-neighbors',
	async (borders, { extra: { api, client } }) => {
		return await client.get(api.filterByCode(borders))
	}
)

const initialState = {
	currentCountry: null,
	neighbors: [],
	status: 'idle', // loading | received | rejected
	error: null,
}

const detailsSlice = createSlice({
	name: '@@details',
	initialState,
	reducers: {
		clearDetails: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadCountryByName.pending, (state, action) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loadCountryByName.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload || action.meta.error
			})
			.addCase(loadCountryByName.fulfilled, (state, action) => {
				state.status = 'received'
				state.error = null
				state.currentCountry = action.payload.data[0]
			})

			.addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
				state.status = 'received'
				state.error = null
				state.neighbors = action.payload.data.map((country) => country.name)
			})
	},
})

export const { clearDetails } = detailsSlice.actions
export const detailsReducer = detailsSlice.reducer

// Selectors
export const selectCurrrentCountry = (state) => state.details.currentCountry
export const selectDetails = (state) => state.details
export const selectNeighbors = (state) => state.details.neighbors
