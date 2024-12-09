import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Municipio } from './municipios.model';
import { MunicipiosService } from './municipios.service';

@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  async getAllMunicipios() {
    return this.municipiosService.findAll();
  }

  //OBTIENE MUNICIPIOS CON USUARIOS
  @Get('con-usuarios')
  async getMunicipiosConUsuarios() {
    return this.municipiosService.findAllWithUsers();
  }

  //CRUD
  @Post()
  async createMunicipio(
    @Body() municipioData: Partial<Municipio>,
    @Query('userId') userId: number,
  ): Promise<Municipio> {
    return this.municipiosService.create(municipioData, userId);
  }

  @Put(':id')
  async updateMunicipio(
    @Param('id') id: number,
    @Body() municipioData: Partial<Municipio>,
    @Query('userId') userId: number,
  ): Promise<Municipio> {
    return this.municipiosService.update(id, municipioData, userId);
  }

  @Delete(':id')
  async deleteMunicipio(@Param('id') id: number): Promise<void> {
    return this.municipiosService.delete(id);
  }
}
