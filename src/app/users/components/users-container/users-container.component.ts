import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UsersStoreService } from '../../services/users-store.service';
import { Observable, Subject, combineLatest, of, } from 'rxjs';
import { User, UserRole, ConfirmDialogModel } from '../../models';
import { take, takeUntil, tap, map, startWith, filter, } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent implements OnInit, OnDestroy {

  filterForm = new FormGroup({
    keyword: new FormControl(''),
    role: new FormControl(''),
  });
  roles: UserRole[] = [UserRole.ARTIST, UserRole.ART_MANAGER, UserRole.DESIGNER];

  users$: Observable<User[]> = combineLatest([
    this.userStore.users$,
    this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
    ),
  ]).pipe(
    tap(console.log),
    map(([users, filters]) => {
      const keywordFilter = ({ firstName, lastName, email, }: Partial<User>) => ({ firstName, lastName, email, });
      return users.filter((user: User) => {
        return (!!filters.keyword ? Object.values(keywordFilter(user))
          .some((item) => item.toLocaleLowerCase()
            .includes(filters.keyword.toLocaleLowerCase())) : true) && (!!filters.role ? user.role === filters.role : true)
      });
    }),
    map((users) => users),
  );

  private onDestroy$: Subject<void> = new Subject();

  constructor(
    private userStore: UsersStoreService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.userStore.loadUsers().pipe(
      take(1),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  initFilterForm(): void {
    this.filterForm.valueChanges.pipe(
      tap(console.log)
    ).subscribe();
  }

  clearKeyword(): void {
    this.filterForm.patchValue({
      keyword: '',
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '20rem',
      data: { action: 'add', roles: this.roles, }
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
    ).subscribe((newUser: User) => {
      console.log('The ADD dialog was closed', newUser);
      this.userStore.addUser(newUser).pipe(
        filter(Boolean),
        takeUntil(this.onDestroy$),
      ).subscribe();
    });
  }

  editUser(user: User): void {
    console.log(user);
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '20rem',
      data: { action: 'edit', userData: user, roles: this.roles, }
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      takeUntil(this.onDestroy$),
    ).subscribe((editedUser: User) => {
      this.userStore.editUser(user._id, editedUser).pipe(
        takeUntil(this.onDestroy$),
      ).subscribe();
    });
  }

  removeUser(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '20rem',
      data: new ConfirmDialogModel('Confirm Action', 'Are you sure you want to do this?',),
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((isConfirmed: boolean) => {
      if (!!isConfirmed) {
        this.userStore.removeUser(userId).subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
