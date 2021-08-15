export interface Usuario {
  email: string;
  contrasena: string;
}

export interface UsuarioResponse {
  usuario: object;
  token: string;
}
