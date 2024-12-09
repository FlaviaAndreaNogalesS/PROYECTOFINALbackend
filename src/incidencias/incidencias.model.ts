import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Carretera } from 'src/carreteras/carretera.model';
import { Usuario } from 'src/usuario/usuario.model';

@Table({
  tableName: 'incidentes',
  timestamps: false,
})
export class Incidencia extends Model<Incidencia> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Carretera)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  carretera_id: number;

  @Column({
    type: DataType.ENUM(
      'Transitable con desvios y/o horarios de circulación',
      'No transitable por conflictos sociales',
      'Restricción vehicular',
      'No transitable tráfico cerrado',
      'Restricción vehicular, especial',
    ),
    allowNull: false,
  })
  tipo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  detalle: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  foto: string;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  creado_por: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  actualizado_por: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  creado_en: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  actualizado_en: Date;

  @BelongsTo(() => Usuario, 'creado_por')
  creador: Usuario;

  @BelongsTo(() => Usuario, 'actualizado_por')
  actualizador: Usuario;
}
