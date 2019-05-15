import { createReducer } from "reduxsauce";
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

    GET_LIKED_JOKES_ASYNC: `${reducerName}.getLikedJokesAsync`,
    GET_LIKED_JOKES_SUCCESS: `${reducerName}.getLikedJokesSuccess`,
    GET_LIKED_JOKES_FAILURE: `${reducerName}.getLikedJokesFailure`,

    LIKE_JOKE_ASYNC: `${reducerName}.likeJokeAsync`,
    LIKE_JOKE_SUCCESS: `${reducerName}.likeJokeSuccess`,
    LIKE_JOKE_FAILURE: `${reducerName}.likeJokeFailure`,

    LIKE_RANDOM_JOKE_ASYNC: `${reducerName}.likeRandomJokeAsync`,
    LIKE_RANDOM_JOKE_SUCCESS: `${reducerName}.likeRandomJokeSuccess`,
    LIKE_RANDOM_JOKE_FAILURE: `${reducerName}.likeRandomJokeFailure`,

    DISLIKE_JOKE_ASYNC: `${reducerName}.dislikeJokeAsync`,
    DISLIKE_JOKE_SUCCESS: `${reducerName}.dislikeJokeSuccess`,
    DISLIKE_JOKE_FAILURE: `${reducerName}.dislikeJokeFailure`,

    TOGGLE_RANDOM_LIKE_SYSTEM: `${reducerName}.toggleRandomLikeSystem`
};// end ActionTypes

/*
 * Actions
 */
export const Actions = {
    GetJokesAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.GET_JOKES_ASYNC });
            JokesService.getJokes()
                .then(res => {
                    console.log("ASYNC", res);
                    dispatch(Actions.GetJokesSuccess(res["jokes"]));
                })
                .catch(err => {
                    console.log("ERR", err);
                    dispatch(Actions.GetJokesFailure(err));
                });// end JokesService.getJokes()
        }// end return
    },// end GetJokesAsync()

    GetJokesSuccess: (jokes: Joke[]) => ({
        type: ActionTypes.GET_JOKES_SUCCESS,
        _jokes: jokes
    }),// end GetJokesSuccess()
    GetJokesFailure: (error: any) => ({
        type: ActionTypes.GET_JOKES_FAILURE,
        _error: error
    }),// end GetJokesFailure()

    GetLikedJokesAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.GET_LIKED_JOKES_ASYNC });
            JokesService.getLikedJokes()
                .then(res => {
                    console.log("RES", res);
                    dispatch(Actions.GetLikedJokesSuccess(res));
                })
                .catch(err => {
                    dispatch(Actions.GetLikedJokesFailure(err));
                });// end JokesService.getLikedJokes()
        }// end return
    },// end GetJokesAsync()

    GetLikedJokesSuccess: (jokes: Joke[]) => ({
        type: ActionTypes.GET_LIKED_JOKES_SUCCESS,
        _jokes: jokes
    }),// end GetJokesSuccess()

    GetLikedJokesFailure: (error: any) => ({
        type: ActionTypes.GET_LIKED_JOKES_FAILURE,
        _error: error
    }),// end GetJokesFailure()

    LikeRandomJokeAsync: () => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.LIKE_RANDOM_JOKE_ASYNC });
            JokesService.getJokes(1)
                .then(res => {
                    const joke = res["jokes"][0] as Joke;
                    console.log("RANDOM LIKE ", joke);
                    dispatch(Actions.LikeJokeAsync(joke));
                    console.log("RES", res);
                })
                .catch(err => {
                    console.log("ERR: ", err);
                    dispatch(Actions.LikeRandomJokeFailure(err));
                });// end JokesService.likeJoke()
        }// end return
    },// end LikeJokeAsync()

    LikeRandomJokeSuccess: (joke: Joke) => ({
        type: ActionTypes.LIKE_RANDOM_JOKE_SUCCESS,
        _joke: joke
    }),// end LikeJokeSuccess()

    LikeRandomJokeFailure: (error: any) => ({
        type: ActionTypes.LIKE_RANDOM_JOKE_FAILURE,
        _error: error
    }),// end LikeJokeFailure()

    LikeJokeAsync: (joke: Joke) => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.LIKE_JOKE_ASYNC });
            JokesService.likeJoke(joke)
                .then(res => {
                    dispatch(Actions.LikeJokeSuccess(joke));
                    console.log("RES", res);
                })
                .catch(err => {
                    console.log("ERR: ", err);
                    dispatch(Actions.LikeJokeFailure(err));
                });// end JokesService.likeJoke()
        }// end return
    },// end LikeJokeAsync()

    LikeJokeSuccess: (joke: Joke) => ({
        type: ActionTypes.LIKE_JOKE_SUCCESS,
        _joke: joke
    }),// end LikeJokeSuccess()

    LikeJokeFailure: (error: any) => ({
        type: ActionTypes.LIKE_JOKE_FAILURE,
        _error: error
    }),// end LikeJokeFailure()

    DislikeJokeAsync: (jokeId: number) => {
        return (dispatch: Dispatch<any>) => {
            dispatch({ type: ActionTypes.DISLIKE_JOKE_ASYNC });
            JokesService.dislikeJoke(jokeId)
                .then(res => {
                    dispatch(Actions.DisikeJokeSuccess(jokeId));
                })
                .catch(err => {
                    dispatch(Actions.DislikeJokeFailure(err));
                });// end JokesService.dislikeJoke()
        }// end return
    },// end DislikeJokeAsync()

    DisikeJokeSuccess: (jokeId: number) => ({
        type: ActionTypes.DISLIKE_JOKE_SUCCESS,
        _jokeId: jokeId
    }),// end DisikeJokeSuccess()

    DislikeJokeFailure: (error: any) => ({
        type: ActionTypes.DISLIKE_JOKE_FAILURE,
        _error: error
    }),// end DislikeJokeFailure()

    ToggleRandomLikeSystem: () => ({
        type: ActionTypes.TOGGLE_RANDOM_LIKE_SYSTEM,
    })
};// end Actions

