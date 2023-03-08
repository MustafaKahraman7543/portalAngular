import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenModel } from '../models/accessTokenModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModels';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = "http://localhost:60805/api/Auth/";
  constructor(private httpClient:HttpClient) {   }

  login(loginModel:LoginModel){
    return this.httpClient.post<AccessTokenModel<TokenModel>>(this.apiUrl+"Login",loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;

    }else{
      return false;
    }
  }
}
