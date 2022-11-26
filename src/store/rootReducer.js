import { combineReducers } from 'redux'
import { controlsReducer } from './controls/controlsReducer'
import { countriesReducer } from './countries/countriesReducer'
import { themeReducer } from './theme/themeReducer'

export const rootReducer = combineReducers({
	theme: themeReducer,
	countries: countriesReducer,
	controls: controlsReducer,
})
