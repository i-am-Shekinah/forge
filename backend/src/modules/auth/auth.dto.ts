export interface RegisterDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
