import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

const MODULES = [
  MatTableModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ],
})
export class MaterialModule { }
