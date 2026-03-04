export interface AuthUser {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  address:string;
  gender:string;
  mobile:string
  img: string ;
  createdAt?: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  address: string;
  mobile: string;
  altmobile: string;
  role: string;
  img: string ;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
