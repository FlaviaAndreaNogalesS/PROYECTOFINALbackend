import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Carretera } from './carretera.model';
import { Municipio } from 'src/municipios/municipios.model';
import { Usuario } from 'src/usuario/usuario.model';

@Injectable()
export class CarreterasService {
  constructor(
    @InjectModel(Carretera) private readonly carreteraModel: typeof Carretera,
  ) {}

  async findAll(): Promise<Carretera[]> {
    return this.carreteraModel.findAll({
      include: [
        { model: Municipio, as: 'municipioOrigen' },
        { model: Municipio, as: 'municipioDestino' },
      ],
    });
  }

  //CRUD
  async create(carreteraData: Partial<Carretera>, userId: number): Promise<Carretera> {
    return this.carreteraModel.create({
      ...carreteraData,
      creado_por: userId,
      actualizado_por: userId,
    });
  }

  async update(id: number, carreteraData: Partial<Carretera>, userId: number): Promise<Carretera> {
    const carretera = await this.carreteraModel.findByPk(id);
    if (!carretera) {
      throw new NotFoundException('Carretera no encontrada');
    }
    return carretera.update({
      ...carreteraData,
      actualizado_por: userId,
    });
  }

  async delete(id: number): Promise<void> {
    const carretera = await this.carreteraModel.findByPk(id);
    if (!carretera) {
      throw new NotFoundException('Carretera no encontrada');
    }
    await carretera.destroy();
  }

  //CARRETERRAS CON USUARIOS
  async findAllWithUsers(): Promise<Carretera[]> {
    return this.carreteraModel.findAll({
      include: [
        { model: Municipio, as: 'municipioOrigen' },
        { model: Municipio, as: 'municipioDestino' },
        { model: Usuario, as: 'creador', attributes: ['id', 'nombre', 'email'] },
        { model: Usuario, as: 'actualizador', attributes: ['id', 'nombre', 'email'] },
      ],
    });
  }
}
