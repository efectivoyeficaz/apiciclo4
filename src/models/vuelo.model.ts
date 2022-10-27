import {Entity, model, property, hasOne} from '@loopback/repository';
import {Ruta} from './ruta.model';

@model()
export class Vuelo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_inicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_fin: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_fin: string;

  @property({
    type: 'number',
    required: true,
  })
  asientos_vendidos: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_piloto: string;

  @property({
    type: 'string',
    required: true,
  })
  ruta_id: string;

  @property({
    type: 'string',
    required: true,
  })
  aeropuerto_id: string;

  @hasOne(() => Ruta)
  ruta: Ruta;

  constructor(data?: Partial<Vuelo>) {
    super(data);
  }
}

export interface VueloRelations {
  // describe navigational properties here
}

export type VueloWithRelations = Vuelo & VueloRelations;
