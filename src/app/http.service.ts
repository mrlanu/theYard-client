import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Trailer} from './models/trailer.model';
import {Log} from './models/log.model';

@Injectable()
export class HttpService {

  currentTrailer: Trailer;
  currentTrailerChanged = new Subject<Trailer>();
  logsChanged = new Subject<Log[]>();

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
      this.fetchAllTrailersByCompanyId(1);
    });
  }

  fetchCurrentTrailer() {
    this.httpClient.get(`${this.baseUrl}/trailers/user`)
      .subscribe((trailer: Trailer) => {
        this.currentTrailer = trailer;
        this.currentTrailerChanged.next(trailer);
      });
  }

  dropCurrentTrailer(trailer: Trailer) {
    this.httpClient.post(`${this.baseUrl}/trailers/drop`, trailer)
      .subscribe(() => {
        this.fetchCurrentTrailer();
        this.fetchAllTrailersByCompanyId(1);
      });
  }

  pickUpTrailer(trailerId: number) {
    const params = new HttpParams().set('trailerId', trailerId.toString());
    this.httpClient.get(`${this.baseUrl}/trailers/pickup`, {params})
      .subscribe(() => this.fetchCurrentTrailer());
  }

  fetchLogsByTrailerId(trailerId: number) {
    const url = `${this.baseUrl}/log/${trailerId}`;
    this.httpClient.get(url)
      .subscribe((logs: Log[]) => {
        this.logsChanged.next(logs);
      });
  }
}
