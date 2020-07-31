import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, take, } from 'rxjs/operators';

import { User } from '../models';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  private userList$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  readonly users$: Observable<User[]> = this.userList$.asObservable();

  constructor(
    private userService: UsersService,
  ) { }

  loadUsers(): Observable<User[]> {
    if (!this.userList$.getValue().length) {
      return this.userService.getAll().pipe(
        tap((users: User[]) => {
          this.userList$.next(users);
        }),
      );
    }
    return this.users$;
  }

  addUser(user: User): Observable<User> {
    return this.userService.create(user).pipe(
      tap((newUser: User) => {
        this.userList$.next([
          ...this.userList$.getValue(),
          newUser,
        ]);
      })
    );
  }

  editUser(userId: string, user: User): Observable<User> {
    return this.userService.update(userId, user).pipe(
      tap((updatedUser: User) => {
        const itemIndex = this.userList$.getValue().findIndex((item: User) => item._id === userId);
        this.userList$.next([
          ...this.userList$.getValue().slice(0, itemIndex),
          updatedUser,
          ...this.userList$.getValue().slice(itemIndex + 1)
        ]);
      })
    );
  }

  removeUser(userId: string): Observable<User> {
    return this.userService.remove(userId).pipe(
      tap((removedUser: User) => {
        this.userList$.next([
          ...this.userList$.getValue().filter(({ _id }: User) => _id !== userId)
        ]);
      })
    );
  }
}
