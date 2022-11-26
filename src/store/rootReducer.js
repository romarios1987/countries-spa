import { combineReducers } from 'redux'
import { countriesReducer } from './countries/countriesReducer'
import { themeReducer } from './theme/themeReducer'

export const rootReducer = combineReducers({
	theme: themeReducer,
	countries: countriesReducer,
})
