export const enum UserRole {
  ARTIST = 'ARTIST',
  DESIGNER = 'DESIGNER',
  ART_MANAGER = 'ART_MANAGER',
}

export class User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
