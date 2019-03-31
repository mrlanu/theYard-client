import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {HttpService} from '../../../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BreakingReport} from '../../../models/breaking-report.model';

@Component({
  selector: 'app-breaking-list',
  templateUrl: './breaking-list.component.html',
  styleUrls: ['./breaking-list.component.css']
})
export class BreakingListComponent implements OnInit, AfterViewInit, OnDestroy {

  trailerId: number;
  displayedColumns: string[] = ['date', 'userLastName', 'fixed', 'fixedDate'];
  dataSource = new MatTableDataSource<BreakingReport>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];


  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.trailerId = params['trailerId'];
      }));
    this.componentSubs.push(this.httpService.breakingsListChanged
      .subscribe((breaking: BreakingReport[]) => {
        this.dataSource.data = breaking;
      }));
    this.httpService.fetchAllBreakingByTrailerId(this.trailerId);

    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectBreaking(breaking: BreakingReport) {
    this.router.navigate(['dashboard', 'breaking-details', breaking.id]);
  }

  onBack() {
    this.router.navigate(['dashboard', 'trailer-details', this.trailerId]);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
