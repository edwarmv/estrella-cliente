export type FiltrosPedidos = [
  {
    nombre: string,
    valores: {
      nombre: string,
      marcado: boolean
    }[]
  }
];

export const filtrosPedidos: FiltrosPedidos = [
  {
    nombre: 'Estado',
    valores: [
      {
        nombre: 'Pendiente',
        marcado: false,
      },
      {
        nombre: 'Listo',
        marcado: false
      },
      {
        nombre: 'Entregado',
        marcado: false
      },
      {
        nombre: 'Completado',
        marcado: false
      },
      {
        nombre: 'Cancelado',
        marcado: false
      }
    ]
  }
];
