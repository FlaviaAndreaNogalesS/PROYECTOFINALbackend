import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'solicitudes_incidencia',
  timestamps: false,
})
export class SolicitudIncidencia extends Model<SolicitudIncidencia> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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

  @Column({
    type: DataType.DECIMAL(10, 8),
    allowNull: true,
  })
  latitud: number;

  @Column({
    type: DataType.DECIMAL(11, 8),
    allowNull: true,
  })
  longitud: number;

  @Column({
    type: DataType.ENUM('pendiente', 'procesado'),
    defaultValue: 'pendiente',
  })
  estado: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  creado_en: Date;
}
