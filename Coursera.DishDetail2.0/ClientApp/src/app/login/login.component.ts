import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: []
})
/** login component*/
export class LoginComponent implements OnInit {
/** login ctor */
  @Input()
  user = { username: '', password: '', remember: false };
  constructor(public dialogRef: MatDialogRef<LoginComponent>) {

  }
  ngOnInit() {

  }
  //@Input()
  //user: USER;
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  onSubmit() {
    console.log('User', this.user);
    this.dialogRef.close();
  }

}
