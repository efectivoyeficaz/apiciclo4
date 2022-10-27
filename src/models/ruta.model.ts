import {Entity, model, property, hasMany} from '@loopback/repository';
import {Aeropuerto} from './aeropuerto.model';

@model()
export class Ruta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  origen: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;

  @property({
    type: 'string',
    required: true,
  })
  tiempoEstimado: string;

  @hasMany(() => Aeropuerto)
  aeropuertos: Aeropuerto[];

  @property({
    type: 'string',
  })
  vueloId?: string;

  constructor(data?: Partial<Ruta>) {
    super(data);
  }
}

export interface RutaRelations {
  // describe navigational properties here
}

export type RutaWithRelations = Ruta & RutaRelations;
