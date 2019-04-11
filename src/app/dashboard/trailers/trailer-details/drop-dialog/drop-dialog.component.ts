import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '../../trailer-edit/trailer-edit.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-drop-dialog',
  templateUrl: './drop-dialog.component.html',
  styleUrls: ['./drop-dialog.component.css']
})
export class DropDialogComponent implements OnInit {

  locations: Location[] = [
    {id: 1, name: 'Addison, IL'},
    {id: 2, name: 'Portland, OR'},
    {id: 3, name: 'Renton, WA'}
  ];

  dropForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DropDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.dropForm = new FormGroup({
      'trailerNumber': new FormControl(this.passedData.trailerNumber),
      'location': new FormControl(),
      'isEmpty': new FormControl(true)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
