import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Municipio } from './municipios.model';
import { Usuario } from 'src/usuario/usuario.model';

@Injectable()
export class MunicipiosService {
  constructor(@InjectModel(Municipio) private municipioModel: typeof Municipio) {}

  async findAll(): Promise<Municipio[]> {
    return this.municipioModel.findAll();
  }

  //municipios junto con usuarios
  async findAllWithUsers(): Promise<Municipio[]> {
    return this.municipioModel.findAll({
      include: [
        { model: Usuario, as: 'creador', attributes: ['id', 'nombre', 'email'] },
        { model: Usuario, as: 'actualizador', attributes: ['id', 'nombre', 'email'] },
      ],
    });
  }

  //CRUD
  async create(municipioData: Partial<Municipio>, userId: number): Promise<Municipio> {
    return this.municipioModel.create({
      ...municipioData,
      creado_por: userId,
      actualizado_por: userId,
    });
  }

  async update(id: number, municipioData: Partial<Municipio>, userId: number): Promise<Municipio> {
    const municipio = await this.municipioModel.findByPk(id);
    if (!municipio) {
      throw new NotFoundException('Municipio no encontrado');
    }
    return municipio.update({
      ...municipioData,
      actualizado_por: userId,
    });
  }

  async delete(id: number): Promise<void> {
    const municipio = await this.municipioModel.findByPk(id);
    if (!municipio) {
      throw new NotFoundException('Municipio no encontrado');
    }
    await municipio.destroy();
  }
}
