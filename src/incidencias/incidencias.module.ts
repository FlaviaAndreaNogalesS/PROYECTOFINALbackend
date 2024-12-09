import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Incidencia } from './incidencias.model';
import { IncidenciasController } from './incidencias.controller';
import { IncidenciasService } from './incidencias.service';

@Module({
  imports: [SequelizeModule.forFeature([Incidencia])],
  controllers: [IncidenciasController],
  providers: [IncidenciasService],
})
export class IncidenciasModule {}
