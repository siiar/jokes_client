import {createStore, combineReducers} from "redux";
import {reducer as SessionReducer, SessionState} from "./SessionRedux";
import {reducer as JokesReducer, JokesState} from "./JokesRedux";

export interface StoreState {
    session: SessionState;
    jokes: JokesState
}

export const Store = createStore(combineReducers({
    session: SessionReducer,
    jokes: JokesReducer
}));
