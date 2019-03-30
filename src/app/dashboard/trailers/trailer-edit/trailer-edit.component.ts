import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../../http.service';
import {Router} from '@angular/router';

export interface TrailerType {
  id: number;
  name: string;
  short: string;

}

export interface Location {
  id: number;
  name: string;
}



@Component({
  selector: 'app-trailer-edit',
  templateUrl: './trailer-edit.component.html',
  styleUrls: ['./trailer-edit.component.css']
})
export class TrailerEditComponent implements OnInit {

  trailerForm: FormGroup;

  types: TrailerType[] = [
    {id: 1, name: 'DRY', short: 'DRY'},
    {id: 2, name: 'REEFER', short: 'REF'}
  ];

  locations: Location[] = [
    {id: 1, name: 'Addison, IL'},
    {id: 2, name: 'Portland, OR'},
    {id: 3, name: 'Renton, WA'}
  ];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.trailerForm = new FormGroup({
      id: new FormControl(),
      companyId: new FormControl(),
      number: new FormControl(),
      type: new FormControl(),
      location: new FormControl(),
      broken: new FormControl(false),
      railroad: new FormControl(false),
      available: new FormControl(true),
      user: new FormControl(null)
    });
  }

  onSubmit() {
    this.httpService.createNewTrailer(this.trailerForm.value);
    this.router.navigate(['dashboard', 'trailers-list']);
  }

  onCancel() {
    this.router.navigate(['dashboard', 'trailers-list']);
  }

}
