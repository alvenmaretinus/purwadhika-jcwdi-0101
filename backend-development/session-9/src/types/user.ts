export type User = {
  email: string;
  name: string;
  password: string;
  role?: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
