import {Injectable} from '@angular/core';
import {Trailer} from './models/trailer.model';

@Injectable
export class TrailerService {

  trailers: Trailer[] = [
    {id: 1, number: 1001, type: 'Reefer', location: 'Addison, IL', broken: false, railroad: false},
    {id: 2, number: 1002, type: 'Reefer', location: 'Addison, IL', broken: false, railroad: false},
    {id: 3, number: 1003, type: 'Reefer', location: 'Addison, IL', broken: true, railroad: false},
    {id: 4, number: 1010, type: 'Dry', location: 'Addison, IL', broken: false, railroad: true}
  ];
  constructor() {}

  getTrailers() {
    return this.trailers;
  }
}
