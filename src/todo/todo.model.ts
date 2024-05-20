import {
  Model,
  Table,
  Column,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'TodoList' })
export default class Todo extends Model<Todo> {
  @PrimaryKey
  @Column
  id: number;
  @Column({ defaultValue: false })
  isChecked: boolean;

  @Column({ allowNull: false })
  text: string;

  @UpdatedAt
  updatedAt: Date;

  @CreatedAt
  createdAt: Date;
}
