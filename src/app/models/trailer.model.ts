import {User} from '../auth/user.model';

export interface Trailer {
  id: number;
  companyId: number;
  number: string;
  licensePlate: string;
  annualInspectionDate: Date;
  type: string;
  location: string;
  broken: boolean;
  emptyTrlr: boolean;
  available: boolean;
  railroad: boolean;
  user: User;
}
