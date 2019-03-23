import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';
import {Trailer} from './models/trailer.model';

@Injectable()
export class HttpService {

  currentTrailerNumber = '';
  currentTrailerNumberChanged = new Subject<string>();

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

  getCurrentTrailer() {
    this.httpClient.get(`${this.baseUrl}/trailers/user`)
      .subscribe((trailer: Trailer) => {
        if (trailer) {
          this.currentTrailerNumber = trailer.number;
        } else {
          this.currentTrailerNumber = '';
        }
        this.currentTrailerNumberChanged.next(this.currentTrailerNumber);
      });
  }

  dropCurrentTrailer() {
    this.httpClient.get(`${this.baseUrl}/trailers/drop`)
      .subscribe(() => this.getCurrentTrailer());
  }

  pickUpTrailer(trailerId: number) {
    const params = new HttpParams().set('trailerId', trailerId.toString());
    this.httpClient.get(`${this.baseUrl}/trailers/pickup`, {params})
      .subscribe(() => this.getCurrentTrailer());
  }
}
