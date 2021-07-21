import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hotels } from "../models/hotels.list";

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  API_URI = "http://localhost:3000/api/hotel/";
  headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) {
    
  }

  getHotels(){
    return this.http.get(this.API_URI+"list");
  }

  searchHotel(nombre: string){
    return this.http.post(this.API_URI+"search", nombre);
  }

  getHotel(id: string){
    return this.http.get(this.API_URI+id);
  }

  setHotel(hotelData: any){
    var token = localStorage.getItem("token");
    var headerss = this.headersVariable.set('authorization', token);

    return this.http.post(this.API_URI, JSON.stringify(hotelData), { headers : headerss });
  }
}