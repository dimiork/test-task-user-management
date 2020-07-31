import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from 'src/app/users/models';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  dismiss(): void {
    this.dialogRef.close(false);
  }

}
