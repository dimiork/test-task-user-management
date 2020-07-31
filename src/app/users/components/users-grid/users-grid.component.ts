import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersGridComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];
  @Input() dataSource: User[];
  @Output() editUserEvent: EventEmitter<User> = new EventEmitter();
  @Output() removeUserEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  editUser(user: User): void {
    console.log(user);
    this.editUserEvent.emit(user);
  }

  removeUser(userId: string): void {
    console.log(userId);
    this.removeUserEvent.emit(userId);
  }

}
