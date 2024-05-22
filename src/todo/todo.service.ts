import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Todo from './todo.model';
import { where } from 'sequelize';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  findOne(id: string): Promise<Todo> {
    return this.todoModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await todo.destroy();
  }

  async removeAllDoneTasks(isChecked: boolean): Promise<void> {
    const todos = await this.todoModel.findAll({
      where: {
        isChecked: true,
      },
    });
    await todos.destroy();
  }
} //вставлять код внутрь этой скобочки
