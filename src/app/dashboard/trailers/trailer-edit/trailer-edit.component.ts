import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../../http.service';

export interface TrailerType {
  id: number;
  name: string;
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
    {id: 1, name: 'DRY'},
    {id: 2, name: 'REEFER'}
  ];

  locations: Location[] = [
    {id: 1, name: 'Addison, IL'},
    {id: 2, name: 'Portland, OR'},
    {id: 3, name: 'Renton, WA'}
  ]

  constructor(private httpService: HttpService) { }

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
      available: new FormControl(true)
    });
  }

  onSubmit() {
    this.httpService.createNewTrailer(this.trailerForm.value);
  }

}
