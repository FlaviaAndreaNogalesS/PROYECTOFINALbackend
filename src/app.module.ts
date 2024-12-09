import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarreterasModule } from './carreteras/carreteras.module';
import { MunicipiosModule } from './municipios/municipio.module';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SolicitudesIncidenciaModule } from './solicitudes-incidencia/solicitudes-incidencia.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'imagenes'),
      serveRoot: '/imagenes',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'fans',
      database: 'proyectoweb',
      autoLoadModels: true,
      synchronize: false,
    }),
    CarreterasModule,
    MunicipiosModule,
    IncidenciasModule,
    SolicitudesIncidenciaModule,
    AuthModule,
    UsuarioModule,
  ],
})
export class AppModule {}
