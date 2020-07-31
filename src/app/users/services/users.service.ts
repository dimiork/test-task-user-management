import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http$: HttpClient,
  ) { }

  getAll(): Observable<User[]> {
    return this.http$.get<User[]>('users');
  }

  create(user: User): Observable<User> {
    return this.http$.post<User>('users', user);
  }

  update(userId: string, user: Partial<User>): Observable<User> {
    return this.http$.put<User>(`users/${userId}`, user);
  }

  remove(userId: string): Observable<User> {
    return this.http$.delete<User>(`users/${userId}`);
  }
}
