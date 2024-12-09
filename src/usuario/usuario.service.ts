import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel(Usuario) private usuarioModel: typeof Usuario) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.findAll();
  }

  //busca por id
  async findOne(id: number): Promise<Usuario> {
    return this.usuarioModel.findByPk(id);
  }

  //CRUD
  async create(data: any): Promise<Usuario> {
    return this.usuarioModel.create(data);
  }

  async update(id: number, data: any): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario.update(data);
  }

  async delete(id: number): Promise<void> {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    await usuario.destroy();
  }

  //CONTRASEÑA
  async changePassword(id: number, newPassword: string): Promise<void> {
    const usuario = await this.usuarioModel.findByPk(id);
  
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
  
    // Guarda la contraseña
    await usuario.update({ contraseña: newPassword });
  }
  
}
