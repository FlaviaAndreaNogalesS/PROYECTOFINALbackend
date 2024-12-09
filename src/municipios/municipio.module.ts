import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Municipio } from './municipios.model';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosService } from './municipios.service';


@Module({
  imports: [SequelizeModule.forFeature([Municipio])],
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
})
export class MunicipiosModule {}
