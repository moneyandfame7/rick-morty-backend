import { fillArray } from './fill-array.js';
import axios from 'axios';
import fetch, { Response } from 'node-fetch';

export const fetchData = async <T>(url: string): Promise<Array<T>> => {
  const response = await axios.get(url);
  const countOfObjects = response.data.info.count;
  const arr = fillArray(countOfObjects);
  try {
    const response = await axios.get(`${url}/${arr}`);
    // console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
/**
 * Асинхронная функция *Promise.all()*;
 * */
export const makeConcurrentRequest = async <T>(url: string[]): Promise<any> => {
  try {
    return await Promise.all(url.map((res) => fetch(res).then((res) => res.json())));
  } catch (e: any) {
    console.log('<< ERROR ON FETCH DATA', e);
  }
};
