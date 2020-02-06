/// ----- Common Interfaces ----- ///

interface QueryResponse<T> {
  success: boolean;
  errors: T;
}

/// ---------- Auth API ---------- ///

// Request Types

// export type UserId = string | null;
export type LoginUserKeys = 'nameOrEmail' | 'password';
export type RegisterUserKeys = 'name' | 'email' | 'password' | 'password2';

// Request Interfaces

export type LoginUserSchema = Record<LoginUserKeys, string>;
export type RegisterUserSchema = Record<RegisterUserKeys, string>;

export interface UpdatePasswordSchema {
  oldPassword: string;
  newPassword: string;
}

// Response Interfaces

export type LoginUserErrors = Record<LoginUserKeys, string | null>;
export type RegisterUserErrors = Record<RegisterUserKeys, string | null>;

export interface LoginResponse {
  login: QueryResponse<LoginUserErrors>;
}

export interface RegisterResponse {
  register: QueryResponse<RegisterUserErrors>;
}

export interface UpdatePasswordResponse {
  updatePassword: {
    success: boolean;
    error: string;
  };
}
