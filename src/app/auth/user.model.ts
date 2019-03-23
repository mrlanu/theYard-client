import {Trailer} from '../models/trailer.model';
import {Company} from '../models/company.model';

export interface User {
  email: string;
  userId: number;
}

export interface UserInfo {
  userId: number;
  username: string;
  company: Company;
  firstName: string;
  lastName: string;
  occupation: string;
  active: boolean;
  roles: Role[];
}

export interface Role {
  roleId: number;
  name: string;
}
