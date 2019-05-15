import axios from "axios";
import config from "../config.json";
import { Joke } from '../redux/JokesRedux';

export function getJokes(limit?: number): Promise<any> {
    return new Promise((resolve, reject) => {
        if(!limit)
            limit = 10;
        axios.get(`${config.api_gateway}/jokes/random/${limit}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                reject(err.response.data.message);
            }else{
                reject(err.message);
            }
        });// end axios.get()
    });// end new Promise()
}// end getJokes()

export function getLikedJokes(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get(`${config.api_gateway}/jokes/liked`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                reject(err.response.data.message);
            }else{
                reject(err.message);
            }
        });// end axios.get
    });// end new Promise()
}// end getLikedJokes()

export function likeJoke(joke: Joke): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(`${config.api_gateway}/jokes/like`, joke)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                reject(err.response.data.message);
            }else{
                reject(err.message);
            }
        });// end axios.post()
    });// end new Promise()
}// end likeJoke()
export function dislikeJoke(jokeId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.delete(`${config.api_gateway}/jokes/like/${jokeId}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                reject(err.response.data.message);
            }else{
                reject(err.message);
            }
        });// end axios.post()
    });// end new Promise()
}// end dislikeJoke()