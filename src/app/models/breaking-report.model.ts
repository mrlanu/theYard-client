export interface BreakingReport {
  id: number;
  date: Date;
  fixed: boolean;
  fixedDate: Date;
  trailerId: number;
  breakingDetails: BreakingDetail[];
}

export interface BreakingDetail {
  id: number;
  kind: string;
  description: string;
  fixed: boolean;
  fixedDate: Date;
  userLastName: string;
}
