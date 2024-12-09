import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id') //por id
  async findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  //CRUD
  @Post()
  async create(@Body() data: any) {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usuarioService.delete(id);
  }

  //cambia la contraseña
  @Put(':id/cambiar-contrasena')
  async changePassword(
    @Param('id') id: number,
    @Body('nuevaContrasena') nuevaContrasena: string,
  ) {

    if (!nuevaContrasena || nuevaContrasena.trim() === '') {
      throw new Error('La nueva contraseña es obligatoria');
    }
    
    await this.usuarioService.changePassword(id, nuevaContrasena);
    return { message: 'Contraseña actualizada exitosamente' };
  }
}
