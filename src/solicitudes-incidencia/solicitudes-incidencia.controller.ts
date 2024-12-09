import { Controller, Post, Get, Delete, Param, Body, Put, UploadedFile, UseInterceptors, Patch, Query } from '@nestjs/common';
import { SolicitudesIncidenciaService } from './solicitudes-incidencia.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('solicitudes-incidencia')
export class SolicitudesIncidenciaController {
  constructor(
    private readonly solicitudesService: SolicitudesIncidenciaService,
  ) {}

  //obtiene
  @Get()
  async findAll() {
    return this.solicitudesService.findAll();
  }

  //crea soli
  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './imagenes', // Carpeta para guardar imágenes
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )

  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const data = {
      ...body,
      foto: file ? `imagenes/${file.filename}` : null,
    };
    return this.solicitudesService.create(data);
  }

  //marca procesada
  @Patch(':id/process')
  async markAsProcessed(@Param('id') id: number) {
    return this.solicitudesService.markAsProcessed(id);
  }

  //crea la incidencia 
  @Post(':id/crear-incidencia')
  async createIncidenciaFromSolicitud(
    @Param('id') id: number,
    @Query('userId') userId: number,
  ) {
    return this.solicitudesService.createIncidenciaFromSolicitud(id, userId);
  }

}
