export interface Task {
  _id: string;
  title: string;
  description?: string;

  status: "todo" | "in_progress" | "done";

  createdAt: string;
  updatedAt?: string;

  owner?:
    | string
    | {
        _id?: string;
        name: string;
        email: string;
        role: "user" | "admin";
      };
}