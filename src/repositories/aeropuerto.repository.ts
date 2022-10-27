import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuerto, AeropuertoRelations, Ruta} from '../models';
import {RutaRepository} from './ruta.repository';

export class AeropuertoRepository extends DefaultCrudRepository<
  Aeropuerto,
  typeof Aeropuerto.prototype.id,
  AeropuertoRelations
> {

  public readonly ruta: BelongsToAccessor<Ruta, typeof Aeropuerto.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('RutaRepository') protected rutaRepositoryGetter: Getter<RutaRepository>,
  ) {
    super(Aeropuerto, dataSource);
    this.ruta = this.createBelongsToAccessorFor('ruta', rutaRepositoryGetter,);
    this.registerInclusionResolver('ruta', this.ruta.inclusionResolver);
  }
}
