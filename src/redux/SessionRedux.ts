import {createReducer} from "reduxsauce";
import { Dispatch } from 'react';

import * as SessionService from "../services/SessionService";

const reducerName = "session";
/*
 * Action Types
 */
const ActionTypes = {
    LOGIN_ASYNC: `${reducerName}.loginAsync`,
    LOGIN_SUCCESS: `${reducerName}.loginSuccess`,
    LOGIN_FAILURE: `${reducerName}.loginFailure`,

    REGISTER_ASYNC: `${reducerName}.registerAsync`,
    REGISTER_SUCCESS: `${reducerName}.registerSuccess`,
    REGISTER_FAILURE: `${reducerName}.registerFailure`,
};

/*
 * Actions
 */
export const Actions = {
    LoginAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({type: ActionTypes.LOGIN_ASYNC});
            SessionService.login()
            .then(res => {
                dispatch({type: ActionTypes.LOGIN_SUCCESS});
            })
            .catch(err => {
                dispatch({type: ActionTypes.LOGIN_FAILURE});
            });// end SessionService.login()
            
        }// end return
    },// end LoginAsync()

    LoginSuccess: () => ({
        type: ActionTypes.LOGIN_SUCCESS
    }),// end LoginSuccess()

    LoginFailure: () => ({
        type: ActionTypes.LOGIN_FAILURE
    }),// end LoginFailure()

    RegisterAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({type: ActionTypes.REGISTER_ASYNC});
            SessionService.register()
            .then(res => {
                dispatch({type: ActionTypes.REGISTER_SUCCESS});
            })
            .catch(err => {
                dispatch({type: ActionTypes.REGISTER_FAILURE});
            });// end SessionService.register()
        }// end return
    },// end RegisterAsync()

    RegisterSuccess: () => ({
        type: ActionTypes.REGISTER_SUCCESS
    }),// end RegisterSuccess()

    RegisterFailure: () => ({
        type: ActionTypes.REGISTER_FAILURE
    }),// end RegisterFailure()
};// end Actions
 /*
 * Initital state
 */
export interface SessionState {
    user_id: string;
    session_id: string;
}
const INITIAL_STATE: SessionState = {
    user_id: "",
    session_id: "",
};

/*
 * Reducers
 */

function loginAsyncReducer(state: SessionState, {}: any): SessionState {
    return state;
}// end loginAsyncReducer()
function loginSuccessReducer(state: SessionState, {}: any): SessionState {
    return state;
}// end loginSuccessReducer()
function loginFailureReducer(state: SessionState, {}: any): SessionState {
    return state;
}// end loginFailureReducer()

function registerAsyncReducer(state: SessionState, {}: any): SessionState {
    return state;
}// end registerAsyncReducer()
function registerSuccessReducer(state: SessionState, {}: any): SessionState {
    return state;
}// end registerSuccessReducer()
function registerFailureReducer(state: SessionState, {}: any): SessionState {
    return state;
}// end registerFailureReducer()


export const reducer = createReducer(INITIAL_STATE, {
    [ActionTypes.LOGIN_ASYNC]: loginAsyncReducer, 
    [ActionTypes.LOGIN_SUCCESS]: loginSuccessReducer,
    [ActionTypes.LOGIN_FAILURE]: loginFailureReducer,

    [ActionTypes.REGISTER_ASYNC]: registerAsyncReducer, 
    [ActionTypes.REGISTER_SUCCESS]: registerSuccessReducer,
    [ActionTypes.REGISTER_FAILURE]: registerFailureReducer,
});