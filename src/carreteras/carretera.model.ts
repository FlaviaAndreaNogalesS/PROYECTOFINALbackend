import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Municipio } from 'src/municipios/municipios.model';
import { Usuario } from 'src/usuario/usuario.model';

@Table({
  timestamps: false, // Desactiva la funcionalidad de timestamps por defecto
  tableName: 'carreteras',
})
export class Carretera extends Model<Carretera> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

  @ForeignKey(() => Municipio)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  municipio_origen_id: number;

  @ForeignKey(() => Municipio)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  municipio_destino_id: number;

  @Column({
    type: DataType.ENUM('bloqueada', 'libre'),
    defaultValue: 'libre',
  })
  estado: string;

  @Column({
    type: DataType.DATE,
    field: 'creado_en', // Mapea la columna personalizada
  })
  creadoEn: Date;

  @Column({
    type: DataType.DATE,
    field: 'actualizado_en', // Mapea la columna personalizada
  })
  actualizadoEn: Date;

  @ForeignKey(() => Usuario)
  @Column
  creado_por: number;

  @ForeignKey(() => Usuario)
  @Column
  actualizado_por: number;

  @BelongsTo(() => Municipio, 'municipio_origen_id')
  municipioOrigen: Municipio;

  @BelongsTo(() => Municipio, 'municipio_destino_id')
  municipioDestino: Municipio;


  @BelongsTo(() => Usuario, 'creado_por')
  creador: Usuario;

  @BelongsTo(() => Usuario, 'actualizado_por')
  actualizador: Usuario;
}

