import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginVisibleState', [
      state('hide', style({
        'opacity': '0'
      })),
      state('visible', style({
        'opacity': '0.95',
      })),
      transition('hide <=> visible', animate(1500))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  componentSubs: Subscription[] = [];
  state = 'hide';

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {

    this.componentSubs.push(this.uiService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
    this.loginForm = new FormGroup({
      username: new FormControl('mrlanu',
        {validators: [Validators.required]}),
      password: new FormControl('12345',
        {validators: [Validators.required]})
    });

    setTimeout(() => {
      this.state = 'visible';
    }, 1700);
  }

  onRegister() {
    this.uiService.isLoginChanged.next(false);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
