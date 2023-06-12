import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { User, IUserResponse } from '../model/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../model/api.response';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: any = null;


  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})};

  constructor(private http: HttpClient,private router: Router) { }
  
  postUser(user: User){
   return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  async getUserProfile(){
    try {
      this.user = await this.http.get(environment.apiBaseUrl + '/userProfile');
      return this.http.get(environment.apiBaseUrl + '/userProfile');
  } catch (error) {
      this.logout();
      throw error;
  }
    return  this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  setToken(token: string) {
    localStorage.setItem('token',token);
  }

  deleteToken() {
    localStorage.removeItem('token')
  }

  getUserPayload(){
    var token = this.getToken();
    if(token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if (userPayload)
    return userPayload.exp > Date.now() /1000;
    else return false;
  } 


  getAllDrivers():  Observable<ApiResponse>{
    return this.http.get<ApiResponse>(environment.apiBaseUrl+'/getDrivers')
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['/login']);
  }



  
  /*search(filter: {name: string} = {name: ''}, page = 1): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(environment.apiBaseUrl+'/getDrivers')
    .pipe(
      tap((response: IUserResponse) => {
        response.results = response.results
       // console.log(response);
       .filter(drivers => drivers.fullName.includes(filter.name))
        console.log(response);
        return response;
      })
      );
  }*/



}
