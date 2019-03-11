import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TrailerService} from '../../../trailer.service';
import {Trailer} from '../../../models/trailer.model';

@Component({
  selector: 'app-trailer-details',
  templateUrl: './trailer-details.component.html',
  styleUrls: ['./trailer-details.component.css']
})
export class TrailerDetailsComponent implements OnInit, OnDestroy {

  trailer: Trailer;
  componentSubs: Subscription[] = [];

  constructor(private trailerService: TrailerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.trailer = this.trailerService.trailers.find(trail => trail.number === params['trailerNumber']);
      }));
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
