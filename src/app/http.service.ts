import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Trailer} from './models/trailer.model';

@Injectable()
export class HttpService {

  trailersChanged = new Subject<Trailer[]>();
  private trailers: Trailer[] = [];

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  fetchAllTrailersByCompanyId(companyId: number) {
    const url = `${this.baseUrl}/trailers`;
    const params = new HttpParams().set('companyId', companyId.toString());
    this.httpClient.get(url, {params})
      .subscribe((trailers: Trailer[]) => {
        this.trailers = trailers;
        this.trailersChanged.next(trailers);
      });
  }

  getAllTrailers() {
    return this.trailers.slice();
  }
}
