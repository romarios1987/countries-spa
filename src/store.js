import axios from 'axios'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

import * as api from './config'
import { themeReducer } from './features/theme/theme-slice'
import { controlReducer } from './features/controls/controls-slice'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['theme'],
}

const rootReducer = combineReducers({
	theme: themeReducer,
	controls: controlReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: {
					client: axios,
					api,
				},
			},
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
