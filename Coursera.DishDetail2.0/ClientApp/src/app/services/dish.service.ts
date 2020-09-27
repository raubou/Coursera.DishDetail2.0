import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { WebServiceURL } from '../shared/WebServiceURL';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  //constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  ////getDishes(): Dish[] {
  ////  return DISHES;
  ////}

  //getDishes(): Observable<Dish[]> {
  //  //return Promise.resolve(DISHES);
  //  //return new Promise((resolve) => {
  //  //  setTimeout(() => resolve(DISHES), 2020)
  //  //})
  //  //return of(DISHES).pipe(delay(2020)).toPromise();
  //  //return of(DISHES).pipe(delay(2020));
  //  return this.http.get<Dish[]>(baseURL + "dishes").pipe(catchError(this.processHTTPMsgService.HandleError));
  //}

  ////getDish(id: string): Dish {
  ////  return DISHES.filter((dish) => (dish.id === id))[0]
  ////}

  ////getFeaturedDish(): Dish {
  ////  return DISHES.filter((dish) => dish.featured)[0]
  ////}

  ////getDish(id: string): Promise<Dish> {
  //getDish(id: string): Observable <Dish> {
  //  //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0])
  //  //return new Promise((resolve) => {
  //  //  setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]),2020)
  //  //})
  //  //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2020));
  //  return this.http.get<Dish>(baseURL + "dishes/" + id).pipe(catchError(this.processHTTPMsgService.HandleError));
  //}

  ////getFeaturedDish(): Promise<Dish> {
  //getFeaturedDish(): Observable <Dish> {
  //  //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0])
  //  //return new Promise((resolve) => {
  //  //  setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2020)
  //  //})
  //  //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2020)).toPromise()
  //  return this.http.get<Dish>(baseURL + "dishes?featured=true").pipe(map(dishes => dishes[0])).pipe(catchError(this.processHTTPMsgService.HandleError));
  //}

  //getDishIds(): Observable<string[] | any> {
  //  //return of(DISHES.map(dish => dish.id)).pipe(delay(2020));
  //  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
  //}

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService, @Inject('WebServiceURL') private WebServiceURL) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.WebServiceURL + 'dishes')
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + error.statusText || '' + error.error.Message)));
      //.pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.WebServiceURL + 'dishes/' + id)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + error.statusText || '' + error.error.Message)));
      //.pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(this.WebServiceURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + error.statusText || '' +  error.error.Message)));
      //.pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(this.WebServiceURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.status + error.statusText || '' + error.error.Message)));
      //.pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
