import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService, @Inject('WebServiceURL') private WebServiceURL) { }

  getLeaderShips(): Observable<Leader[]> {
    return this.http.get<Leader[]>(this.WebServiceURL + 'leadership')
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getLeaderShip(id: number): Observable<Leader> {
    return this.http.get<Leader>(this.WebServiceURL + 'leadership/' + id)
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getFeaturedLeaderShip(): Observable<Leader> {
    return this.http.get<Leader[]>(this.WebServiceURL + 'leadership?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError((error: HttpErrorResponse) => this.processHTTPMsgService.handleError));
  }

  getLeaderShipIds(): Observable<number[] | any> {
    return this.getLeaderShips().pipe(map(leaders => leaders.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putLeaderShip(leader: Leader): Observable<Leader> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Leader>(this.WebServiceURL + 'leadership/' + leader.id, leader, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
