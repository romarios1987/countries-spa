import axios from 'axios'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './rootReducer'
import * as api from '../config'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: [],
	whitelist: ['theme'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
	persistedReducer,
	composeEnhancers(
		applyMiddleware(thunk.withExtraArgument({ client: axios, api }))
	)
)

let persistor = persistStore(store)

export { store, persistor }
