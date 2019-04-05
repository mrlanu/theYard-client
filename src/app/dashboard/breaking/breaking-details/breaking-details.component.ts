import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakingReport} from '../../../models/breaking-report.model';
import {HttpService} from '../../../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ConfirmByPasswordComponent} from '../../../shared/confirm-by-password/confirm-by-password.component';

@Component({
  selector: 'app-breaking-details',
  templateUrl: './breaking-details.component.html',
  styleUrls: ['./breaking-details.component.css']
})
export class BreakingDetailsComponent implements OnInit, OnDestroy {

  breakingId: number;
  breaking: BreakingReport;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.breakingId = params['breakingId'];
      }));
    this.componentSubs.push(this.httpService.breakingReportChanged
      .subscribe((breaking: BreakingReport) => {
        this.breaking = breaking;
      }));
    this.httpService.fetchBreakingById(this.breakingId);
  }

  onBack() {
    this.router.navigate(['dashboard', 'breaking-list', this.breaking.trailerId]);
  }

  onFix(breakingReportId: number, breakingDetailId: number) {
    const dialogRef = this.dialog.open(ConfirmByPasswordComponent, {
      width: '400px',
      data: null
    });
    dialogRef.afterClosed()
      .subscribe(pass => {
        console.log(pass);
      });
    // this.httpService.fixBreakingDetailById(breakingReportId, breakingDetailId);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
