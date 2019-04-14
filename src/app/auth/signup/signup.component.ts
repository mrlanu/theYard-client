import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  componentSubs: Subscription[] = [];
  isLoading = false;
  state = 'hide';

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoadingChanged.subscribe(result => {
      this.isLoading = result;
    }));
    this.signUpForm = new FormGroup({
      'username': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]})
    });

    setTimeout(() => {
      this.state = 'visible';
    }, 200);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.registerUser({
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    });
  }

  onLogin() {
    this.uiService.isLoginChanged.next(true);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
