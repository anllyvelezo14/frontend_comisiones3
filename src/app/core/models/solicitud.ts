export class Solicitud {
  id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  fecha_resolucion: Date;
  resolucion: string;
  respuesta_devolucion: string;
  justificacion: string;
  idioma: string;
  lugar: string;
  createdAt: Date;
  fecha_actualizacion: Date;
  tipos_solicitud_id: number;
  usuarios_id: number;
  tipos_solicitud: { nombre: string };
  nombreEstadoActual: string;
  estadoActual: {
    createdAt: Date;
    fecha_actualizacion: Date;
    intermediate_estados: { nombre: string };
  };
  documentos: [
    {
      id: number;
      nombre: string;
      es_anexo: boolean;
    }
  ];
  cumplidos: [
    {
      id: number;
      fecha_envio: Date;
      fecha_confirmacion: Date;
    }
  ];
  usuarios: {
    nombre: string;
    apellido: string;
    identificacion: string;
    email: string;
    estado: number;
    departamentos_id: number;
    departamentos: {
      nombre: string;
      facultades_id: number;
      facultad: {
        nombre: string;
      };
    };
  };
  intermediate_comisiones: [
    {
      createdAt: Date;
      fecha_actualizacion: Date;
      intermediate_estados: {
        nombre: string;
      };
    }
  ];
}
