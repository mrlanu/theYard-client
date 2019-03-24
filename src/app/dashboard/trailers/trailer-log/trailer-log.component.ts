import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Trailer} from '../../../models/trailer.model';
import {Subscription} from 'rxjs';
import {HttpService} from '../../../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Log} from '../../../models/log.model';

@Component({
  selector: 'app-trailer-log',
  templateUrl: './trailer-log.component.html',
  styleUrls: ['./trailer-log.component.css']
})
export class TrailerLogComponent implements OnInit, AfterViewInit, OnDestroy {

  trailerId: number;
  displayedColumns: string[] = ['date', 'location', 'logAction', 'userLastName'];
  dataSource = new MatTableDataSource<Log>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.trailerId = params['trailerId'];
      }));
    this.componentSubs.push(this.httpService.logsChanged
      .subscribe((logs: Log[]) => {
        this.dataSource.data = logs;
      }));
    this.httpService.fetchLogsByTrailerId(this.trailerId);

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

  onBack() {
    this.router.navigate(['dashboard', 'trailer-details', this.trailerId]);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }


}
