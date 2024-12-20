export interface LoginResponse {
  token: string;
  key: string;
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

export interface BlogResponse {
  id: string;
  title: string;
  url: string;
  likes: string;
  createdAt: string;
  updatedAt: string;
}
