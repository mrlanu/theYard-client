import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserInfo} from '../auth/user.model';
import {Subscription} from 'rxjs';
import {Trailer} from '../models/trailer.model';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentTrailerNumber = '';
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.currentTrailerChanged
      .subscribe((trailer: Trailer) => {
        if (trailer) {
          this.currentTrailerNumber = trailer.number;
        }
    }));
    this.httpService.getCurrentTrailer();
  }

  onSelectTrailer(trailerNumber: string) {
    this.router.navigate(['dashboard', 'trailer-details', trailerNumber]);
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
