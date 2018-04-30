import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MenuModel } from '../models/MenuModel';
import { MenuPrice } from '../models/MenuPriceModel';

import { BASE_API } from '../global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',

  })
};

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) {

    }

    getMenus (): Observable<MenuModel[]> {
      return this.http.get<MenuModel[]>(`${BASE_API()}/menu`, httpOptions)
        .pipe(
          tap(heroes => console.log(`fetched menu`)),
          catchError(this.handleError('getMenu', []))
        );
    }

    getMenusByCat (cat:string): Observable<MenuModel[]> {
      return this.http.get<MenuModel[]>(`${BASE_API()}/menu/category/${cat}`, httpOptions)
        .pipe(
          tap(heroes => console.log(`fetched menu`)),
          catchError(this.handleError('getMenu', []))
        );
    }

    getSizeById (id:number): Observable<MenuPrice[]> {
      return this.http.get<MenuPrice[]>(`${BASE_API()}/menu/price/${id}`, httpOptions)
        .pipe(
          tap(heroes => console.log(`fetched menu`)),
          catchError(this.handleError('getMenu', []))
        );
    }




    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };


    }

}
