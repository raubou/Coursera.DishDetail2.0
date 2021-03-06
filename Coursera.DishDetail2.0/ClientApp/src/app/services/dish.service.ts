import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService, @Inject('WebServiceURL') private WebServiceURL) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.WebServiceURL + 'dishes')
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.WebServiceURL + 'dishes/' + id)
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(this.WebServiceURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
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
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
