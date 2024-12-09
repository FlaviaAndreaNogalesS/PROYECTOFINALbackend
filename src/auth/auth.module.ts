import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { Usuario } from 'src/usuario/usuario.model';
import { AuthService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
