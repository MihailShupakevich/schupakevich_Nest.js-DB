import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Todo from './todo.model';
import { CreateTodoDto } from './dto/Create-todo';
import { UpdateTodoDto } from './dto/Update-todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  createTask(createTodoDtoTask: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDtoTask);
  }
  async findAll(): Promise<Todo[]> {
    const tasks = await this.todoModel.findAll();
    return tasks;
  }
  async updateAllTasksStatus(updateTodoDto: UpdateTodoDto) {
    const isCheckedFront = updateTodoDto.isChecked;
    const tasks = await this.todoModel.update(
      {
        isChecked: !isCheckedFront,
      },
      {
        where: { isChecked: isCheckedFront },
      },
    );
    return tasks;
  }
  async remove(id: number): Promise<string | never> {
    const count = await this.todoModel.destroy<Todo>({
      where: {
        id: id,
      },
    });
    if (count === 0) {
      throw new NotFoundException('Нет такой задачи');
    }
    return 'OK';
  }

  async removeAllDoneTasks(): Promise<string | never> {
    const todos = await this.todoModel.destroy<Todo>({
      where: {
        isChecked: true,
      },
    });
    if (todos === 0) {
      throw new Error('Нет Задач');
    }
    return 'Удалены все выполненные задачи';
  }
  async updateTask(idTodo: number, updateTodoDto: UpdateTodoDto) {
    const [count, task] = await this.todoModel.update(updateTodoDto, {
      where: {
        id: idTodo,
      },
      returning: true,
    });
    if (count === 0) {
      throw new NotFoundException('Такой задачи нет!');
    }
    return task;
  }
}
