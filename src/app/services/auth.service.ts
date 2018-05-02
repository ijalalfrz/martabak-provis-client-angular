import { Injectable } from '@angular/core';

import { LocalStorageService } from 'ngx-webstorage';

import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from '../models/UserModel';

import { BASE_API } from '../global';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

  })
};


@Injectable()
export class AuthService {
  private isLogin = new BehaviorSubject<boolean>(false);

  $isLogin = this.isLogin.asObservable();


  constructor(private http: HttpClient,private storage:LocalStorageService) {
  }

  getToken(user:User):Observable<User> {
    return this.http.post<User>(`${BASE_API()}/token`, user, httpOptions)
      .pipe(
        tap(data =>{})
      );
  }

  isAuthenticated(){
    if(this.storage.isStorageAvailable()){
      let data = this.storage.retrieve('user_auth');
      if(data){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  getStorage(){
    if(this.storage.isStorageAvailable()){
      let data = this.storage.retrieve('user_auth');
      if(data){
        return data;
      }else{
        return null;
      }
    }else{
      return null;
    }
  }

  login(){
    this.isLogin.next(true);
  }

  logout(){
    this.isLogin.next(false);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };


  }
}
