import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Trailer} from '../../../models/trailer.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../http.service';

@Component({
  selector: 'app-trailers-list',
  templateUrl: './trailers-list.component.html',
  styleUrls: ['./trailers-list.component.css']
})
export class TrailersListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['number', 'location', 'emptyTrlr', 'broken', 'available'];
  dataSource = new MatTableDataSource<Trailer>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.trailersChanged
      .subscribe((trailers: Trailer[]) => {
      this.dataSource.data = trailers;
    }));
    this.httpService.fetchAllTrailersByCompanyId(1);

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

  onSelectTrailer(trailer: Trailer) {
    this.router.navigate(['dashboard', 'trailer-details', trailer.id]);
  }

  onBreak() {
    console.log('Fuck');
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
