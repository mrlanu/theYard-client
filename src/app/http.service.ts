import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Trailer} from './models/trailer.model';

@Injectable()
export class HttpService {

  currentTrailer: Trailer;
  currentTrailerChanged = new Subject<Trailer>();

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

  createNewTrailer(trailer: Trailer) {
    const url = `${this.baseUrl}/trailers`;
    this.httpClient.post(url, trailer).subscribe((trlr: Trailer) => {
      console.log('Saved -');
      console.log(trlr);
    });
  }

  getCurrentTrailer() {
    this.httpClient.get(`${this.baseUrl}/user/trailer`)
      .subscribe((trailer: Trailer) => {
        this.currentTrailer = trailer;
        this.currentTrailerChanged.next(trailer);
      });
  }
}
