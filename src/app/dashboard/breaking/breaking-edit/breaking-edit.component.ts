import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakingReport} from '../../../models/breaking-report.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../../../http.service';
import {Subscription} from 'rxjs';

export interface BreakingKind {
  id: number;
  name: string;
}

@Component({
  selector: 'app-breaking-edit',
  templateUrl: './breaking-edit.component.html',
  styleUrls: ['./breaking-edit.component.css']
})
export class BreakingEditComponent implements OnInit, OnDestroy {

  kinds: BreakingKind[] = [
    {id: 1, name: 'Tires'},
    {id: 2, name: 'Breaks'},
    {id: 3, name: 'Lights'},
    {id: 4, name: 'Air'},
    {id: 5, name: 'Body'},
    {id: 6, name: 'Frame'},
  ];

  breakingForm: FormGroup;
  trailerId: number;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.componentSubs.push(this.route.params
      .subscribe((params: Params) => {
        this.trailerId = +params['trailerId'];
      }));
    this.initForm();
  }

  initForm() {

    this.breakingForm = new FormGroup({
      id: new FormControl(),
      date: new FormControl(new Date()),
      userLastName: new FormControl(),
      fixed: new FormControl(false),
      fixedDate: new FormControl(),
      trailerId: new FormControl(this.trailerId),
      breakingDetails: new FormArray([
        new FormGroup({
          id: new FormControl(),
          kind: new FormControl(null, Validators.required),
          description: new FormControl(null, Validators.required),
          fixed: new FormControl(false),
          fixedDate: new FormControl(),
          userLastName: new FormControl(),
        })
      ])
    });
  }

  onAddDetail() {
    (<FormArray>this.breakingForm.get('breakingDetails')).push(
      new FormGroup({
        id: new FormControl(),
        kind: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        fixed: new FormControl(false),
        fixedDate: new FormControl(),
        userLastName: new FormControl(),
      })
    );
  }

  onDeleteDetail(index: number) {

    const arr = <FormArray>this.breakingForm.get('breakingDetails');
    if (arr.length > 1) {
      arr.removeAt(index);
    }
  }

  getControls() {
    return (<FormArray>this.breakingForm.get('breakingDetails')).controls;
  }

  onSubmit() {
    this.httpService.createBreaking(this.breakingForm.value)
      .subscribe((breaking: BreakingReport) => {
        this.router.navigate(['dashboard', 'breaking-list', this.trailerId]);
    });
  }

  onBack() {
    this.router.navigate(['dashboard', 'breaking-list', this.trailerId]);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
