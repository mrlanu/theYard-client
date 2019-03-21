import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Trailer} from '../../../models/trailer.model';
import {HttpService} from '../../../http.service';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.trailer = this.httpService.getAllTrailers().find(trail => trail.number === params['trailerNumber']);
      }));
    this.currentTrailer = this.httpService.currentTrailer;
  }

  onBack() {
    this.router.navigate(['dashboard', 'trailers-list']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
