import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URI = "http://localhost:3000/api/user/";
  headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  userForm: User = {
    idUsuario: "",
    apodoUsuario: "",
    nombreUsuario: "",
    correoUsuario: "",
    claveUsuario: "",
    fechaNacUsuario: new Date()
  };

  sesion: any = { 
    data: {
      apodoUsuario: null,
      nombreUsuario: "",
      correoUsuario: "",
      claveUsuario: "",
      fechaNacUsuario: null
    }
  };

  constructor(private http:HttpClient) {}

  getUsers(){
    var token = localStorage.getItem("token");
    var headerss = this.headersVariable.set('authorization', token);
    
    return this.http.get(this.API_URI+"list", { headers : headerss });
  }

  register(user: User){
    return this.http.post(this.API_URI+"register", user);
  }

  login(user: User){
    return this.http.post(this.API_URI+"login", user);
  }

  getUser(){
    var token = localStorage.getItem("token");
    var headerss = this.headersVariable.set('authorization', token);
    
    return this.http.get(this.API_URI, { headers : headerss });
  }

  getPedidos(){
    var token = localStorage.getItem("token");
    var headerss = this.headersVariable.set('authorization', token);

    return this.http.put(this.API_URI, null, {headers : headerss});
  }

  updateUser(user: User){
    var token = localStorage.getItem("token");
    var headerss = this.headersVariable.set('authorization', token);

    return this.http.put(this.API_URI+user.idUsuario, user, {headers : headerss});
  }

  autoRedirect(actionClient, actionHotel, actionAdmin, actionDefault){
    var host = "http://localhost:4200/";
    if(localStorage.getItem("token")){
      this.getUser().subscribe(
        res => {
          this.sesion = res;
          if(this.sesion.data && this.sesion.data.rolUsuario == "CLIENT"){
            if(actionClient){
              window.location.href = host+actionClient;
            }
          }else{
            if(this.sesion.data && this.sesion.data.rolUsuario == "HOTELS"){
              if(actionHotel){
                window.location.href = host+actionHotel;
              }
            }else if(this.sesion.data && this.sesion.data.rolUsuario == "ADMIN"){
              if(actionAdmin){
                window.location.href = host+actionAdmin;
              }
            }else{
                localStorage.removeItem("token");
                window.location.href = host+"/logout";
            }
          }
        },err => console.error(err));
    }else{
      if(actionDefault){
        window.location.href = host+actionDefault;
      }
    }
  }
}
