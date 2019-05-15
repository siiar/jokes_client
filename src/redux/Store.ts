import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { reducer as SessionReducer, SessionState } from "./SessionRedux";
import { reducer as JokesReducer, JokesState } from "./JokesRedux";

import axios from 'axios';

export interface StoreState {
    session: SessionState;
    jokes: JokesState
}

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, combineReducers({
    session: SessionReducer,
    jokes: JokesReducer
}))

export const Store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(Store, {} ,()=> {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Store.getState().session.token}`;
})
