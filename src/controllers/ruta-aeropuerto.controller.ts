import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ruta,
  Aeropuerto,
} from '../models';
import {RutaRepository} from '../repositories';

export class RutaAeropuertoController {
  constructor(
    @repository(RutaRepository) protected rutaRepository: RutaRepository,
  ) { }

  @get('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Array of Ruta has many Aeropuerto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aeropuerto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Aeropuerto>,
  ): Promise<Aeropuerto[]> {
    return this.rutaRepository.aeropuertos(id).find(filter);
  }

  @post('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Ruta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aeropuerto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ruta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuerto, {
            title: 'NewAeropuertoInRuta',
            exclude: ['id'],
            optional: ['rutaId']
          }),
        },
      },
    }) aeropuerto: Omit<Aeropuerto, 'id'>,
  ): Promise<Aeropuerto> {
    return this.rutaRepository.aeropuertos(id).create(aeropuerto);
  }

  @patch('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Ruta.Aeropuerto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aeropuerto, {partial: true}),
        },
      },
    })
    aeropuerto: Partial<Aeropuerto>,
    @param.query.object('where', getWhereSchemaFor(Aeropuerto)) where?: Where<Aeropuerto>,
  ): Promise<Count> {
    return this.rutaRepository.aeropuertos(id).patch(aeropuerto, where);
  }

  @del('/rutas/{id}/aeropuertos', {
    responses: {
      '200': {
        description: 'Ruta.Aeropuerto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Aeropuerto)) where?: Where<Aeropuerto>,
  ): Promise<Count> {
    return this.rutaRepository.aeropuertos(id).delete(where);
  }
}
