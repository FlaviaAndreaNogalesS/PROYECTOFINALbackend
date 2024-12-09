import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarreterasService } from './carreteras.service';
import { Carretera } from './carretera.model';

@Controller('carreteras')
export class CarreterasController {
  constructor(private readonly carreterasService: CarreterasService) {}

  @Get()
  async getAllCarreteras(): Promise<Carretera[]> {
    return this.carreterasService.findAll();
  }

  @Get('con-usuarios')
  async getCarreterasConUsuarios(): Promise<Carretera[]> {
    return this.carreterasService.findAllWithUsers();
  }

  @Post()
  async createCarretera(
    @Body() carreteraData: Partial<Carretera>, 
    @Query('userId') userId: number, // Captura el usuario que crea la carretera
  ): Promise<Carretera> {
    return this.carreterasService.create(carreteraData, userId);
  }

  @Put(':id')
  async updateCarretera(
    @Param('id') id: number, 
    @Body() carreteraData: Partial<Carretera>, 
    @Query('userId') userId: number, // Captura el usuario que actualiza la carretera
  ): Promise<Carretera> {
    return this.carreterasService.update(id, carreteraData, userId);
  }

  @Delete(':id')
  async deleteCarretera(@Param('id') id: number): Promise<void> {
    return this.carreterasService.delete(id);
  }
}
