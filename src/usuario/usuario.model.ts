import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'creado_en',
  updatedAt: 'actualizado_en',
})
export class Usuario extends Model<Usuario> {
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
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contraseña: string;

  @Column({
    type: DataType.ENUM('administrador', 'verificador'),
    allowNull: false,
  })
  rol: string;
}
