import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  API_URI = "http://localhost:3000/api/";
  headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) {
    
  }

  getRoom(data: any){
    return this.http.post(this.API_URI+"room/verify/"+data.idRoom, {});
  }

  addReservation(model: any){
    var token = localStorage.getItem("token");
    var headers = this.headersVariable.set('authorization', token)
    return this.http.post(this.API_URI+"user/"+model.idUser+"/request/"+model.idRoom, model, { headers : headers });
  }
}
