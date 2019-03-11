import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Trailer} from '../../../models/trailer.model';
import {TrailerService} from '../../../trailer.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-trailers-list',
  templateUrl: './trailers-list.component.html',
  styleUrls: ['./trailers-list.component.css']
})
export class TrailersListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['number', 'type', 'location', 'railroad', 'broken'];
  dataSource = new MatTableDataSource<Trailer>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private trailersService: TrailerService) { }

  ngOnInit() {
    this.componentSubs.push(this.trailersService.trailersChanged
      .subscribe((trailers: Trailer[]) => {
      this.dataSource.data = trailers;
    }));
    this.trailersService.getTrailers();

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

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
