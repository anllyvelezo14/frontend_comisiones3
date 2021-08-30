export interface Usuario {
  email: string;
  contrasena: string;
}

export interface UsuarioResponse {
  usuario: {
    id: number;
    tipo_identificacion: string;
    identificacion: number;
    nombre: string;
    apellido: string;
    email: string;
    estado: number;
    contrasena: string;
    dia_dispobible: number;
    createdAt: Date;
    fecha_actualizacion: Date;
    departamentos_id: number;
    roles_id: number;
  };
  token: string;
}
