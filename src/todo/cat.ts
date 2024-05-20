import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @Column
  text: string;
  @Column
  id: number;
  @Column
  isChecked: boolean;
}
