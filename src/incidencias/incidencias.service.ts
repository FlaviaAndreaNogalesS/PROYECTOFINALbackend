import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Incidencia } from './incidencias.model';
import { Usuario } from 'src/usuario/usuario.model';
import { Carretera } from 'src/carreteras/carretera.model';


@Injectable()
export class IncidenciasService {
  constructor(@InjectModel(Incidencia) private readonly incidenciaModel: typeof Incidencia) {}

  async findAll(): Promise<Incidencia[]> {
    return this.incidenciaModel.findAll();
  }

  // Filtra incidencias por tipo
  async findByType(tipo: string): Promise<Incidencia[]> {
    return this.incidenciaModel.findAll({ where: { tipo } });
  }

  //OBTIENE INCIDENCIAS CON USUARIOS
  async findAllWithUsers(): Promise<Incidencia[]> {
    return this.incidenciaModel.findAll({
      include: [
        { model: Usuario, as: 'creador', attributes: ['id', 'nombre', 'email'] },
        { model: Usuario, as: 'actualizador', attributes: ['id', 'nombre', 'email'] },
      ],
    });
  }

  //CRUD
  async create(data: Partial<Incidencia>, userId: number, fotoPath: string): Promise<Incidencia> {
    return this.incidenciaModel.create({
      ...data,
      creado_por: userId,
      actualizado_por: userId,
      foto: fotoPath,
    });
  }

  async update(
    id: number,
    data: Partial<Incidencia>,
    userId: number,
    fotoPath: string | null,
  ): Promise<Incidencia> {
    const incidencia = await this.incidenciaModel.findByPk(id);
    if (!incidencia) {
      throw new NotFoundException('Incidencia no encontrada');
    }
  
    return incidencia.update({
      ...data,
      actualizado_por: userId,
      ...(fotoPath && { foto: fotoPath }),
    });
  }
  
  async delete(id: number): Promise<void> {
    const incidencia = await this.incidenciaModel.findByPk(id);
    if (!incidencia) {
      throw new NotFoundException('Incidencia no encontrada');
    }

    await incidencia.destroy();
  }

  //OBTIENE CARRETERAS BLOQUEADAS
  async findBlockedRoutes(): Promise<Carretera[]> {
    return Carretera.findAll({ where: { estado: 'bloqueada' } });
  }
}
