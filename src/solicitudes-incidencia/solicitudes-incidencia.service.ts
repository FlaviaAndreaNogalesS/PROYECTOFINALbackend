import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SolicitudIncidencia } from './solicitudes-incidencia.model';
import { Incidencia } from 'src/incidencias/incidencias.model';

@Injectable()
export class SolicitudesIncidenciaService {
  constructor(
    @InjectModel(SolicitudIncidencia)
    private readonly solicitudModel: typeof SolicitudIncidencia,
    @InjectModel(Incidencia)
    private readonly incidenciaModel: typeof Incidencia,
    
  ) {}

  async create(data: any): Promise<SolicitudIncidencia> {
    return this.solicitudModel.create(data);
  }

  //obtiene las solis pendientes
  async findAll(): Promise<SolicitudIncidencia[]> {
    return this.solicitudModel.findAll({ where: { estado: 'pendiente' } });
  }

  //marca como procesada
  async markAsProcessed(id: number): Promise<SolicitudIncidencia> {
    const solicitud = await this.solicitudModel.findByPk(id);
    if (!solicitud) {
      throw new NotFoundException('Solicitud de incidencia no encontrada');
    }
    solicitud.estado = 'procesado';
    return solicitud.save();
  }

  async createIncidenciaFromSolicitud(
    solicitudId: number,
    userId: number,
  ): Promise<Incidencia> {
    const solicitud = await this.solicitudModel.findByPk(solicitudId);
    if (!solicitud) {
      throw new NotFoundException('Solicitud de incidencia no encontrada');
    }

    const incidencia = await this.incidenciaModel.create({
      carretera_id: null,
      tipo: 'No definido',
      detalle: solicitud.detalle,
      foto: solicitud.foto,
      creado_por: userId,
      actualizado_por: userId,
    });

    solicitud.estado = 'procesado';
    await solicitud.save();

    return incidencia;
  }
}