import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loadCountries = createAsyncThunk(
	'@@countries/load-countries',
	async (_, { extra: { api, client } }) => {
		return await client.get(api.ALL_COUNTRIES)
	}
)

const initialState = {
	list: [],
	status: 'idle', // loading | received | rejected
	error: null,
}

const countrySlice = createSlice({
	name: '@@countries',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCountries.pending, (state, action) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loadCountries.rejected, (state, action) => {
				state.status = 'rejected'
				state.error = action.payload || action.meta.error
			})
			.addCase(loadCountries.fulfilled, (state, action) => {
				state.status = 'received'
				state.error = null
				state.list = action.payload.data
			})
	},
})
export const countryReducer = countrySlice.reducer

// Selectors
export const selectCountriesInfo = (state) => ({
	status: state.countries.status,
	error: state.countries.error,
	qty: state.countries.list.length,
})
export const selectAllCountries = (state) => state.countries.list
export const selectVisibleCountries = (state, { search = '', region = '' }) => {
	return state.countries.list.filter(
		(country) =>
			country.name.toLowerCase().includes(search.toLowerCase()) &&
			country.region.includes(region)
	)
}
