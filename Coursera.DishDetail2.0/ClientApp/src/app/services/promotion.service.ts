import { Injectable, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService, @Inject('WebServiceURL') private WebServiceURL) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.WebServiceURL + 'Promotions')
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getDishPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(this.WebServiceURL + 'Promotions/' + id)
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(this.WebServiceURL + 'Promotions?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(Promotions => Promotions.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(promotion: Promotion): Observable<Promotion> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Promotion>(this.WebServiceURL + 'Promotion/' + promotion.id, promotion, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
