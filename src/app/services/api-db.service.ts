import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiDbService {
  constructor() {}

  getAllData() {
    return axios.get('http://localhost:3000/getAllData');
  }

  getConsumoTramo(startDate: string | Date, endDate: string | Date) {
    console.log(startDate, endDate);
    return axios.get('http://localhost:3000/getConsumoTramo', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  getCostoTramo(startDate: string | Date, endDate: string | Date) {
    console.log(startDate, endDate);
    return axios.get('http://localhost:3000/getCostoTramo', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }

  getPerdidaTramo(startDate: string | Date, endDate: string | Date) {
    return axios.get('http://localhost:3000/getPerdidaTramo', {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  }
}
