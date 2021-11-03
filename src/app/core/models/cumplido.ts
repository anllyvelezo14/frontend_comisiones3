export interface Cumplido {
  id: number;
  fecha_envio: Date;
  fecha_confirmacion: Date;
  informacion_complementaria: string;
  correos: string;
  comisiones_id: number;
  comisiones: {
    id: number;
    createdAt: Date;
    usuarios: {
      nombre: string;
      apellido: string;
      identificacion: number;
      email: string;
      departamentos: {
        nombre: string;
        facultad: {
          nombre: string;
        };
      };
    };
  };
}
