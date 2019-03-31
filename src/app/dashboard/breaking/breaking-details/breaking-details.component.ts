import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakingReport} from '../../../models/breaking-report.model';
import {HttpService} from '../../../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.breakingId = params['breakingId'];
        console.log('ID - ' + this.breakingId);
      }));
    this.componentSubs.push(this.httpService.breakingChanged
      .subscribe((breaking: BreakingReport) => {
        this.breaking = breaking;
        console.log(this.breaking);
      }));
    this.httpService.fetchBreakingById(this.breakingId);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
