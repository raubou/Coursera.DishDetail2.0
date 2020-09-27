import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
/** header component*/
export class HeaderComponent {
    /** header ctor */
    constructor(public dialog: MatDialog) {

  }
  openLoginForm() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    //dialogConfig.autoFocus = true;
    //dialogConfig.width = "500px";
    //dialogConfig.height = "200px";

    this.dialog.open(LoginComponent, dialogConfig);
  }
}
