import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-by-password',
  templateUrl: './confirm-by-password.component.html',
  styleUrls: ['./confirm-by-password.component.css']
})
export class ConfirmByPasswordComponent implements OnInit {

  confirmForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ConfirmByPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  onCancel() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.confirmForm = new FormGroup({
      password: new FormControl(null, Validators.required)
    });
  }

}
