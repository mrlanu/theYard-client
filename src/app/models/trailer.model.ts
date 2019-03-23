import {User} from '../auth/user.model';

export interface Trailer {
  id: number;
  companyId: number;
  number: string;
  type: string;
  location: string;
  broken: boolean;
  available: boolean;
  railroad: boolean;
  user: User;
}
