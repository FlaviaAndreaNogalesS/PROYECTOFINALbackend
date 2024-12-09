import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SolicitudIncidencia } from './solicitudes-incidencia.model';
import { SolicitudesIncidenciaService } from './solicitudes-incidencia.service';
import { SolicitudesIncidenciaController } from './solicitudes-incidencia.controller';
import { Incidencia } from 'src/incidencias/incidencias.model';

@Module({
  imports: [SequelizeModule.forFeature([SolicitudIncidencia, Incidencia])],
  controllers: [SolicitudesIncidenciaController],
  providers: [SolicitudesIncidenciaService],
})
export class SolicitudesIncidenciaModule {}
