import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Todo from './todo.model';
import { CreateTodoDto } from './dto/Create-todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  async createTask(createTodoDtoTask: CreateTodoDto): Promise<Todo> {
    const task = await this.todoModel.create(createTodoDtoTask);
    return task;
  }

  async findAll(): Promise<Todo[]> {
    const tasks = await this.todoModel.findAll();
    return tasks;
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
