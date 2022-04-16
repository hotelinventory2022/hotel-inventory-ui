export class LoginRequest {
  email!: string;
  password!: string;
  roleId!: number;
}
export class LoginResponse {
  id!: number;
  email!: string;
  password!: string;
  roleId!: number;
  jwtToken!: string;
}
