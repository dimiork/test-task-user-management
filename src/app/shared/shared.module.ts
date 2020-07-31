import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
