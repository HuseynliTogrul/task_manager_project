export interface TaskEntry {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
  email: string;
  phone: string;
  role: string;
}

export interface TodoEntry {
  id: string;
  todo: string;
  userId: string;
}
