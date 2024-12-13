export interface LoginResponse {
  token: string;
  username: string;
  name: string;
}

export interface RegisterResponse {
  blogs: string[];
  id: string;
  username: string;
  name: string;
  password: string;
}