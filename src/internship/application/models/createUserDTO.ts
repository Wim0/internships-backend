export class CreateUserDTO {
  name: string;
  lastName: string;
  email: string;
  password: string;
  organizationId: number;
  careerId: number;
  isAdmin: boolean;
  rol: string;
  isVerified: boolean;
  createdAt: Date;
}
