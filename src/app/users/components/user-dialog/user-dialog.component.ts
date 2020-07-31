import { Component, Inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { UserRole, User } from '../../models';

type Action = 'add' | 'edit';
export class DialogData {
  action: Action;
  userData: User;
  roles: UserRole[];
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initFieldValue(controlName: string): any {
    return this.data.action === 'add' as Action ? '' : this.data.userData[controlName];
  }

  initForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.initFieldValue('firstName'), [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(this.initFieldValue('lastName'), [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.initFieldValue('email'), [Validators.required, Validators.email]),
      role: new FormControl(this.initFieldValue('role'), Validators.required),
    });
  }

  errorMatcher(controlName: string): any {
    return {
      isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
        const controlInvalid = control.touched && control.invalid;
        const formInvalid = control.touched && this.userForm.get(controlName).touched && this.userForm.invalid;
        return controlInvalid || formInvalid;
      }
    };
  }

  onNoClick(): void {
    console.log('NO CLICK');
    this.dialogRef.close();
  }

  submitForm(): void {
    console.log('SUBMIT FORM');
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.dialogRef.close(this.userForm.value);
    }
  }

  getErrorMessage(controlName: string): string {
    if (this.userForm.controls[controlName].hasError('minlength')) {
      return 'Must be at least 2 characters';
    }
    if (this.userForm.controls[controlName].hasError('required')) {
      return 'Field is required';
    }

    if (this.userForm.controls[controlName].hasError('email')) {
      return 'Must be valid email address';
    }
  }

  trackByFn(index: number, role: UserRole): UserRole {
    return role;
  }
}
