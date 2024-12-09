import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarreterasService } from './carreteras.service';
import { CarreterasController } from './carreteras.controller';
import { Carretera } from './carretera.model';
import { Municipio } from 'src/municipios/municipios.model';


@Module({
  imports: [SequelizeModule.forFeature([Carretera, Municipio])],
  controllers: [CarreterasController],
  providers: [CarreterasService],
})
export class CarreterasModule {}
