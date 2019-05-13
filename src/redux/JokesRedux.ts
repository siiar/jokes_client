import {createReducer} from "reduxsauce";
import { Dispatch } from 'react';

import * as JokesService from "../services/JokesSerivce";

const reducerName = "jokes";
/*
 * Action Types
 */
const ActionTypes = {
    GET_JOKES_ASYNC: `${reducerName}.getJokesAsync`,
    GET_JOKES_SUCCESS: `${reducerName}.getJokesSuccess`,
    GET_JOKES_FAILURE: `${reducerName}.getJokesFailure`,

    LIKE_JOKE_ASYNC: `${reducerName}.likeJokeAsync`,
    LIKE_JOKE_SUCCESS: `${reducerName}.likeJokeSuccess`,
    LIKE_JOKE_FAILURE: `${reducerName}.likeJokeFailure`,
};// end ActionTypes

/*
 * Actions
 */
export const Actions = {
    GetJokesAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({type: ActionTypes.GET_JOKES_ASYNC});
            JokesService.getJokes()
            .then(res => {
                dispatch({type: ActionTypes.GET_JOKES_SUCCESS});
            })
            .catch(err => {
                dispatch({type: ActionTypes.GET_JOKES_FAILURE});
            });// end JokesService.getJokes()
        }// end return
    },// end GetJokesAsync()

    GetJokesSuccess: () => ({
        type: ActionTypes.GET_JOKES_SUCCESS
    }),// end GetJokesSuccess()

    GetJokesFailure: () => ({
        type: ActionTypes.GET_JOKES_FAILURE
    }),// end GetJokesFailure()

    LikeJokeAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({type: ActionTypes.LIKE_JOKE_ASYNC});
            JokesService.likeJoke()
            .then(res => {
                dispatch({type: ActionTypes.LIKE_JOKE_SUCCESS});
            })
            .catch(err => {
                dispatch({type: ActionTypes.LIKE_JOKE_FAILURE});
            });// end JokesService.likeJoke()
        }// end return
    },// end LikeJokeAsync()

    LikeJokeSuccess: () => ({
        type: ActionTypes.LIKE_JOKE_SUCCESS
    }),// end LikeJokeSuccess()

    LikeJokeFailure: () => ({
        type: ActionTypes.LIKE_JOKE_FAILURE
    }),// end LikeJokeFailure()
};// end Actions

 /*
 * Initital state
 */
export interface JokesState {
    random_jokes: string[];
    liked_jokes: string[];
}
const INITIAL_STATE: JokesState = {
    random_jokes: [],
    liked_jokes: [],
};

/*
 * Reducers
 */

function getJokesAsyncReducer(state: JokesState, {}: any): JokesState {
    return state;
}// end getJokesAsyncReducer()
function getJokesSuccessReducer(state: JokesState, {}: any): JokesState {
    return state;
}// end getJokesAsyncReducer()
function getJokesFailureReducer(state: JokesState, {}: any): JokesState {
    return state;
}// end getJokesAsyncReducer()
function likeJokeAsyncReducer(state: JokesState, {}: any): JokesState {
    return state;
}// end getJokesAsyncReducer()
function likeJokeSuccessReducer(state: JokesState, {}: any): JokesState {
    return state;
}// end getJokesAsyncReducer()
function likeJokeFailureReducer(state: JokesState, {}: any): JokesState {
    return state;
}// end getJokesAsyncReducer()

export const reducer = createReducer(INITIAL_STATE, {
    [ActionTypes.GET_JOKES_ASYNC]: getJokesAsyncReducer, 
    [ActionTypes.GET_JOKES_SUCCESS]: getJokesSuccessReducer, 
    [ActionTypes.GET_JOKES_FAILURE]: getJokesFailureReducer, 

    [ActionTypes.LIKE_JOKE_ASYNC]: likeJokeAsyncReducer, 
    [ActionTypes.LIKE_JOKE_SUCCESS]: likeJokeSuccessReducer, 
    [ActionTypes.LIKE_JOKE_FAILURE]: likeJokeFailureReducer, 
});// end createReducer()