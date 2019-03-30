import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Trailer} from '../../../models/trailer.model';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material';
import {DropDialogComponent} from './drop-dialog/drop-dialog.component';

@Component({
  selector: 'app-trailer-details',
  templateUrl: './trailer-details.component.html',
  styleUrls: ['./trailer-details.component.css']
})
export class TrailerDetailsComponent implements OnInit, OnDestroy {

  currentTrailer: Trailer;
  trailer: Trailer;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.trailer = this.httpService.getAllTrailers().find(trail => trail.id === +params['trailerId']);
      }));
    this.componentSubs.push(this.httpService.currentTrailerChanged
      .subscribe((trailer: Trailer) => {
        this.currentTrailer = trailer;
    }));
    this.httpService.fetchCurrentTrailer();
  }

  onBack() {
    this.router.navigate(['dashboard', 'trailers-list']);
  }

  onPickUpTrailer(trailerId: number) {
    this.httpService.pickUpTrailer(trailerId);
  }

  onDropTrailer() {
    const dialogRef = this.dialog.open(DropDialogComponent, {
      width: '300px',
      data: {trailerNumber: this.currentTrailer.number}
    });
    dialogRef.afterClosed()
      .subscribe(dropInfo => {
        if (dropInfo) {
          this.trailer = {...this.trailer, available: true, location: dropInfo.location, user: null};
          this.httpService.dropCurrentTrailer(this.trailer);
          this.router.navigate(['dashboard', 'trailers-list']);
        }
      });
  }

  onBreaking(trailerId: number) {
    this.router.navigate(['dashboard', 'breaking-list', trailerId]);
  }

  onLogs(trailerId: number) {
    this.router.navigate(['dashboard', 'trailer-log', trailerId]);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
