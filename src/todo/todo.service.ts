import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import Todo from './todo.model';
import { CreateTodoDto } from './dto/сreate-todo';
import { UpdateTodoDto } from './dto/update-todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoModel: typeof Todo,
  ) {}

  createTask(createTodoDtoTask: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDtoTask);
  }

  findTasks(): Promise<Todo[]> {
    return this.todoModel.findAll({
      order: ['createdAt'],
    });
  }

  // async updateAllTasksStatus(updateTodoDto: UpdateTodoDto) {
  //   // const isCheckedFront = updateTodoDto.isChecked;
  //   const [tasks] = await this.todoModel.update(
  //     {
  //       isChecked: updateTodoDto.isChecked,
  //     },
  //     {
  //       where: { isChecked: !updateTodoDto.isChecked },
  //     },
  //   );
  //   return tasks;
  // }

  async changeCheckboxes({ isChecked }: UpdateTodoDto): Promise<string> {
    try {
      const [numberOfTasks] = await this.todoModel.update(
        { isChecked },
        {
          where: {
            isChecked: !isChecked,
          },
        },
      );
      if (numberOfTasks === 0) {
        throw new NotFoundException();
      }
      return 'Ok';
    } catch (error: unknown) {
      console.log(error);
    }
  }

  // async removeTask(id: number): Promise<string | never> {
  //   const count = await this.todoModel.destroy<Todo>({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (count === 0) {
  //     throw new NotFoundException('Нет такой задачи');
  //   }
  //   return 'OK';
  // }

  removeTask(id: number): Promise<string | never> {
    return this.todoModel
      .destroy<Todo>({
        where: {
          id: id,
        },
      })
      .then((count) => {
        if (count === 0) {
          throw new NotFoundException('Нет такой задачи');
        }
        return 'OK';
      });
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
    const [taskCount, [newTask]] = await this.todoModel.update(updateTodoDto, {
      where: {
        id: idTodo,
      },
      returning: true,
    });
    if (taskCount === 0) {
      new NotFoundException('Нет такой задачи по id');
    }
    return newTask;
    console.log(newTask);
  }
}
