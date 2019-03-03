import {Trailer} from './models/trailer.model';

export class UnitsService {

  private trailers: Trailer[] = [
    {id: 1001, broken: false, location: 'Addison, IL', type: 'reefer'},
    {id: 1002, broken: false, location: 'Addison, IL', type: 'reefer'},
    {id: 1003, broken: false, location: 'Addison, IL', type: 'reefer'}
  ];

  getTrailers(): Trailer[] {
    return this.trailers.slice();
  }
}
