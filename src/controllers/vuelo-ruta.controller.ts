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
  Vuelo,
  Ruta,
} from '../models';
import {VueloRepository} from '../repositories';

export class VueloRutaController {
  constructor(
    @repository(VueloRepository) protected vueloRepository: VueloRepository,
  ) { }

  @get('/vuelos/{id}/ruta', {
    responses: {
      '200': {
        description: 'Vuelo has one Ruta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ruta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ruta>,
  ): Promise<Ruta> {
    return this.vueloRepository.ruta(id).get(filter);
  }

  @post('/vuelos/{id}/ruta', {
    responses: {
      '200': {
        description: 'Vuelo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ruta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vuelo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {
            title: 'NewRutaInVuelo',
            exclude: ['id'],
            optional: ['vueloId']
          }),
        },
      },
    }) ruta: Omit<Ruta, 'id'>,
  ): Promise<Ruta> {
    return this.vueloRepository.ruta(id).create(ruta);
  }

  @patch('/vuelos/{id}/ruta', {
    responses: {
      '200': {
        description: 'Vuelo.Ruta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ruta, {partial: true}),
        },
      },
    })
    ruta: Partial<Ruta>,
    @param.query.object('where', getWhereSchemaFor(Ruta)) where?: Where<Ruta>,
  ): Promise<Count> {
    return this.vueloRepository.ruta(id).patch(ruta, where);
  }

  @del('/vuelos/{id}/ruta', {
    responses: {
      '200': {
        description: 'Vuelo.Ruta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ruta)) where?: Where<Ruta>,
  ): Promise<Count> {
    return this.vueloRepository.ruta(id).delete(where);
  }
}
