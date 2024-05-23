import {
  Model,
  Table,
  Column,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'ToDo' })
export default class Todo extends Model<Todo> {
  @Column({ defaultValue: false })
  isChecked: boolean;

  @Column({ allowNull: false })
  text: string;

  @UpdatedAt
  updatedAt: Date;

  @CreatedAt
  createdAt: Date;
}
