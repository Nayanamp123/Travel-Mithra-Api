export interface AdminResponse {
  id: number;
  name: string;
  adminId: string;
  email: string;
}

export interface CreateAdminInput {
  name: string;
  adminId: string;
  email: string;
  password: string;
}

export interface LoginAdminInput {
  adminId: string;
  password: string;
}

export interface AdminCreateData {
  name: string;
  adminId: string;
  email: string;
  passwordHash: string;
}
