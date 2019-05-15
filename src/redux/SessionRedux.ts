import { createReducer } from "reduxsauce";
import { Dispatch } from 'react';

import * as SessionService from "../services/SessionService";
import axios from 'axios';

const reducerName = "session";
/*
 * Action Types
 */
const ActionTypes = {
    LOGIN_ASYNC: `${reducerName}.loginAsync`,
    LOGIN_SUCCESS: `${reducerName}.loginSuccess`,
    LOGIN_FAILURE: `${reducerName}.loginFailure`,

    LOGOUT: `${reducerName}.logout`,

    REGISTER_ASYNC: `${reducerName}.registerAsync`,
    REGISTER_SUCCESS: `${reducerName}.registerSuccess`,
    REGISTER_FAILURE: `${reducerName}.registerFailure`,
};

/*
 * Actions
 */
export const Actions = {
    LoginAsync: (username: string, password: string) => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.LOGIN_ASYNC });
            SessionService.login(username, password)
                .then(data => {
                    //Set the Authorization Token
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data["token"]}`;
                    dispatch(Actions.LoginSuccess(data["username"], data["token"]));
                })
                .catch((errorMessage) => {
                    dispatch(Actions.LoginFailure(errorMessage));
                });// end SessionService.login()

        }// end return
    },// end LoginAsync()

    LoginSuccess: (username: string, token: string) => ({
        type: ActionTypes.LOGIN_SUCCESS,
        _username: username,
        _token: token
    }),// end LoginSuccess()

    LoginFailure: (error: string) => ({
        type: ActionTypes.LOGIN_FAILURE,
        _error: error
    }),// end LoginFailure()

    Logout: () => ({
        type: ActionTypes.LOGOUT,
    }),// end Logout()

    RegisterAsync: (username: string, password: string, name: string) => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.REGISTER_ASYNC });
            SessionService.register(username, password, name)
                .then(res => {
                    dispatch(Actions.RegisterSuccess());
                })
                .catch(err => {
                    dispatch(Actions.RegisterFailure(err));
                });// end SessionService.register()
        }// end return
    },// end RegisterAsync()

    RegisterSuccess: () => ({
        type: ActionTypes.REGISTER_SUCCESS
    }),// end RegisterSuccess()

    RegisterFailure: (error: string) => ({
        type: ActionTypes.REGISTER_FAILURE,
        _error: error
    }),// end RegisterFailure()
};// end Actions
/*
* Initital state
*/
export interface SessionState {
    username: string;
    token: string;

    registerSuccess?: boolean;
    error?: string;
}
const INITIAL_STATE: SessionState = {
    username: "",
    token: "",

};

/*
 * Reducers
 */

function loginAsyncReducer(state: SessionState, { }: any): SessionState {
    return { ...state, error: undefined, registerSuccess: undefined };
}// end loginAsyncReducer()
function loginSuccessReducer(state: SessionState, { _username, _token }: any): SessionState {
    const username = _username as string;
    const token = _token as string;

    return { username, token, error: undefined };
}// end loginSuccessReducer()
function loginFailureReducer(state: SessionState, { _error }: any): SessionState {
    const error = _error as string;

    return { ...state, error };
}// end loginFailureReducer()

function logoutReducer(state: SessionState, { }: any): SessionState {
    return { username: "", token: "" }
}

function registerAsyncReducer(state: SessionState, { }: any): SessionState {
    return { ...state, error: undefined, registerSuccess: undefined };
}// end registerAsyncReducer()
function registerSuccessReducer(state: SessionState, { }: any): SessionState {
    return { ...state, registerSuccess: true };
}// end registerSuccessReducer()
function registerFailureReducer(state: SessionState, { _error }: any): SessionState {
    const error = _error as string;
    return { ...state, error: error };
}// end registerFailureReducer()


export const reducer = createReducer(INITIAL_STATE, {
    [ActionTypes.LOGIN_ASYNC]: loginAsyncReducer,
    [ActionTypes.LOGIN_SUCCESS]: loginSuccessReducer,
    [ActionTypes.LOGIN_FAILURE]: loginFailureReducer,

    [ActionTypes.LOGOUT]: logoutReducer,

    [ActionTypes.REGISTER_ASYNC]: registerAsyncReducer,
    [ActionTypes.REGISTER_SUCCESS]: registerSuccessReducer,
    [ActionTypes.REGISTER_FAILURE]: registerFailureReducer,
});