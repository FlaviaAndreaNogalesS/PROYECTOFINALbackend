import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from 'src/usuario/usuario.model';

@Table({
  timestamps: false,
  tableName: 'municipios',
})
export class Municipio extends Model<Municipio> {
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

  @Column({
    type: DataType.DECIMAL(10, 8),
    allowNull: false,
  })
  latitud: number;

  @Column({
    type: DataType.DECIMAL(11, 8),
    allowNull: false,
  })
  longitud: number;

  @ForeignKey(() => Usuario)
  @Column
  creado_por: number;

  @ForeignKey(() => Usuario)
  @Column
  actualizado_por: number;

  @BelongsTo(() => Usuario, 'creado_por')
  creador: Usuario;

  @BelongsTo(() => Usuario, 'actualizado_por')
  actualizador: Usuario;
}
