export interface JwtResponseI {
  dataUser: {
    id: number;
    email: string;
    accessToken: string;
    expiresIn: string;
  };
}
