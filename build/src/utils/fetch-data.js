import { fillArray } from './fill-array.js';
import axios from 'axios';
import fetch from 'cross-fetch';
/**
 * генерує url з масивом --> кількістю об'єктів і робить запит
 * повертає масив отриманих з запиту об'єктів
 * @example https://url.com/[1,2,3,4] >> {id: 1}, {id: 2}, {id: 3}, {id: 4}
 **/
export const fetchData = async (url) => {
    const response = await axios.get(url);
    const countOfObjects = response.data.info.count;
    const arr = fillArray(countOfObjects);
    try {
        const response = await axios.get(`${url}/${arr}`);
        // console.log(response.data);
        return response.data;
    }
    catch (err) {
        throw err;
    }
};
/**
 * Робить паралельний запит по всім url.
 * */
export const makeConcurrentRequest = async (url) => {
    try {
        return await Promise.all(url.map((res) => fetch(res).then((res) => res.json())));
    }
    catch (e) {
        console.log('<< ERROR ON FETCH DATA', e);
    }
};
