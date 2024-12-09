import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../usuario/usuario.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Usuario) private usuarioModel: typeof Usuario) {}

  async login(email: string, contraseña: string) {
    // Busca usuario por email
    const usuario = await this.usuarioModel.findOne({ where: { email } });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Valida la contraseña
    if (contraseña !== usuario.contraseña) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    };
  }
}
