export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}