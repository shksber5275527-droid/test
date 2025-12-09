export interface UserInfo {
  userName: string;
  email: string;
  password: string;
}
export interface Errors {
  userName?: string;
  email?: string;
  password?: string;
}
export interface Touched {
  userName?: boolean;
  email?: boolean;
  password?: boolean;
}
export interface LoginInfo {
  email: string;
  password: string;
}
export interface User {
  name: string;
  email: string;
}
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}
