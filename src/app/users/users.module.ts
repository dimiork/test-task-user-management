import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { UsersContainerComponent } from './components/users-container/users-container.component';
import { UsersGridComponent } from './components/users-grid/users-grid.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';

const COMPONENTS = [
  UsersContainerComponent,
  UsersGridComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    UserDialogComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ]
})
export class UsersModule { }
