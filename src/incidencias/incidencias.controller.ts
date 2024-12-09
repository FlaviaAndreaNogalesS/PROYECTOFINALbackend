import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors  } from '@nestjs/common';
import { IncidenciasService } from './incidencias.service';
import { Incidencia } from './incidencias.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('incidencias')
export class IncidenciasController {
  constructor(private readonly incidenciasService: IncidenciasService) {}

  @Get() //TODAS O CON FILTRO
  async getAllIncidencias(@Query('tipo') tipo: string) {
    if (tipo) {
      return this.incidenciasService.findByType(tipo);
    }
    return this.incidenciasService.findAll();
  }

  //OBTIENE LAS BLOQUEADAS
  @Get('/blocked-routes')
  async getBlockedRoutes() {
    return this.incidenciasService.findBlockedRoutes();
  }

  //OBTIENE LAS INCIDENCIAS CON USUARIOS
  @Get('con-usuarios')
  async getIncidenciasConUsuarios() {
    return this.incidenciasService.findAllWithUsers();
  }
  
  //CRUD
  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async createIncidencia(
    @Body() incidenciaData: Partial<Incidencia>,
    @Query('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fotoPath = file ? `imagenes/${file.filename}` : null;
    return this.incidenciasService.create(incidenciaData, userId, fotoPath);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  
  async updateIncidencia(
    @Param('id') id: number,
    @Body() incidenciaData: Partial<Incidencia>,
    @Query('userId') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Incidencia> {
    const fotoPath = file ? `imagenes/${file.filename}` : null;
    return this.incidenciasService.update(id, incidenciaData, userId, fotoPath);
  }

  @Delete(':id')
  async deleteIncidencia(@Param('id') id: number): Promise<void> {
    return this.incidenciasService.delete(id);
  }
}
