import axios from 'axios';
import config from "../config.json";

export function login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(`${config.api_gateway}/user/authenticate`, {username, password})
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                reject(err.response.data.message);
            }else{
                reject(err.message);
            }
        });// end axios.post()
    });// end new Promise()
}// end login()

export function register(username: string, password: string, name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(`${config.api_gateway}/user/register`, {username, password, name})
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if(err.response && err.response.data && err.response.data.message){
                reject(err.response.data.message);
            }else{
                reject(err.message);
            }
        });// end axios.post()
    });// end new Promise()
}// end register()