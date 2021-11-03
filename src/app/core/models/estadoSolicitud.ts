export interface EstadoSolicitud {
  id: number;
  createdAt: Date;
  observacion: string;
  fecha_actualizacion: Date;
  comisiones_id: number;
  estados_id: number;
  intermediate_comisiones: {
    id: number;
    createdAt: Date;
    fecha_actualizacion: Date;
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
  intermediate_estados: {
    nombre: string;
    descripcion: string;
  };
}
