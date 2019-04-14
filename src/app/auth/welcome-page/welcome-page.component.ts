import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  animations: [
    trigger('logoVisibleState', [
      state('hide', style({
        'opacity': '0'
      })),
      state('visible', style({
        'opacity': '1',
        marginLeft: '40px'
      })),
      transition('hide <=> visible', animate(4000))
    ])
  ]
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  isLogin = true;
  state = 'hide';

  constructor(private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoginChanged
      .subscribe(result => {
        this.isLogin = result;
      }));

    setTimeout(() => {
      this.state = 'visible';
    }, 100);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }
}