/*
* Initital state
*/
export interface Joke {
    id: number,
    joke: string,
}

export interface JokesState {
    random_jokes: Joke[];
    liked_jokes: Joke[];

    random_like_system: boolean;
    error?: string
}
const INITIAL_STATE: JokesState = {
    random_jokes: [],
    liked_jokes: [],

    random_like_system: false,
};

/*
 * Reducers
 */

function getJokesAsyncReducer(state: JokesState, { }: any): JokesState {
    return { ...state, error: undefined };
}// end getJokesAsyncReducer()
function getJokesSuccessReducer(state: JokesState, { _jokes }: any): JokesState {
    const jokes = _jokes as Joke[];
    return { ...state, random_jokes: jokes, error: undefined };
}// end getJokesAsyncReducer()
function getJokesFailureReducer(state: JokesState, { _error }: any): JokesState {
    const error = _error as string;
    return { ...state, error };
}// end getJokesAsyncReducer()

function getLikedJokesAsyncReducer(state: JokesState, { }: any): JokesState {
    return { ...state, error: undefined };
}// end getLikedJokesAsyncReducer()
function getLikedJokesSuccessReducer(state: JokesState, { _jokes }: any): JokesState {
    const jokes = _jokes as Joke[];
    return { ...state, liked_jokes: jokes, error: undefined };
}// end getLikedJokesSuccessReducer()
function getLikedJokesFailureReducer(state: JokesState, { _error }: any): JokesState {
    const error = _error as string;
    return { ...state, error };
}// end getLikedJokesFailureReducer()

function likeJokeAsyncReducer(state: JokesState, { }: any): JokesState {
    return { ...state, error: undefined };
}// end likeJokeAsyncReducer()
function likeJokeSuccessReducer(state: JokesState, { _joke }: any): JokesState {
    const joke = _joke as Joke;
    return { ...state, liked_jokes: [...state.liked_jokes, joke], error: undefined };
}// end likeJokeSuccessReducer()
function likeJokeFailureReducer(state: JokesState, { _error }: any): JokesState {
    const error = _error as string;
    return { ...state, error };
}// end likeJokeFailureReducer()

function likeRandomJokeAsyncReducer(state: JokesState, { }: any): JokesState {
    return { ...state, error: undefined };
}// end likeRandomJokeAsyncReducer()
function likeRandomJokeSuccessReducer(state: JokesState, { _joke }: any): JokesState {
    const joke = _joke as Joke;
    return { ...state, liked_jokes: [...state.liked_jokes, joke], error: undefined };
}// end likeRandomJokeSuccessReducer()
function likeRandomJokeFailureReducer(state: JokesState, { _error }: any): JokesState {
    const error = _error as string;
    return { ...state, error };
}// end likeRandomJokeFailureReducer()

function dislikeJokeAsyncReducer(state: JokesState, { }: any): JokesState {
    return { ...state, error: undefined };
}// end dislikeJokeAsyncReducer()
function dislikeJokeSuccessReducer(state: JokesState, { _jokeId }: any): JokesState {
    const jokeId = _jokeId as number;
    let likedJokes = [...state.liked_jokes];

    likedJokes = likedJokes.filter((joke) => {
        return joke.id !== jokeId
    });

    return { ...state, error: undefined, liked_jokes: likedJokes };
}// end dislikeJokeSuccessReducer()
function dislikeJokeFailureReducer(state: JokesState, { _error }: any): JokesState {
    const error = _error as string;
    return { ...state, error };
}// end dislikeJokeFailureReducer()

function toggleRandomLikeSystemReducer(state: JokesState, { }: any): JokesState {
    return { ...state, random_like_system: !state.random_like_system }
}

export const reducer = createReducer(INITIAL_STATE, {
    [ActionTypes.GET_JOKES_ASYNC]: getJokesAsyncReducer,
    [ActionTypes.GET_JOKES_SUCCESS]: getJokesSuccessReducer,
    [ActionTypes.GET_JOKES_FAILURE]: getJokesFailureReducer,

    [ActionTypes.GET_LIKED_JOKES_ASYNC]: getLikedJokesAsyncReducer,
    [ActionTypes.GET_LIKED_JOKES_SUCCESS]: getLikedJokesSuccessReducer,
    [ActionTypes.GET_LIKED_JOKES_FAILURE]: getLikedJokesFailureReducer,

    [ActionTypes.LIKE_JOKE_ASYNC]: likeJokeAsyncReducer,
    [ActionTypes.LIKE_JOKE_SUCCESS]: likeJokeSuccessReducer,
    [ActionTypes.LIKE_JOKE_FAILURE]: likeJokeFailureReducer,

    [ActionTypes.LIKE_RANDOM_JOKE_ASYNC]: likeRandomJokeAsyncReducer,
    [ActionTypes.LIKE_RANDOM_JOKE_SUCCESS]: likeRandomJokeSuccessReducer,
    [ActionTypes.LIKE_RANDOM_JOKE_FAILURE]: likeRandomJokeFailureReducer,

    [ActionTypes.DISLIKE_JOKE_ASYNC]: dislikeJokeAsyncReducer,
    [ActionTypes.DISLIKE_JOKE_SUCCESS]: dislikeJokeSuccessReducer,
    [ActionTypes.DISLIKE_JOKE_FAILURE]: dislikeJokeFailureReducer,

    [ActionTypes.TOGGLE_RANDOM_LIKE_SYSTEM]: toggleRandomLikeSystemReducer,
});// end createReducer()